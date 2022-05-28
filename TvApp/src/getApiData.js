export function getShowsListByKey(key){
    return fetch(`https://api.tvmaze.com/search/shows?q=${key}`)
    .then( response => response.json());
}
export function getShowByKey(key){
    return fetch(`https://api.tvmaze.com/singlesearch/shows?q=${key}`)
    .then( response => response.json());
}