var plMnt = ["images/gora1.jpg","images/gora2.jpg","images/gora3.jpg"];
var wrdMnt = ["images/gora1.jpg","images/gora2.jpg","images/gora3.jpg"];
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