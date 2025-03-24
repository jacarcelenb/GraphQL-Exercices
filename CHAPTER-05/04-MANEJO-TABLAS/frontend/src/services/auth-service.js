const setRolUser = (rol) => {
  localStorage.setItem("rol", rol);
};

const setTokenUser = (token) => {
  localStorage.setItem("token", token);
};

const setUserName = (username) => {
  localStorage.setItem("username", username);
};

const setUserStatus = (status) => {
  localStorage.setItem("status", status);
};

const getRolUser = () => {
  return parseInt(localStorage.getItem("rol"));
};

const getTokenUser = () => {
  return localStorage.getItem("token");
};

const getUsername = () => {
  return localStorage.getItem("username");
};

const getUserStatus = () => {
  return localStorage.getItem("status");
};

const removeUserInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  localStorage.removeItem("username");
};

export {
  setRolUser,
  setTokenUser,
  setUserStatus,
  setUserName,
  getRolUser,
  getTokenUser,
  getUserStatus,
  getUsername,
  removeUserInfo
};
