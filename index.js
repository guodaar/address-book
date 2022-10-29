const form = document.querySelector("#addressEntry");
const adBox = document.querySelector("#addressBox");

let addressList = JSON.parse(localStorage.getItem("MyAddresses")) || [];

createList();

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
  createList();
});

function createList() {
  addressList.forEach((address, index) => {
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
    div.setAttribute("class", "addBox");
    div.appendChild(pName);
    div.appendChild(pLName);
    div.appendChild(pEmail);
    div.appendChild(pPhone);
    div.appendChild(pStreet);
    btnDiv.appendChild(delBtn);
    btnDiv.appendChild(favBtn);
    btnDiv.appendChild(editBtn);
    div.appendChild(btnDiv);

    adBox.appendChild(div);

    delBtn.addEventListener("click", (event) => {
      event.preventDefault();
      selectedId = event.target.parentElement.parentElement.id;
      event.target.parentElement.parentElement.remove();
      const splicedObj = addressList.splice(selectedId, 1);
      console.log(splicedObj);
      localStorage.setItem("MyAddresses", JSON.stringify(addressList));
    });
  });
}

let clearAll = document.querySelector("#clearAll");
clearAll.addEventListener("click", () => {
  if (confirm(`Are you sure you want to clear all?`)) {
    localStorage.clear();
    addressList = [];
    adBox.innerHTML = "";
    form.reset();
  }
});

let search = document.querySelector("#searchBar");
search.addEventListener("keyup", (event) => {
  event.preventDefault();
});
