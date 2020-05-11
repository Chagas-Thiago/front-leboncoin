import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useHistory } from "react-router-dom";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const history = useHistory();

  const handLeSubmit = async (event) => {
    event.preventDefault();
    if ((username, email, password, confirmPassword)) {
      if (checkbox) {
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://my-projectboncoin.herokuapp.com/create/user",
            {
              username: username,
              email: email,
              password: password,
            }
          );
          //stocker un cookie sur un token
          Cookies.set("userToken", response.data.token, { expires: 2000 });
          setUserName(response.data.token);
          history.push("/");
        } else {
          alert("password incorrect");
        }
      } else {
        alert("Veulliez accepter les conditions CGU et CGV");
      }
    } else {
      alert("veuilmlez remplir tout les champs");
    }
  };

  return (
    <div>
      <form onSubmit={handLeSubmit}>
        <input
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="Text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="password"
        />
        <input
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          type="password"
          placeholder="confirm password"
        />
        <br />
        <span>Acceptez les CGC et CGU</span>
        <input
          type="checkbox"
          onChange={() => {
            setCheckbox(!checkbox);
          }}
        />
        <button type="submit">Crée un compte</button>
      </form>
    </div>
  );
};
export default Signup;
