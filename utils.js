import {
    SEARCH_RESULTS,
    SEARCH_TEXT_INPUT,
    SEARCHES_HOLDER,
    UP_ARROW_BUTTON,
    VERTICAL_OFFSET
} from "./const.js";


export function validate(event) {
    event.target.value = event.target.value.replace(/[^a-z]/i, '');
}

export function search() {
    searches.addSearch(SEARCH_TEXT_INPUT.value);
    pageLoader.reset();
    pageLoader.setQuery(SEARCH_TEXT_INPUT.value.replace(" ", "_"));
    pageLoader.loadPage();
    SEARCH_TEXT_INPUT.value = "";
}

function getPropertyMarkup(prop) {
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
        pageLoader.loadPage();
    }
}

function isNewPageReady() {
    return pageLoader.isloadRuning && pageLoader.nextPage !== 1 && SEARCH_RESULTS.getBoundingClientRect().bottom < window.innerHeight;
}




export const searches = {
    story: [],
    addSearch(search) {
        if (this.story.includes(search)) return;
        this.story.push(search);
        SEARCHES_HOLDER.insertAdjacentHTML("afterbegin", `<p>${search}</p>`);
    },
}

export const pageLoader = {
    currentQuery: "",
    nextPage: 1,
    isloadRuning: true,

    loadPage() {
        const query = fetch(`https://api.punkapi.com/v2/beers?page=${this.nextPage++}&per_page=5&beer_name=${this.currentQuery}`);
        query.then((response) => {
            return response.json();
            })
            .then((newPage) => {
                this.listProperties(newPage);
            });
    },

    reset() {
        this.currentQuery = "";
        this.nextPage = 1;
        this.isloadRuning = true;
        SEARCH_RESULTS.innerHTML = "";
    },

    setQuery(query){
        this.currentQuery = query;
    },

    listProperties(newPage){
        if (!(newPage.length)) {
            SEARCH_RESULTS.insertAdjacentHTML("beforeend", `<p class="error">There is no more valid properties</p>`);
            this.isloadRuning = false;
        } else {
            newPage.forEach((item) => {
                SEARCH_RESULTS.insertAdjacentHTML("beforeend", getPropertyMarkup(item));
            });
        }
        if (this.nextPage === 2) scrollToFirst();
    },
}