import {
    FAVOURITES, FAVOURITES_BUTTON, FAVOURITES_STORAGE,
    SEARCH_RESULTS,
    SEARCH_TEXT_INPUT,
    UP_ARROW_BUTTON,
    VERTICAL_OFFSET
} from "./const.js";
import {PageLoader} from "./PageLoader.js"
import {SearchesHolder} from "./SearchesHolder.js"
import {Modal} from "./Modal.js";


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
        <h2 class="title-button" id="${prop.id}">${prop.name}</h2>
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
    return PageLoader.isloadRuning && PageLoader.nextPage !== 1 && SEARCH_RESULTS.getBoundingClientRect().bottom < window.innerHeight + 50;
}

export function favouritesHandler(event) {
    if (event.target.classList.contains("title-button")) {
        Modal.showSingleModal(event);
        return;
    }

    if (!(event.target.classList.contains("addRemoveBtn"))) return;

    const currentBeer = document.querySelector(`#beer${event.target.value}`);

    if (currentBeer.classList.contains("favourite")) {
        currentBeer.classList.remove("favourite");
        event.target.textContent = "Add";
        FAVOURITES.delete(event.target.value.toString());

        refreshFavouritesButton();
        saveFavourites();
        return;
    }

    currentBeer.classList.add("favourite");
    event.target.textContent = "Remove";
    FAVOURITES.add(event.target.value.toString());

    refreshFavouritesButton();
    saveFavourites();
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

export function refreshFavouritesClasses() {
    const displayedProps = SEARCH_RESULTS.querySelectorAll(".prop");
    const displayedButtons = SEARCH_RESULTS.querySelectorAll(".addRemoveBtn");


    displayedProps.forEach((prop, index) => {
        const id = getPropId(prop.id)

        if (FAVOURITES.has(id)) {
            prop.classList.add("favourite");
            displayedButtons[index].textContent = "Remove";
            return;
        }

        prop.classList.remove("favourite");
        displayedButtons[index].textContent = "Add";
    });
}

function getPropId(strId) {
    return strId.substr(strId.length - 2);
}

export function loadFavourites() {
    const loadedFavourites = FAVOURITES_STORAGE.getItem("favourites");

    if (!(loadedFavourites)) return;

    loadedFavourites.split(",").forEach((favourite) => {
        FAVOURITES.add(favourite);
    });
}

export function saveFavourites() {
    const formattedFavourites = Array.from(FAVOURITES).join(",");
    FAVOURITES_STORAGE.setItem("favourites", formattedFavourites);
}