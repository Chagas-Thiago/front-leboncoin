import React from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Logo from "../assets/leboncoin.png";
const Header = ({ user, setUser }) => {
  //history para direcionar a pagina principal
  const history = useHistory();
  return (
    <header>
      <div className="containerHeader">
        <span>
          <img className="logo" alt="" src={Logo} />
          <Link className="linkHeader" to="/publish">
            Déposer une annonce
          </Link>

          {user ? (
            <button
              className="buttonHeader"
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
        </span>
      </div>
    </header>
  );
};
export default Header;
