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
    if (response.status === 201) {
      clearCameraFields();
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
});

// Deleting a camera

const deleteCamera = async (e) => {
  try {
    const id = e.dataset.id;
    const response = await axios({
      method: "DELETE",
      url: `${URL}/api/v1/camera/deletecamera/${id}`,
    });

    if (response.status === 204) window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

// Rendering camera details
const renderCameras = (name, description, url, id, i) => {
  const template = ` <tr>
      <td>${i}</td>
      <td>${name}</td>
      <td>${description}</td>
      <td>${url}</td>
      <td><button data-id=${id} class="btn btn-outline-info" onclick='editCamera(this)'>Edit</button>
      </td>
      <td><button data-id=${id} class="btn btn-outline-danger" onclick='deleteCamera(this)'>Delete</button>
      </td>
    </tr>`;

  const cameraTable = document.getElementById("camera-table-body");
  cameraTable.innerHTML += template;
};

// Retreiving all camera details

const retrieveCameraDetails = async () => {
  try {
    const cameraDetails = await axios({
      method: "GET",
      url: `${URL}/api/v1/camera/getcameras`,
    });

    cameraDetails.data.cameras.forEach((camera, i) => {
      renderCameras(
        camera.name,
        camera.description,
        camera.url,
        camera.id,
        i + 1
      );
    });
  } catch (err) {
    alert(err.response.data.message);
    console.log(err);
  }
};

retrieveCameraDetails();
