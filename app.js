import {SEARCH_BUTTON, SEARCH_TEXT_INPUT, UP_ARROW_BUTTON} from "./const.js";
import {scrollHandler, scrollToFirst, search, validate} from "./utils.js";

window.addEventListener("scroll", scrollHandler);

SEARCH_TEXT_INPUT.addEventListener("input", validate);

SEARCH_TEXT_INPUT.addEventListener("keyup", function checkKey(event) {
    if (event.code !== "Enter") return;
    search();
});

SEARCH_BUTTON.addEventListener("click", search);

UP_ARROW_BUTTON.addEventListener("click", scrollToFirst);