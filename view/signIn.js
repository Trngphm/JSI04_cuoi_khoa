import { auth, signInWithEmailAndPassword } from "../config.js";
import {useCreate, useSelect, useSelectAll} from "../util.js"

class SignIn {
  constructor() {
    this.container = useCreate("div");
    this.container.id = "login-screen";

    this.title = useCreate("p");
    this.title.innerHTML = "Login";
    this.title.classList.add("title");

    this.form = useCreate("form");
    this.form.id = "login-form";
    this.form.onsubmit = this.handleSignIn;

    this.usernameDoc = useCreate("input");
    this.usernameDoc.classList.add("login-input");
    this.usernameDoc.type = "text";
    this.usernameDoc.placeholder = "Email address";

    this.passwordDoc = useCreate("input");
    this.passwordDoc.type = "password";
    this.passwordDoc.classList.add("login-input");
    this.passwordDoc.placeholder = "password";

    this.text = useCreate("div")
    this.text.classList.add("desc")
    this.text.innerText = "or sign up with"

    this.signInIcon = useCreate("div")
    this.signInIcon.classList.add("icon-list")

    this.facebookIcon = useCreate("div")
    this.facebookIcon.innerHTML = `<img srcset="https://www.facebook.com/images/fb_icon_325x325.png 2x"></img>`
    this.facebookIcon.classList.add("signin-icon")

    this.gmailIcon = useCreate("div")
    this.gmailIcon.innerHTML = `<img srcset="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1 2x"></img>`
    this.gmailIcon.classList.add("signin-icon")

    this.submitBtn = useCreate("button");
    this.submitBtn.classList.add("login-button");
    this.submitBtn.innerText = "LOGIN";
    this.submitBtn.onclick = this.handleSignIn

    this.signupBtn = useCreate("a");
    this.signupBtn.classList.add("signup-link");
    this.signupBtn.href = "#signup";
    this.signupBtn.innerText = "Sign up";
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const email = this.usernameDoc.value
    const password = this.passwordDoc.value
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const currentUrl = location.origin + location.pathname
        const user = userCredential.user;
        console.log(user);
        location.href = currentUrl
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert (errorCode + ":" + errorMessage)
      });
  };

  render(container) {
    this.signInIcon.append(this.facebookIcon, this.gmailIcon)
    this.form.append(
      this.title,
      this.usernameDoc,
      this.passwordDoc,
      this.text,
      this.signInIcon,
      this.submitBtn,
      this.signupBtn
    );
    this.container.append(this.form);
    container.append(this.container);
  }
}

export default SignIn;


