---
title: "Hello draft guys"
date: 2026-04-25 01:30:00 +0530
categories: [Revit]
tags: [plugin, pyrevit, python, revit]      # Tag names should always be in lowercase
mermaid: true
---

## Visual Diagram

> To expand image, click on "Zoom" icon on top-right part of image.
{: .prompt-tip }

### Class diagram

```mermaid
---
title: pyChai - Class Diagram
config:
  layout: elk
  theme: custom
---
classDiagram
    %% Main script
    namespace Main_script {
    class Main {
        <<main entry point>>
        + main()
        }
    }

    %% ---------------------------------------
    %% Views
    class MainWindow {
        +vm_windowBottomBar : WindowBottomBarViewModel
        +vm_mainWindow : MainWindowViewModel
        +usercontrol_manager : UserControlManager
        +theme_manager : ThemeManager
        +ext_event_handler : BasicExEventHandler

        +ButtonEvent_Window_Minimize()
        +ButtonEvent_Window_Resize()
        +ButtonEvent_Window_Close()
        +ButtonEvent_Window_Theme()
        +ButtonEvent_Window_VisitProfile()
        +ButtonEvent_Main_Clear()
        +ButtonEvent_Main_PickFile()
        +ButtonEvent_Main_RefreshContent()
        +ButtonEvent_Main_SelectManual()
        +ButtonEvent_Main_SelectAll()
        +ButtonEvent_Main_SelectClear()
        +ButtonEvent_Main_ShowError()
        +ButtonEvent_Main_PreviewContent()
        +ButtonEvent_Main_Cancel()
        +OnMainWindowClosing()
        -_select_elements()
        -_clear_main_things()
        -_clear_all_things()
        -_generate_preview_content()
    }

    class PreviewWindow {
        -_main_window : MainWindow
        -_main_vm : MainWindowViewModel
        +vm_windowBottomBar : WindowBottomBarViewModel
        +vm_previewWindow : PreviewWindowViewModel
        -_cell_validity_converter : CellValidityConverter
        -_row_sibling_error_converter : CellValidityConverter
        -_validation_tooltip_converter : ValidationToTooltipConverter
        +usercontrol_manager : UserControlManager
        +theme_manager : ThemeManager

        +ButtonEvent_Window_Minimize()
        +ButtonEvent_Window_Resize()
        +ButtonEvent_Window_Close()
        +ButtonEvent_Window_Theme()
        +ButtonEvent_Window_VisitProfile()
        +ButtonEvent_Preview_GoBack()
        +ButtonEvent_Preview_Apply()
        +ButtonEvent_Preview_Cancel()
        +OnAutoGeneratingColumn()
        +pakka_apply_values()
        -_on_apply_complete()
    }

    class WindowBottomBarUC {
        +WebsiteEvent : RoutedEvent$    %% Class-level attribute / static attribute

        +add_WebsiteVisit(handler)
        +remove_WebsiteVisit(handler)
        +RaiseWebsiteVisitEvent()
    }

    class WindowTopBarUC {
        +CloseEvent : RoutedEvent$
        +MinimizeEvent : RoutedEvent$
        +ResizeEvent : RoutedEvent$
        +ThemeEvent : RoutedEvent$
        +Title : str    %% Making changes in code-behind

        +add_WindowClose(handler)
        +remove_WindowClose(handler)
        +add_WindowMinimize(handler)
        +remove_WindowMinimize(handler)
        +add_WindowResize(handler)
        +remove_WindowResize(handler)
        +add_WindowTheme(handler)
        +remove_WindowTheme(handler)
        +RaiseWindowCloseEvent()
        +RaiseWindowMinimizeEvent()
        +RaiseWindowResizeEvent()
        +RaiseWindowThemeEvent()
    }

    %% ---------------------------------------
    %% ViewModels
    class WindowBottomBarViewModel {
        -_model : WebsiteModel
        
        +visit_website()
    }

    class WindowBase {
        +WM_SYSCOMMAND : int$
        +SC_MAXIMIZE : int$
        +SC_RESTORE : int$
        +SC_MINIMIZE : int$

        +is_fullscreen : bool
        -_is_toggling : bool
        -_old_top : float
        -_old_left : float
        -_old_width : float
        -_old_height : float

        -_on_loaded()
        -_get_handle() IntPtr
        -_wnd_proc() IntPtr
        +center_on_revit_monitor()
        -_get_monitor_work_area()$
        +on_maximize_restore()
        +on_minimize()
        -_on_state_changed()
        -_get_current_monitor_work_area()
        +toggle_fullscreen()
        +minimize_window()
        +close_window()
    }

    class PreviewWindowViewModel {
        -_choices_vm : ChoicesViewModel_MainWindow
        -_element_selection_vm : ElementSelection_MainWindow
        -_datagrid_column_headers : ObservableCollection~str~
        -_datagrid_rows_data : ObservableCollection~str~
        -_sorted_rows_shared : list
        -_excel_dict_transposed_shared : dict
        -_mapped_sorting_parameter_with_elements_dict_shared : dict
        +m_ExternalEvent : ExternalEvent
        +m_ExternalEventHandler : BasicExEventHandler

        +IsApplyButtonVisible : bool
        +DataViewDataTable : DataTable
        +CellValidityMap : Dictionary~str, bool~
        +CellErrorMap : Dictionary~str, str~
        +RowSiblingErrorMap : Dictionary~str, bool~
        +ErrorTextBoxDataFill : str     %% Returns a joined string, not list of string
        +HasErrors : bool

        +preview_data_generate()
        -_prepare_data()
        +apply_generated_values()
        +OnClosing()
        +finally_apply_values()
    }

    namespace Main_Window_ViewModel {
        class MainWindowViewModel {
            +FileSelection : FileSelection_MainWindow
            +CategorySelection : CategorySelection_MainWindow
            +ElementSelection : ElementSelection_MainWindow
            +ChoicesVM : ChoicesViewModel_MainWindow

            +PreviewWindowVMProperty : PreviewWindowViewModel

            +markdown_output()
        }

        class FileSelection_MainWindow {
            +SelectedFilePath : str
            +SelectedFileText : str
            +SelectedFileExtension : str
        }

        class CategoryItem {
            +CatName : str
            +CatBuiltinCat : BuiltInCategory

            +ToString() str
        }

        class CategorySelection_MainWindow {
            -_on_changed : callable
            +category_dict : list
            +category_items : ObservableCollection~CategoryItem~

            +CategoryItems : ObservableCollection~CategoryItem~
            +SelectedCategory : CategoryItem
            +SelectedBuiltInCategory : BuiltInCategory

            +set_on_changed(callback_function)
        }

        class ElementSelection_MainWindow {
            -_category_selection : CategorySelection_MainWindow
            +element_list : list~Element~

            +HasPreviewWindowOpened : bool
            +SelectedBuiltInCategory : BuiltInCategory
            +ElementsTotal : int
            +ElementsSuccess : int
            +ElementsFailed : int
            +SelectedElements : list~Element~
            +ElementsSkipped : int
            +ElementsErrorsValidated : int

            +select_elements_all()
            +select_elements_manual()
        }
    }

    namespace Choices_ViewModel {
        class ChoiceRow {
            +SerialNumber : int
            +PrimarySort : bool
            +ParameterType : str
            +RevitParameterValue : str
            +ExcelColumnValue : str
            +ParameterStorageType : StorageType
            +ParameterID : int
            +ParameterObject : Parameter
            +ParameterDefinitionForgeType : ForgeTypeId
            +ParameterValueUnitType : ForgeTypeId
            +ParameterTypeIdentifyObjectStore : ForgeTypeId
        }

        class ChoiceRowViewModel {
            -_parent_view_model : ChoicesViewModel_MainWindow
            +SerialNumber : int
            +PrimarySort : bool
            +ParameterType : str
            +RevitParameterValue : str
            +ExcelColumnValue : str
            +ParameterStorageType : StorageType
            +ParameterID : int
            +ParameterObject : Parameter
            +ParameterDefinitionForgeType : ForgeTypeId
            +ParameterValueUnitType : ForgeTypeId
            +ParameterTypeIdentifyObjectStore : ForgeTypeId
            +HasError : bool
            +ErrorMessages : str
            +ErrorTooltip : str
            +IsFilled : bool
            +ShowErrorIcon : enum
            +ShowCorrectIcon : enum
        }

        class ChoicesViewModel_MainWindow {
            -_category_selection : CategorySelection_MainWindow
            -_element_selection : ElementSelection_MainWindow
            -_file_selection : FileSelection_MainWindow
            -_rvt_param_list : list
            -_excel_column_list : list
            %% -_lookup_dict_params : dict
            -_data_column_headers : list
            -_data_rows : list
            -_mapping_dict : dict
            -_rvt_parameter_items : ObservableCollection~str~
            -_excel_column_items_headers : ObservableCollection~str~
            %% +_command_add_row : RelayCommand
            %% +_command_delete_row : RelayCommand
            %% -_choice_rows : ObservableCollection~ChoiceRowViewModel~

            +SelectedBuiltInCategory : BuiltInCategory
            +SelectedElementsList : list~Element~
            +FilePath : str
            +FileExtension : str
            +ChoiceRows : ObservableCollection~ChoiceRowViewModel~
            +ExcelColumnList : ObservableCollection~str~
            +InternalExcelDict : dict
            +RevitParameterList : ObservableCollection~str~
            +LookupDictParams : dict
            +CanDeleteRow : bool
            +Command_AddRow : RelayCommand
            +Command_DeleteRow : RelayCommand
            +HasPrimarySort : bool
            +HasAnyErrors : bool
            +AllRowsFilled : bool
            +IsButtonEnabled : bool

            +choices_list_setup() 
            +excel_dict_setup() 
            -_renumber_rows() 
            +AddRow() 
            +DeleteRow() 
            +reset_to_default_row_collection() 
            +ValidateDuplicates()
        }
    }

    %% ---------------------------------------
    %% MVVM
    class FileExtensionConverter {
        +Convert(value, targetType, parameter, culture) bool
        +ConvertBack(value, targetType, parameter, culture) str
    }

    class RelayCommand {
        -_execute : callable
        -_can_execute : callable
        -_handlers : list

        +add_CanExecuteChanged(handler)
        +remove_CanExecuteChanged(handler)
        +RaiseCanExecuteChanged()
        +CanExecute(parameter) bool
        +Execute(parameter)
    }

    class ViewModelBase {
        +propertyChangedEventHandler : list

        +OnPropertyChanged(property_name) 
        +add_PropertyChanged(handler) 
        +remove_PropertyChanged(handler) 
    }

    class ViewModelBaseValidation {
        +propertyChangedEventHandler : list
        +dataErrorsChangedEventHandler : list
        -_errors : dict
        
        +HasErrors : str

        +add_PropertyChanged(handler)
        +remove_PropertyChanged(handler)
        +OnPropertyChanged(property_name)
        +add_ErrorsChanged(handler)
        +remove_ErrorsChanged(handler)
        +OnErrorsChanged(property_name)
        +GetErrors(property_name) List~str~
        +AddError(property_name, error_message)
        +ClearErrors(property_name)
        +SetProperty(property_name, field_name, value)
    }

    class CellValidityConverter {
        -_get_validity_map : callable
 
        +Convert(value, targetType, parameter, culture) bool
        +ConvertBack(value, targetType, parameter, culture) bool
    }

    class ValidationToTooltipConverter {
        -error_map_provider : callable
 
        +Convert(value, targetType, parameter, culture) bool
        +ConvertBack(value, targetType, parameter, culture) bool
    }


    %% ---------------------------------------
    %% Models
    class NumpyEncoder {
        +default(obj)
    }

    class mo_cpy_fileio_pyrevit {
        <<module>>
        -_file_to_dataframe(file_path, ext) DataFrame
        -_extract_values(pandas_dataframe) dict
        -_log_failure(context, args_list)
        +main()
    }

    class mo_datatable {
        <<module>>
        +transpose_dict(existing_dictionary, mapped_columns) dict
        +valid_element_list_generator(selected_element_list, sorting_element_parameter_id) dict
    }

    class DataTableOperations {
        +datatable_operations(orted_rows, transposed_excel_dict, mapped_dict, preview_window_vm, element_selection_vm)
        -_validate_value(value, storage_type, forge_type) bool
        -_build_error_message(value, storage_type, forge_type) str
        -_build_error_line(primary_sort_col_name, row_key, col_name, value, storage_type, forge_type) str
    }

    class ElementSelecter {
        +built_in_cat : BuiltInCategory

        -_builtincategory_from_string(category_string)$ BuiltInCategory
        +select_all() list~Element~
        +elem_select_manual() list~Element~
    }

    class RevitParameterCollection {
        -_element_list : list~Element~

        -_extract_parameters_from_elements() dict
        +list_making_from_dict() tuple~list, dict~
    }

    class mo_elem_selecter {
        <<module>>
        +category_in_model_list() list
    }

    class mo_fileiops {
        <<module>>
        +load_file() str
    }

    class PySubprocess {
        +launch_pipeline_pyrevit(file_path, file_ext) dict
        -_get_script_file_location(file_name)$ str
    }

    class BasicExEventHandler {
        +passable_method : callable
        +on_complete : bool

        +Execute(UIApplication)
        +GetName() str
    }

    class ParameterApplication {
        -_sorted_rows : list~ChoiceRowViewModel~
        -_transposed_excel_dict : dict
        -_mapped_dict : dict
        -_param_tuple_list : list

        -_gather_parameter_collection()
        -_parameters_apply_old_method() bool
        +apply_parameter_values() bool
    }

    class WebsiteModel {
        +linkedin_profile : str
    }

    %% ---------------------------------------
    %% Helpers
    class PyRevitConfigs {
        +SECTION_NAME : str$
        +OPTION_NAME_01 : str$
        +OPTION_NAME_02 : str$
        +OPTION_NAME_03 : str$

        -_cpy_location : str
        -_plugin_extension_location : str

        +read_cpy_external_lib_location()
        +read_cpy_plugin_lib_location()
        +read_cpy_location()
        -_read_property(property_name, property_value) str
        -_add_property(property_name, property_value)
        +purge_all_properties()
        -_get_cpy_location_from_ipy()$ str
        -_get_extension_root_path()$ str
    }

    class he_event_manager {
        <<module_helper>>
        +get_or_register_event(name, owner_type)
    }
    
    class he_fileviewer {
        <<module_helper>>
        +shorten_path(file_path) str
    }

    class he_output_messages {
        <<module_helper>>
        +show_output_markdown_template(markdown_template_path, template_variables)
    }

    class he_resdict_manager {
        <<module_helper>>
        +add_resource_dict(target, resource_dict_list) 
    }

    class ResDictManager {
        +apply_to(target, xaml_list)
        +apply_shared(target)$
    }

    class ThemeManager {
        +window_target : Window
        +extra_targets : list
        +primary_theme_xaml : str
        +secondary_theme_xaml : str
        +uri_primary : Uri
        +uri_secondary : Uri
        +is_primary : bool
        
        -_all_targets() list~Window~
        -_uri_path() tuple~Uri, Uri~
        -_add_theme(xaml_uri) 
        -_remove_theme(xaml_uri) 
        +toggle() 
    }

    class UserControlManager {
        +window_target : Window
        -_title : str

        %% top_bar and bottom_bar are public attributes.
        %% It is accessed externally (like self.usercontrol_manager.top_bar in MainWindow).
        +top_bar : WindowTopBarUC
        +bottom_bar : WindowBottomBarUC

        -_window_top_bar_setup()
        -_window_bottom_bar_setup()
    }

    class ValidationService {
        +validate(rows)$ dict
    }

    %% ---------------------------------------
    %% .NET helpers
    class INotifyPropertyChanged {
        <<interface>>
    }

    class INotifyDataErrorInfo {
        <<interface>>
    }

    class PropertyChangedEventArgs {
        <<.NET class>>
    }

    class DataErrorsChangedEventArgs {
        <<.NET class>>
    }

    class ProcessStartInfo {
        <<.NET class>>
    }

    class Process {
        <<.NET class>>
    }

    class UserControl {
        <<.NET class>>
    }

    class RoutedEventHandler {
        <<.NET delegate type>>
    }

    class RoutedEventArgs {
        <<.NET class>>
    }

    class Window {
        <<.NET base class>>
    }

    class HwndSource {
        <<.NET class>>
    }

    class HwndSourceHook {
        <<.NET class>>
    }

    class WindowInteropHelper {
        <<.NET class>>
    }

    class WindowState {
        <<.NET enum>>
    }

    class IntPtr {
        <<.NET struct>>
    }

    class ObservableCollection {
        <<.NET generic collection>>
    }

    class Visibility {
        <<.NET enum>>
    }
    
    class List {
        <<.NET class>>
    }
    
    class EventArgs {
        <<.NET class>>
    }
    
    class IValueConverter {
        <<.NET class>>
        +Convert(value, targetType, parameter, culture) object
        +ConvertBack(value, targetType, parameter, culture) object
    }
    
    class Binding {
        <<.NET class>>
    }
    
    class UriKind {
        <<.NET enum>>
    }
    
    class Uri {
        <<.NET type>>
    }
    
    class ResourceDictionary {
        <<.NET class>>
    }
    
    class RoutingStrategy {
        <<.NET enum>>
    }
    
    class EventManager {
        <<.NET class>>
    }
    
    class ArgumentException {
        <<.NET exception>>
    }
    
    %% ---------------------------------------

    %% RELATIONSHIP
    Main ..> MainWindow : import from (dependency)

    %% Views
    MainWindow --|> WindowBase : inherits
    MainWindow *-- WindowBottomBarViewModel : composed of
    MainWindow *-- MainWindowViewModel : composed of
    MainWindow ..> ResDictManager : depends on
    MainWindow *-- ThemeManager : composed of
    MainWindow *-- UserControlManager : composed of
    MainWindow ..> he_fileviewer : uses
    MainWindow ..> mo_fileiops : uses
    MainWindow ..> FileExtensionConverter : depends on
    MainWindow ..> PreviewWindow : depends on
    %% BasicExEventHandler stored for the life of the window, and explicitly torn down 
    %% in OnMainWindowClosing, means ownership with event lifecycle.
    MainWindow *-- BasicExEventHandler : composed of ()

    PreviewWindow --|> WindowBase : inherits
    PreviewWindow *-- WindowBottomBarViewModel : composed of
    PreviewWindow *-- PreviewWindowViewModel : composed of
    PreviewWindow *-- UserControlManager : composed of
    PreviewWindow *-- ThemeManager : composed of
    PreviewWindow *-- CellValidityConverter : composed of
    PreviewWindow *-- ValidationToTooltipConverter : composed of
    PreviewWindow ..> ResDictManager : depends on
    PreviewWindow o-- MainWindow : aggregate references (passed in from outside)
    PreviewWindow o-- MainWindowViewModel : aggregate references (passed in from outside)

    WindowBottomBarUC --|> UserControl : inherits
    WindowBottomBarUC ..> ResDictManager : depends on
    WindowBottomBarUC ..> he_event_manager : depends on
    WindowBottomBarUC ..> RoutedEventHandler : depends on
    WindowBottomBarUC ..> RoutedEventArgs : depends on

    WindowTopBarUC --|> UserControl : inherits
    WindowTopBarUC ..> ResDictManager : depends on
    WindowTopBarUC ..> he_event_manager : depends on
    WindowTopBarUC ..> RoutedEventHandler : depends on
    WindowTopBarUC ..> RoutedEventArgs : depends on

    WindowBase --|> Window : inherits
    WindowBase ..> HwndSource : depends on
    WindowBase ..> HwndSourceHook : depends on
    WindowBase ..> WindowInteropHelper : depends on
    WindowBase ..> WindowState : depends on
    WindowBase ..> IntPtr : depends on
    WindowBase ..> WindowStartupLocation : depends on
    WindowBase ..> Screen : depends on
    WindowBase ..> Process : depends on

    %% -------------------------------------
    %% ViewModels
    WindowBottomBarViewModel *-- WebsiteModel : owns
    WindowBottomBarViewModel ..> ProcessStartInfo : depends on
    WindowBottomBarViewModel ..> Process : depends on

    MainWindowViewModel --|> ViewModelBase : inherits
    MainWindowViewModel *-- FileSelection_MainWindow : composed of
    MainWindowViewModel *-- CategorySelection_MainWindow : composed of
    MainWindowViewModel *-- ElementSelection_MainWindow : composed of
    MainWindowViewModel *-- ChoicesViewModel_MainWindow : composed of
    MainWindowViewModel ..> he_output_messages : depends on

    FileSelection_MainWindow --|> ViewModelBase : inherits

    CategorySelection_MainWindow --|> ViewModelBase : inherits
    CategorySelection_MainWindow *-- CategoryItem : owns (1..*)
    CategorySelection_MainWindow ..> mo_elem_selecter : depends on
    CategorySelection_MainWindow ..> ObservableCollection : depends on

    ElementSelection_MainWindow --|> ViewModelBase : inherits
    ElementSelection_MainWindow ..> CategorySelection_MainWindow : depends on
    ElementSelection_MainWindow ..> ElementSelecter : depends on

    ChoiceRowViewModel --|> ViewModelBaseValidation : inherits
    ChoiceRowViewModel o-- ChoicesViewModel_MainWindow : aggregates (shared instance)
    ChoiceRowViewModel ..> Visibility : depends on
    ChoiceRowViewModel ..> PySubprocess : depends on
    ChoiceRowViewModel ..> RevitParameterCollection : depends on
    ChoiceRowViewModel ..> ValidationService : depends on

    ChoicesViewModel_MainWindow --|> ViewModelBase : inherits
    ChoicesViewModel_MainWindow o.. CategorySelection_MainWindow : aggregates (shared instance)
    ChoicesViewModel_MainWindow o.. ElementSelection_MainWindow : aggregates (shared instance)
    ChoicesViewModel_MainWindow o.. FileSelection_MainWindow : aggregates (shared instance)
    ChoicesViewModel_MainWindow ..> ObservableCollection : depends on
    ChoicesViewModel_MainWindow ..> RelayCommand : depends on
    ChoicesViewModel_MainWindow *-- ChoiceRow : owns (1..*)
    ChoicesViewModel_MainWindow ..> RevitParameterCollection : depends on 
    ChoicesViewModel_MainWindow ..> PySubprocess : depends on

    %% PreviewWindowViewModel
    PreviewWindowViewModel --|> ViewModelBaseValidation : inherits
    PreviewWindowViewModel o-- ChoicesViewModel_MainWindow : aggregates (shared instance)
    PreviewWindowViewModel o-- ElementSelection_MainWindow : aggregates (shared instance)
    PreviewWindowViewModel o-- BasicExEventHandler : aggregates (shared instance)
    PreviewWindowViewModel o-- ExternalEvent : aggregates (shared instance)
    PreviewWindowViewModel ..> mo_datatable : depends on
    PreviewWindowViewModel ..> DataTableOperations : depends on
    PreviewWindowViewModel ..> ParameterApplication : depends on
    PreviewWindowViewModel *-- ObservableCollection : composed of
    PreviewWindowViewModel *-- DataTable : composed of

    %% -------------------------------------
    %% MVVM
    ViewModelBase ..|> INotifyPropertyChanged : realizes/implements
    ViewModelBase ..> PropertyChangedEventArgs : depends on

    ViewModelBaseValidation ..|> INotifyPropertyChanged : realizes/implements
    ViewModelBaseValidation ..|> INotifyDataErrorInfo : realizes/implements
    ViewModelBaseValidation ..> PropertyChangedEventArgs : depends on
    ViewModelBaseValidation ..> DataErrorsChangedEventArgs : depends on
    ViewModelBaseValidation ..> List : depends on

    RelayCommand ..|> ICommand : realizes/implements
    RelayCommand ..> EventArgs : depends on

    FileExtensionConverter ..|> IValueConverter : realizes/implements
    FileExtensionConverter ..> Binding : depends on / uses

    CellValidityConverter ..|> IValueConverter : realizes/implements
    CellValidityConverter ..> DataRowView : depends on

    ValidationToTooltipConverter ..|> IValueConverter : realizes/implements
    ValidationToTooltipConverter ..> DataRowView : depends on

    %% -------------------------------------
    %% Models
    ParameterApplication ..> ChoiceRowViewModel : depends on

    BasicExEventHandler ..|> IExternalEventHandler : realizes/implements

    PySubprocess ..> subprocess_script_output_pyrevit : depends on
    PySubprocess ..> PyRevitConfigs : depends on
    PySubprocess ..> mo_cpy_fileio_pyrevit : depends on & uses script for further usage

    ElementSelecter ..> selectElement_multiple_builtincategory : depends on / uses

    DataTableOperations *-- DataTable : composed of

    mo_cpy_fileio_pyrevit ..> NumpyEncoder : uses
    NumpyEncoder --|> JSONEncoder : inherits

    %% -------------------------------------
    %% Helpers
    he_event_manager ..> RoutedEventHandler : depends on
    he_event_manager ..> RoutingStrategy : depends on
    he_event_manager ..> EventManager : depends on
    he_event_manager ..> ArgumentException : depends on

    ResDictManager ..> ResourceDictionary : depends on
    ResDictManager ..> Uri : depends on
    ResDictManager ..> UriKind : depends on

    he_resdict_manager o-- Window : aggregates (shared instance)

    ThemeManager o-- Window : aggregates (shared instance)
    ThemeManager ..> ResourceDictionary : depends on
    ThemeManager ..> Uri : depends on
    ThemeManager ..> UriKind : depends on
    
    UserControlManager o-- Window : aggregates (shared instance)
    UserControlManager *-- WindowTopBarUC : composed of
    UserControlManager *-- WindowBottomBarUC : composed of

    ValidationService ..> ChoiceRowViewModel : depends on
```
_Image 15 - Parameter Mapper : Class Diagram_

While working on the project, the code was getting increasingly complicated, making it difficult to navigate. To better understand the code and reduce the mental strain of reading the codebase later, I created a Class Diagram using Mermaid.js, taking the help of Claude for understanding the node relationships between classes. It clarified the relationships between the classes.

### Sequence Diagram

```mermaid
---
title: pyChai Parameter Mapper - Sequence Flowchart
config:
  theme: custom
  themeCSS: | 
    rect.rect { 
      stroke: none !important; 
    }
---
sequenceDiagram
    autonumber
    actor User

    box rgb(230,240,255) Main Window Operations
        participant MW as MainWindow View
        participant MWVM@{ "type": "collections"} as MainWindow ViewModel <br/> collection of multiple view models
    end

    box rgb(255,240,230) Preview Window Operations
        participant PW as Preview Window (View)
        participant PWVM@{ "type": "collections"} as Preview Window (View Model)
    end

    participant Model@{ "type": "collections"} as Revit API backend (Model)
    
    User ->>+ MW : Pick spreadsheet file
    MW ->>+ MWVM : Request file data
    MWVM ->>+ Model : Read spreadsheet data
    Model -->>- MWVM : Extract spreadsheet columns
    MWVM -->>- MW : Update column list
    MW -->>- User : Show available spreadsheet columns

    User ->>+ MW : Choose Revit category <br> & select Elements
    MW ->>+ MWVM : Request elements
    MWVM ->>+ Model : Query Revit elements
    Model -->>- MWVM : Extract Elements & its instance parameters
    MWVM -->>- MW : Update instance parameters list
    MW -->>- User : Show available instance parameters

    User ->>+ MW : Mapping Revit parameters to <br> selected spreadsheet columns
    MW ->> MWVM : Update mapping
    MWVM -->> MW : Checking validation status <br> of mapped elements
    MW -->>- User : Show mapping status

    User ->>+ MW : Click on "Preview" button
    Note  over  MW ,PW: MainWindow collects the mapped data, <br> passing on the data to PreviewWindow ViewModel, <br> hiding the MainWindow View in process
    MW ->>+ PW : Open PreviewWindow View
    PW ->>+ PWVM : Generate a collection of mapped data
    PWVM ->>+ Model : Validate & build data
    Model -->>- PWVM : Validated table
    PWVM -->>- PW : Binding the validated data to DataGrid
    PW -->>- User : Show PreviewWindow View, with final mapped data
    deactivate MW 

    User ->>+ PW : Click Apply
    PW ->>+ PWVM : Apply values
    PWVM ->>+ Model : Applying Revit Parameter values <br> in TransactionGroup
    Model -->>- PWVM : Success / Failure
    PWVM -->>- PW : Result

    alt Success
        PW -->> User : Show outcome & options
        PW -->> MW : Close / return to MainWindow View
    else Failure
        PW -->> User : Show error message
    end
    deactivate PW
```
_Image 16 - Parameter Mapper : Sequence Diagram_

The above diagram shows the sequence flow of Parameter Mapper tool, from start of user interaction to the end of lifecycle of tool.

---
## Pitfalls along the development

🪄 pyChai - Parameter Mapper 🪄

I am making it free.
Yes, you have heard it correct.
Tired of doing manual populating Revit parameters on Revit?  I had the same frustration for a long time.
Why "Chai"? Well, to avoid oozing out when doing data-entry tasks empty-minded.
### **Problem**
Tired of copy-pasting values from Excel file to Revit parameters? Recreating the same scripts on different projects? 

### **Features**
- Speed up the mundane tasks of manual applying Revit instance parameter values (string/numerical).
- Supports bulk updating instance parameters of multiple Revit elements from a spreadsheet file.
- Supports CSV / Excel / LibreOffice Calc, with live reload of spreadsheet file contents.
- Batch apply values on multiple Revit elements, supporting live reload of spreadsheet contents.
- Built-in data validation checks highlights the incorrect data-type (string/float/integer/boolean) pair, between Revit parameter and spreadsheet column contents.

The tool was built using IronPython 2.7 with WPF MVVM architecture. 

Click here to learn more about Parameter Mapper tool,  detailed journal documentation and Github repository link.