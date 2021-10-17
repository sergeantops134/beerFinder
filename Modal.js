import {FAVOURITES, MODAL_CONTENT, SEARCH_RESULTS} from "./const.js";
import {refreshFavouritesButton, refreshFavouritesClasses, saveFavourites} from "./utils.js";

export class Modal {
    static modal = document.querySelector(".modal");

    static hideModal() {
        this.modal.classList.add("hidden");
        document.body.classList.remove("no-scroll");
        refreshFavouritesButton();
        refreshFavouritesClasses();
        saveFavourites();
    }

     static showModal() {
        document.body.classList.add("no-scroll");
         this.modal.classList.remove("hidden");
         this.getFavourites();
     }

     static showSingleModal(event) {
         document.body.classList.add("no-scroll");
         this.modal.classList.remove("hidden");
         this.getSingle(event.target.id);
     }

     static getFavourites() {
         const query = fetch(`https://api.punkapi.com/v2/beers?ids=${this.getFormattedIds()}`);
         query.then((response) => {
             return response.json();
         })
             .then((favouritesPage) => {
                 this.listFavourites(favouritesPage);
             });
     }

     static getSingle(id) {
         const query = fetch(`https://api.punkapi.com/v2/beers?ids=${id}`);
         query.then((response) => {
             return response.json();
         })
             .then((single) => {
                 MODAL_CONTENT.innerHTML = "";
                 MODAL_CONTENT.insertAdjacentHTML("beforeend", this.getFavouriteMarkup(single[0], true));
             });
     }

     static listFavourites(favouritesPage) {
        MODAL_CONTENT.innerHTML = "";
         favouritesPage.forEach((item) => {
             MODAL_CONTENT.insertAdjacentHTML("beforeend", this.getFavouriteMarkup(item));
         });
     }

     static getFavouriteMarkup(favourite, isSingle) {
         return `
                <div class="prop" id="fav${favourite.id.toString()}">
                    <h2>${favourite.name}</h2>
                    <button class="${isSingle ? "addRemoveBtn" : "removeBtn"}" value="${favourite.id}">${FAVOURITES.has(favourite.id.toString()) ? "Remove" : "Add"}</button>
                    <p>${favourite.description}</p>
                    <img src="${favourite.image_url}" alt="">
                </div>
                `;
     }

     static removeFavourite(id) {
        FAVOURITES.delete(id.toString());

        const favouriteToDelete = document.querySelector(`#fav${id}`);
        favouriteToDelete.classList.add("hidden");
     }

     static toggleSingle(button) {
        const singleId = button.value.toString();

        if (FAVOURITES.has(singleId)) {
            FAVOURITES.delete(singleId);
            button.textContent = "Add";
            return;
        }

        FAVOURITES.add(singleId);
         button.textContent = "Remove";
     }

     static getFormattedIds() {
         return Array.from(FAVOURITES.values()).join("|");
     }
}