const form = document.querySelector("#addressEntry");
const adBox = document.querySelector("#addressBox");
const favBox = document.querySelector("#favorites");

let addressList = JSON.parse(localStorage.getItem("MyAddresses")) || [];
const favArray = JSON.parse(localStorage.getItem("Favorites")) || [];

createList(addressList, "contacts");
// favoriteList();

////MAIN SUBMIT////
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let address = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    phoneNumber: document.querySelector("#phoneNumber").value,
    streetAddress: document.querySelector("#streetAddress").value,
  };

  addressList.push(address);
  localStorage.setItem("MyAddresses", JSON.stringify(addressList));
  // let object = localStorage.getItem("MyAddresses");
  // let addressPar = JSON.parse(object);
  // console.log(addressPar);

  adBox.innerHTML = "";
  createList(addressList, "contacts");
});

////MAIN LIST CREATION///
function createList(array, position) {
  adBox.innerHTML = "";
  array.forEach((address, index) => {
    const pName = document.createElement("p");
    const pLName = document.createElement("p");
    const pEmail = document.createElement("p");
    const pPhone = document.createElement("p");
    const pStreet = document.createElement("p");
    const delBtn = document.createElement("button");
    const favBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    pName.textContent = `First name: ${address.firstName}`;
    pLName.textContent = `Last name: ${address.lastName}`;
    pEmail.textContent = `Email: ${address.email}`;
    pPhone.textContent = `Phone number: ${address.phoneNumber}`;
    pStreet.textContent = `Street address: ${address.streetAddress}`;
    delBtn.textContent = `Delete`;
    favBtn.textContent = "Favorite";
    editBtn.textContent = "Edit";

    const div = document.createElement("div");
    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "btnContainer");
    div.setAttribute("id", index);
    div.appendChild(pName);
    div.appendChild(pLName);
    div.appendChild(pEmail);
    div.appendChild(pPhone);
    div.appendChild(pStreet);
    btnDiv.appendChild(delBtn);
    btnDiv.appendChild(favBtn);
    btnDiv.appendChild(editBtn);
    div.appendChild(btnDiv);

    if (position === "favorites") {
      favBox.appendChild(div);
      div.setAttribute("class", "favBox");
    } else if (position === "contacts") {
      adBox.appendChild(div);
      div.setAttribute("class", "addBox");
    }

    delBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let selectedId = event.target.parentElement.parentElement.id;
      event.target.parentElement.parentElement.remove();
      const splicedObj = addressList.splice(selectedId, 1);
      console.log(splicedObj);
      localStorage.setItem("MyAddresses", JSON.stringify(addressList));
    });

    favBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let selectedId = event.target.parentElement.parentElement.id;
      console.log(addressList[selectedId]);
      favArray.push(addressList[selectedId]);
      localStorage.setItem("Favorites", JSON.stringify(favArray));

      createList(favArray, "favorites");
    });
  });
}

////CLEAR ALL////
let clearAll = document.querySelector("#clearAll");
clearAll.addEventListener("click", () => {
  if (confirm(`Are you sure you want to clear all?`)) {
    localStorage.clear();
    addressList = [];
    adBox.innerHTML = "";
    form.reset();
  }
});

////SEARCH////
let searchForm = document.querySelector("#searchBar");
let searchField = document.querySelector("#search");
searchForm.addEventListener("keyup", (event) => {
  event.preventDefault();
  const keyword = searchField.value;
  console.log(keyword);
  const searchResults = addressList.filter(function (address, index) {
    if (
      address.firstName.includes(keyword) ||
      address.lastName.includes(keyword) ||
      address.email.includes(keyword) ||
      address.phoneNumber.includes(keyword) ||
      address.streetAddress.includes(keyword)
    ) {
      return address;
    }
  });
  console.log(searchResults);
  createList(searchResults, "contacts");
});
