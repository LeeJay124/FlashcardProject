import React, { useState, useEffect } from "react";
import {Route, Link, Switch, useRouteMatch, useParams} from "react-router-dom";
import Deck from "./Deck";
import { createDeck, listDecks, readDeck, deleteDeck, createCard , deleteCard} from "../utils/api";
import NotFound from "../Layout/NotFound";
import CreateDeck from "./CreateDecks";

// import Study from "./Study";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [cards, setCards] = useState([]);
  const initialDeckFormData = {
    name: "", 
    description:""
  };
  const [deckFormData, setDeckFormData]=useState({...initialDeckFormData});
  const handleDeckChange = ({target})=>{
    setDeckFormData({
      ...deckFormData, 
      [target.name]:target.value,
    });   
  };
  const handleDeckSubmit = (event)=>{
    event.preventDefault();
    handleDeckCreate(deckFormData);
    setDeckFormData({...initialDeckFormData});
  };
  const initialCardFormData = {
    deckId: "", 
    front:"", 
    back:""
  };
  const [cardFormData, setCardFormData]=useState({...initialCardFormData});
  const handleCardChange = ({target})=>{
    setCardFormData({
      ...cardFormData, 
      [target.name]:target.value,
    });   
  };
  const handleCardSubmit = (event)=>{
    event.preventDefault();
    handleCardCreate(cardFormData);
    setCardFormData({...initialCardFormData});
  };
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
      
          deleteDeck(id, abortController.signal).then(listDecks);
      
          return () => abortController.abort();
    }
  };
  
  const handleDeckCreate = async (deck) => {
    const result = window.confirm("Create this deck?");
    if (result) {
      
          const abortController = new AbortController();
      
          createDeck(deck, abortController.signal).then(listDecks);
      
          return () => abortController.abort();
    }
  };
  const handleCardDelete = async (id) => {
    const result = window.confirm("Delete this card?");
    if (result) {
      
          const abortController = new AbortController();
      
          deleteCard(id, abortController.signal);
      
          return () => abortController.abort();
    }
  };
  
  const handleCardCreate = async (card) => {
    const {deckId} = deckId;
    const result = window.confirm("Create this card?");
    if (result) {
      
          const abortController = new AbortController();
      
          createCard(deckId, card, abortController.signal);
      
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
      <div className="card-deck ptr-3 pt-3">{list}</div>
      <div className="pt-3">
      <form name="createDeck" onSubmit={handleDeckSubmit}>
        <table className="table table-bordered"> 
        <tr><th>Create a new Deck</th></tr>
          <tr><td>
          <label className="p-3" for="name">Name</label>
          <input name="name"
                  id="name"
                  placeholder="Name"
                  onChange={handleDeckChange}
                  value={deckFormData.name} required />
                  </td></tr>
                  <tr><td>
          <label className="pr-3" for="description">Description</label>
          <input name="description"
                  id="description"
                  placeholder="Description"
                  onChange={handleDeckChange}
                  value={deckFormData.description} required />
                  </td></tr>
                  <tr><td>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  </td></tr>
          </table>
      </form>
      </div>
      {/* <div>{cardList}</div> */}
      <div className="pt-3">
      <form name="createCard" onSubmit={handleCardSubmit}>
        <table className="table table-bordered"> 
        <tr><th>Create a new Card</th></tr>
        <tr><td>
          <label className="p-3" for="name">Deck ID</label>
          <input name="deckId"
                  id="deckId"
                  placeholder="DeckId"
                  onChange={handleCardChange}
                  value={cardFormData.deckId} required />
                  </td></tr>
          <tr><td>
          <label className="p-3" for="name">Front</label>
          <input name="front"
                  id="front"
                  placeholder="Front"
                  onChange={handleCardChange}
                  value={cardFormData.front} required />
                  </td></tr>
                  <tr><td>
          <label className="pr-3" for="description">Back</label>
          <input name="back"
                  id="back"
                  placeholder="Back"
                  onChange={handleCardChange}
                  value={cardFormData.back} required />
                  </td></tr>
                  <tr><td>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  </td></tr>
          </table>
      </form>
      </div>
    </div>
  );
}
export default DeckList;
