import React from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Logo from "../assets/leboncoin.png";
import Icon from "../assets/search (1).svg";
import Icon2 from "../assets/heart-key.svg";
const Header = ({ user, setUser }) => {
  //history para direcionar a pagina principal
  const history = useHistory();
  return (
    <div className="containerHeader">
      <img className="logo" alt="" src={Logo} />
      <Link className="linkHeader" to="/publish">
        Déposer une annonce
      </Link>
      <Link className="rechercheHeader" to="/">
        <img className="icon" alt="" src={Icon} />
        Recherche
      </Link>
      {user ? (
        <Link
          className="buttonHeader"
          onClick={() => {
            //suprimer les cookies quando si deconnectar
            Cookies.remove("userToken");
            setUser(null); //repassar a condicao de si connectar
            history.push("/");
          }}
        >
          <img className="icon2" alt="" src={Icon2} />
          Se deconnecter
        </Link>
      ) : (
        <Link className="buttonHeader" to="/log_in">
          Se connecter
        </Link>
      )}
    </div>
  );
};
export default Header;
