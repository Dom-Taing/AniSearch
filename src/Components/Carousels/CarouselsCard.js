import React from "react";

export default function CarouselsCard({
  data,
  myRef = null,
  ariaLabel,
  onClick,
}) {
  const { image, title } = data;
  // const image = "https://wallpapercave.com/wp/wp5492863.jpg";
  // const title = "demon Slayer";

  function handleClick() {
    onClick(data);
  }

  return (
    <div
      className="Carousels--Card"
      ref={myRef}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <img
        // src={"https://wallpapercave.com/wp/wp5492863.jpg"}
        src={image}
        className="Carousels--Card__image"
      />
      <div className="Carousels--Card__title">{title}</div>
    </div>
  );
}
