import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Publish = () => {
  const token = Cookies.get("userToken");
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handLeSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);

    const response = await axios.post(
      "https://my-projectboncoin.herokuapp.com/offer/publish",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setIsLoading(false);
    history.push("/offer/" + response.data._id);
  };

  return token ? (
    <div>
      <form onSubmit={handLeSubmit}>
        <input
          // className="input"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          type="text"
          placeholder="title"
        />
        <textarea
          // className="input"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          type="Text"
          placeholder="description"
        />
        <input
          // className="input"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          type="text"
          placeholder="price"
        />

        <br />

        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />

        <button className type="submit" disabled={isLoading ? true : false}>
          Publier un annonce
        </button>
      </form>
    </div>
  ) : (
    <Redirect to="log_in" />
  );
};
export default Publish;
