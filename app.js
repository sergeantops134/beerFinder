import {
    CLOSE_MODAL_BUTTON,
    FAVOURITES_BUTTON, MODAL_CONTENT,
    SEARCH_BUTTON,
    SEARCH_RESULTS,
    SEARCH_TEXT_INPUT,
    SEARCHES_HOLDER,
    UP_ARROW_BUTTON
} from "./const.js";
import {favouritesHandler, scrollHandler, scrollToFirst, search, validate} from "./utils.js";
import {Modal} from "./Modal.js";

window.addEventListener("scroll", scrollHandler);

SEARCH_TEXT_INPUT.addEventListener("input", validate);

SEARCH_TEXT_INPUT.addEventListener("keyup", function checkKey(event) {
    if (event.code !== "Enter") return;
    search();
});

SEARCH_BUTTON.addEventListener("click", search);

UP_ARROW_BUTTON.addEventListener("click", scrollToFirst);

SEARCHES_HOLDER.addEventListener("click", function doRecentSearch(event) {
    SEARCH_TEXT_INPUT.value = event.target.textContent;
    search();
});

SEARCH_RESULTS.addEventListener("click", favouritesHandler);

FAVOURITES_BUTTON.addEventListener("click", function showModal() {
    Modal.showModal();
});

CLOSE_MODAL_BUTTON.addEventListener("click", function hideModal() {
    Modal.hideModal();
});

MODAL_CONTENT.addEventListener("click", function removeFavourite(event) {
    if (!(event.target.classList.contains("addRemoveBtn"))) return;
    Modal.removeFavourite(event.target.value);
});