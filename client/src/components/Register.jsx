// import React, { useState } from "react";
// import { addUsers } from "../services/addUsersService";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const handleChangeName = (e) => {
//     setUserName(e.target.value);
//   };

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };
//   const handleChangeConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };
//   const handleClick = () => {
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     } else {
//       //check if email exist
//       addUsers();
//     }

//     addUsers(username, email, password)
//       .then((res) => {
//         localStorage.setItem("user", res.data.token);
//         navigate("/");
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Password is not matching");
//       });
//   };
//   return (
//     <div className="register__container">
//       <h3>Register Now</h3>
//       Your User Name:
//       <input onChange={handleChangeName} />
//       Your User Email:
//       <input onChange={handleChangeEmail} />
//       Your Password:
//       <input onChange={handleChangePassword} />
//       Confirm Your Password:
//       <input onChange={handleChangeConfirmPassword} />
//       <button className="login__btn" onClick={handleClick}>
//         Confirm
//       </button>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress]=useState("")
  const [role, setRole]=useState("")
  const navigate = useNavigate();

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleClick = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      //check if email exist
      axios
        .post("http://localhost:3000/users/signUp", { first_name,last_name, email, password,address,role })
        .then((res) => {
          localStorage.setItem("user", res.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }
  };
  return (
    
    <div className="register__container">
      <h3>Register Now</h3>
      Your First Name:
      <input onChange={handleChangeFirstName} />
      Your Last Name:
      <input onChange={handleChangeLastName} />
      Your User Email:
      <input onChange={handleChangeEmail} />
      Your Password:
      <input onChange={handleChangePassword} />
      Confirm Your Password:
      <input onChange={handleChangeConfirmPassword} />
      Your Address:
      <input onChange={handleChangeAddress} />
      Your Role:
      <input onChange={handleChangeRole} />
      <button className="login__btn" onClick={handleClick}>
       Sign Up
      </button>
    </div>
  );
}

export default Register;
