import React from "react";

export default function Card({ data }) {
  const { title, image, synopsis, genres, trailer, sources } = data;
  return (
    <div className="Card">
      {title}
        <div className="Card__genres"></div>
        <div className="Card__image">
          <img src={image} />
        </div>
        <div className="Card__content">
          {synopsis}
        </div>
    </div>
  );
}
