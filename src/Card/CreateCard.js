import React, {useState} from "react";

function CreateCard ({handleCardCreate}){
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
        <form name="createCard" onSubmit={handleCardSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Create a new Card</th></tr>
          <tr><td>
            <label className="p-3" htmlFor="deckId">Deck ID</label>
            <input name="deckId"
                    id="deckId"
                    placeholder="DeckId"
                    onChange={handleCardChange}
                    value={cardFormData.deckId} required />
                    </td></tr>
            <tr><td>
            <label className="p-3" fhtmlFor="front">Front</label>
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
    )
}
export default CreateCard;