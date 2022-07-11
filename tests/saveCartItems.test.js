const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Se executar a função saveCartItems com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado', () => {
    
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Se executar a função saveCartItems com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo o valor passado como argumento', () => {
    
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
