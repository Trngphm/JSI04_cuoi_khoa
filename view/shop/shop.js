import { useSelect, useSelectAll, style, loading } from "../../util.js";
import {
  db,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  query,
  deleteDoc,
  where,
} from "../../config.js";
import Product from "../product.js";
import App, { ExtendApp, search, data } from "../../app.js";
import Header, { sizes } from "../../util.js";

const productTitle = useSelect(".products-title");
const searchWrapper = useSelect(".search-wrapper");
const searchInput = useSelect(".search-input");

// hien product

// render
const container = useSelect(".container");
const shop = new ExtendApp(container);
const app = new App(container);

loading.show(5)
function template(data) {
  let html = "";
  data.forEach((item, index) => {
    html += `
    <div class="products-item">
      <div class="products-image">
        <img src="${item.image[0]}" alt="hinh">
      </div>
      <div class="products-name">${item.name}</div>
      <div class="products-price">&#8363;${item.price
        .split(" ")
        .join("")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
    </div>
    `;
  });
  return html;
}

const filterList = useSelect(".filter--size-list");
sizes.forEach((item, index) => {
  filterList.innerHTML += `
  <div class="filter--size-item">
    <input type="radio" name="size-item__input" class="size-item__input" id="size--${item}" value="${item}">
    <label for="size--${item}" class="size-item__label">${item.toUpperCase()}</label>
  </div>
  `;
});

const styleInput = useSelect(".filter--style-list");
styleInput.innerHTML = "";
style.push("Tất cả");
style.forEach((item, index) => {
  styleInput.innerHTML += `
  <option value = "${item}" class = "style-item">${item}</option>
  `;
});
styleInput.value = "Tất cả";

// render list
$(document).ready(function () {
  function renderPagination(data) {
    $("#pagination-container").pagination({
      dataSource: data,
      pageSize: 5,
      showPrevious: false,
      showNext: false,
      callback: function (data, pagination) {
        let html = template(data);
        $(".products-list").html(html);
      },
    });
    loading.hide()
  }
  renderPagination(data);

  // search
  const url = new URL(window.location);
  async function renderProductFilter() {
    if (url.search) {
      let params = new URLSearchParams(url.search);
      let searchProduct = [];
      let filterProduct = [];
      // search
      const search = params.get("search");
      if (search) {
        searchProduct = JSON.parse(localStorage.getItem("shop_search"));
        renderPagination(searchProduct);
      }

      // filter
      const styleParams = params.get("style");
      const sizeParams = params.get("size");
      let q;
      if (styleParams && sizeParams) {
        q = query(
          collection(db, "products"),
          where(
            "style",
            "==",
            `${styleParams}`,
            where("size", "array-contains", `${sizeParams}`)
          )
        );
      } else if (styleParams) {
        q = query(
          collection(db, "products"),
          where("style", "==", `${styleParams}`)
        );
      } else if (sizeParams) {
        q = query(
          collection(db, "products"),
          where("size", "array-contains", `${sizeParams}`)
        );
      }
      if (q) {
        const aq = await getDocs(q);
        aq.forEach((doc) => {
          filterProduct.push(doc.data());
        });
        if (filterProduct != []) {
          renderPagination(filterProduct);
        }
      }

      // empty
      if (searchProduct.length == 0 && filterProduct.length == 0) {
        const productsList = useSelect(".products-list");
        productsList.innerHTML += `
      <div class="products-empty">
        <div class="products-empty-image">
          <img srcset="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png 2x">
        </div>
        <div class="products-empty-content">
          Không tìm thấy kết quả nào
        </div>
      </div>
      `;
        productsList.style.justifyContent = "center";
      }
    }
  }
  renderProductFilter();

});

$(document).on("click", ".products-item", function () {
  let name = $(this).find(".products-name").text();
  location.hash = `product/${name}`;

  const result = data.find((item, index) => {
    return item.name == name;
  });

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

// filter

const filterBtn = useSelect(".filter-btn");
filterBtn.onclick = async () => {
  const style = styleInput.value;
  const sizeList = useSelectAll(".size-item__input");
  let size;
  for (let i of sizeList) {
    if (i.checked) {
      size = i.value;
    }
  }
  // url param
  const url = new URL(window.location.origin.toString() + "/view/shop/");
  let params = new URLSearchParams(url.search);
  if (style != "Tất cả") params.append("style", style);
  if (size) params.append("size", size);
  let newUrl = new URL(`${url.origin}${url.pathname}?${params}`);
  location.href = newUrl;
};
