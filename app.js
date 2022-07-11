import Header, { useCreate, useSelect, random, loading } from "./util.js";
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
import SignIn from "./view/signIn.js";
import SignUp from "./view/signUp.js";

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
export class ExtendApp extends App {
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
const extendApp = new ExtendApp(container);

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

// login
const page = [
  {
    hash: "#signin",
    content: SignIn,
    title: "Sign in",
  },
  {
    hash: "#signup",
    content: SignUp,
    title: "Sign up",
  },
];

// if (location.hash == "") {
//   location.hash = "signin";
// }

page.forEach((item) => {
  if (item.hash == location.hash) {
    extendApp.render(new item.content());
    document.title = item.title;
    container.style.height = "100vh";
    container.style.padding = "0px";
  }
});

// moi lan doi hash
window.onhashchange = () => {
  
  page.forEach((item) => {
    if (item.hash == location.hash) {
      extendApp.render(new item.content());
      document.title = item.title;
      container.style.height = "100vh";
      container.style.padding = "0px";
    }
  });
};

// log out
// xac minh dang nhap
onAuthStateChanged(auth, async (user) => {
  loading.hide()
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
    localStorage.setItem("uid", user.uid);
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const loginLink = useSelect(".menu-login");
    console.log(loginLink);
    loginLink.innerHTML = `
    <div>
      <span>${userData.userName}</span>
      <div class="log-out">
        Log out
      </div>
    </div>
    `;
    const menuLogin = useSelect(".menu-login");
    const logOut = useSelect(".log-out");
    menuLogin.onmouseover = () => {
      logOut.style.display = "block";
    };
    logOut.onmouseout = () => {
      logOut.style.display = "none";
    };

    // logout
    // const logOut = useSelect(".log-out");
    console.log(logOut);

    const handleLogOut = () => {
      localStorage.removeItem("uid");
      signOut(auth)
        .then(() => {
          location.href = "#signin";
        })
        .catch((error) => {
          alert(error);
        });
    };

    logOut.onclick = handleLogOut;
  } else {
    // User is signed out
    // ...
    location.href = "#signin";
  }
});


