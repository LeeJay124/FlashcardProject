import React from "react";
import Card from "./Card";

function CardList({deck}){
    const {cards} = deck;
    const list = cards.map((card)=> {
        console.log(card);
    return <Card key={card.id} card={card}/>});
    
    return (
<div className="card-deck ptr-3 pt-3">{list}</div>

    )
}
export default CardList;
