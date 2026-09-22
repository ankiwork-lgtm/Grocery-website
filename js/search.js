/**
 * search.js — Search functionality with debouncing
 * Radha Rani Store
 */

const Search = (() => {
  let allProducts = [];
  let debounceTimer = null;

  function init(products) {
    allProducts = products;
    const searchInput = document.getElementById("search-input");
    const headerSearchInput = document.getElementById("header-search-input");

    [searchInput, headerSearchInput].forEach(input => {
      if (!input) return;
      input.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const query = e.target.value.trim();
          handleSearch(query);
        }, 300);
      });

      // Sync both search inputs
      input.addEventListener("input", (e) => {
        [searchInput, headerSearchInput].forEach(other => {
          if (other && other !== e.target) other.value = e.target.value;
        });
      });
    });
  }

  function handleSearch(query) {
    if (!query) {
      // Restore full product grid with current category filter
      Products.applyFilters();
      return;
    }
    // Navigate to products screen for search results
    App.showScreen("products");
    const results = searchProducts(query, allProducts);
    Products.renderProductGrid(results, `Search results for "${query}"`);
  }

  function searchProducts(query, products) {
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.weight.toLowerCase().includes(q)
    );
  }

  return { init, searchProducts, handleSearch };
})();
