import {SEARCHES_HOLDER, SEARCHES_STORAGE} from "./const.js";


export class SearchesHolder {
    static story;

    static addSearch(search) {
        if (this.story.includes(search)) return;
        this.story.push(search);
        SEARCHES_HOLDER.insertAdjacentHTML("afterbegin", `<p>${search}</p>`);
        this.saveStory();
    }

    static loadStory() {
        const loadedStory = SEARCHES_STORAGE.getItem("searches");
        this.story = loadedStory ? loadedStory.split(",") : [];
        this.story.forEach((search) => {
            SEARCHES_HOLDER.insertAdjacentHTML("afterbegin", `<p>${search}</p>`);
        });
    }

    static saveStory() {
        SEARCHES_STORAGE.setItem("searches", this.story.join(","));
    }
}