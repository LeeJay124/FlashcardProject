import React from "react";
import Card from "./Card";

function CardList({deck}){
    const {cards} = deck;
    const list = cards.map((card)=> <Card card={card}/>);
    console.log(cards);
    return (
<div className="card-deck ptr-3 pt-3">{list}</div>
//<>Hi</>
    )
}
export default CardList;
