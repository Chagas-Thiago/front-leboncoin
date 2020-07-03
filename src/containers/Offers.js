import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//Recuperar a lista de anuncios fazendo uma requete vers le serveur usando axios.
//Mapeando os anuncios com .map para substrair td o conteudo.

const Offers = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fechData = async () => {
    const response = await axios.get(
      " https://my-projectboncoin.herokuapp.com/offers/with-count"
    );
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fechData();
  }, []);

  return loading ? (
    <span>Loading..xxxx></span>
  ) : (
    //td sera substraido usando offer por causa do map

    <div className="display">
      {data.offers.map((offer, index) => {
        return (
          //recuperar o id pra usar no Offer com a funcao Params
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <div>
              <span>
                <img
                  className="imgOffer"
                  alt=""
                  src={offer.picture.secure_url}
                />
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <span>{offer.price} euros</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Offers;
