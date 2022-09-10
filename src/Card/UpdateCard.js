import React, {useState, useEffect} from "react";
import {updateCard, readCard} from "../utils/api";
import {useHistory, useParams, Route, useRouteMatch} from "react-router-dom";

function UpdateCard (){
  const {cardId} = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();
    
    const [card, setCard] = useState();
    
    const initialCardFormData = {
        deckId: `${card.deckId}`, 
        id: `${card.id}`,
        front:`${card.front}`, 
        back:`${card.back}`
      };

      useEffect(() => {
        const abortController = new AbortController();
    
        readCard(cardId, abortController.signal).then(setCard);
    
        return () => abortController.abort();
      }, []);

      const [cardFormData, setCardFormData]=useState({...initialCardFormData});
      const handleCardChange = ({target})=>{
        setCardFormData({
          ...cardFormData, 
          [target.name]:target.value,
        });   
      };
      const handleCardUpdate = async (card) => {
        const result = window.confirm("Update this card?");
        if (result) {
          
              const abortController = new AbortController();
          
              updateCard(card, abortController.signal);
          
              history.push("/decks");
        }
      };
      const handleCardSubmit = (event)=>{
        event.preventDefault();
        handleCardUpdate(cardFormData);
        // setCardFormData({...initialCardFormData});
      };
    return (
      <Route path={`${url}`}>
        <div className="pt-3">
        <form name="createCard" onSubmit={handleCardSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Update Card</th></tr>
          <tr><td>
            <label className="p-3" htmlFor="deckId">Deck ID</label>
            <input name="deckId"
                    id="deckId"
                    placeholder="DeckId"
                    onChange={handleCardChange}
                    value={cardFormData.deckId} required readOnly/>
                    </td></tr>
                    <tr><td>
            <label className="p-3" htmlFor="id">Card ID</label>
            <input name="id"
                    id="id"
                    placeholder="id"
                    onChange={handleCardChange}
                    value={cardFormData.id} required readOnly/>
                    </td></tr>
            <tr><td>
            <label className="p-3" htmlFor="front">Front</label>
            <input name="front"
                    id="front"
                    placeholder="Front"
                    onChange={handleCardChange}
                    value={cardFormData.front} required />
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="back">Back</label>
            <input name="back"
                    id="back"
                    placeholder="Back"
                    onChange={handleCardChange}
                    value={cardFormData.back} required />
                    </td></tr>
                    <tr><td>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </td></tr>
                    </tbody>
            </table>
        </form>
        </div>
        </Route>
    )
}
export default UpdateCard;