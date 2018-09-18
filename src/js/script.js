import App from './App/app';

import '../css/style.css';


const searchInput = document.getElementById('id_search');
const resultField = document.getElementById('result');
const baseUrl = 'https://efounbqifq-dsn.algolia.net/1/indexes/Product_v2_en?';
const baseImageUrl = 'https://cdn.rebelle.com/';

const SearchItems = new App(baseUrl, baseImageUrl, searchInput, resultField);

searchInput.addEventListener('input', value => SearchItems.handleOnInput(value));
