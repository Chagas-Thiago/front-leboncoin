import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ title, price, productId, username }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [complete, setComplete] = useState(false);

  const submit = async (ev) => {
    try {
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: username,
      });
      // console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Stripe nous retourne un token
      // console.log("response from stripe     =====>  ", response);
      // on envoie ce token au backend
      const chargeRes = await axios.post(
        "https://leboncoin-api.herokuapp.com/payment",
        {
          token: stripeToken,
          amount: price * 100,
          title: title,
          productId: productId,
        }
      );

      // console.log(chargeRes.data);
      // Le backend nous confirme que le paiement a été effectué
      if (chargeRes.status === 200) {
        setComplete(true);
      }
    } catch (error) {
      console.log("error   =====>  ", error.message);
    }
  };
  if (complete) {
    // Le paiement est effectué
    return (
      <div className="payment-confirmed">
        <img
          alt="yeah"
          src="https://media1.giphy.com/media/JpG2A9P3dPHXaTYrwu/giphy.gif?cid=790b76118a2a8cf4057319b373bb60085c7e287217f5446f&rid=giphy.gif"
        />
        <span>Paiement effectué !</span>
      </div>
    );
  }
  return (
    <div className="checkout">
      <p>Vos coordonnées bancaires</p>
      {/* On affiche le formualire de carte bleue */}
      <div>
        <CardElement />
      </div>

      <button onClick={submit}>Procéder au paiment</button>
    </div>
  );
};
export default CheckoutForm;
