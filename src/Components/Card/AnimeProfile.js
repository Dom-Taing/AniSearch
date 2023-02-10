import React from "react";
import { useSelector } from "react-redux";

import crunchyroll from "./crunchyroll.png";
import netflix from "./netflix.png";
import amazon from "./amazon.png";
import "./AnimeProfile.scss";

export default function Card({ animeDetail }) {
  const { title, image, synopsis, genres, trailer, sources } = animeDetail;
  const isDark = useSelector((state) => state.theme.dark);

  let movie_img_style = {
    backgroundImage: `url(${image})`,
  };

  let crunchyroll_link;
  let netflix_link;
  for (let i = 0; i < sources.length; i++) {
    if (sources[i].name === "Crunchyroll") {
      crunchyroll_link = sources[i].url;
    } else if (sources[i].name === "Netflix") netflix_link = sources[i].url;
  }

  return (
    <div className={`Profile ${isDark ? "Profile--Dark" : "Profile--Light"}`}>
      <div className="container">
        <div className="cellphone-container">
          <div className="movie">
            {/* <div className="menu">
              <i className="material-icons"></i>
            </div> */}
            <div className="movie-img" style={movie_img_style}></div>
            <div className="text-movie-cont">
              <div className="mr-grid">
                <div className="col1">
                  <h1>{title}</h1>
                  <ul className="movie-gen">
                    <li>PG-13 /</li>
                    <li>2h 49min /</li>
                    <li>{genres.join(" / ")}</li>
                  </ul>
                </div>
              </div>
              <div className="mr-grid action-row">
                <div className="col2">
                  <div
                    className="watch-btn"
                    onClick={() => {
                      window.open(trailer, "_blank");
                    }}
                  >
                    <h3>
                      <i className="material-icons">&#xE037;</i>WATCH TRAILER
                    </h3>
                  </div>
                </div>
                {crunchyroll_link && (
                  <div className="col6 action-btn crunchyroll">
                    {/* <i className="material-icons">&#xE80D;</i> */}
                    <img
                      src={crunchyroll}
                      className="icon"
                      onClick={() => {
                        window.open(crunchyroll_link, "_blank");
                      }}
                    />
                  </div>
                )}
                {netflix_link && (
                  <div className="col6 action-btn netflix">
                    {/* <i className="material-icons">&#xE866;</i> */}
                    <img
                      src={netflix}
                      className="icon"
                      onClick={() => {
                        window.open(netflix_link, "_blank");
                      }}
                    />
                  </div>
                )}
                {/* <div className="col6 action-btn">
                  <img src={amazon} className="icon" />
                </div> */}
              </div>
              <div className="mr-grid summary-row">
                <div className="col2">
                  <h5>SUMMARY</h5>
                </div>
                <div className="col2">
                  <ul className="movie-likes">
                    <li>
                      <i className="material-icons">&#xE813;</i>124
                    </li>
                    <li>
                      <i className="material-icons">&#xE813;</i>3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mr-grid">
                <div className="col1">
                  <p className="movie-description">{synopsis}</p>
                </div>
              </div>
              {/* <div className="mr-grid actors-row">
                <div className="col1">
                  <p className="movie-actors">
                    Matthew McConaughey, Anne Hathaway, Jessica Chastain
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="card">
  //     <img src={image} alt={title} />
  //     <div className="card-body">
  //       <h5>{title}</h5>
  //       <p className="card-genres">
  //         <strong>Genres:</strong> {genres.join(", ")}
  //       </p>
  //       <a href={trailer} target="_blank" rel="noopener noreferrer">
  //         <button className="card-trailer-button">
  //           <i className="fab fa-youtube"></i> Watch trailer
  //         </button>
  //       </a>
  //       <div>Synopsis:</div>
  //       <p>{synopsis}</p>
  //       <div className="card-buttons">
  //         {sources.map((item) => {
  //           return (
  //             <a href={item.url} target="_blank" rel="noopener noreferrer">
  //               <button className="card-source-button">
  //                 <i className="fas fa-link"></i> Watch on {item.name}
  //               </button>
  //             </a>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}
