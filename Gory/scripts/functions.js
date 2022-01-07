var apiUrl = "https://picsum.photos/v2/list";
var plMnt = new Array(10);
var wrdMnt = new Array(10);
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
getapi(apiUrl);


class Slider{
    //Constructor
    constructor(sliderID,imagesList){
        this.sliderID = sliderID;
        this.imagesList = imagesList;
        this.i = 0;
    }
    //Method
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
}
var sliderA = new Slider("slider1",plMnt);
var sliderB = new Slider("slider2",wrdMnt);