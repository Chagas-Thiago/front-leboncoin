import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Offer = () => {
  //Recuperer les params envoyé depuis le Link de Offers
  //Criar a route get para extraire les annonces
  //Pas de map car cette fois ci c'est seulement une produit qui nos interesse
  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://my-projectboncoin.herokuapp.com/offer/${id}`
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //Faire une requete avec cette id
  //pour recuperer les données d'un annonce en particulier
  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div>
      <img className="imgOffer" alt="" src={data.picture.secure_url} />
      <span>{data.title}</span>
      <span>{data.description}</span>
      <span>{data.price}</span>
    </div>
  );
};
export default Offer;
