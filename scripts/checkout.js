import {shoppingCart} from '../data/cart.js';
import {addToCart,deleteFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {deliveryOptions} from '../data/deliveryOption.js';
const today=dayjs();
let totalItems=0;
let totalPrice=0;
let totalshipping=0;

generateHTMLcart();
generateDeliveryOptionHTML();





function generateHTMLcart() {
  const OrderSummaryElement = document.querySelector('.js-order-summary');
  const paymentSummaryElement = document.querySelector('.js-payment-summary');

  let orderSummaryHTML = '';
  let paymentSummaryHTML = '';
  shoppingCart.forEach((cartItem) => {
    totalItems += cartItem.quantity;
    const product = products.find((product) => product.id === cartItem.productId);
    totalPrice += (product.priceCents / 100) * cartItem.quantity;
    orderSummaryHTML += `
        
          <div class="cart-item-container">
            <div class="delivery-date js-delivery-date-${cartItem.productId}">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${(product.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-from-cart" data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input js-delivery-option-input"
                    data-delivery-option-id="1"
                    data-product-id="${cartItem.productId}"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price js-delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input js-delivery-option-input"
                    data-delivery-option-id="2"
                    data-product-id="${cartItem.productId}"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input js-delivery-option-input"
                    data-product-id="${cartItem.productId}"
                    name="delivery-option-${cartItem.productId}"
                    data-delivery-option-id="3">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        
      `;
  });
  paymentSummaryHTML += `<div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${totalPrice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-money">$${totalshipping.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalPrice + totalshipping).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${((totalPrice + totalshipping) * 0.1).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-order-total">$${(totalPrice + totalshipping + (totalPrice + totalshipping) * 0.1).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`;
  OrderSummaryElement.innerHTML = orderSummaryHTML;
  paymentSummaryElement.innerHTML = paymentSummaryHTML;
  updateTotalshiping();

listnerDeletFromCart();
}



function listnerDeletFromCart() {
  let cartDeleteCartElement = document.querySelectorAll('.js-delete-from-cart');
  cartDeleteCartElement.forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const cartItemIndex = shoppingCart.findIndex((item) => item.productId === productId);
      deleteFromCart(productId);
      generateHTMLcart();
      generateDeliveryOptionHTML();
    });
  });
}

function generateDeliveryOptionHTML() {
  const radioDeliveryOptionElements = document.querySelectorAll('.js-delivery-option-input');
  radioDeliveryOptionElements.forEach((radioDeliveryOptionElement) => {
    radioDeliveryOptionElement.addEventListener('change', () => {
      const deliveryOptionId = radioDeliveryOptionElement.dataset.deliveryOptionId;
      const productId = radioDeliveryOptionElement.dataset.productId;
      const deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);
      const deliveryDate = today.add(deliveryOption.estimatedDays, 'days').format('dddd, MMMM D');
      const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
      const deliveryFee = radioDeliveryOptionElement.parentElement.querySelector('.js-delivery-option-price');
      deliveryDateElement.textContent = `Delivery date: ${deliveryDate}`;

    });
  });
}
function updateTotalshiping() {
 const shippingMoneyElement = document.querySelector('.js-shipping-money');
  const selectedDeliveryOptions = document.querySelectorAll('.js-delivery-option-input:checked');
  let totalShipping = 0;
  selectedDeliveryOptions.forEach((option) => {
    totalShipping += parseFloat(option.dataset.deliveryOptionPrice);
  });
  shippingMoneyElement.textContent = `$${totalShipping.toFixed(2)}`;
  totalshipping = totalShipping;
}

function updateCartQuantity() {
  const cartDeleteCartElement = document.querySelector('.js-delete-from-cart');
  const productId = cartDeleteCartElement.dataset.productId;
  cartDeleteCartElement.addEventListener('click', () => {
    const cartItemIndex = shoppingCart.findIndex((item) => item.productId === productId);
    deleteFromCart(productId);
    generateHTMLcart();
  
});
}
function deliveryDate(estimatedDays) {
  const deliveryDate=today.add(estimatedDays, 'days').format('dddd, MMMM D');
  return deliveryDate;

}



