import React from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Logo from "../assets/leboncoin.png";
import Icon from "../assets/search (1).svg";
const Header = ({ user, setUser }) => {
  //history para direcionar a pagina principal
  const history = useHistory();
  return (
    <div className="containerHeader">
      <img className="logo" alt="" src={Logo} />
      <Link className="linkHeader" to="/publish">
        Déposer une annonce
      </Link>
      <button className="rechercheHeader">
        <img alt="" src={Icon} />
        Recherche
      </button>
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
    </div>
  );
};
export default Header;
