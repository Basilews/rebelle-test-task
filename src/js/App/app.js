class App {
  constructor(baseUrl, baseImageUrl, searchInput, resultField) {
    this.baseUrl = baseUrl;
    this.baseImageUrl = baseImageUrl;
    this.searchInput = searchInput;
    this.resultField = resultField;
    this.timer = null;
    this.controller = null;
    this.headers = new Headers({
      'X-Algolia-API-Key': '2a92fd7cd4aca67298fbe1115fdef211',
      'X-Algolia-Application-Id': 'EFOUNBQIFQ',
    });
  }

  async fetchList(value) {
    const { headers } = this;
    this.controller = new AbortController();
    const { signal } = this.controller;
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
    const url = this.baseUrl + `query=${params.query}&hitsPerPage=${params.hitsPerPage}`;

    this.resultField.innerHTML = 'Searching...';

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      this.resultField.innerHTML = '';

      if (data.hits.length > 0) {
        data.hits.forEach(item => {
          const src = `${this.baseImageUrl}${item.images[0].slice(0, 2)}/${item.images[0]}`

          return (
            this.resultField.innerHTML += `
              <li class="item">
                <img width="64" height="64" src=${src} />
                <p class="text"><b>${item.title}<b/></p>
              </li>
            `
          )
        })
      } else {
        this.resultField.innerHTML = 'No results';
      }
    }
    catch (err) {
      if (err.name !== 'AbortError') {
        this.resultField.textContent = "Oh no! Fetching failed.";
      }
    }
  }

  handleOnInput() {
    const { value } = this.searchInput;

    if (!value) {
      this.resultField.innerHTML = '';
      return;
    };

    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.fetchList(value), 100);

    if (this.controller) this.controller.abort();
  }
}

export default App;
