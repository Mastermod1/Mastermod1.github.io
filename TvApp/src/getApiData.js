export function getData(key){
    let query = `https://api.tvmaze.com/search/shows?q=${key}`;
    return fetch(query).then( response => response.json());
}