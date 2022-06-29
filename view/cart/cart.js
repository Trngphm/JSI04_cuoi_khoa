import { useSelect, useSelectAll } from "../../util.js";
import {
  db,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteDoc,
} from "../../config.js";

const pageHeading = useSelect(".page-heading span");
const cartHeader = useSelect(".cart-header");
const cartAmmount = useSelect(".menu-cart span");
const cartSubtotal = useSelect(".cart-subtotal .cart-total-value");
const cartOrderTotal = useSelect(".cart-order--total .cart-total-value");
const checkoutBtn = useSelect(".button-checkout");
const rightCol = useSelect(".right-col")
const leftCol = useSelect(".left-col")
let subTotal = 0;
let orderTotal;

// plusBtn.onclick = () => {
//   let value = Number(amountInput.value)
//   value +=1
//   amountInput.value = value
// }

const cartList = useSelect(".cart-list");
let cartData = JSON.parse(localStorage.getItem("cart_data"));

function emptyCart() {
  cartList.innerHTML += 
  `
  <div class="empty-wrapper">
    <img srcset="https://bizweb.dktcdn.net/100/398/753/themes/813175/assets/empty-cart.png?1653028797250 2x">
  </div>
  `;
  rightCol.style.display = "none"
  leftCol.style.border = "none"
  leftCol.style.width = "100%"
  cartHeader.style.display = "none";
}

// gio hang trong
if (cartData.length == 0) {
  emptyCart()
} else {
  cartHeader.style.display = "flex";
  for (let i of cartData) {
    let size;
    if (i.size) {
      size = i.size;
    } else {
      size = "S";
    }
    let total = i.price * i.amount;
    subTotal += total;
    cartList.innerHTML += `
<div class="cart-item">
  <div class = "delete-icon">
    <i class="fa-solid fa-xmark"></i>
  </div>
  <div class="cart-item-block cart-item-image">
    <img src="${i.image}" alt="hinh">
  </div>
  <div class="cart-item-block cart-item-content">
    <div class="cart-item-name">
    ${i.name}
    </div>
    <div class="definition-list">
      <div class="definition-item">
        <div class="definition-key">Size:</div>
        <div class="definition-value">${size.toUpperCase()}</div>
      </div>
      <div class="definition-item">
        <div class="definition-key">Style:</div>
        <div class="definition-value">${i.style}</div>
      </div>
    </div>
  </div>
<div class="cart-item-block cart-item-price">&#8363;${i.price.toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
<div class="cart-item-block cart-item-amout">
  <div class="amount-wrapper">
    <button class="button-amount button-minus">
      <i class="fa-solid fa-minus"></i>
    </button>
    <input type="text" class="amount-input" min="1" value="${i.amount}">
    <button class="button-amount button-plus">
      <i class="fa-solid fa-plus"></i>
    </button>
</div>
</div>
<div class="cart-item-block cart-item-total">&#8363;${total
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
</div>
`;
  }
}

pageHeading.style.display = "flex";
pageHeading.innerText = cartData.length;

// cartList.innerHTML = "";

// click button, amount
$(document).on("click", ".button-minus", function () {
  let inputValue = Number($(this).parent().find(".amount-input").val());
  let amountInput = $(this).parent().find(".amount-input");
  if (inputValue > 1) {
    inputValue -= 1;
    amountInput.val(inputValue);
  }
});

$(document).on("click", ".button-plus", function () {
  let inputValue = Number($(this).parent().find(".amount-input").val());
  let amountInput = $(this).parent().find(".amount-input");
  inputValue += 1;
  amountInput.val(inputValue);
});

$(document).on("change", ".amount-input", function () {
  let inputValue = Number($(this).val());
  if (inputValue < 1 || !inputValue) {
    $(this).val(1);
  } else {
    $(this).val(inputValue);
  }
});

// delete product
$(document).on("click", ".delete-icon", function () {
  let el = $(this).parent();
  let name = $(".cart-item-content .cart-item-name", el).text();
  let findIndex = cartData.find((item, index) => {
    return (item.name = name);
  });
  cartData.splice(cartData.indexOf(findIndex), 1);
  localStorage.setItem("cart_data", JSON.stringify(cartData));
  el.remove();
  pageHeading.innerText = cartData.length;
  cartAmmount.innerText = cartData.length;
  if (cartData.length == 0) {
    emptyCart()
  }
});

// cart total
cartSubtotal.innerHTML =
  `&#8363;` + subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
orderTotal = subTotal + 30000;
cartOrderTotal.innerHTML =
  `&#8363;` + orderTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

checkoutBtn.onclick = () => {
  alert("Dat hang thanh cong");
};