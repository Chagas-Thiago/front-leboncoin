import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
//usar history pra voltar a pagina d'acuueil quando si connectar
//Gerer les cookie, token et tout ça...

const Login = ({ setUser }) => {
  const history = useHistory();
  //tableau pour la conexao

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handLeSubmit = async (event) => {
    event.preventDefault();
    //Chamar o server
    const response = await axios.post(
      "https://my-projectboncoin.herokuapp.com/user/log_in",
      {
        email: email,
        password: password,
      }
    );
    // console.log(response.data);
    //requete vers le serveur pour retourner un token
    // const token = "12345";
    // //cree un cookie pour la valeur, le token reçu dans la reponse
    Cookies.set("userToken", response.data.token, { expires: 2000 });
    // //changer connecter a desconnecter
    setUser(response.data.token);
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handLeSubmit}>
        <input
          className="input"
          value={email}
          type="text"
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="input"
          value={password}
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="connecter" type="submit">
          Se connecter{" "}
        </button>
      </form>
      <button
        onClick={() => {
          history.push("/sign_up");
        }}
      >
        Créer un compte
      </button>
    </div>
  );
};
export default Login;
