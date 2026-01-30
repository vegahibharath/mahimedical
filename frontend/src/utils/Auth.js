export const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin/login";
};