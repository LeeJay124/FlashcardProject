import React from "react";
import CreateDeck from "../Deck/CreateDeck";
import DeckView from "../Deck/DeckView";
import DeckList from "../Deck/DeckList";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import UpdateDeck from "../Deck/UpdateDeck";
import NotFound from "./NotFound";
import CardList from "../Card/CardList";
import CreateCard from "../Card/CreateCard";
import UpdateCard from "../Card/UpdateCard";
import Study from "../Deck/Study";

function DeckLayout() {
  const {url} = useRouteMatch();
  
  return (
    <div>
      <Switch>
      <Route path={`${url}`} exact><DeckList /></Route>

    <Route path={`${url}/new`} exact>
          <CreateDeck />
      
        </Route>

        <Route path={`${url}/:deckId`} exact >
          <DeckView />
        </Route>
      <Route path={`${url}/:deckId/edit`} exact>
          <UpdateDeck />
        </Route>
        <Route path={`${url}/:deckId/study`} exact>
          <Study />
        </Route>
      <Route path={`${url}/:deckId/cards/new`} exact>
          <CreateCard />
        </Route>
        <Route path={`${url}/:deckId/cards/:cardId/edit`} exact>
         <UpdateCard />
        </Route>
        <Route><NotFound /></Route>
        </Switch>
    </div>
  )
}
export default DeckLayout;