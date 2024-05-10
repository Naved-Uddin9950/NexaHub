import collections from './collections.js';

const app = document.getElementById('main-container');

const dashboardBtn = document.getElementById('dashboard');
const collectionsBtn = document.getElementById('collections');
const entitiesBtn = document.getElementById('entities');

const dashboard = null;
// const collections = null;
const entities = null;

dashboardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    app.appendChild(dashboard);
});

collectionsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    collections();
});

entitiesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    app.appendChild(entities);
});

// Module calls
collections();

