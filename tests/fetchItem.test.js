require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Deve ser uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });
  it('O argumento "MLB1615760527" deve chamar a função fetch com o endpoint correto', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('O retorno da função fetchItem com o argumento "MLB1615760527" é igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');

    expect(response).toEqual(item);
  });
  it('Se a função fetchItem estiver sem argumento, deve retornar a mensagem de erro esperada', async () => {
    const response = await fetchItem();

    expect(response).toEqual(new Error('You must provide an url'));
  });
});
