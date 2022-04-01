import {html} from '../lib.js'
import {getAllAlbums} from '../api/data.js'
import { getUserData } from '../util.js';

const catalogTemplate = (detailsBtn, userData, allAlbums, createAlbum) => html` <section id="catalogPage">
<h1>All Albums</h1>

${allAlbums.length == 0 ? html`<p>No Albums in Catalog!</p>` : allAlbums.map(album => createAlbum(detailsBtn ,userData, album))} 

</section>`;

export async function catalogPage(ctx){
    const userData = getUserData();
    const allAlbums =  await getAllAlbums();
    
    function detailsBtn(userData, album){
        if(userData){
           return html`<div class="btn-group">
           <a href="/details/${album._id}" id="details">Details</a>
       </div>` 
        } else {
            return null;
        }
    }

    function createAlbum(detailsBtn, userData, album){
        return html`<div class="card-box">
        <img src=".${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${detailsBtn(userData, album)}

        </div>
    </div>`
    }





    ctx.render(catalogTemplate(detailsBtn ,userData ,allAlbums ,createAlbum));
}