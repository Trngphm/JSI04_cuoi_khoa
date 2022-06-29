import { useSelect, useSelectAll, style } from "../../util.js";
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
} from "../../config.js";

// export { useSelect, useSelectAll }

const imageWrapper = useSelectAll(".image-wrapper");
const imageInputs = useSelectAll(".image-input");
const images = useSelectAll(".image");

const sizeContent = useSelect(".size-content");
const sizeList = useSelect(".size-list");
const sizeInput = useSelect(".size-input");
const sizeTags = [];

const addBtn = useSelect(".add-btn");
const input = useSelectAll(".information-item--input");
const titleList = useSelectAll(".title");
const styleInput = useSelect(".style-list");

const storage = getStorage();

// add image
imageWrapper.forEach((el, index) => {
  el.onclick = () => {
    const imageInput = imageInputs[index];
    const image = images[index];
    imageInput.click();
    imageInput.onchange = () => {
      const file = imageInput.files[0];

      image.src = URL.createObjectURL(file);
      image.style.display = "block";
      // 'file' comes from the Blob or File API
    };
  };
});

// add size
function sizeRender() {
  sizeList.innerHTML = "";
  for (let i in sizeTags) {
    let tag = sizeTags[i];
    sizeList.innerHTML += `
    <li>
      <span>${tag}</span>
      <i class="fa-solid fa-xmark" onclick = "removeTag(${i})"></i>
    </li>
    `;
  }
  sizeInput.focus();
}

sizeRender();

const removeTag = (index) => {
  sizeTags.splice(index, 1);
  sizeRender();
};

window.removeTag = removeTag;

// sizeRender()

sizeInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (sizeInput.value.trim() != "") {
      sizeTags.push(sizeInput.value.trim());
      sizeInput.value = "";
      sizeRender();
    }
  }
});

// add style
styleInput.innerHTML = "";
style.forEach((item, index) => {
  styleInput.innerHTML += `
  <option value = "${item}" class = "style-item">${item}</option>
  `;
});
styleInput.value = "Kinh";

// add value
let data = {
  image: "",
  name: "",
  price: "",
  size: "",
  style: "",
  id: ""
};

const uploadImage = async () => {
  let imageSrc = [];

  for (let i in imageInputs) {
    let image = images[i]
    if (image.src) {
      let name = data.name
      const storageRef = ref(storage, `${name} ${i}`);
      const file = imageInputs[i].files[0];
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageSrc.push(downloadURL);
    }
  }
  return imageSrc;
};

async function addValue() {
  const id = new Date().toString()
  data.id = id
  let sizeList = [];
  const newProductRef = doc(collection(db, "products"));
  input.forEach((item, index) => {
    let title = titleList[index].innerText.toLowerCase();
    for (let i in data) {
      if (title == i) {
        data[i] = item.value;
      }
    }
  });

  const sizeValues = useSelectAll(".size-list li span");
  sizeValues.forEach((item, index) => {
    sizeList.push(item.innerText);
  });
  data.size = sizeList;
  data.style = styleInput.value;
  data.image = await uploadImage();
  await setDoc(newProductRef, data); 
  alert("Sản phẩm đã được tải lên")
}


addBtn.onclick = addValue

