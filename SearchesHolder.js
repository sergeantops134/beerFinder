import {SEARCHES_HOLDER} from "./const.js";


export class SearchesHolder {
    static story = [];

    static addSearch(search) {
        if (this.story.includes(search)) return;
        this.story.push(search);
        SEARCHES_HOLDER.insertAdjacentHTML("afterbegin", `<p>${search}</p>`);
    }
}