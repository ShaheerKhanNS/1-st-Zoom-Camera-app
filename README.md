# Camera-Tracker📸

Build using modern technologies👨‍💻

### Description

This project involves creating a REST API using Express.js for a database with two tables: Cameras and CameraNetworks. The Cameras table includes fields for name, description, and URL, while the CameraNetworks table includes fields for name, description, and an array of cameras.

The API allows users to perform CRUD operations on both the Camera and CameraNetworks entities. Additionally, the CameraNetworks can contain multiple cameras, and deleting a camera from the Cameras table will automatically update the CameraNetworks table accordingly.

The overall goal of this project is to create a robust and efficient API that can effectively manage the data for a network of cameras.

#### Stack/Frameworks Used

1. Node.js
2. Express.js
3. MySQL DB
4. Sequelize ORM
5. Bootstrap
6. Axios
7. HTML
8. CSS

### API Endpoints

##### Cameras

##### Get All Cameras

- Method : GET
- URL : /api/v1/camera/getcameras
- Response : 200 OK
- Body : Array of camera objects

##### Add Camera

- Method : POST
- URL : /api/v1/camera/addcamera
- RequestBody : Camera object(without id)
- Response : 201 OK

##### Update Camera

- Method : PATCH
- URL : /api/v1/camera/editcamera/id
- RequestBody : Updated Camera object(without id)
- Response : 200 OK

##### Delete Camera

- Method : Delete
- URL : /api/v1/camera/deletecamera/id
- Response : 204 OK

##### Networks

##### Get all Networks

- Method : GET
- URL : /api/v1/network/getnetworks
- Response : 200 OK
- Body : Array of network objects

##### Add Network

- Method : POST
- URL : /api/v1/network/addnetwork
- RequestBody : Network object(without id)
- Response : 201 OK

##### Delete Network

- Method : Delete
- URL : /api/v1/network/deletenetwork/id
- Response : 204 OK

##### Update Network

- Method : PATCH
- URL : /api/v1/network/editnetwork/id
- RequestBody : Updated network object(without id)
- Response : 200 OK
