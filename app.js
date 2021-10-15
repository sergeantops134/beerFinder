import {SEARCH_BUTTON, SEARCH_RESULTS, SEARCH_TEXT_INPUT, SEARCHES_HOLDER, UP_ARROW_BUTTON} from "./const.js";
import {scrollHandler, scrollToFirst, search, validate} from "./utils.js";

window.addEventListener("scroll", scrollHandler);

SEARCH_TEXT_INPUT.addEventListener("input", validate);

SEARCH_TEXT_INPUT.addEventListener("keyup", function checkKey(event) {
    if (event.code !== "Enter") return;
    search();
});

SEARCH_BUTTON.addEventListener("click", search);

UP_ARROW_BUTTON.addEventListener("click", scrollToFirst);

SEARCHES_HOLDER.addEventListener("click", function doRecentSearch(event){
    SEARCH_TEXT_INPUT.value = event.target.textContent;
    search();
});