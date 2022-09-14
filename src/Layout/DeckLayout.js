import React from "react";
import CreateDeck from "../Deck/CreateDeck";
import DeckView from "../Deck/DeckView";
import DeckList from "../Deck/DeckList";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import UpdateDeck from "../Deck/UpdateDeck";
import CardList from "../Card/CardList";
import NotFound from "./NotFound";

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
      <Route path={`${url}/:deckId/card`} exact>
          <CardList />
        </Route>
        <Route><NotFound /></Route>
        </Switch>
    </div>
  )
}
export default DeckLayout;