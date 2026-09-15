const shoppingCartStorageKey = 'shoppingCart';

function loadShoppingCart() {
  try {
    const cartFromStorage = localStorage.getItem(shoppingCartStorageKey);
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
  } catch (error) {
    console.warn('Could not read shoppingCart from localStorage:', error);
    return [];
  }
}

export let shoppingCart = loadShoppingCart();
let cartQuantity = 0;

export function addToCart(button) {
  let matchingItem = false;
  const selectedQuantity = parseInt(button.parentElement.querySelector('select').value, 10);

  shoppingCart.forEach((item) => {
    if (item.productId === button.dataset.productId) {
      item.quantity = parseInt(item.quantity, 10) + selectedQuantity;
      matchingItem = true;
      cartQuantity += selectedQuantity;
      return;
    }
  });

  if (!matchingItem) {
    shoppingCart.push({ productId: button.dataset.productId, quantity: selectedQuantity });
    cartQuantity += selectedQuantity;
  }

  localStorage.setItem(shoppingCartStorageKey, JSON.stringify(shoppingCart));
  return cartQuantity;
}

export function deleteFromCart(productId) {
  let matchingItem = false;


  shoppingCart.forEach((item) => {
    if (item.productId === productId) {
      const newQuantity=parseInt(item.quantity, 10) - 1;
      
      if (newQuantity <= 0) {
        const cartItemIndex = shoppingCart.findIndex((item) => item.productId === productId);
        shoppingCart.splice(cartItemIndex, 1);
      } else {
        item.quantity = newQuantity;
      }
      matchingItem = true;
      cartQuantity -= 1;
      return;
    }
  });

    localStorage.setItem(shoppingCartStorageKey, JSON.stringify(shoppingCart));
  return cartQuantity;
}
export function getCartQuantity() {
  let total = 0;
  shoppingCart.forEach((item) => {
    total += parseInt(item.quantity, 10);
  });
  return total;
}