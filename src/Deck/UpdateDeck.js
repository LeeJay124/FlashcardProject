import React, { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../utils/api";
import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";

function UpdateDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then((data) => {
      setDeck(data);
      setDeckFormData({
        id: `${data.id}`,
        name: `${data.name}`,
        description: `${data.description}`
      })
    });
    return () => abortController.abort();
  }, []);

  const initialDeckFormData = {
    id: ``,
    name: ``,
    description: ``
  };
  const [deckFormData, setDeckFormData] = useState({ ...initialDeckFormData });
  const handleDeckChange = ({ target }) => {
    setDeckFormData({
      ...deckFormData,
      [target.name]: target.value,
    });
  };
  const handleDeckUpdate = async (deck) => {
    const result = window.confirm("Update this deck?");
    if (result) {

      const abortController = new AbortController();

      updateDeck(deck, abortController.signal);

      history.push("/decks");
    }
  };
  const handleDeckSubmit = (event) => {
    event.preventDefault();
    handleDeckUpdate(deckFormData);
    // setDeckFormData({...initialDeckFormData});
  };

  return (


    <>


      <div className="pt-3">
        <form name="updateDeck" onSubmit={handleDeckSubmit}>
          <table className="table table-bordered">
            <tbody>
              <tr><th>Update Deck</th></tr>
              <tr><td>
                <label className="p-3" htmlFor="id">ID</label>
                <input name="id"
                  id="id"
                  type="text"
                  placeholder="ID"

                  value={deckFormData.id} required readOnly />
              </td></tr>
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
                <button type="submit" className="btn btn-primary">Submit</button>
                <button  type="button" onClick={()=> history.goBack()} className="btn btn-danger">Cancel</button>
              </td></tr>
            </tbody>
          </table>
        </form>
      </div>


    </>


  )
}
export default UpdateDeck;