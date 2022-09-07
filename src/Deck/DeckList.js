import React, { useState, useEffect } from "react";
import {Route, Link, Switch, useRouteMatch, useHistory, useParams} from "react-router-dom";
import Deck from "./Deck";
import { createDeck, listDecks, readDeck, deleteDeck, createCard , deleteCard} from "../utils/api";
import NotFound from "../Layout/NotFound";
import CreateDeck from "./CreateDeck";
import CreateCard from "../Card/CreateCard";
import Study from "./Study";
import DeckView from "./DeckView";
import Breadcrumb from "./BreadCrumb";

function DeckList() {
  const history = useHistory();
  const {url} = useRouteMatch();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [cards, setCards] = useState([]);
  
  const [crumbs, setCrumbs] = useState(['Home', 'Decks', 'Cards']);

  const selected = crumb => {
    console.log(crumb);
    if(crumb == "Home") history.push("/");
    else if(crumb == "Decks") history.push("/decks");
  }
  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   readDeck(abortController.signal).then(setCards).catch(setError);

  //   return () => abortController.abort();
  // }, []);

  const handleDeckDelete = async (id) => {
    const result = window.confirm("Delete this deck?");
    if (result) {
      
          const abortController = new AbortController();
      
          deleteDeck(id, abortController.signal);
      
          history.push("/");
    }
  };
  
  
  const handleCardDelete = async (id) => {
    const result = window.confirm("Delete this card?");
    if (result) {
      
          const abortController = new AbortController();
      
          deleteCard(id, abortController.signal);
      
          history.push("/decks");
    }
  };
  
  const handleCardCreate = async (card) => {
    //const {deckId} = deckId;
    const result = window.confirm("Create this card?");
    if (result) {
      
          const abortController = new AbortController();
      
          createCard(card.deckId, card, abortController.signal);
      
          return () => abortController.abort();
    }
  };

  if (error) {
    return <NotFound error={error} />;
  }
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} handleDeckDelete={handleDeckDelete}/>);
  //const cardList = cards.map((card)=> <Study cards={cards}/>);
  return (
    <div>
      <Link to={"/decks/new"}>
      <button className="btn btn-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg mr-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
        Create Deck
      </button></Link>
      <Switch>
      
      <Route path={"/"}>
      <Breadcrumb crumbs={ crumbs } selected={ selected }  />
        <div className="card-deck ptr-3 pt-3">{list}</div></Route>
      <Route path={"/decks"}>
      
        <div className="card-deck ptr-3 pt-3">{list}</div></Route>
        {/* <Route path={"/decks/new"} ><CreateDeck handleDeckCreate={handleDeckCreate} /></Route> */}
        {/* <Route path={"/decks/:deckId/study"}><Study /></Route>
        <Route path={"/decks/:deckId"}></Route>
        <Route path={"/decks/:deckId/edit"}></Route>
        <Route path={"/decks/:deckId/cards/new"}><CreateCard handleCardCreate={handleCardCreate} /></Route>
        <Route path={"/decks/:deckId/cards/:cardId/edit"}></Route> */}
        <Route>
        <NotFound />
        </Route>
        </Switch>
      
     
    
     
     
   </div>
  );
}
export default DeckList;
