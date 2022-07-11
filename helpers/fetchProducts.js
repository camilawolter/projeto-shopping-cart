const fetchProductsUrl = (id) => `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;

const fetchProducts = async (id) => {
  try {
    const url = fetchProductsUrl(id);
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}