/**
 * Adds a "zoom" button to every rendered Mermaid diagram. Clicking it opens a
 * lightweight in-page overlay containing a clone of the diagram, with
 * drag-to-pan and scroll-wheel/pinch zoom powered by @panzoom/panzoom.
 *
 * The clone lives in the *same* document as the page (no iframe, no
 * third-party lightbox), so it automatically inherits the page's current
 * theme/colors exactly, with no cross-origin or re-render mismatch possible.
 *
 * Requires: @panzoom/panzoom (vendored via update.sh).
 */
(function () {
  'use strict';

  var processed = new WeakSet();
  var overlay = null;
  var panzoomInstance = null;

  function onKeydown(e) {
    if (e.key === 'Escape') closeOverlay();
  }

  function closeOverlay() {
    if (!overlay) return;
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
    overlay = null;
    panzoomInstance = null;
    document.body.style.overflow = '';
  }

  function buildControlButton(iconClass, label, onClick) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mermaid-overlay-btn';
    btn.setAttribute('aria-label', label);
    btn.innerHTML = '<i class="fa-solid ' + iconClass + '"></i>';
    btn.addEventListener('click', onClick);
    return btn;
  }

  function openZoom(svgEl) {
    if (typeof Panzoom === 'undefined') {
      console.warn('mermaid-zoom: Panzoom is not loaded.');
      return;
    }

    var clone = svgEl.cloneNode(true);
    clone.removeAttribute('width');
    clone.removeAttribute('height');
    clone.style.width = '100%';
    clone.style.height = '100%';
    clone.style.maxWidth = 'none';

    var stage = document.createElement('div');
    stage.className = 'mermaid-overlay-stage';
    stage.appendChild(clone);

    var controls = document.createElement('div');
    controls.className = 'mermaid-overlay-controls';

    overlay = document.createElement('div');
    overlay.className = 'mermaid-overlay';
    overlay.appendChild(stage);
    overlay.appendChild(controls);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    panzoomInstance = Panzoom(clone, {
      maxScale: 20,
      minScale: 0.2,
      canvas: true,
      cursor: 'grab'
    });

    stage.addEventListener('wheel', panzoomInstance.zoomWithWheel);

    controls.appendChild(
      buildControlButton('fa-magnifying-glass-plus', 'Zoom in', function () {
        panzoomInstance.zoomIn();
      })
    );
    controls.appendChild(
      buildControlButton('fa-magnifying-glass-minus', 'Zoom out', function () {
        panzoomInstance.zoomOut();
      })
    );
    controls.appendChild(
      buildControlButton('fa-arrows-rotate', 'Reset view', function () {
        panzoomInstance.reset();
      })
    );
    controls.appendChild(buildControlButton('fa-xmark', 'Close', closeOverlay));

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeOverlay();
    });

    document.addEventListener('keydown', onKeydown);
  }

  function addZoomButton(container, svgEl) {
    console.log('[zoom] addZoomButton called for', container);
    if (processed.has(svgEl)) {
      console.log('[zoom] already processed, skipping');
      return;
    }
    processed.add(svgEl);
  
    container.classList.add('mermaid-zoomable');
  
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mermaid-zoom-btn';
    btn.setAttribute('aria-label', 'Zoom diagram');
    btn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openZoom(svgEl);
    });
  
    container.appendChild(btn);
    console.log('[zoom] button appended', btn);
  }
  
  function scan(root) {
    var containers = root.querySelectorAll('.mermaid, pre.mermaid');
    console.log('[zoom] scan found', containers.length, 'containers');
    containers.forEach(function (container) {
      var svgEl = container.querySelector('svg');
      console.log('[zoom] container', container, 'has svg?', !!svgEl);
      if (svgEl) addZoomButton(container, svgEl);
    });
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.target.closest && m.target.closest('.mermaid, pre.mermaid')) {
        scan(document);
      } else {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) scan(node.parentNode || document);
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    scan(document);
    observer.observe(document.body, { childList: true, subtree: true });
  });

  // exposed so other scripts (e.g. mermaid-custom-theme.js) can force a
  // rescan after they manually wipe/re-render a diagram's DOM
  window.__mermaidZoomRescan = function () { scan(document); };
})();