// HTML Elements
const btnAddCamera = document.getElementById("add-camera");
const btnCloseCamera = document.getElementById("btn-close-camera");
const tableContainer = document.querySelector(".camera-tables");
const addCameraForm = document.querySelector(".camera-add-form ");

btnAddCamera.addEventListener("click", () => {
  tableContainer.classList.add("hide");
  addCameraForm.classList.remove("hide");
});

btnCloseCamera.addEventListener("click", (e) => {
  e.preventDefault();
  tableContainer.classList.remove("hide");
  addCameraForm.classList.add("hide");
});
