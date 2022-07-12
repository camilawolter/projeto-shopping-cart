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

async function fetchItemsResult(id) {
  const result = await fetchItem(id);
  const cartItems = document.querySelector('.cart__items');
  const cart = createCartItemElement({ 
    sku: result.id, name: result.title, salePrice: result.price });
  
  cartItems.appendChild(cart);
  saveCartItems(cartItems.innerHTML);
}

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

async function fetchProductsResult() {
  const itemsSection = document.getElementsByClassName('items')[0];

  itemsSection.innerHTML = '<ol class="loading"<li>Carregando...</li></ol>';

  setTimeout(async () => {
    const result = await fetchProducts('computador');
    itemsSection.innerHTML = '';
    result.results.forEach((item) => itemsSection.appendChild(
      createProductItemElement({ sku: item.id, name: item.title, image: item.thumbnail }),
      ));
  }, 2000);
}

function buttonClearCart() {
  const button = document.querySelector('.empty-cart');
  const cartItems = document.querySelector('.cart__items');
  button.addEventListener('click', () => {
    cartItems.innerHTML = '';
  });
}

window.onload = () => {
  fetchProductsResult();
  buttonClearCart();
 };
