import { getShowsListByKey, getShowByKey } from "./getApiData.js";
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
            this.domElements.cardsSection.appendChild(this.templateCardBuilder(show));
    }

    renderDetails(obj){
        this.domElements.details.innerHTML = "";
        this.domElements.details.classList.toggle("d-none");
        getShowByKey(event.target.dataset.showName)
        .then(data => obj.appendChild(this.templateCardBuilder(data, true)));
    }

    close(element){
        element.innerHTML = "";
        element.classList.toggle("d-none");
    }

    templateCardBuilder(show, isDetail){
        let cardBody = buildTag("div", "card-body");
        let h5 = buildTag("h5", "card-title", show.name);
        let card, p, btn, img;

        if(isDetail){
            card = buildTag("div","card");
            p = buildTag("p", "card-text", show.summary, null, true);
            btn = buildTag("button", "btn btn-primary", "Close");
            btn.addEventListener("click",() => this.close(this.domElements.details));
        } else {
            card = buildTag("div", "card card-small");
            p = buildTag("p", "card-text", show.summary);
            btn = buildTag("button", "btn btn-primary", "Details");
            btn.addEventListener("click",() => this.renderDetails(this.domElements.details));
        }

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

        return card;
    }
}
document.addEventListener("DOMContentLoaded",new App());
