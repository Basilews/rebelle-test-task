const form = document.getElementById('form');
const searchInput = document.getElementById('id_search');
const resultField = document.getElementById('result');
const baseUrl = 'https://efounbqifq-dsn.algolia.net/1/indexes/Product_v2_en?';
let timer;


const sendData = (value) => {
  const xhr = new XMLHttpRequest();
  const params = {
    query: value,
    hitsPerPage: 5,
  }
  const url = baseUrl + `query=${params.query}&hitsPerPage=${params.hitsPerPage}`;

  xhr.open('GET', url, true);
  xhr.setRequestHeader('X-Algolia-API-Key', '2a92fd7cd4aca67298fbe1115fdef211');
  xhr.setRequestHeader('X-Algolia-Application-Id', 'EFOUNBQIFQ');
  xhr.send();

  if (xhr.status !== 200) {
    resultField.innerHTML = xhr.status + ': ' + xhr.statusText;
  } else {
    resultField.innerHTML = JSON.parse(xhr.hits);
  }
}

searchInput.oninput = () => {
  timer
    ? clearTimeout(timer)
    : timer = setTimeout(() => sendData(searchInput.value), 100);
};
