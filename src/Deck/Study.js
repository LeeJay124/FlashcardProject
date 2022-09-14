import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then((data) => { setDeck(data); setCards(data.cards); console.log(cards); });

    return () => abortController.abort();
  }, []);

  function updateCurrentCard() {
    setCurrentCard((currentCard + 1));
  };

  return (
<>
    {
      cards.length > 2 && <div>
        <h2>{`${deck.name}`}</h2>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title"></h5>

            <p className="card-text">{isFlipped ? `${cards[0].front}` : `${cards[0].back}` }</p>
            <button className="btn btn-primary" type="button" onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
            <button className="btn btn-primary" type="button" onClick={() => updateCurrentCard()}>Next Card</button>
          </div>
        </div>

      </div>
    }
</>
  )


}
export default Study;