import axios from "axios";



export const addUsers = async (first_name,last_name, email, password,address,role) => {
  return axios
    .post("http://localhost:3000/users/signUp", { first_name,last_name, email, password,address,role})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};