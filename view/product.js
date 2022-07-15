import { useCreate, useSelect, useSelectAll } from "../util.js";
import App from "../app.js";
import { data } from "../app.js";
// import { doc } from "../config.js";
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
} from "../config.js";

class Product {
  constructor(name, price, style, size, image) {
    this.container = useCreate("div");
    this.container.id = "product-wrapper";

    this.productImage = useCreate("div");
    this.productImage.classList.add("product-image");
    this.image = useCreate("img");
    this.image.src = image;

    this.contentCon = useCreate("div");
    this.contentCon.classList.add("content-wrapper");

    this.nameCon = useCreate("div");
    this.nameCon.classList.add("product-name");
    this.nameCon.innerText = name;

    this.priceCon = useCreate("div");
    this.priceCon.classList.add("product-price");
    this.priceCon.innerHTML =
      `&#8363;` + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    this.optionCon = useCreate("div");
    this.optionCon.classList.add("product-option");
    this.optionList = {
      style: useCreate("div", "option-list"),
      size: useCreate("div", "option-list"),
    };
    this.optionList.size.classList.add("size-list");
    this.optionTitle = {
      style: useCreate("div", "option-title"),
      size: useCreate("div", "option-title"),
    };
    if (style) {
      this.optionTitle.style.innerText = "style:";
      this.optionList.style.innerHTML += `
      <span class ="style-desc">${style}</span>
      `;
    }
    if (size) {
      this.optionTitle.size.innerText = "size:";
      size.forEach((item, index) => {
        this.optionList.size.innerHTML += `<div class="option-item">
        <input type="radio" name="size-item__input" id="${item}" class="option-item__input" value="${item}">
        <label class="option-item__label size-item__label" for="${item}">
          <span>${item}</span>
        </label>
      </div>`;
      });
    }

    this.addCartWrapper = useCreate("div");
    this.addCartWrapper.classList.add("add-cart-wrapper");

    this.amountCon = useCreate("div");
    this.amountCon.classList.add("product-amount");
    this.minusBtn = useCreate("button");
    this.minusBtn.classList.add("amount-button");
    this.minusBtn.classList.add("minus-button");
    this.amountInput = useCreate("input");
    this.amountInput.value = 1;
    this.amountInput.classList.add("amount-input");
    this.amountInput.type = "text";
    this.amountInput.min = 1;
    this.plusBtn = useCreate("button");
    this.plusBtn.classList.add("amount-button");
    this.plusBtn.classList.add("plus-button");

    this.minusBtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    this.plusBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    this.minusBtn.onclick = () => {
      let value = Number(this.amountInput.value);
      if (value > 1) {
        value -= 1;
        this.amountInput.value = value;
      }
    };
    this.plusBtn.onclick = () => {
      let value = Number(this.amountInput.value);
      value += 1;
      this.amountInput.value = value;
    };
    this.amountInput.onchange = () => {
      let value = Number(this.amountInput.value);
      if (value < 1 || !value) value = 1;
      this.amountInput.value = value;
    };

    this.checkBtn = useCreate("button");
    this.checkBtn.classList.add("add-button");
    this.checkBtn.innerText = "Add to cart";
    this.checkBtn.onclick = () => {
      this.handle(name, price, style, image);
    };
  }

  // add to cart
  handle = (name, price, style, image) => {
    const cartAmmount = useSelect(".menu-cart span");
    const menuCart = useSelect(".menu-cart");
    let sizeList = useSelectAll(".option-item__input");
    // let sizeTitle = useSelect(".size-list .option-title")
    this.optionTitle.size.innerHTML = ``;
    this.optionTitle.size.innerText = "size:";
    let size;
    for (let i of sizeList) {
      if (i.checked) {
        size = i.value;
      }
    }

    let amount = Number(this.amountInput.value);
    let data = {
      name: name,
      image: image,
      price: price,
      size: size,
      style: style,
      amount: amount,
    };
    if (!data.size) {
      this.optionTitle.size.innerHTML += `<span>Vui long chon size</span>`;
    } else {
      let dataList = [];
      if (JSON.parse(localStorage.getItem("cart_data"))) {
        dataList = JSON.parse(localStorage.getItem("cart_data"));
      }
      console.log(dataList);
      data.id  = dataList.length
      
      let findProduct = dataList.find((item, index) => {
        return item.name == name && item.size == size;
      });
      if (findProduct) {
        findProduct.amount += 1;
      } else {
        if (cartAmmount) {
          cartAmmount.innerText = dataList.length + 1;
        } else {
          menuCart.innerHTML += `<span>1</span>`
        }
        dataList.push(data);
      }
      console.log(dataList);
      localStorage.setItem("cart_data", JSON.stringify(dataList));
      console.log(JSON.parse(localStorage.getItem("cart_data")));
    }
  };

  render(container) {
    this.productImage.append(this.image);
    this.optionCon.append(this.optionList.style, this.optionList.size);
    this.optionList.style.prepend(this.optionTitle.style);
    this.optionList.size.prepend(this.optionTitle.size);
    this.amountCon.append(this.minusBtn, this.amountInput, this.plusBtn);
    this.addCartWrapper.append(this.amountCon, this.checkBtn);
    this.contentCon.append(
      this.nameCon,
      this.priceCon,
      this.optionCon,
      this.addCartWrapper
    );
    this.container.append(this.productImage, this.contentCon);
    container.append(this.container);
  }
}

const container = document.querySelector(".container");

export default Product;
