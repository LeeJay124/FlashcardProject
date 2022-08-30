import React, { useState, useEffect } from "react";
import {Route, Link, useRouteMatch, useParams} from "react-router-dom";
import Deck from "./Deck";
import { listDecks, readDeck } from "../utils/api";
import NotFound from "../Layout/NotFound";
// import Study from "./Study";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [cards, setCards] = useState([]);

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

  if (error) {
    return <NotFound error={error} />;
  }
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);
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
      <div className="card-deck p-3">{list}</div>
      {/* <div>{cardList}</div> */}
    </div>
  );
}
export default DeckList;
