import React from "react";
import Header from "./Header";
import CreateDeck from "../Deck/CreateDeck";
import DeckList from "../Deck/DeckList";
import {Route, Switch} from "react-router-dom";




function Layout() {
  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        
        <Route path={"/"}></Route>
        <Route path={"/decks"} exact><DeckList /></Route>
        <Route path={"/decks/new"}><CreateDeck /></Route>
      </div>
    </>
  );
}

export default Layout;
