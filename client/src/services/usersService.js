import axios from "axios";

export const login = async (email, password) => {
  return axios
    .post("http://localhost:3000/users/login", { email, password })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
