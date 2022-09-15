import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
 
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const initialCardValue = 0;
  const [currentCard, setCurrentCard] = useState(initialCardValue);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then((data) => { setDeck(data); setCards(data.cards); });

    return () => abortController.abort();
  }, []);

  function updateCurrentCard() {
    console.log(currentCard + "before");
    if ((currentCard + 1)  < cards.length) {
      setCurrentCard((currentCard + 1));
      console.log(currentCard + "after");
      setIsFlipped(false);
    }
    else{
      handleRestart();
    }
    };
    function handleRestart() {
        const result = window.confirm("Restart Cards? Click cancel to retun to the home page.");
        if (result) {
          setCurrentCard(0);
          setIsFlipped(false);
        } else {
          history.push("/");
        }
      
    };

    return (
      <div>
        {
          cards.length > 2 ? <div>
            <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{ deck && deck.name && deck.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Study</li>
  </ol>
</nav>
            <h2>Study: {`${deck.name}`}</h2>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> Card {currentCard + 1} of {cards.length}</h5>

                <p className="card-text">{isFlipped ? `${cards[currentCard].back}` : `${cards[currentCard].front}`}</p>
                <button className="btn btn-primary mr-3" type="button" onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
               {isFlipped ?  <button className="btn btn-primary" type="button" onClick={()=> updateCurrentCard()}>Next Card</button> : ""}
               {/* {isFlipped ? {(currentCard + 1) === cards.length ? <button className="btn btn-primary" type="button" onClick={() => handleRestart()}>Start Over</button> : <button className="btn btn-primary" type="button" onClick={() => updateCurrentCard()}>Next Card</button>} : ""} */}

              </div>
            </div>

          </div>
            : <div><nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
          </svg>Home</Link></li>
              <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
          </nav><h1>{`${deck.name} : Study`}</h1><h3>Not Enough Cards</h3><p>You need at least 3 cards to study. There are only {cards.length} in this deck.</p><button className="btn btn-primary" type="button" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}><svg
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
      </div>
    )


  }
  export default Study;