import React from "react";
import {useHistory} from "react-router-dom";


function CardForm ({cardFormData, handleCardChange, handleCardSubmit}){
const history = useHistory();
    return (

        <form name="createCard" onSubmit={handleCardSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Add/Edit a Card</th></tr>
          <tr><td>
            <label className="p-3" htmlFor="deckId">Deck ID</label>
            <input name="deckId"
                    id="deckId"
                    placeholder="DeckId"
                    onChange={handleCardChange}
                    value={cardFormData.deckId} required readOnly/>
                    </td></tr>
            <tr><td>
            <label className="p-3" htmlFor="front">Front</label>
            <textarea name="front"
                    id="front"
                    placeholder="Front"
                    onChange={handleCardChange}
                    value={cardFormData.front} required></textarea>
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="back">Back</label>
            <textarea name="back"
                    id="back"
                    placeholder="Back"
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
    );
}
export default CardForm;