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
        
        <Route path={"/"} exact>
        <nav aria-label="breadcrumb" className="pt-3">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    
  </ol>
</nav>
          <DeckList /></Route>
        <Route path={"/decks"} exact>
        <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Decks</li>
  </ol>
</nav>
          <DeckList /></Route>
        <Route path={"/decks/new"}><CreateDeck /></Route>
      </div>
    </>
  );
}

export default Layout;
