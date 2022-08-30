import React, {useState, useEffect} from "react";
// import {Route, Link, useRouteMatch, useParams} from "react-router-dom";
import Deck from "./Deck";
import { listDecks } from "../utils/api";
import NotFound from "../Layout/NotFound";
function DeckList(){
    
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    useEffect(() => {
        const abortController = new AbortController();
    
        listDecks(abortController.signal).then(setDecks).catch(setError);
    
        return () => abortController.abort();
      }, []);
    
      if (error) {
        return <NotFound error={error} />;
      }
    
      const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);
    return (
    <div>
        <button className="btn btn-secondary"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg> 
Create Deck</button>
        <div className="card-deck p-3">{list}</div>
    </div>);
}
export default DeckList;