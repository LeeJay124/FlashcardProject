import React, {useState} from "react";
import {createDeck} from "../utils/api";
import { Link, useHistory} from "react-router-dom";

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
          
              createDeck(deck, abortController.signal);
          
              history.push("/decks");
        }
      };
      const handleDeckSubmit = (event)=>{
        event.preventDefault();
        handleDeckCreate(deckFormData);
        setDeckFormData({...initialDeckFormData});
      };
      
    return (
      
         
        <div>
    <div className="pt-3">
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill mr-3" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>Home</Link></li>
    
    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
  </ol>
</nav>
        <form name="createDeck" onSubmit={handleDeckSubmit}>
          <table className="table table-bordered"> 
          <tbody>
          <tr><th>Create a new Deck</th></tr>
            <tr><td>
            <label className="p-3" htmlFor="name">Name</label>
            <input name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleDeckChange}
                    value={deckFormData.name} required />
                    </td></tr>
                    <tr><td>
            <label className="pr-3" htmlFor="description">Description</label>
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
                    <button type="submit" className="btn btn-primary mr-3">Submit</button>
                    <button  type="button" onClick={()=> history.goBack()} className="btn btn-danger">Cancel</button>

                    </td></tr>
                    </tbody>
            </table>
        </form>
    </div>
    
    </div>   
    
        
    )
}
export default CreateDeck;