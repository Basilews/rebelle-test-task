const form = document.getElementById('form');
const searchInput = document.getElementById('id_search');
const resultField = document.getElementById('result');
const baseUrl = 'https://efounbqifq-dsn.algolia.net/1/indexes/Product_v2_en?';
let timer, controller;

const fetchList = async(value) => {
  controller = new AbortController();
  const { signal } = controller;
  console.log(signal);
  const headers = new Headers({
    'X-Algolia-API-Key': '2a92fd7cd4aca67298fbe1115fdef211',
    'X-Algolia-Application-Id': 'EFOUNBQIFQ',
  });
  const params = {
    query: value,
    hitsPerPage: 5,
  }
  const options = {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
    signal,
  };
  const url = baseUrl + `query=${params.query}&hitsPerPage=${params.hitsPerPage}`;

  resultField.innerHTML = 'Searching...';

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    resultField.innerHTML = '';

    if (data.hits.length > 0) {
      data.hits.forEach(item => (
        resultField.innerHTML += `<div>${item.title}</div><br>`
      ))
    } else {
      resultField.innerHTML = 'No results';
    }
  }
  catch (err) {
    if (err.name !== 'AbortError') {
      resultField.textContent = "Oh no! Fetching failed.";
    }
  }
}

searchInput.addEventListener('input', () => {
  const { value } = searchInput;
  if (!value) return;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => fetchList(value), 100)

  if (controller) controller.abort();
});
