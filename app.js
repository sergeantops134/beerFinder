import {SEARCH_BUTTON, SEARCH_RESULTS, SEARCH_TEXT_INPUT, searches, UP_ARROW_BUTTON} from "./const.js";
import {checkArrowButton, scrollToFirst, search, validate} from "./utils.js";

window.addEventListener("scroll", checkArrowButton)
SEARCH_TEXT_INPUT.addEventListener("input", validate);
SEARCH_TEXT_INPUT.addEventListener("keyup", function checkKey(event) {
    if (event.code === "Enter") search();
});
SEARCH_BUTTON.addEventListener("click", search);

UP_ARROW_BUTTON.addEventListener("click", scrollToFirst);