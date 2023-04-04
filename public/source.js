const URL = "http://localhost:3000";

// HTML Elements
const btnAddCamera = document.getElementById("add-camera");
const btnCloseCamera = document.getElementById("btn-close-camera");
const tableContainer = document.querySelector(".camera-tables");
const addCameraForm = document.querySelector(".camera-add-form ");

const btnSndCamera = document.getElementById("btn-add-camera");

btnAddCamera.addEventListener("click", () => {
  tableContainer.classList.add("hide");
  addCameraForm.classList.remove("hide");
});

btnCloseCamera.addEventListener("click", (e) => {
  e.preventDefault();
  tableContainer.classList.remove("hide");
  addCameraForm.classList.add("hide");
});

const clearCameraFields = () => {
  document.getElementById("camera-name").value =
    document.getElementById("description").value =
    document.getElementById("url").value =
      "";
};

btnSndCamera.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const name = document.getElementById("camera-name").value;
    const description = document.getElementById("description").value;
    const url = document.getElementById("url").value;

    const response = await axios({
      method: "POST",
      url: `${URL}/api/v1/camera/addcamera`,
      data: {
        name,
        description,
        url,
      },
    });
    if (response.status === 200) {
      clearCameraFields();
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
});
