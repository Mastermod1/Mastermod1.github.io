export function createElement(type, className, innerText, src){
    let element = document.createElement(type);
    element.className = className;
    if(innerText)
        element.innerText = eraseHTMLstamps(innerText).slice(0,100);
    if(src)
        element.src = src;
    return element;
}
function eraseHTMLstamps(txt){
    const regEx = /<\/*p>|<\/*b>/g;
    let string = txt;
    let matches = txt.matchAll(regEx);
    for(const match of matches){
        string = string.replace(match[0],""); 
    }
    return string;
}