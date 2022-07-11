require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Deve ser uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  });
  it('Chamar a fetch quando a função for chamada com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('O argumento "computador" deve chamar a função fetch com o endpoint correto', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('O retorno da função fetchProducts com o argumento "computador" é igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador');

    expect(response).toEqual(computadorSearch);
  });
  it('Se a função fetchProdutc estiver sem argumento, deve retornar a mensagem de erro esperada', async () => {
    const response = await fetchProducts();

    expect(response).toEqual(new Error('You must provide an url'));
  });
});
