/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cardEnhancement: () => (/* binding */ cardEnhancement)
/* harmony export */ });
/**
 * Card enhancement to trigger the main link whenever the card area is clicked
 * @see https://css-tricks.com/block-links-the-search-for-a-perfect-solution/
 */

var cardEnhancement = function () {
  var cardsArray = Array.prototype.slice.call(document.querySelectorAll('[data-component="card"]'));
  if (cardsArray) {
    // Loop through cards adding a click event and identifying the main link
    cardsArray.forEach(function (card) {
      var mainLink = card.querySelector('.card__link');
      var clickableElems = Array.prototype.slice.call(card.querySelectorAll('[data-click]'));

      // Allow other links/buttons in the card to still be "clickable"
      if (clickableElems) {
        clickableElems.forEach(function (elem) {
          return elem.addEventListener("click", function (event) {
            return event.stopPropagation();
          });
        });
      }
      card.addEventListener('click', function (event) {
        if (event.redispatched || event.target === mainLink) {
          return;
        }
        let noTextSelected = !window.getSelection().toString();
        if (noTextSelected) {
          const event2 = new MouseEvent("click", event);
          event2.redispatched = true;
          mainLink.dispatchEvent(event2);
        }
      });
    });
  }
};


/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collapsibles: () => (/* binding */ collapsibles)
/* harmony export */ });
/**
 * Collapsible panels
 * @see https://heydon.github.io/inclusive-components-demos/collapsible-sections/progressive.html
 * @see https://insidegovuk.blog.gov.uk/2021/10/29/how-we-made-the-gov-uk-accordion-component-more-accessible/
 */

var collapsibles = function () {
  // Get all the collapsible containers
  var collapseArray = Array.prototype.slice.call(document.querySelectorAll('[data-component="collapsibles"]'));
  if (collapseArray) {
    // Loop through containers
    collapseArray.forEach(function (item) {
      // Get headings inside a collapsible container
      var headingsArray = Array.prototype.slice.call(item.querySelectorAll('[data-heading="collapsibles"]'));

      // Loop through headings
      headingsArray.forEach(function (heading, index) {
        // Insert a button for opening/closing the collapsible section
        heading.innerHTML = '<button class="button--ghost" aria-expanded="false">' + '<span class="js-collapsible-heading">' + heading.innerHTML + '</span>' + '<span class="js-collapsible-toggle"><span class="visuallyhidden">, </span>' + '<span class="with-icon--before"><svg class="icon icon--24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.08 9.59 12 12.67 8.92 9.59 7.5 11l4.5 4.5 4.5-4.5-1.42-1.41z" class="circle-down"/><path d="m12 9-4.5 4.5 1.41 1.41L12 11.83l3.09 3.09 1.41-1.411z" class="circle-up"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg><span class="js-collapsible-label">Show</span><span class="visuallyhidden"> this section</span></span>' + '</span></button>';

        // Add appropriate aria role to the collapsible section
        heading.nextElementSibling.setAttribute('aria-hidden', 'true');

        // Assign the button
        var btn = heading.querySelector('button');
        var toggleText = btn.querySelector('.js-collapsible-label');

        // Add click event listener
        btn.addEventListener('click', function (event) {
          // Cast the state as a boolean
          var expanded = btn.getAttribute('aria-expanded') === 'true';

          // Switch the state
          btn.setAttribute('aria-expanded', !expanded);

          // Switch the collapsible section's visibility
          heading.nextElementSibling.setAttribute('aria-hidden', expanded);

          // Update the toggle text
          if (expanded == true) {
            toggleText.textContent = 'Show';
          } else {
            toggleText.textContent = 'Hide';
          }
        });
      }); // End loop
    }); // End loop
  } // End if statement
};


/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disclosureWidget: () => (/* binding */ disclosureWidget)
/* harmony export */ });
/* harmony import */ var _closest_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


/**
 * Simple disclosure widget
 * @see https://adrianroselli.com/2020/05/disclosure-widgets.html
 */

var disclosureWidget = function () {
  var toggleButtonArray = Array.prototype.slice.call(document.querySelectorAll('[data-toggle="true"]'));
  var closeDisclosures = function () {
    toggleButtonArray.forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  };
  if (toggleButtonArray) {
    toggleButtonArray.forEach(function (btn) {
      btn.removeAttribute('style');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('click', function (event) {
      if (event.target.matches('[data-toggle="true"]')) {
        var toggleTarget = event.target.nextElementSibling;
        if (event.target.matches('[aria-expanded="false"]')) {
          closeDisclosures();
          event.target.setAttribute('aria-expanded', 'true');
          toggleTarget.setAttribute('data-item-expanded', 'true');
        } else {
          event.target.setAttribute('aria-expanded', 'false');
          toggleTarget.removeAttribute('data-item-expanded');
        }
      } else if (event.target.closest('[data-item-expanded="true"]')) {
        // Do nothing - user is interacting with the expanded content
        return;
      } else {
        closeDisclosures();
      }
    });
    document.addEventListener('keyup', function (event) {
      if (event.defaultPrevented) {
        return;
      }
      let key = event.key || event.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        closeDisclosures();
      }
    });
  }
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/**
 * Element.closest polyfill for IE
 * Needed for disclosure widget
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
 */

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formErrorSummary: () => (/* binding */ formErrorSummary)
/* harmony export */ });
/**
 * Shift focus to form error summary, if present
 * @see https://design-system.service.gov.uk/components/error-summary/#how-it-works
 */
var formErrorSummary = function () {
  var errorSummary = document.querySelector('[data-component="error-summary"]');
  if (errorSummary) {
    errorSummary.focus();
  }
};


/***/ }),
/* 6 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navSingleLevel: () => (/* binding */ navSingleLevel)
/* harmony export */ });
/* harmony import */ var _object_assign_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/**
 * Object for creating single-level navigation menus
 * Manages button for toggling navigation on mobile
 * Uses event delegation to handle events for improved performance
 *
 * @param {Element} menu - the top level navigation <ul>
 * @param {Object} options - configuration options for the navigation
 * @param {number} [options.breakpoint=1024] - pixel value at which the button for toggling the mobile navigation is hidden. Is converted to em.
 * @param {string} [options.mobileIcon] - SVG icon used for the button to show/hide the navigation on mobile.
 */

const navSingleLevel = function (menu, options) {
  let container = menu.parentElement;
  let mobileToggle = document.querySelector('[data-trigger="mobile-nav"]');

  // Default settings
  let defaults = {
    breakpoint: 1024,
    mobileIcon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="icon icon--24" focusable="false" aria-hidden="true" fill="currentColor">' + '<path class="open" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>' + '<path class="close" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>' + "</svg>"
  };

  // Merge user options into defaults
  let settings = Object.assign({}, defaults, options);
  this.init = function () {
    mobileToggleSetup();
    document.addEventListener("click", clickHandler);
    document.addEventListener("keyup", closeOnEscKey);
  };
  function clickHandler(event) {
    console.log("Nav Single Level Click Handler Activated");
    // if (event.target.matches('[data-trigger="mobile-nav"]') == true) {
    // 	if (event.target.matches('[aria-expanded="true"]')) {
    // 		// event.target.setAttribute("aria-expanded", "false");
    // 	} else {
    // 		event.target.setAttribute("aria-expanded", "true");
    // 	}
    // }
  }
  function closeOnEscKey(event) {
    if (event.defaultPrevented) {
      return;
    }
    let key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      if (mobileToggle.style.display === "inline-flex") {
        // mobileToggle.setAttribute("aria-expanded", "false");
      }
    }
  }
  function mobileToggleSetup() {
    mobileToggle.innerHTML += settings.mobileIcon;
    // mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.style.display = "inline-flex";
    let mqValue = settings.breakpoint / 16;
    let mq = window.matchMedia("(min-width: " + mqValue + "em)");
    mq.addListener(WidthChange);
    WidthChange(mq);

    // Media query change
    function WidthChange(mq) {
      if (!mq.matches) {
        // mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.style.display = "inline-flex";
      } else {
        // mobileToggle.setAttribute("aria-expanded", "true");
        mobileToggle.style.display = "none";
      }
    }
  }
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/**
 * Object.assign() polyfill for IE
 * Needed for navigation
 * @see https://vanillajstoolkit.com/polyfills/objectassign/
 */
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_cards_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _main_collapsibles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _main_disclosure_widget_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _main_form_error_summary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _main_nav_single_level_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);





// import {navDoubleLevel} from "./main/nav-double-level.js";

function domLoadedActions() {
  (0,_main_cards_js__WEBPACK_IMPORTED_MODULE_0__.cardEnhancement)();
  (0,_main_collapsibles_js__WEBPACK_IMPORTED_MODULE_1__.collapsibles)();
  (0,_main_disclosure_widget_js__WEBPACK_IMPORTED_MODULE_2__.disclosureWidget)();
  (0,_main_form_error_summary_js__WEBPACK_IMPORTED_MODULE_3__.formErrorSummary)();

  /* Create a navSingleLevel object and initiate single-level navigation for a <ul> with the correct data-component attribute */
  const navExampleSingle = document.querySelector('[data-component="nav-single"]');
  if (navExampleSingle) {
    let siteNav = new _main_nav_single_level_js__WEBPACK_IMPORTED_MODULE_4__.navSingleLevel(navExampleSingle, {
      breakpoint: 768
    });
    siteNav.init();
  }

  /* Create a navDoubleLevel object and initiate double-level navigation */
  // const navExampleDoubleSimple = document.querySelector('[data-nav-example="dbl1"] [data-component="nav-double"]');

  // if (navExampleDoubleSimple) {
  // 	let siteNav = new navDoubleLevel(navExampleDoubleSimple, {
  // 		breakpoint: 768,
  // 	});
  // 	siteNav.init();
  // }

  // /* Create a navDoubleLevel object and initiate double-level navigation */
  // const navExampleDoubleBack = document.querySelector('[data-nav-example="dbl2"] [data-component="nav-double"]');

  // if (navExampleDoubleBack) {
  // 	let siteNav = new navDoubleLevel(navExampleDoubleBack, {
  // 		breakpoint: 768,
  // 		submenuDirection: 'horizontal',
  // 	});
  // 	siteNav.init();
  // }

  // /* Create a navDoubleLevel object and initiate double-level navigation with both links and buttons */
  // const navDoubleBoth = document.querySelector('[data-nav-example="dbl3"] [data-component="nav-double"]');

  // if (navDoubleBoth) {
  // 	let siteNav = new navDoubleLevel(navDoubleBoth, {
  // 		breakpoint: 768,
  // 		cloneTopLevelLink: false,
  // 		replaceTopLevelLinks: false
  // 	});
  // 	siteNav.init();
  // }

  // /* Create a navDoubleLevel object and initiate double-level navigation with intro text */
  // const navDoubleIntro = document.querySelector('[data-component="nav-double-intro"]');

  // if (navDoubleIntro) {
  // 	let siteNav = new navDoubleLevel(navDoubleIntro, {
  // 		breakpoint: 768,
  // 		cloneTopLevelLink: false,
  // 		submenuDirection: 'horizontal',
  // 		submenuIntro: true
  // 	});
  // 	siteNav.init();
  // }
}
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", domLoadedActions);
} else {
  // `DOMContentLoaded` has already fired
  domLoadedActions();
}
})();

/******/ })()
;