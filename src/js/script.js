import '../css/style.css';

const searchInput = document.getElementById('id_search');
const resultField = document.getElementById('result');
const baseUrl = 'https://efounbqifq-dsn.algolia.net/1/indexes/Product_v2_en?';
const baseImageUrl = 'https://cdn.rebelle.com/';
let timer, controller;

const fetchList = async(value) => {
  controller = new AbortController();
  const { signal } = controller;
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
      data.hits.forEach(item => {
        const src = `${baseImageUrl}${item.images[0].slice(0, 2)}/${item.images[0]}`

        return (
          resultField.innerHTML += `
            <li class="item">
              <img width="64" height="64" src=${src} />
              <p class="text"><b>${item.title}<b/></p>
            </li>
          `
        )
      })
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

  if (!value) {
    resultField.innerHTML = '';
    return;
  };

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => fetchList(value), 100)

  if (controller) controller.abort();
});
