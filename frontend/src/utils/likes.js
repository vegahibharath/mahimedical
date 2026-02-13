export const isLiked = (id) => {
  return localStorage.getItem(`liked-${id}`) === "true";
};

export const setLiked = (id) => {
  localStorage.setItem(`liked-${id}`, "true");
};
