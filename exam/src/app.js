import {html, page, render} from './lib.js'
import { getUserData } from './util.js';
import * as api from './api/api.js'

import {homePage} from './views/home.js'
import { loginPage } from './views/login.js';
import {  logout } from './api/data.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/createAlbum.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
window.api = api;

const root = document.getElementById("main-content");
const logoutBtn = document.querySelector('a[href*="javascript:void(0)"]');
logoutBtn.addEventListener('click', onLogout);
updateNavBar()

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/catalog', catalogPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)

//updateNavBar()
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNavBar = updateNavBar;
 
    next();
 }

 
 function onLogout(){
     logout();
     page.redirect('/');
     updateNavBar();
 }

function updateNavBar(){
    const bar = document.querySelector('nav ul');
    const loginBtn = document.querySelector('a[href*="/login"]');
    loginBtn.style.display = 'none';
    const registerBtn = document.querySelector('a[href*="/register"]');
    registerBtn.style.display = 'none';

    const createBtn = document.querySelector('a[href*="/create"]');
    createBtn.style.display = 'none';
    const logoutButton = document.querySelector('a[href*="javascript:void(0)"]');
    logoutButton.style.display = 'none';

    const userData = getUserData();

    if(userData) {
        createBtn.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {    
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
    }

}
