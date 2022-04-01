import * as api from './api.js'


export  const login = api.login;
export  const register = api.register;
export  const logout = api.logout;

export async function getAllAlbums(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}


export async function getAlbumById(id){
    return api.get('/data/albums/' + id);
}
export async function createAlbum(name, imgUrl,price, releaseDate, artist, genre, description){
    const data = {name, imgUrl, price, releaseDate, artist, genre, description};
    return api.post('/data/albums',data);
}
        
export async function deleteById(id){
    return api.del('/data/albums/' + id);
}

export async function editAlbum(id, album){
    return api.put('/data/albums/' + id, album);
}