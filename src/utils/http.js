import router from "@/router/index";
const baseURL = "http://localhost:3000";

function getHeaders() {
  const headers = new Headers();
  const token = localStorage.getItem("auth-token");
  headers.append("Content-Type", "application/json");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}

function checkAuth(res) {
  if (res.status === 401) {
    router.push("/login");
  }
  return res.json();
}

const postJson = async function (options) {
  const headers = getHeaders();
  const response = await fetch(`${baseURL}${options.url}`, {
    method: "post",
    headers,
    body: JSON.stringify(options.data),
  }).then(checkAuth);

  return response;
};
const putJson = async function (options) {
  const headers = getHeaders();
  const response = await fetch(`${baseURL}${options.url}`, {
    method: "put",
    headers,
    body: JSON.stringify(options.data),
  }).then(checkAuth);

  return response;
};

const getJson = async function (options) {
  const headers = getHeaders();
  const response = await fetch(`${baseURL}${options.url}`, {
    method: "get",
    headers,
  }).then(checkAuth);

  return response;
};

const deleteJson = async function (options) {
  const headers = getHeaders();
  const response = await fetch(`${baseURL}${options.url}`, {
    method: "delete",
    headers,
  }).then(checkAuth);

  return response;
};

export { postJson, putJson, getJson, deleteJson };
