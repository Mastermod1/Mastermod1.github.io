export function getShowsListByKey(key){
    return fetch(`https://api.tvmaze.com/search/shows?q=${key}`)
    .then( response => response.json());
}