import React from "react";
import Header from "./Header";
import CreateDeck from "../Deck/CreateDeck";
import DeckList, {handleCardCreate} from "../Deck/DeckList";
import { Route, Switch } from "react-router-dom";
import DeckView from "../Deck/DeckView";
import CreateCard from "../Card/CreateCard";
import NotFound from "./NotFound";
import UpdateDeck from "../Deck/UpdateDeck";

function Layout() {
  return (
    <>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <Route path={"/"} exact>
          <DeckList />
        </Route>

        <Route path={"/decks"} exact>
          <DeckList />
        </Route>

        <Route path={"/decks/new"} exact>
          <CreateDeck />
        </Route>

        <Route path={"/decks/:deckId"} >
          <DeckView />
        </Route>
        {/* <Route path={"/decks/:deckId/edit"}><UpdateDeck /></Route> */}
        {/* <Route path={"/decks/:deckId/cards/new"}><CreateCard /></Route> */}
        

      </div>
    </>
  );
}

export default Layout;
