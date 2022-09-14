import React, {useState, useEffect} from "react";
import {updateCard, readCard} from "../utils/api";
import {useHistory, useParams, Route, useRouteMatch} from "react-router-dom";

function UpdateCard (){
  const {cardId, deckId} = useParams();
    const history = useHistory();
    const {url} = useRouteMatch();
    
    const [card, setCard] = useState({});
    
    const initialCardFormData = {
         
        id: ``,
        front:``, 
        back:``,
        deckId: ``
      };

      useEffect(() => {
        const abortController = new AbortController();
    
        readCard(cardId, abortController.signal).then((data)=>{setCard(data); setCardFormData({
          
          id: `${data.id}`,
          front:`${data.front}`, 
          back:`${data.back}`, 
          deckId: `${data.deckId}`
        })});
    
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
      
        <div className="pt-3">
        <form name="updateCard" onSubmit={handleCardSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Update Card</th></tr>
          <tr><td>
            <label className="p-3" htmlFor="deckId">Deck ID</label>
            <input name="deckId"
                    id="deckId"
                    
                    
                    value={cardFormData.deckId} required readOnly/>
                    </td></tr>
                    <tr><td>
            <label className="p-3" htmlFor="id">Card ID</label>
            <input name="id"
                    id="id"
                    
                    
                    value={cardFormData.id} required readOnly/>
                    </td></tr>
            <tr><td>
            <label className="p-3" htmlFor="front">Front</label>
            <textarea name="front"
                    id="front"
                    placeholder="Front"
                    rows="5"
                  cols="50"
                    onChange={handleCardChange}
                    value={cardFormData.front} required></textarea>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="back">Back</label>
            <textarea name="back"
                    id="back"
                    placeholder="Back"
                    rows="5"
                  cols="50"
                    onChange={handleCardChange}
                    value={cardFormData.back} required></textarea>
                    </td></tr>
                    <tr><td>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                    <button  type="button" onClick={()=> history.goBack()} className="btn btn-danger">Cancel</button>

                    </td></tr>
                    </tbody>
            </table>
        </form>
        </div>
        
    )
}
export default UpdateCard;