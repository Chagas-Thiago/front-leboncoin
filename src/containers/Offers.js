import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment/moment";

require("moment/locale/fr");
moment.locale();
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
    <span>Loading</span>
  ) : (
    //td sera substraido usando offer por causa do map
    <>
      <div className="elipsis">
        <div></div>
      </div>
      <div className="recherche">
        <input type="text" placeholder="Cherche ton bonneur ici"></input>
        <input type="submit" value="Recherche"></input>
      </div>
      <div className="display">
        {data.offers.map((offer, index) => {
          return (
            //recuperar o id pra usar no Offer com a funcao Params
            <Link
              className="linkOffers"
              key={offer._id}
              to={`/offer/${offer._id}`}
            >
              <div>
                <span className="ficheOffers">
                  <span>
                    <img
                      className="imgOffers"
                      alt=""
                      src={offer.picture.secure_url}
                    />
                  </span>
                  <div className="descOffers">
                    <span className="descOffers2">
                      <p>{offer.title}</p>
                      <p>{offer.price} €</p>
                    </span>
                    <span>
                      <p className="date">
                        {moment(offer.created, "YYYYMMDD").fromNow()}
                      </p>
                    </span>
                  </div>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Offers;
