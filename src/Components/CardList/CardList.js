import React from "react";
import Card from "./Card";

export default function CardList(datas) {
  return (
    <div>
        {datas.map(data => {
            return <Card data={data} />
        })}
    </div>
  );
}
