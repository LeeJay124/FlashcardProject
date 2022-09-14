import React, {useState, useEffect} from "react";
import Card from "./Card";
import { deleteCard, createCard, readDeck } from "../utils/api";
import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import CreateCard from "./CreateCard";
import UpdateCard from "./UpdateCard";

function CardList() {
    const { deckId } = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
      const abortController = new AbortController();
  
      readDeck(deckId, abortController.signal).then((data) => { setDeck(data); setCards(data.cards); });
  
      return () => abortController.abort();
    }, []);
  
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
        <div className="pt-3">
          <h2>Cards</h2>
        <div className="card-deck ptr-3 pt-3">{list}</div>
        <Route path={`${url}/cards/new`}><CreateCard  deck={deck} handleCardCreate={handleCardCreate}/></Route>
        <Route path={`${url}/cards/:cardId/edit`}><UpdateCard /></Route>
        </div>
    )
}
export default CardList;
