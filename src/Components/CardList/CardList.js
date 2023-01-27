import React from "react";
import Card from "./Card";
import "./Card.scss"

export default function CardList({datas, onClickCard}) {
  return (
    <div className="CardList--container">
    <div className="CardList">
        {datas.map(data => {
            return <div className="Card--container">
            <Card key={data.id} data={data} onClick={() => {onClickCard(data.id)}}/>
            </div>
        })}
    </div>
    </div>
  );
}
