const URL = "http://localhost:3000";

// HTML Elements
const btnAddCamera = document.getElementById("add-camera");
const btnCloseCamera = document.getElementById("btn-close-camera");
const tableContainer = document.querySelector(".camera-tables");
const addCameraForm = document.querySelector(".camera-add-form ");

const btnSndCamera = document.getElementById("btn-add-camera");
const btnEditCamera = document.getElementById("btn-edit-camera");

btnAddCamera.addEventListener("click", () => {
  clearCameraFields();
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

// Edit Camera Details
let cameraName, description, url, id;

const editCamera = (e) => {
  id = e.dataset.id;

  cameraName = document.getElementById(`${id}name`).textContent;
  description = document.getElementById(`${id}desc`).textContent;
  url = document.getElementById(`${id}url`).textContent;
  console.log(cameraName);

  document.getElementById("camera-name").value = cameraName;
  document.getElementById("description").value = description;
  document.getElementById("url").value = url;
  tableContainer.classList.add("hide");
  addCameraForm.classList.remove("hide");
};

// Editing implementaion

btnEditCamera.addEventListener("click", async (e) => {
  try {
    alert("Are you sure you want to update!");
    e.preventDefault();
    const name = document.getElementById("camera-name").value;
    const description = document.getElementById("description").value;
    const url = document.getElementById("url").value;
    const response = await axios({
      method: "PATCH",
      url: `${URL}/api/v1/camera/editcamera/${id}`,
      data: {
        name,
        description,
        url,
      },
    });

    if (response.status === 200) clearCameraFields();
  } catch (err) {
    console.log(err);
  }
});

// Rendering camera details
const renderCameras = (name, description, url, id, i) => {
  const template = ` <tr>
      <td>${i}</td>
      <td id="${id}name">${name}</td>
      <td id="${id}desc">${description}</td>
      <td id="${id}url">${url}</td>
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

// camera Networks

const btnNetwork = document.getElementById("cameraNetwork");
const btnCloseNetwork = document.getElementById("btn-close-network-dom");
const networkTable = document.querySelector(".network-add-form");

const addNetwork = document.getElementById("btn-add-network");

// DOM manipulation
btnNetwork.addEventListener("click", (e) => {
  networkTable.classList.remove("hide");
  tableContainer.classList.add("hide");
});

btnCloseNetwork.addEventListener("click", (e) => {
  e.preventDefault();
  networkTable.classList.add("hide");
  tableContainer.classList.remove("hide");
});

// ClearFields

const clearNetworkFields = () => {
  document.getElementById("network-name").value =
    document.getElementById("network-description").value =
    document.getElementById("network-url").value =
      "";
};

addNetwork.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("network-name").value;
  const description = document.getElementById("network-description").value;
  const url = document.getElementById("network-url").value;
  try {
    const response = await axios({
      method: "POST",
      url: `${URL}/api/v1/network/addnetwork`,
      data: {
        name,
        description,
        url,
      },
    });

    if (response.status === 201) {
      clearNetworkFields();
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
});

// Rendering networks

const renderNetworks = (name, description, url, i, id, cameras) => {
  const template = `<tr>
              <td>${i}</td>
              <td>${name}</td>
              <td>${description}</td>
              <td>${url}</td>
              <td>${cameras}</td>
              <td><button data-id=${id} class="btn btn-outline-info" onclick='editNetwork(this)'>Edit</button>
      </td>
      <td><button data-id=${id} class="btn btn-outline-danger" onclick='deleteNetwork(this)'>Delete</button>
      </td>
      <td><button data-id=${id} class="btn btn-outline-success" onclick='addCamera(this)'>AddCamera</button>
      </td>
            </tr>`;
  const networkTable = document.getElementById("network-table");
  networkTable.innerHTML += template;
};

// Retreiving all the networks

const allNetworks = async () => {
  try {
    const networks = await axios({
      method: "GET",
      url: `${URL}/api/v1/network/getnetworks`,
    });
    let cameraInfo = "";

    networks.data.networks.forEach((network, i) => {
      cameraInfo += JSON.stringify(network.cameras);
      renderNetworks(
        network.name,
        network.description,
        network.url,
        i + 1,
        network.id,
        cameraInfo
      );
      cameraInfo = "";
    });
  } catch (err) {
    console.log(err);
  }
};

allNetworks();

// Adding camera to the network

const cameraBox = document.getElementById("box-networkadd");
const btnCameraToNetwork = document.getElementById("btn-add-camera-to-network");

let network_id;
const addCamera = (e) => {
  network_id = e.dataset.id;
  console.log(network_id);
  tableContainer.classList.add("hide");
  cameraBox.classList.remove("hide");
};

// Add CameraToNetwork

btnCameraToNetwork.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("camera-to-add").value;
  const response = await axios({
    method: "PATCH",
    url: `${URL}/api/v1/network/addcamera/${network_id}`,
    data: {
      name,
    },
  });
  console.log(response);
});

// Render available cams

const renderAvailableCam = (name, description) => {
  const template = `<li>Model: ${name}==>Spec: ${description}</li>`;
  const list = document.querySelector(".list-group");

  list.innerHTML += template;
};

// Retrieve available cam

const retreiveAvailableCam = async () => {
  try {
    const availableCam = await axios({
      method: "GET",
      url: `${URL}/api/v1/camera/availablecameras`,
    });

    availableCam.data.availableCameras.forEach((cam) => {
      renderAvailableCam(cam.name, cam.description);
    });
  } catch (err) {
    console.log(err);
  }
};

retreiveAvailableCam();

// DeleteNetwork

const deleteNetwork = async (e) => {
  network_id = e.dataset.id;

  try {
    const response = await axios({
      method: "DELETE",
      url: `${URL}/api/v1/network/deletenetwork/${network_id}`,
    });

    if (response.status === 204) window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
