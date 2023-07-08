import React, { useRef, useCallback, useEffect, useState } from "react";
import CarouselsCard from "./CarouselsCard";
import "./Carousels.scss";
import { useSelector } from "react-redux";

import variables from "../../Style/colors.scss";

const array = Array(20).fill({
  image: "https://wallpapercave.com/wp/wp5492863.jpg",
  title: "demon slayer",
});

export default function Carousels({
  dataList = array,
  title = {},
  onClickCard,
  lastEle,
  containerRef,
}) {
  // cardElements
  const cardElements = useRef([]);
  const isDark = useSelector((state) => state.theme.dark);

  // this create an array of size data list
  useEffect(() => {
    cardElements.current = cardElements.current.slice(0, dataList.length);
  }, [dataList]);

  const [displayButtonsLeft, setDisplayButtonsLeft] = useState(true);
  const [displayButtonsRight, setDisplayButtonsRight] = useState(true);

  const handleObserver = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        let index = +entry.target.ariaLabel.match(/\d/g).join("");
        cardElements.current[index] = {
          ...cardElements.current[index],
          isVisible: entry.isIntersecting,
        };
        if (index === 0) {
          setDisplayButtonsLeft(!entry.isIntersecting);
        }
        if (index === dataList.length - 1) {
          setDisplayButtonsRight(!entry.isIntersecting);
        }
      });
    },
    [dataList]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    cardElements.current.map((ele) => {
      if (ele.element) observer.observe(ele.element);
    });
  }, [handleObserver]);

  function moveBack() {
    let afterVisible = true;
    let nextIndexToShow = 0;
    // we're going backward through elements that are visible to find the next elements to display
    for (let i = cardElements.current.length - 1; i >= 0; i--) {
      if (cardElements.current[i].isVisible) {
        afterVisible = false;
      }
      if (!cardElements.current[i].isVisible && !afterVisible) {
        nextIndexToShow = i;
        break;
      }
    }
    // nextIndexToShow += 1;
    // console.log(nextIndexToShow);
    cardElements.current[nextIndexToShow].element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }

  function moveForward() {
    let beforeVisible = true;
    let nextIndexToShow = cardElements.current.length;
    for (let i = 0; i < cardElements.current.length; i++) {
      if (cardElements.current[i].isVisible) {
        beforeVisible = false;
      }
      if (!cardElements.current[i].isVisible && !beforeVisible) {
        nextIndexToShow = i;
        break;
      }
    }
    // nextIndexToShow -= 1;
    cardElements.current[nextIndexToShow].element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  }

  function handleClickCard(data) {
    onClickCard(data);
  }

  // useEffect(() => console.log("carousels", lastEle));
  if (!dataList) return null;

  return (
    <div
      className={`Carousels--Wrapper ${
        isDark ? "Carousels--Wrapper--Dark" : "Carousels--Wrapper--Light"
      }`}
    >
      <div className="Carousels__Title">
        <h2>{title}</h2>
        <div className="Carousels__Title--line"></div>
      </div>
      <div className="Carousels">
        <div className="Carousels__buttonWrapper">
          <button
            className="Carousels__button"
            style={{
              display: `${displayButtonsLeft ? "block" : "none"}`,
            }}
          >
            <i
              className="Carousels_buttonIcon fa fa-angle-left"
              onClick={moveBack}
            ></i>
          </button>
        </div>
        <div className="Carousels__list" ref={containerRef}>
          {dataList.map((ele, index, array) => {
            return (
              <CarouselsCard
                myRef={(el) =>
                  (cardElements.current[index] = {
                    ...cardElements.current[index],
                    element: el,
                  })
                }
                key={index}
                ariaLabel={index + " card"}
                data={ele}
                onClick={handleClickCard}
              />
            );
          })}
          <div ref={(el) => (lastEle ? (lastEle.current = el) : null)}></div>
        </div>
        <div className="Carousels__buttonWrapper">
          <button
            onClick={moveForward}
            className="Carousels__button"
            style={{
              display: `${displayButtonsRight ? "block" : "none"}`,
            }}
          >
            <i className="Carousels_buttonIcon fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
