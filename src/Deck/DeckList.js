import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Deck from "./Deck";
import { listDecks, deleteDeck } from "../utils/api";


function DeckList() {
  const history = useHistory();
  
  const [decks, setDecks] = useState([]);
 
  
  

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks);

    return () => abortController.abort();
  }, []);

  

  const handleDeckDelete = async (id) => {
    const result = window.confirm("Delete this deck?");
    if (result) {

      const abortController = new AbortController();

      deleteDeck(id, abortController.signal);

      history.push("/");
    }
  };
  
const list = decks.map((deck) => <Deck key={deck.id} deck={deck} handleDeckDelete={handleDeckDelete} />);

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

      
          






    </div>
      
  );
}
export default DeckList;
