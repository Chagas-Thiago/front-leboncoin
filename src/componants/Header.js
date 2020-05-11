import React from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
  //history para direcionar a pagina principal
  const history = useHistory();
  return (
    <header>
      <h1>Leboncoin</h1>
      {/* {user === null && <Redirect to="/" />} */}
      {user ? (
        <button
          onClick={() => {
            //suprimer les cookies quando si deconnectar
            Cookies.remove("userToken");
            setUser(null); //repassar a condicao de si connectar
            history.push("/");
          }}
        >
          Se deconnecter
        </button>
      ) : (
        <Link to="/log_in">Se connecter</Link>
      )}
    </header>
  );
};
export default Header;
