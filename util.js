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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  auth,
  getDoc,
} from "./config.js";

export const useCreate = (tagName, className) => {
  const el = document.createElement(tagName);
  if (className) {
    el.classList.add(className);
  }
  return el;
};
export const useSelect = (selector) => document.querySelector(selector);
export const useSelectAll = (selector) => document.querySelectorAll(selector);

class Header {
  constructor() {
    let cartData = JSON.parse(localStorage.getItem("cart_data"));
    this.header = useCreate("div");
    this.header.classList.add("header");

    this.logoContainer = useCreate("div");
    this.logoContainer.classList.add("logo");
    this.logo = useCreate("a");
    this.logo.href = "/index.html";
    this.logo.innerText = "TCVN";

    this.menu = useCreate("div");
    this.menu.classList.add("menu");
    this.menuList = {
      left: useCreate("ul", "menu-list"),
      right: useCreate("ul", "menu-list"),
    };
    this.menuItemLeft = {
      shop: useCreate("li", "menu-item"),
      admin: useCreate("li", "menu-item"),
      new: useCreate("li", "menu-item"),
    };
    this.menuItemRight = {
      search: useCreate("li", "menu-item"),
      help: useCreate("li", "menu-item"),
      login: useCreate("li", "menu-item"),
      cart: useCreate("li", "menu-item"),
    };
    this.menuItemRight.login.classList.add("menu-login");

    const menuItems = [
      this.menuItemLeft.shop,
      this.menuItemLeft.admin,
      this.menuItemLeft.new,
      this.menuItemRight.search,
      this.menuItemRight.help,
      this.menuItemRight.login,
      this.menuItemRight.cart,
    ];
    const list = [
      {
        title: "Shop",
        link: "/view/shop",
      },
      {
        title: "Admin",
        link: "/view/admin",
      },
      {
        title: "New",
        link: "#!",
      },
      {
        title: "Search",
        link: "#!",
      },
      {
        title: "Help",
        link: "#!",
      },
      {
        title: "Login",
        link: "#signin",
      },
      {
        title: "",
        link: "/view/cart",
      },
    ];
    menuItems.forEach((item, index) => {
      let link = list[index].link;
      let title = list[index].title;
      if (title != "Search") {
        item.innerHTML = `<a href=${link}>${title}</a>`;
      } else {
        item.innerHTML = `<div>${title}</div>`;
      }
    });
    this.menuItemRight.cart.classList.add("menu-cart");
    this.menuItemRight.cart.innerHTML = `
    <a href="/view/cart"><i class="fa-solid fa-cart-shopping"></i></a>
    `;
    if (cartData) {
      if (cartData.length != 0) {
        this.menuItemRight.cart.innerHTML += `<span>${cartData.length}</span>`;
      }
    }

    this.searchWrapper = useCreate("div");
    this.searchWrapper.classList.add("search-wrapper");
    this.searchInput = useCreate("input");
    this.searchInput.classList.add("search-input");
    this.searchInput.placeholder = "Search in here";
    this.searchWrapper.innerHTML += `<i class="fa-solid fa-magnifying-glass"></i>`;

    this.menuItemRight.search.onclick = (e) => {
      e.stopPropagation();
      this.handleSearch();
    };
  }

  handleSearch = () => {
    this.menu.style.display = "none";
    this.searchWrapper.style.display = "flex";
  };

  render(container) {
    document.onclick = (e) => {
      if (this.searchWrapper.style.display != "none") {
        this.menu.style.display = "flex";
        this.searchWrapper.style.display = "none";
      }
    };

    this.searchWrapper.onclick = (e) => {
      e.stopPropagation();
    };

    this.menuList.left.append(
      this.menuItemLeft.shop,
      this.menuItemLeft.admin,
      this.menuItemLeft.new
    );
    this.menuList.right.append(
      this.menuItemRight.search,
      this.menuItemRight.help,
      this.menuItemRight.login,
      this.menuItemRight.cart
    );
    this.menu.append(this.menuList.left, this.menuList.right);
    this.logoContainer.append(this.logo);
    this.searchWrapper.prepend(this.searchInput);

    this.header.append(this.logoContainer, this.menu, this.searchWrapper);

    container.prepend(this.header);
  }
}

export default Header;

// dan toc
export const style = [
  "Bana",
  "Chăm",
  "Co",
  "Cống",
  "Giáy",
  "Hre",
  "La Chí",
  "Lô tô",
  "Mnong",
  "Nùng",
  "Pu Péo",
  "Sán Dịu",
  "Thái",
  "Xơ Đăng",
  "Bố y",
  "Chơ Ro",
  "Cơ Ho",
  "Dao",
  "Gié-Triêng",
  "Kháng",
  "La Ha",
  "Lự",
  "Mông",
  "Ơ Đu",
  "Ra Glay",
  "Si La",
  "Thổ",
  "Xtieng",
  "Brâu",
  "Chu-ru",
  "Cờ Lao",
  "Ê-đê",
  "Hà Nhì",
  "Khmer",
  "La hủ",
  "Mạ",
  "Mường",
  "Pà Thẻn",
  "Rơ Măm",
  "Tà ôi",
  "Kinh",
  "Bru-Vân Kiều",
  "Chứt",
  "Cơ tu",
  "Gia Rai",
  "Hoa",
  "Khơ Mú",
  "Lào",
  "Mảng",
  "Ngái",
  "Phù Lá",
  "Sán Chay",
  "Tày",
  "Xinh Mun",
];
export const sizes = ["xs", "s", "m", "l", "xl", "xxl"];

// random
export function random(data) {
  return Math.floor(Math.random() * data);
}



// loading
class Loading {
  constructor() {
    this.container = useSelect(".loading-container")
  }

  show = () => {
    this.container.style.display = "flex"
  }

  hide = () => {
    this.container.style.display = "none"
  }

}

export const loading = new Loading()

