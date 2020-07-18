import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

require("moment/locale/fr");
moment.locale();

const Offer = () => {
  //Recuperer les params envoyé depuis le Link de Offers
  //Criar a route get para extraire les annonces
  //Pas de map car cette fois ci c'est seulement une produit qui nos interesse
  const { id } = useParams();
  // console.log(id);
  const history = useHistory();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://my-projectboncoin.herokuapp.com/offer/${id}`
    );
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  });

  //Faire une requete avec cette id
  //pour recuperer les données d'un annonce en particulier
  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="container">
      <div className="containerOffer">
        <img className="imgOffer" alt="" src={data.picture.secure_url} />
        <span className="offer">
          <p>{data.title}</p>
          <p>{data.price} €</p>
        </span>
        <span>
          <p className="dateOffer">
            {moment(data.created, "YYYYMMDD").fromNow()}
          </p>
        </span>
        <span className="descriptionOffer">
          <p>Description</p>
          <p>{data.description}</p>
        </span>
      </div>
      <div className="acheter">
        <p>{data.creator.account.username}</p>
        <button
          className="buttonOffer"
          onClick={() =>
            history.push("/payment", {
              productId: data._id,
              img: data.picture.secure_url,
              title: data.title,
              price: data.price,
            })
          }
        >
          Acheter
        </button>
      </div>
    </div>
  );
};
export default Offer;
// nnnnnn,;nxnnnnnn;:c, ,c c,:;c;,:;:
