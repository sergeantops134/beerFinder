
export const SEARCH_BUTTON = document.querySelector("#searchBtn");
export const SEARCH_TEXT_INPUT = document.querySelector("#searchText");
export const SEARCHES_HOLDER = document.querySelector(".searches");
export const SEARCH_RESULTS = document.querySelector(".results");

export const searches = {
    story: [],
    addSearch(search) {
        if (this.story.includes(search)) return;
        this.story.push(search);
        SEARCHES_HOLDER.insertAdjacentHTML("afterbegin", `<p>${search}</p>`);
    },
}