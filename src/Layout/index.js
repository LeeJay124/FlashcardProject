import React from "react";
import Header from "./Header";
import CreateDeck from "../Deck/CreateDeck";
import DeckLayout from "./DeckLayout";
import { Route, Switch, Redirect } from "react-router-dom";
import DeckView from "../Deck/DeckView";
import CardList from "../Card/CardList";
import NotFound from "./NotFound";
import UpdateDeck from "../Deck/UpdateDeck";

function Layout() {
  return (
    <>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <Route path={"/"} exact >
         <Redirect from="/" to="/decks" />
        </Route>
       
        <Route path={"/decks"} >
          <DeckLayout />
        </Route>
       {/*  <Route path={"/decks/new"} exact>
          <CreateDeck />
        </Route>

        <Route path={"/decks/:deckId"} exact >
          <DeckView />
        </Route>
      <Route path={"/decks/:deckId/edit"} exact >
          <UpdateDeck />
        </Route>
      <Route path={"/decks/:deckId/card"} exact>
          <CardList />
        </Route>*/}

        
  
  
        {/* <Route path={"/decks/:deckId/edit"}><UpdateDeck /></Route> */}
        {/* <Route path={"/decks/:deckId/cards/new"}><CreateCard /></Route> */}
        

      </div>
    </>
  );
}

export default Layout;
