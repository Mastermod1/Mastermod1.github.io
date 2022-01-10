
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