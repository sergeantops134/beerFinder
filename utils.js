import {
    FAVOURITES, FAVOURITES_BUTTON,
    SEARCH_RESULTS,
    SEARCH_TEXT_INPUT,
    UP_ARROW_BUTTON,
    VERTICAL_OFFSET
} from "./const.js";
import {PageLoader} from "./PageLoader.js"
import {SearchesHolder} from "./SearchesHolder.js"


export function validate(event) {
    event.target.value = event.target.value.replace(/[^a-z]/i, '');
}

export function search() {
    SearchesHolder.addSearch(SEARCH_TEXT_INPUT.value);
    PageLoader.reset();
    PageLoader.setQuery(SEARCH_TEXT_INPUT.value.replace(" ", "_"));
    PageLoader.loadPage();
}

export function getPropertyMarkup(prop) {
    return `
        <div class="prop ${FAVOURITES.has(prop.id.toString()) ? " favourite" : ""}" id="beer${prop.id.toString()}">
        <h2>${prop.name}</h2>
        <button class="addRemoveBtn" value="${prop.id}">${FAVOURITES.has(prop.id.toString()) ? "Remove" : "Add"}</button>
        <p>${prop.description}</p>
        <img src="${prop.image_url}" alt="">
        </div>
    `;
}

export function scrollToFirst() {
    scroll({top: SEARCH_RESULTS.getBoundingClientRect().top + pageYOffset, left: 0, behavior: "smooth"});
}

export function scrollHandler() {
    if (SEARCH_RESULTS.getBoundingClientRect().top < VERTICAL_OFFSET) {
        UP_ARROW_BUTTON.classList.remove("hidden");
    } else {
        UP_ARROW_BUTTON.classList.add("hidden");
    }
    if (isNewPageReady()) {
        PageLoader.loadPage();
    }
}

function isNewPageReady() {
    return PageLoader.isloadRuning && PageLoader.nextPage !== 1 && SEARCH_RESULTS.getBoundingClientRect().bottom < window.innerHeight;
}

export function favouritesHandler(event){
    if (!(event.target.classList.contains("addRemoveBtn"))) return;

    const currentBeer = document.querySelector(`#beer${event.target.value}`);

    if (currentBeer.classList.contains("favourite")) {
        currentBeer.classList.remove("favourite");
        event.target.textContent = "Add";
        FAVOURITES.delete(event.target.value.toString());

        refreshFavouritesButton();
        return;
    }

    currentBeer.classList.add("favourite");
    event.target.textContent = "Remove";
    FAVOURITES.add(event.target.value.toString());

    refreshFavouritesButton();
}

export function refreshFavouritesButton() {
    const isFavouritesEmpty = !(FAVOURITES.size);

    if (isFavouritesEmpty) {
        FAVOURITES_BUTTON.setAttribute("disabled", "true");
        FAVOURITES_BUTTON.textContent = "Favourites(0)";
        return;
    }

    FAVOURITES_BUTTON.removeAttribute("disabled");
    FAVOURITES_BUTTON.textContent = `Favourites(${FAVOURITES.size})`;
}