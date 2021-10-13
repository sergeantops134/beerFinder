import {SEARCH_RESULTS, SEARCH_TEXT_INPUT, searches} from "./const.js";

export function validate(event) {
    event.target.value = event.target.value.replace(/[^a-z]/i, '');
}

export function search(){
    searches.addSearch(SEARCH_TEXT_INPUT.value);
    const query = fetch(`https://api.punkapi.com/v2/beers?beer_name=${SEARCH_TEXT_INPUT.value.replace(" ", "_")}`);
    query.then( (response) => {
    return response.json();
    })
        .then( (data) => {
            listProperties(data);
        });

    SEARCH_TEXT_INPUT.value = "";
}

function listProperties(searchResult){
        SEARCH_RESULTS.innerHTML = "";
        if (!(searchResult.length)) {
            SEARCH_RESULTS.insertAdjacentHTML("afterbegin", `<p class="error">There were no properties found for
the given location.</p>`);
        }
        searchResult.forEach( (item) => {
            SEARCH_RESULTS.insertAdjacentHTML("beforeend", getPropertyMarkup(item));
        });
        scroll({top: SEARCH_RESULTS.getBoundingClientRect().top + pageYOffset, left: 0, behavior: "smooth"});
}

function getPropertyMarkup(prop){
    return `
        <div class="prop">
        <h2>${prop.name}</h2>
        <p>${prop.description}</p>
        <img src="${prop.image_url}">
        </div>
    `;
}