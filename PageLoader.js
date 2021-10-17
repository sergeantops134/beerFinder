import {SEARCH_RESULTS} from "./const.js";
import {scrollToFirst, getPropertyMarkup} from "./utils.js";


export class PageLoader {
    static currentQuery = "";
    static nextPage = 1;
    static isloadRuning = true;

    static loadPage() {
        const query = fetch(`https://api.punkapi.com/v2/beers?page=${this.nextPage++}&per_page=5&beer_name=${this.currentQuery}`);
        query.then((response) => {
            return response.json();
        })
            .then((newPage) => {
                this.listProperties(newPage);
            });
    }

    static reset() {
        this.currentQuery = "";
        this.nextPage = 1;
        this.isloadRuning = true;
        SEARCH_RESULTS.innerHTML = "";
    }

    static setQuery(query) {
        this.currentQuery = query;
    }

    static listProperties(newPage) {
        if (!(newPage.length)) {
            SEARCH_RESULTS.insertAdjacentHTML("beforeend", `<p class="error">There is no more valid properties</p>`);
            this.isloadRuning = false;
        } else {
            newPage.forEach((item) => {
                SEARCH_RESULTS.insertAdjacentHTML("beforeend", getPropertyMarkup(item));
            });
        }
        if (this.nextPage === 2) scrollToFirst();
    }
}