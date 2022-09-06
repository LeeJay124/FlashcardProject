import React, {useState} from "react";
import {createDeck, listDecks} from "../utils/api";
import { useHistory} from "react-router-dom";

function CreateDeck(){
    const history = useHistory();
    const initialDeckFormData = {
        name: "", 
        description:""
      };
      const [deckFormData, setDeckFormData]=useState({...initialDeckFormData});
      const handleDeckChange = ({target})=>{
        setDeckFormData({
          ...deckFormData, 
          [target.name]:target.value,
        });   
      };
      const handleDeckCreate = async (deck) => {
        const result = window.confirm("Create this deck?");
        if (result) {
          
              const abortController = new AbortController();
          
              createDeck(deck, abortController.signal).then(listDecks);
          
              history.push("/decks");
        }
      };
      const handleDeckSubmit = (event)=>{
        event.preventDefault();
        handleDeckCreate(deckFormData);
        setDeckFormData({...initialDeckFormData});
      };
      
    return (
        
    <div className="pt-3">
        <form name="createDeck" onSubmit={handleDeckSubmit}>
          <table className="table table-bordered"> 
          <tr><th>Create a new Deck</th></tr>
            <tr><td>
            <label className="p-3" for="name">Name</label>
            <input name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleDeckChange}
                    value={deckFormData.name} required />
                    </td></tr>
                    <tr><td>
            <label className="pr-3" for="description">Description</label>
            <textarea name="description"
                    id="description"
                    rows="5"
                    cols="50"
                    placeholder="Description"
                    onChange={handleDeckChange}
                    value={deckFormData.description} required>
              </textarea>
                    </td></tr>
                    <tr><td>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </td></tr>
            </table>
        </form>
    </div>
    
        
    )
}
export default CreateDeck;