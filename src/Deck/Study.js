import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const initialCardValue = 0;
  const [currentCard, setCurrentCard] = useState(initialCardValue);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then((data) => { setDeck(data); setCards(data.cards); console.log(cards); });

    return () => abortController.abort();
  }, []);

  function updateCurrentCard() {
    if (currentCard < cards.length) {
      setCurrentCard((currentCard + 1));
    }
    };
    function handleRestart() {
        const result = window.confirm("Restart Cards? Click cancel to retun to the home page.");
        if (result) {
          setCurrentCard(0);
        } else {
          history.push("/");
        }
      
    };

    return (
      <>
        {
          cards.length > 2 ? <div>
            <h2>{`${deck.name}`}</h2>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title"> Card {currentCard + 1} of {cards.length}</h5>

                <p className="card-text">{isFlipped ? `${cards[currentCard].back}` : `${cards[currentCard].front}`}</p>
                <button className="btn btn-primary" type="button" onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
                {(currentCard + 1) === cards.length ? <button className="btn btn-primary" type="button" onClick={() => handleRestart()}>Start Over</button> : <button className="btn btn-primary" type="button" onClick={() => updateCurrentCard()}>Next Card</button>}
              </div>
            </div>

          </div>
            : <div><h1>{`${deck.name} : Study`}</h1><h3>Not Enough Cards</h3><p>You need at least 3 cards to study. There are only {cards.length} in this deck.</p><button className="btn btn-primary" type="button" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}><svg
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
            </svg>Add Cards</button></div>}
      </>
    )


  }
  export default Study;