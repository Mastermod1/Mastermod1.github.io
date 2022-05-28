export function buildTag(tagName, className, innerText, src, isDetail){
    let tag = document.createElement(tagName);
    tag.classList = className;

    if(innerText) {
        if(tagName !== "button" && !isDetail)
            tag.innerText = removeHTMLTags(innerText).slice(0,80) + "...";
        else
            tag.innerText = removeHTMLTags(innerText);
    }
    
    if(src) tag.src = src;
    
    return tag;
}

export function buildVDOM(keyType, keysList){
    let obj = {}
    for(const key of keysList){
        obj[key] = getElement(keyType, key);
    }
    return obj;
}

function getElement(keyType, key){
    return document.querySelector(`[${keyType} = "${key}"]`);
}
function removeHTMLTags(text){
    const regEx = /<\/*p>|<\/*b>|<\/*i>/g;
    let matches = text.matchAll(regEx);
    for(const match of matches)
        text = text.replace(match[0],"");
    return text;
}