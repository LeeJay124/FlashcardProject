import React, {useState, useEffect} from "react";
import {updateCard, readCard, readDeck} from "../utils/api";
import {useHistory, useParams, Link} from "react-router-dom";

function UpdateCard (){
  const {cardId, deckId} = useParams();
    const history = useHistory();
   
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    
    const initialCardFormData = {
         
        id: ``,
        front:``, 
        back:``,
        deckId: ``
      };
      useEffect(() => {
        const abortController = new AbortController();
    
        readDeck(deckId, abortController.signal).then((data)=>{setDeck(data);});
    
        return () => abortController.abort();
      }, []);

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
          <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>Home</Link></li>
    <li className="breadcrumb-item"><Link to={`/decks/${card.deckId}`}>{deck.name}</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
  </ol>
</nav>
        <form name="updateCard" onSubmit={handleCardSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Edit Card</th></tr>
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
                    <button type="submit" className="btn btn-primary mr-3">Submit</button>
                    <button  type="button" onClick={()=> history.goBack()} className="btn btn-danger">Cancel</button>

                    </td></tr>
                    </tbody>
            </table>
        </form>
        </div>
        
    )
}
export default UpdateCard;