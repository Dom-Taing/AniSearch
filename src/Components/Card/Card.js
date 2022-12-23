import React from "react";

import "./Card.scss";

export default function Card(props) {
  const { title, image, synopsis, genres, trailer, sources } = props;

  console.log(props);
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-body">
        <h5>{title}</h5>
        <p className="card-genres">
          <strong>Genres:</strong> {genres.join(", ")}
        </p>
        <a href={trailer} target="_blank" rel="noopener noreferrer">
          <button className="card-trailer-button">
            <i className="fab fa-youtube"></i> Watch trailer
          </button>
        </a>
        <div>Synopsis:</div>
        <p>{synopsis}</p>
        <div className="card-buttons">
          {sources.map((item) => {
            return (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <button className="card-source-button">
                  <i className="fas fa-link"></i> Watch on {item.name}
                </button>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}