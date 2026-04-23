const API_URL = "http://localhost:3000/api";
let authToken = localStorage.getItem("token") || "";

const registerNombre = document.getElementById("registerNombre");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const categoryNombre = document.getElementById("categoryNombre");
const categoryDescripcion = document.getElementById("categoryDescripcion");

const productNombre = document.getElementById("productNombre");
const productDescripcion = document.getElementById("productDescripcion");
const productPrecio = document.getElementById("productPrecio");
const productStock = document.getElementById("productStock");
const productCategoria = document.getElementById("productCategoria");

const categoriesList = document.getElementById("categoriesList");
const productsList = document.getElementById("productsList");
const statusBox = document.getElementById("status");
const tokenBox = document.getElementById("tokenBox");

const appContent = document.getElementById("appContent");

document.getElementById("registerBtn").addEventListener("click", registerUser);
document.getElementById("loginBtn").addEventListener("click", loginUser);
document.getElementById("logoutBtn").addEventListener("click", logoutUser);
document.getElementById("createCategoryBtn").addEventListener("click", createCategory);
document.getElementById("createProductBtn").addEventListener("click", createProduct);
document.getElementById("loadCategoriesBtn").addEventListener("click", loadCategories);
document.getElementById("loadProductsBtn").addEventListener("click", loadProducts);

function showStatus(message, isError = false) {
  statusBox.style.display = "block";
  statusBox.style.background = isError ? "#fee2e2" : "#e0f2fe";
  statusBox.style.color = isError ? "#991b1b" : "#075985";
  statusBox.textContent = message;
}

function updateTokenBox() {
  if (authToken) {
    tokenBox.style.display = "block";
    tokenBox.textContent = "Sesión iniciada correctamente";
    appContent.style.display = "block";
  } else {
    tokenBox.style.display = "none";
    appContent.style.display = "none";
  }
}

async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(url, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Ocurrió un error");
  }

  return data;
}

async function registerUser() {
  try {
    const body = {
      nombre: registerNombre.value,
      email: registerEmail.value,
      password: registerPassword.value
    };

    const data = await request(`${API_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(body)
    });

    showStatus(`Usuario registrado: ${data.nombre}`);
  } catch (error) {
    showStatus(error.message, true);
  }
}

async function loginUser() {
  try {
    const body = {
      email: loginEmail.value,
      password: loginPassword.value
    };

    const data = await request(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(body)
    });

    authToken = data.token;
    localStorage.setItem("token", authToken);
    updateTokenBox();
    showStatus(`Sesión iniciada: ${data.user.nombre}`);
  } catch (error) {
    showStatus(error.message, true);
  }
}
function logoutUser() {
  authToken = "";
  localStorage.removeItem("token");
  updateTokenBox();
  showStatus("Sesión cerrada");
}

async function createCategory() {
  try {
    const body = {
      nombre: categoryNombre.value,
      descripcion: categoryDescripcion.value
    };

    const data = await request(`${API_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(body)
    });

    showStatus(`Categoría creada: ${data.nombre}`);
    productCategoria.value = data._id;
    loadCategories();
  } catch (error) {
    showStatus(error.message, true);
  }
}

async function createProduct() {
  try {
    const body = {
      nombre: productNombre.value,
      descripcion: productDescripcion.value,
      precio: Number(productPrecio.value),
      stock: Number(productStock.value),
      categoria: productCategoria.value
    };

    const data = await request(`${API_URL}/products`, {
      method: "POST",
      body: JSON.stringify(body)
    });

    showStatus(`Producto creado: ${data.nombre}`);
    loadProducts();
  } catch (error) {
    showStatus(error.message, true);
  }
}

async function loadCategories() {
  try {
    const data = await request(`${API_URL}/categories`);
    categoriesList.innerHTML = data
  .map(
    (item) => `
      <div class="item">
        <strong>${item.nombre}</strong>
        <div class="muted">${item.descripcion || ""}</div>
        <div class="muted">ID: ${item._id}</div>
        <button onclick="editCategory('${item._id}', '${item.nombre}', '${item.descripcion || ""}')" class="warning">Editar</button>
        <button onclick="deleteCategory('${item._id}')" class="danger">Eliminar</button>
      </div>
    `
  )
  .join("");
  } catch (error) {
    showStatus(error.message, true);
  }
}

async function loadProducts() {
  try {
    const data = await request(`${API_URL}/products`);
   productsList.innerHTML = data
  .map(
    (item) => `
      <div class="item">
        <strong>${item.nombre}</strong>
        <div class="muted">${item.descripcion || ""}</div>
        <div class="muted">Precio: $${item.precio}</div>
        <div class="muted">Stock: ${item.stock}</div>
        <div class="muted">Categoría: ${item.categoria?.nombre || "Sin categoría"}</div>
        <button onclick="editProduct('${item._id}', '${item.nombre}', '${item.descripcion || ""}', '${item.precio}', '${item.stock}')" class="warning">Editar</button>
        <button onclick="deleteProduct('${item._id}')" class="danger">Eliminar</button>
      </div>
    `
  )
  .join("");
  } catch (error) {
    showStatus(error.message, true);
  }
}

async function deleteCategory(id) {
  try {
    await request(`${API_URL}/categories/${id}`, {
      method: "DELETE"
    });

    showStatus("Categoría eliminada");
    loadCategories();
  } catch (error) {
    showStatus(error.message, true);
  }
}
async function editCategory(id, currentNombre, currentDescripcion) {
  const nuevoNombre = prompt("Nuevo nombre de la categoría:", currentNombre);
  if (nuevoNombre === null) return;

  const nuevaDescripcion = prompt("Nueva descripción de la categoría:", currentDescripcion || "");
  if (nuevaDescripcion === null) return;

  try {
    await request(`${API_URL}/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nombre: nuevoNombre,
        descripcion: nuevaDescripcion
      })
    });

    showStatus("Categoría actualizada");
    loadCategories();
  } catch (error) {
    showStatus(error.message, true);
  }
}
async function deleteProduct(id) {
  try {
    await request(`${API_URL}/products/${id}`, {
      method: "DELETE"
    });

    showStatus("Producto eliminado");
    loadProducts();
  } catch (error) {
    showStatus(error.message, true);
  }
}
async function editProduct(id, currentNombre, currentDescripcion, currentPrecio, currentStock) {
  const nuevoNombre = prompt("Nuevo nombre del producto:", currentNombre);
  if (nuevoNombre === null) return;

  const nuevaDescripcion = prompt("Nueva descripción del producto:", currentDescripcion || "");
  if (nuevaDescripcion === null) return;

  const nuevoPrecio = prompt("Nuevo precio del producto:", currentPrecio);
  if (nuevoPrecio === null) return;

  const nuevoStock = prompt("Nuevo stock del producto:", currentStock);
  if (nuevoStock === null) return;

  try {
    await request(`${API_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nombre: nuevoNombre,
        descripcion: nuevaDescripcion,
        precio: Number(nuevoPrecio),
        stock: Number(nuevoStock)
      })
    });

    showStatus("Producto actualizado");
    loadProducts();
  } catch (error) {
    showStatus(error.message, true);
  }
}

updateTokenBox();

if (authToken) {
  loadCategories();
  loadProducts();
}

loadCategories();
loadProducts(); 