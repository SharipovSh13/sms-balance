function addToken(token) {
  localStorage.setItem("access_token", token);
}
function getToken() {
  return localStorage.getItem("access_token");
}

function removeToken() {
  localStorage.removeItem("access_token");
}

function addRefreshToken(refreshToken) {
  localStorage.setItem("refresh_token", refreshToken);
}
function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}
function removeRefreshToken() {
  localStorage.removeItem("refresh_token");
}

export {
  getToken,
  addToken,
  removeToken,
  getRefreshToken,
  addRefreshToken,
  removeRefreshToken,
};
