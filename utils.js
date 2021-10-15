import {
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
        <div class="prop">
        <h2>${prop.name}</h2>
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


