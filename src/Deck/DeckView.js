import React, {useState, useEffect} from "react";
import {readDeck} from "../utils/api";

function DeckView(){
    const [deck, setDeck] = useState([]);
    useEffect(() => {
        const abortController = new AbortController();
    
        readDeck(abortController.signal).then(setDeck);
    
        return () => abortController.abort();
      }, []);

    return (
        <>Hi</>
    )
}
export default DeckView;