class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log('search bar render');
    this.render();
    this.searchListener();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .search-bar {
          color: blue;
        }
      </style>
      <div class="search-bar">
        <input type="text" placeholder="Input the title to search" class="search-input">
      </div>
    `;
  }

  searchListener() {
    const searchInput = this.shadowRoot.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      this.dispatchEvent(new CustomEvent('search', { detail: { searchTerm } }));
    });
  }
}

customElements.define('search-bar', SearchBar);
