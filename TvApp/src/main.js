import { getData } from "./getApiData.js";
import { createElement } from "./domFunctions.js";

class App{
    constructor(){
        this.elemList = {};
        this.key = "Disney";
        this.initialize();
        this.section = document.getElementById("selectSection");
    }
    initialize(){
       this.fetchAndDisplay();
    }
    createCard(showData){
        let card = createElement("div", "card");
        let img = createElement("img", "card-img-top", null, showData.image.medium);
        let cardBody = createElement("div", "card-body");
        let h5 = createElement("h5", "card-title", showData.name);
        let p = createElement("p", "card-text", showData.summary);
        let btn = createElement("btn", "btn btn-primary", "Show details");

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(btn);

        return card;
    }
    renderCards(shows){
        for(const { show } of shows){
            let card = this.createCard(show);
            this.section.appendChild(card);
        }
    }
    fetchAndDisplay(){
        getData(this.key).then(data => {
            this.renderCards(data);
        });
    }
}

document.addEventListener("load",new App());