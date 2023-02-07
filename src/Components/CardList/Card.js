import React from "react";
import { useSelector } from "react-redux";

export default function Card({ data, onClick }) {
  const { title, image, synopsis, genres, trailer, sources } = data;

  const isDark = useSelector((state) => state.theme.dark);
  return (
    <div className={`Card ${isDark ? "Card--Dark" : "Card--Light"}`} onClick={onClick}> 
        <div className="Card__image">
          <img src={image} />
        </div>
        <div className="Card__info">
          <h4 className="Card__title">{title}</h4>
          <p className="Card__genres">{genres.join(" / ")}</p>
        </div>
        {/* <div className="Card__content">
          {synopsis}
        </div> */}
    </div>
  );
}
