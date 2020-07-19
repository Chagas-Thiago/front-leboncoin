///////////////
//Il manque juste gerer le payment
///////////////////

import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Header from "./componants/Header";
import Signup from "./containers/Signup";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import Footer from "./componants/Footer";
import Cookies from "js-cookie";

//Toute les states de connexion vont au App e footer pra evitar de mandar em todas as paginas
//Route para para recuperar o anuncio, id, e um butao para de desconnectar .
function App() {
  const tokenFromCookie = Cookies.get("userToken");
  //verificar si o token ja esta ligado ao cookie sinao sera null
  const [user, setUser] = useState(tokenFromCookie || null);
  const username = useState(Cookies.get("username") || "");
  //history qui sur les composent enant de Router
  return (
    <Router>
      <Header user={user} setUser={setUser} />

      <Switch>
        <Route path="/log_in">
          <Login setUser={setUser} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/sign_up">
          <Signup />
        </Route>
        <Route path="/payment/">
          <Payment username={username} />
        </Route>
        <Route path="/">
          <Offers />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
