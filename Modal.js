import {FAVOURITES, MODAL_CONTENT, SEARCH_RESULTS} from "./const.js";
import {refreshFavouritesButton} from "./utils.js";

export class Modal {
    static modal = document.querySelector(".modal");

    static hideModal() {
        this.modal.classList.add("hidden");
        document.body.classList.remove("no-scroll");
        refreshFavouritesButton();
    }

     static showModal() {
        SEARCH_RESULTS.innerHTML = "";
        document.body.classList.add("no-scroll");
         this.modal.classList.remove("hidden");
         this.getFavourites();
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

     static listFavourites(favouritesPage) {
        MODAL_CONTENT.innerHTML = "";
         favouritesPage.forEach((item) => {
             MODAL_CONTENT.insertAdjacentHTML("beforeend", this.getFavouriteMarkup(item));
         });
     }

     static getFavouriteMarkup(favourite) {
         return `
                <div class="prop" id="fav${favourite.id.toString()}">
                    <h2>${favourite.name}</h2>
                    <button class="addRemoveBtn" value="${favourite.id}">Remove</button>
                    <p>${favourite.description}</p>
                    <img src="${favourite.image_url}" alt="">
                </div>
                `;
     }

     static removeFavourite(id){
        FAVOURITES.delete(id.toString());

        const favouriteToDelete = document.querySelector(`#fav${id}`);
        favouriteToDelete.classList.add("hidden");
     }

     static getFormattedIds() {
         return Array.from(FAVOURITES.values()).join("|");
     }
}