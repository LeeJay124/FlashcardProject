import React from "react";
import Header from "./Header";
import CreateDeck from "../Deck/CreateDeck";

import { Route, Switch, Redirect } from "react-router-dom";
import DeckView from "../Deck/DeckView";

import NotFound from "./NotFound";
import UpdateDeck from "../Deck/UpdateDeck";
import DeckList from "../Deck/DeckList";
import Study from "../Deck/Study";
import UpdateCard from "../Card/UpdateCard";
import CreateCard from "../Card/CreateCard";

function Layout() {
  return (
    <div>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <Switch>
      <Route path="/" exact><DeckList /></Route>

    <Route path="/decks/new" exact>
          <CreateDeck />
      
        </Route>

        <Route path="/decks/:deckId" exact >
          <DeckView />
        </Route>
        
      <Route path="/decks/:deckId/edit" exact>
          <UpdateDeck />
        </Route>
        <Route path="/decks/:deckId/study"exact>
          <Study />
        </Route>
      <Route path="/decks/:deckId/cards/new" exact>
          <CreateCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit" exact>
         <UpdateCard />
        </Route>
        <Route><NotFound /></Route>
        </Switch>

      </div>
    </div>
  );
}

export default Layout;
