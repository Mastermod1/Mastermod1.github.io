
var plMnt = ["https://picsum.photos/450/300?random=1","https://picsum.photos/450/300?random=2","https://picsum.photos/450/300?random=3"];
var wrdMnt = ["https://picsum.photos/450/300?random=4","https://picsum.photos/450/300?random=5","https://picsum.photos/450/300?random=6"];
//Get photos from api and insert into arrays
var apiUrl = "https://picsum.photos/v2/list?limit=20";
async function getapi(url){
    const respone = await fetch(url);
    var data = await respone.json();
    let i = 0;
    while(i < 10){
        plMnt[i] = data[i].download_url;
        i++;
    }
    while(i<20){
        wrdMnt[i] = data[i].download_url;
        i++;
    }
}


class Slider{
    //Constructor
    constructor(sliderID,imagesList){
        this.sliderID = sliderID;
        this.imagesList = imagesList;
        this.i = 0;
        this.setSrc(); //Sets 1st photo from array
    }
    //Methods
    //Change photo, direction -/+ 1 = left/right
    change(direction)
    {   
        let slideNum = this.i;
        let images = this.imagesList;
        let slider = document.getElementById(this.sliderID);
        slideNum += direction;
        if(slideNum<0)
        {
            slideNum = images.length-1;
        }
        if(slideNum>images.length-1)
        {
            slideNum = 0;
        }
        slider.src = images[slideNum];
        this.i = slideNum;
    }
    setSrc(){
        let slider = document.getElementById(this.sliderID);
        let images = this.imagesList;
        slider.src = images[0];
    }
}
var sliderA = new Slider("slider1",plMnt);
var sliderB = new Slider("slider2",wrdMnt);

const cards = [
    {
        img: "https://picsum.photos/450/300?random=5",
        txt: "In iaculis ante tincidunt, mollis ipsum a, interdum orci. Donec volutpat nulla eget mauris dictum, vitae fringilla lectus tristique. Phasellus ut tempus elit. Vestibulum sollicitudin nibh nisi, eu pretium ex dictum quis. Quisque pharetra laoreet accumsan. Proin vehicula sodales tortor."
    },
    {
        img: "https://picsum.photos/450/300?random=2",
        txt: "Pellentesque a sodales augue. Duis pharetra aliquet massa sed volutpat. Morbi tincidunt erat sed massa hendrerit, id cursus neque scelerisque. Pellentesque in metus tincidunt, facilisis ipsum a, fermentum ipsum. Nunc viverra ullamcorper nibh vel vulputate. Nunc neque mi, tincidunt eget."
    },
    {
        img: "https://picsum.photos/450/300?random=3",
        txt: "Ut tristique dui non mauris commodo lacinia. Donec non arcu euismod, tristique elit eget, maximus eros. Cras quis nibh bibendum, viverra neque in, placerat nisi. Sed dui velit, tincidunt vitae tempor et, fermentum lacinia purus. Nam maximus venenatis enim, auctor consequat ante bibendum at. Aliquam orci lectus."
    },
]
const switchCard = document.getElementById("switchCard");
const cardHeader = switchCard.getElementsByClassName("header")[0];
const cardContent = switchCard.getElementsByClassName("content")[0];
const cardSelects = switchCard.getElementsByClassName("select")[0];
const cardImg = cardHeader.getElementsByTagName("img")[0];
const cardTxt = cardContent.getElementsByTagName("p")[0];
const cardselectIndicators = cardSelects.getElementsByTagName("span");
cardImg.src = cards[0].img;
cardTxt.innerHTML = cards[0].txt;
function changeCard(cardNum){
    for(let i = 0; i < 3; i++){
        if(cardselectIndicators[i].id == "choosen"){
            cardselectIndicators[i].id = "";
            break;
        }
    };
    cardselectIndicators[cardNum].id = "choosen";
    cardImg.src = cards[cardNum].img;
    cardTxt.innerHTML = cards[cardNum].txt;
}
