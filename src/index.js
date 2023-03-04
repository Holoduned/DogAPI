import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

async function fetchDogsBreeds() {
  const response = await fetch(
    "https://api.thedogapi.com/v1/breeds?page=0",
    requestOptions
  );
  const data = await response.json();
  createBreedList(data);
}
async function fetchDogById(id) {
  const response = await fetch(
    "https://api.thedogapi.com/v1/breeds/" + id,
    requestOptions
  );
  return await response.json();
}
function createBreedList(breeds) {
  var breeds_count = Object.keys(breeds).length;
  const select = document.querySelector(".breed_select");
  for (let i = 0; i < breeds_count; i++) {
    let newOption = new Option(breeds[i].name, breeds[i].id);
    select.appendChild(newOption);
  }
  select.onchange = display_photo;
}

var requestOptionsImage = {
  method: "GET",
  redirect: "follow",
};

async function SaveDogId(value) {
  // var select = document.querySelector(".breed_select");
  // var value = select.value;
  localStorage.setItem("dogId", value);
}
async function display_photo() {
  var select = document.querySelector(".breed_select");
  var value = select.value;
  await SaveDogId(value);
  const dog = await fetchDogById(value);

  const response = await fetch(
    "https://api.thedogapi.com/v1/images/" + dog.reference_image_id,
    requestOptionsImage
  );
  const data = await response.json();
  const image = document.querySelector("img");
  image.setAttribute("src", data.url);
}

fetchDogsBreeds();
reportWebVitals();
