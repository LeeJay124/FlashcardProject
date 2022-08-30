import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Deck/DeckList";
import {Route, Switch, useRouteMatch} from "react-router-dom";

function Layout() {
  const {url} = useRouteMatch();
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route path={"/"}><DeckList /></Route>
        <Route path={"/decks/new"}></Route>
        <Route path={"/decks/:deckId/study"}></Route>
        <Route path={"/decks/:deckId"}></Route>
        <Route path={"/decks/:deckId/edit"}></Route>
        <Route path={"/decks/:deckId/cards/new"}></Route>
        <Route path={"/decks/:deckId/cards/:cardId/edit"}></Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
