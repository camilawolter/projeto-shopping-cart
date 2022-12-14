const cartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const sumTotalItemsCart = () => {
  const cartItemsAll = document.querySelectorAll('.cart__item');
  const arrayCart = [...cartItemsAll].map((item) => item.innerText);
  
  const getPrice = arrayCart.map((item) => {

  })
};

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const fetchItemsResult = async (id) => {
  const result = await fetchItem(id);
  const cart = createCartItemElement({ 
    sku: result.id, name: result.title, salePrice: result.price });
  
  cartItems.appendChild(cart);
  saveCartItems(cartItems.innerHTML);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const buttonAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonAddCart.addEventListener('click', () => fetchItemsResult(sku));

  section.appendChild(buttonAddCart);

  return section;
};

const fetchProductsResult = async () => {
  const itemsSection = document.getElementsByClassName('items')[0];

  itemsSection.innerHTML = '<ol class="loading"<li>Carregando...</li></ol>';

  setTimeout(async () => {
    const result = await fetchProducts('computador');
    itemsSection.innerHTML = '';
    result.results.forEach((item) => itemsSection.appendChild(
      createProductItemElement({ sku: item.id, name: item.title, image: item.thumbnail }),
      ));
  }, 2000);
};

const buttonClearCart = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.clear();
  });
};

const localStorageCart = () => {
  const cartStorage = localStorage.getItem('cartItems'); 
  cartItems.innerHTML = cartStorage;
  
  const cartItemsAll = document.querySelectorAll('.cart__item');
  cartItemsAll.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

window.onload = () => {
  fetchProductsResult();
  localStorageCart();
  buttonClearCart();
 };
