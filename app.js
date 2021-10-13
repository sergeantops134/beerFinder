import {SEARCH_BUTTON, SEARCH_TEXT_INPUT, searches} from "./const.js";


SEARCH_BUTTON.addEventListener("click", function search(){
    searches.addSearch(SEARCH_TEXT_INPUT.value);
    SEARCH_TEXT_INPUT.value = "";
});