const form = document.querySelector("#addressEntry");
const createNew = document.querySelector("#createEntry");
const adBox = document.querySelector("#addressBox");
const favBox = document.querySelector("#favorites");

let addressList = JSON.parse(localStorage.getItem("MyAddresses")) || [];

////CREATE BUTTON////
createNew.addEventListener("click", () => {
  const container = document.querySelector("#addressEntry");
  if (container.style.display === "flex") {
    container.style.display = "none";
  } else {
    container.style.display = "flex";
  }
});

////SUBMIT////
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let address = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    phoneNumber: document.querySelector("#phoneNumber").value,
    streetAddress: document.querySelector("#streetAddress").value,
    favorite: false,
  };

  addressList.push(address);
  saveAddress();
  getAddress();

  const container = document.querySelector("#addressEntry");
  container.style.display = "none";
  adBox.innerHTML = "";
  favBox.innerHTML = "";
  form.reset();
  createList(addressList);
});

function saveAddress() {
  localStorage.setItem("MyAddresses", JSON.stringify(addressList));
}

function getAddress() {
  addressList = JSON.parse(localStorage.getItem("MyAddresses")) || [];
}

////MAIN LIST CREATION///
function createAddress(address, target, index) {
  const pName = document.createElement("p");
  const pLName = document.createElement("p");
  const pEmail = document.createElement("p");
  const pPhone = document.createElement("p");
  const pStreet = document.createElement("p");
  const delBtn = document.createElement("button");
  const favBtn = document.createElement("button");

  pName.textContent = `First name: ${address.firstName}`;
  pLName.textContent = `Last name: ${address.lastName}`;
  pEmail.textContent = `Email: ${address.email}`;
  pPhone.textContent = `Phone number: ${address.phoneNumber}`;
  pStreet.textContent = `Street address: ${address.streetAddress}`;
  delBtn.textContent = `Delete`;
  favBtn.textContent = addressList[index].favorite
    ? "Remove from favorites"
    : "Favorite";

  const div = document.createElement("div");
  const btnDiv = document.createElement("div");
  btnDiv.setAttribute("class", "btnContainer");
  div.setAttribute("class", "addBox");
  div.setAttribute("id", "address");

  delBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let selectedId = event.target.parentElement.parentElement.id;
    event.target.parentElement.parentElement.remove();
    const splicedObj = addressList.splice(selectedId, 1);
    console.log(splicedObj);
    localStorage.setItem("MyAddresses", JSON.stringify(addressList));
  });

  favBtn.addEventListener("click", () => {
    addressList[index].favorite = !addressList[index].favorite;
    createList(addressList);
    localStorage.setItem("MyAddresses", JSON.stringify(addressList));
  });

  div.appendChild(pName);
  div.appendChild(pLName);
  div.appendChild(pEmail);
  div.appendChild(pPhone);
  div.appendChild(pStreet);
  btnDiv.appendChild(delBtn);
  btnDiv.appendChild(favBtn);
  div.appendChild(btnDiv);
  target.appendChild(div);
}

function createList(arr) {
  adBox.innerHTML = "";
  favBox.innerHTML = "";
  arr.forEach((address, index) => {
    if (address.favorite) {
      createAddress(address, favBox, index);
    }
    createAddress(address, adBox, index);
  });
}

////CLEAR ALL////
let clearAll = document.querySelector("#clearAll");
clearAll.addEventListener("click", () => {
  if (confirm(`Are you sure you want to clear all?`)) {
    localStorage.clear();
    addressList = [];
    adBox.innerHTML = "";
    favArray = [];
    favBox.innerHTML = "";
    form.reset();
  }
});

////SEARCH////
let searchForm = document.querySelector("#searchBar");
let searchField = document.querySelector("#search");
searchForm.addEventListener("keyup", (event) => {
  event.preventDefault();
  const keyword = searchField.value.toLowerCase();
  console.log(keyword);
  const searchResults = addressList.filter(function (address) {
    if (
      address.firstName.toLowerCase().includes(keyword) ||
      address.lastName.toLowerCase().includes(keyword) ||
      address.email.toLowerCase().includes(keyword) ||
      address.phoneNumber.toLowerCase().includes(keyword) ||
      address.streetAddress.toLowerCase().includes(keyword)
    ) {
      return address;
    }
  });
  console.log(searchResults);
  createList(searchResults);
});

window.addEventListener("load", () => {
  getAddress();
  createList(addressList);
});
