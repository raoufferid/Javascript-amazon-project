export const shoppingCart = [
    {
        "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        "quantity": 3
    },
    {
        "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        "quantity": 3
    },
    {
        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        "quantity": "1"
    }
];
 let cartQuantity=0;
export function addToCart(button) {
  let matchingItem;
 
  shoppingCart.forEach((item) => {
    if (item.productId === button.dataset.productId) {
      item.quantity = parseInt(item.quantity) + parseInt(button.parentElement.querySelector('select').value);
      matchingItem = true;
      cartQuantity += parseInt(button.parentElement.querySelector('select').value);
      return;
    }
  });
  if (!matchingItem) {
    shoppingCart.push({ productId: button.dataset.productId, quantity: button.parentElement.querySelector('select').value });
    cartQuantity += parseInt(button.parentElement.querySelector('select').value);
  }
  return cartQuantity;
  }