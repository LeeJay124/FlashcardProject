import React from "react";
import Card from "./Card";
import { deleteCard, createCard } from "../utils/api";
import { Link, Route, useHistory, useRouteMatch } from "react-router-dom";
import CreateCard from "./CreateCard";

function CardList({ deck }) {
    const { cards } = deck;
    const history = useHistory();
    const {url} = useRouteMatch();

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

            history.push("/decks");
        }
    };

    const list = cards.map((card) => {
        return <Card key={card.id} card={card} handleCardDelete={handleCardDelete} />
    });

    return (
        <div className="pt-3"><Link to={`${url}/cards/new`}>
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
          Create Card
        </button></Link>
        <div className="card-deck ptr-3 pt-3">{list}</div>
        <Route path={`${url}/cards/new`}><CreateCard  deck={deck} handleCardCreate={handleCardCreate}/></Route>
        </div>
    )
}
export default CardList;
