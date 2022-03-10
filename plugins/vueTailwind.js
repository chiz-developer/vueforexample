import Vue from "vue";
import VueTailwind from "vue-tailwind";
import {
  TToggle,
  TRichSelect,
  TTable,
  TDialog,
} from "vue-tailwind/dist/components";

const settings = {
  "t-toggle": {
    component: TToggle,
    props: {
      fixedClasses: {
        wrapper:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200",
        wrapperChecked:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200  border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
        wrapperDisabled:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed",
        wrapperCheckedDisabled:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
        button:
          "inline-block absolute transform translate-x-0 transition ease-in-out duration-200",
        buttonChecked:
          "inline-block absolute transform translate-x-full transition ease-in-out duration-200",
        checkedPlaceholder: "inline-block",
        uncheckedPlaceholder: "inline-block",
      },
      classes: {
        wrapper:
          "bg-gray-100 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
        wrapperChecked: "bg-black rounded-full",
        wrapperDisabled:
          "bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
        wrapperCheckedDisabled: "bg-blue-500",
        button:
          "h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs",
        buttonChecked:
          "h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs",
        checkedPlaceholder:
          "rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs",
        uncheckedPlaceholder:
          "rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs",
      },
      variants: {
        danger: {
          wrapperChecked: "bg-red-500 rounded-full",
          wrapperCheckedDisabled: "bg-red-500 rounded-full",
        },
        success: {
          wrapperChecked: "bg-green-500 rounded-full",
          wrapperCheckedDisabled: "bg-green-500 rounded-full",
        },
        box: {
          wrapper:
            "bg-gray-100 rounded-sm border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
          wrapperChecked: "bg-blue-500 rounded-sm",
          wrapperCheckedDisabled: "bg-blue-500 rounded-sm",
          button:
            "h-6 w-6 rounded-sm bg-white shadow flex items-center justify-center text-gray-400 text-xs",
          buttonChecked:
            "h-6 w-6 rounded-sm  bg-white shadow flex items-center justify-center text-blue-500 text-xs",
          checkedPlaceholder:
            "rounded-sm w-6 h-6 flex items-center justify-center text-gray-400 text-xs",
          uncheckedPlaceholder:
            "rounded-sm w-6 h-6 flex items-center justify-center text-gray-400 text-xs",
        },
      },
    },
  },

  "t-rich-select": {
    component: TRichSelect,
    props: {
      fixedClasses: {
        wrapper: "relative mt-1",
        buttonWrapper: "inline-block relative w-full",
        selectButton:
          "w-full flex text-left justify-between items-center  py-[0.688rem] text-black transition duration-100 ease-in-out border-b border-gray-50 border-solid   focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
        selectButtonLabel: "block truncate",
        selectButtonPlaceholder: "block truncate",
        selectButtonIcon: "fill-current flex-shrink-0 ml-1 h-4 w-4",
        selectButtonClearButton:
          "rounded flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6 transition duration-100 ease-in-out",
        selectButtonClearIcon: "fill-current h-3 w-3",
        selectButtonTagWrapper: 'flex flex-wrap overflow-hidden',
        selectButtonTag: 'bg-primary block disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full overflow-hidden h-8 flex items-center',
        selectButtonTagText: 'px-3',
        selectButtonTagDeleteButton: '-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition',
        selectButtonTagDeleteButtonIcon: 'w-3 h-3',
        dropdown:
          "absolute w-full z-10 -mt-1 absolute border-b border-l border-r rounded-b shadow-sm z-10",
        dropdownFeedback: "",
        loadingMoreResults: "",
        optionsList: "overflow-auto",
        searchWrapper: "inline-block w-full",
        searchBox: "inline-block w-full",
        optgroup: "",
        option: "cursor-pointer",
        disabledOption: "opacity-50 cursor-not-allowed",
        highlightedOption: "cursor-pointer",
        selectedOption: "cursor-pointer",
        selectedHighlightedOption: "cursor-pointer",
        optionContent: "",
        optionLabel: "truncate block",
        selectedIcon: "fill-current h-4 w-4",
        enterClass: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveClass: "",
        leaveActiveClass: "",
        leaveToClass: "",
      },
      classes: {
        wrapper: "",
        buttonWrapper: "",
        selectButton: "bg-white ",
        selectButtonLabel: "",
        selectButtonPlaceholder: "text-gray-400",
        selectButtonIcon: "text-gray-600",
        selectButtonClearButton: "hover:bg-primary text-gray-600",
        selectButtonClearIcon: "",
        dropdown: "bg-white border-gray-300",
        dropdownFeedback: "pb-2 px-3 text-gray-400 text-sm",
        loadingMoreResults: "pb-2 px-3 text-gray-400 text-sm",
        optionsList: "",
        searchWrapper: "p-2 placeholder-gray-400",
        searchBox:
          "px-3 py-2 bg-[#d6edf6] text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300",
        optgroup: "text-gray-400 uppercase text-xs py-1 px-2 font-semibold",
        option: "",
        disabledOption: "",
        highlightedOption: "bg-gray-200",
        selectedOption: "font-semibold bg-gray-400 font-semibold text-white",
        selectedHighlightedOption:
          "font-semibold  bg-primary font-semibold text-white",
        optionContent: "flex justify-between items-center px-3 py-2",
        optionLabel: "",
        selectedIcon: "",
        enterClass: "opacity-0",
        enterActiveClass: "transition ease-out duration-100",
        enterToClass: "opacity-100",
        leaveClass: "opacity-100",
        leaveActiveClass: "transition ease-in duration-75",
        leaveToClass: "opacity-0",
        
      },
      variants: {
        danger: {
          selectButton: "border-red-300 bg-red-50 text-red-900",
          selectButtonPlaceholder: "text-red-200",
          selectButtonIcon: "text-red-500",
          selectButtonClearButton: "hover:bg-red-200 text-red-500",
          dropdown: "bg-red-50 border-red-300",
        },
        success: {
          selectButton: "border-green-300 bg-green-50 text-green-900",
          selectButtonIcon: "text-green-500",
          selectButtonClearButton: "hover:bg-green-200 text-green-500",
          dropdown: "bg-green-50 border-green-300",
        },
      },
    },
  },

  "t-table": {
    component: TTable,
    props: {
      classes: {
        table:
          "min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border",
        thead: "",
        theadTr: "",
        theadTh: "px-3 py-2 font-semibold text-left bg-gray-100 border-b",
        tbody: "bg-white divide-y divide-gray-100",
        tr: "",
        td: "px-3 py-2 whitespace-no-wrap",
        tfoot: "",
        tfootTr: "",
        tfootTd: "",
      },
      variants: {
        thin: {
          td: "p-1 whitespace-no-wrap text-sm",
          theadTh: "p-1 font-semibold text-left bg-gray-100 border-b text-sm",
        },
      },
    },
  },

  "t-dialog": {
    component: TDialog,
    props: {
      classes: {
        close:
          "bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
        closeIcon: "fill-current h-4 w-4",

        overlay: "z-40 bg-black bg-opacity-50",
        wrapper: "z-50 max-w-lg px-3 py-12",
        dialog: "bg-white shadow rounded text-left",

        body: "p-3 space-y-3",
        buttons: "p-3 flex space-x-4 justify-center bg-gray-100 rounded-b",

        iconWrapper:
          "bg-gray-100 flex flex-shrink-0 h-12 items-center justify-center rounded-full w-12 mx-auto",
        icon: "w-6 h-6 text-gray-500",
        content: "w-full flex justify-center flex-col",

        titleWrapper: "",
        title: "text-lg font-semibold text-center",

        textWrapper: "text-left w-full mt-4",
        text: "",

        cancelButton:
          "block px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs",
        okButton:
          "btn primary block px-4 py-2 text-white transition duration-100 ease-in-out bg-primary-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs",

        inputWrapper: "mt-3 flex items-center space-x-3",

        input:
          "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full",
        select:
          "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed w-full",

        radioWrapper: "flex items-center space-x-2",
        radio:
          "text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed",
        radioText: "",

        checkboxWrapper: "flex items-center space-x-2",
        checkbox:
          "text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed",
        checkboxText: "",

        errorMessage: "text-red-500 block text-sm",

        busyWrapper:
          "absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full",
        busyIcon: "animate-spin h-6 w-6 fill-current text-gray-500",

        overlayEnterClass: "opacity-0",
        overlayEnterActiveClass: "transition ease-out duration-100",
        overlayEnterToClass: "opacity-100",
        overlayLeaveClass: "opacity-100",
        overlayLeaveActiveClass: "transition ease-in duration-75",
        overlayLeaveToClass: "opacity-0",

        enterClass: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveClass: "",
        leaveActiveClass: "",
        leaveToClass: "",
      },
    },
  },

  //===
};

Vue.use(VueTailwind, settings);
