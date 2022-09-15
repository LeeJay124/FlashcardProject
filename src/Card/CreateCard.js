import React, {useState, useEffect} from "react";
import {useParams, useHistory, Link} from "react-router-dom";
import {readDeck, createCard} from "../utils/api";
import CardForm from "./CardForm";

function CreateCard (){
const {deckId} = useParams();
const [deck, setDeck] = useState({});
const history = useHistory();

useEffect(() => {
  const abortController = new AbortController();

  readDeck(deckId, abortController.signal).then((data)=> {setDeck(data); setCardFormData({
    deckId: `${data.id}`, 
        front:"", 
        back:""
  })});

  return () => abortController.abort();
}, []);
  const handleCardCreate = async (card) => {
    //const {deckId} = deckId;
    const result = window.confirm("Create this card?");
    if (result) {

        const abortController = new AbortController();

        createCard(deckId, card, abortController.signal);

        history.push("/");
    }
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
    return (
        <div className="pt-3">
          <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
  </ol>
</nav>
        <CardForm deck={deck} handleCardChange={handleCardChange} handleCardSubmit={handleCardSubmit} handleCardCreate={handleCardCreate} cardFormData={cardFormData} />
        </div>
    )
}
export default CreateCard;