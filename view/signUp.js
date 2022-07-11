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
  auth
} from "../config.js";
import {useCreate, useSelect, useSelectAll} from "../util.js"

class SignUp {
  constructor() {
    this.container = useCreate("div");
    this.container.id = "signup-screen";

    this.title = useCreate("p");
    this.title.innerHTML = "Sign up";
    this.title.classList.add("title");

    this.form = useCreate("form");
    this.form.id = "signup-form";
    this.form.onsubmit = this.handleSignUp;

    this.emailDoc = useCreate("input");
    this.emailDoc.classList.add("signup-input");
    this.emailDoc.type = "text";
    this.emailDoc.placeholder = "Email address";

    this.usernameDoc = useCreate("input")
    this.usernameDoc.classList.add("signup-input")
    this.usernameDoc.type = "text"
    this.usernameDoc.placeholder = "Username"

    this.passwordDoc = useCreate("input");
    this.passwordDoc.type = "password";
    this.passwordDoc.classList.add("signup-input");
    this.passwordDoc.placeholder = "password";

    this.text = useCreate("div")
    this.text.classList.add("desc")
    this.text.innerText = "or sign up with"

    this.signUpIcon = useCreate("div")
    this.signUpIcon.classList.add("icon-list")

    this.facebookIcon = useCreate("div")
    this.facebookIcon.innerHTML = `<img srcset="https://www.facebook.com/images/fb_icon_325x325.png 2x"></img>`
    this.facebookIcon.classList.add("signup-icon")

    this.gmailIcon = useCreate("div")
    this.gmailIcon.innerHTML = `<img srcset="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1 2x"></img>`
    this.gmailIcon.classList.add("signup-icon")

    this.submitBtn = useCreate("button");
    this.submitBtn.classList.add("signup-button");
    this.submitBtn.innerText = "Sign up";
    this.submitBtn.onclick = this.handleSignUp

    this.signInBtn = useCreate("a");
    this.signInBtn.classList.add("signin-link");
    this.signInBtn.href = "#signin";
    this.signInBtn.innerText = "SIGN IN";
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const userName = this.usernameDoc.value
    const email = this.emailDoc.value;
    const password = this.passwordDoc.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const currentUrl = location.origin + location.pathname
        const user = userCredential.user;
        const data = {
          email: user.email,
          uid: user.uid,
          userName: userName,
          password: password
        }
        await setDoc(doc(db, "users", user.uid), data)
        location.href = currentUrl
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ":" + errorMessage);
        // ..
      });
  };

  render(container) {
    this.signUpIcon.append(this.facebookIcon, this.gmailIcon)
    this.form.append(
      this.title,
      this.usernameDoc,
      this.emailDoc,
      this.passwordDoc,
      this.text,
      this.signUpIcon,
      this.submitBtn,
      this.signInBtn
    );
    this.container.append(this.form);
    container.append(this.container);
  }
}

export default SignUp;





