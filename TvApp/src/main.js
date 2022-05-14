import { getShowsListByKey, } from "./getApiData.js";
import { buildTag, buildVDOM, } from "./domFunctions.js";

class App{
    constructor(){
        this.domElements = {};
        this.key = "Disney";
        this.initialize();
    }
    
    initialize(){
        this.initDOMElements();
        this.fetchAndDisplay();
        this.setUpEvents();
    }

    changeSearchPhrase(obj){
       event.preventDefault();
       if(obj.domElements.searchBox.value){
            this.key = obj.domElements.searchBox.value;
            obj.domElements.searchBox.value = "";
            this.fetchAndDisplay();
       }
    }

    setUpEvents(){
        this.domElements.searchSubmit.addEventListener("click", () => this.changeSearchPhrase(this));
    }

    initDOMElements(){
        let idList = Array.from(document.querySelectorAll("[id]")).map(item => item.id);
        this.domElements = buildVDOM("id", idList);
    }

    fetchAndDisplay(){
        this.domElements.cardsSection.innerHTML = "";
        getShowsListByKey(this.key).then(shows => this.renderCards(shows));
    }

    renderCards(shows){
        for( const { show } of shows  )
            this.templateCardBuilder(show);
    }

    templateCardBuilder(show){
        let card = buildTag("div", "card");
        let cardBody = buildTag("div", "card-body");
        let h5 = buildTag("h5", "card-title", show.name);
        let p = buildTag("p", "card-text", show.summary);
        let btn = buildTag("button", "btn btn-primary", "Details");
        let img;

        if(show.image){
            img = buildTag("img", "card-img-top", null, show.image.medium);
        } else {
            img = buildTag("img", "card-img-top", null, "https://via.assets.so/img.jpg?w=210&h=295&tc=black&bg=%23cecece&t=NO IMG");
        }
        
            
        btn.dataset.showName = show.name;

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(btn);

        this.domElements.cardsSection.appendChild(card);
    }
}
document.addEventListener("DOMContentLoaded",new App());