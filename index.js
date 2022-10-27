const form = document.querySelector("#addressEntry");
const adBox = document.querySelector("#addressBox");
const addressList = [];

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
  window.localStorage.setItem("MyAddresses", JSON.stringify(addressList));
  let object = window.localStorage.getItem("MyAddresses");
  let addressPar = JSON.parse(object);
  console.log(addressPar);
  // form.reset();

  adBox.innerHTML = "";

  addressPar.forEach((address, index) => {
    const pName = document.createElement("p");
    const pLName = document.createElement("p");
    const pEmail = document.createElement("p");
    const pPhone = document.createElement("p");
    const pStreet = document.createElement("p");

    pName.textContent = `First name: ${address.firstName}`;
    pLName.textContent = `Last name: ${address.lastName}`;
    pEmail.textContent = `Email: ${address.email}`;
    pPhone.textContent = `Phone number: ${address.phoneNumber}`;
    pStreet.textContent = `Street address: ${address.streetAddress}`;

    const div = document.createElement("div");
    div.setAttribute("id", index);
    div.setAttribute("class", addressDiv);
    div.appendChild(pName);
    div.appendChild(pLName);
    div.appendChild(pEmail);
    div.appendChild(pPhone);
    div.appendChild(pStreet);

    adBox.appendChild(div);
  });
});
