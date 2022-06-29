import Header, { useCreate, useSelect, random } from "./util.js";
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
  where,
} from "./config.js";

export class App {
  constructor(container) {
    this.container = container;
    this.activeScreen;
  }

  render(screen) {
    this.activeScreen = screen;
    this.activeScreen.render(this.container);
  }
}

export default App;

// render product
export class RenderProduct extends App {
  constructor(container) {
    super(container);
  }

  render(screen) {
    this.container.innerHTML = "";
    this.activeScreen = screen;
    this.activeScreen.render(this.container);
  }
}

const container = useSelect(".container");
const app = new App(container);

app.render(new Header());

// read data

// lay du lieu tu firestore
const data = [];
const productTitle = useSelect(".products-title");

let querySnapshot = await getDocs(collection(db, "products"));

querySnapshot.forEach((doc) => {
  const temp = doc.data();
  data.push(temp);
});

export { data };

const searchWrapper = useSelect(".search-wrapper");
const searchInput = useSelect(".search-input");
// export let dataSearch = [];

// search params
const shopUrl = new URL(window.location.origin.toString() + "/view/shop/");

export const search = async (e) => {
  if (e.code == "Enter") {
    let searchText = searchInput.value;
    if (searchText.trim() != "") {
      let paramsShop = new URLSearchParams(shopUrl.search);
      paramsShop.append("search", searchText);

      let newShopUrl = new URL(
        `${shopUrl.origin}${shopUrl.pathname}?${paramsShop}`
      );

      // get result
      let result = paramsShop.get("search");
      let resultProduct = [];
      for (let i in data) {
        if (data[i].name.toLowerCase().indexOf(result) != -1) {
          resultProduct.push(data[i]);
        }
      }
      localStorage.setItem("shop_search", JSON.stringify(resultProduct));
      location.href = newShopUrl;
    }
  }
};

searchWrapper.onkeydown = search;
