import API from "./api";

export const getPosts = () => API.get("/posts");

export const likePost = (id, token) =>
  API.put(`/posts/${id}/like`, {}, {
    headers: { Authorization: token }
  });