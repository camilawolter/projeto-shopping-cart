const fetchItemUrl = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = async (id) => {
  try {
    const url = fetchItemUrl(id);
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
