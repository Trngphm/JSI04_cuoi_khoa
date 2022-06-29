import Header, {useCreate, useSelect,random } from "./util.js";
import { data } from "./app.js"
import App, { RenderProduct } from "./app.js"
import Product from "./view/product.js"

const container = useSelect(".container");
const shop = new RenderProduct(container);
const app = new App(container);

// appear random product
const randomListWrapper = useSelect(".random-products--list")
randomListWrapper.innerHTML = ``
function renderRandom() {
  let dataRandom = [...data]
  for (let i = 0; i < 3; i++) {
    let product = random(dataRandom.length)
    randomListWrapper.innerHTML += 
    `
    <div class="random-products-item">
      <div class="random-products-image">
        <img src="${dataRandom[product].image[0]}" alt="hinh">
      </div>
      <div class="random-products-content">
        <div class="random-products-title">${dataRandom[product].name}</div>
        <div class="random-products-price">&#8363;${dataRandom[product].price.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
      </div>
    </div>
    `
    dataRandom.splice(product, 1)
    // console.log(data);
  }
}
renderRandom()
console.log(data);

// click

$(document).on("click", ".random-products-item", function () {
  let name = $(this).find(".random-products-title").text();
  console.log(name);
  location.href = `#${name}`;

  const result = data.find((item, index) => {
    return item.name == name;
  });
  console.log(result);
  shop.render(
    new Product(
      result.name,
      result.price,
      result.style,
      result.size,
      result.image[0]
    )
  );
  app.render(new Header());
});
