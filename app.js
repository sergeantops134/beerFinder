import {SEARCH_BUTTON, SEARCH_TEXT_INPUT, searches} from "./const.js";
import {search, validate} from "./utils.js";


SEARCH_TEXT_INPUT.addEventListener("input", validate);
SEARCH_TEXT_INPUT.addEventListener("keyup", function checkKey(event) {
    if (event.code === "Enter") search();
});
SEARCH_BUTTON.addEventListener("click", search);