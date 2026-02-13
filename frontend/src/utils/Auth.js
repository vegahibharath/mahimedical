// utils/Auth.js

export const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("adminToken");
  const loginTime = localStorage.getItem("adminLoginTime");

  if (!token || !loginTime) return false;

  // SESSION TIME (30 minutes)
  const SESSION_LIMIT = 30 * 60 * 1000;

  if (Date.now() - loginTime > SESSION_LIMIT) {
    logout();
    return false;
  }

  return true;
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminLoginTime");
  window.location.href = "/admin/login";
};
