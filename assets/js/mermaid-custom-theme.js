import { customMermaidThemeVariables } from '/assets/js/mermaid-theme-config.js';

function buildCustomFrontmatter(originalCode) {
  // YAML forbids tabs for indentation — normalize any tabs to spaces first
  const normalized = originalCode.replace(/\t/g, '    ');

  const match = normalized.match(/([ ]*)theme:\s*['"]?custom['"]?/);
  if (!match) return normalized;

  const indent = match[1];

  const themeVarsYaml = Object.entries(customMermaidThemeVariables)
    .map(([key, value]) => `${indent}${indent}${key}: '${value}'`)
    .join('\n');

  const replacement = `${indent}theme: base\n${indent}themeVariables:\n${themeVarsYaml}`;

  return normalized.replace(/[ ]*theme:\s*['"]?custom['"]?/, replacement);
}

function rescanZoomButtons() {
  if (typeof window.__mermaidZoomRescan === 'function') {
    window.__mermaidZoomRescan();
  }
}

function reassertCustomMermaidThemes() {
  if (typeof mermaid === 'undefined') return;

  var list = document.getElementsByClassName('mermaid');
  var renderPromises = [];

  Array.prototype.forEach.call(list, function (elem) {
    var backup = elem.previousSibling;
    if (!backup || !backup.children || !backup.children.item(0)) return;

    var svgCode = backup.children.item(0).textContent;

    if (/theme:\s*custom/.test(svgCode)) {
      var patched = buildCustomFrontmatter(svgCode);
      elem.textContent = patched;
      elem.removeAttribute('data-processed');
      elem.classList.add('custom-mermaid-theme');

      var result = mermaid.init(undefined, elem);
      if (result && typeof result.then === 'function') {
        renderPromises.push(
          result.then(function () {
            var svg = elem.querySelector('svg');
            if (svg) svg.style.backgroundColor = '#FFFFFF';
          })
        );
      } else {
        var svgSync = elem.querySelector('svg');
        if (svgSync) svgSync.style.backgroundColor = '#FFFFFF';
      }
    }
  });

  if (renderPromises.length > 0) {
    Promise.all(renderPromises).then(rescanZoomButtons).catch(rescanZoomButtons);
  } else {
    // older mermaid versions: init() is synchronous, just rescan after a tick
    setTimeout(rescanZoomButtons, 100);
  }
}

function waitForMermaidThenRun() {
  if (typeof mermaid !== 'undefined' && typeof mermaid.init === 'function') {
    reassertCustomMermaidThemes();
  } else {
    setTimeout(waitForMermaidThenRun, 200);
  }
}

// initial page load
window.addEventListener('load', function () {
  waitForMermaidThenRun();
});

// every site theme toggle (Chirpy posts a message event on light/dark switch)
window.addEventListener('message', function (event) {
  if (!event.data || event.data.id !== (window.Theme && window.Theme.eventId)) return;
  setTimeout(reassertCustomMermaidThemes, 100);
});