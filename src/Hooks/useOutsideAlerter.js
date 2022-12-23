import { useEffect } from "react";

export function useOutsideAlerter(
  ref,
  outSideCallback,
  insideCallback
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        // console.log("you click outside");
        outSideCallback();
      }
    }

    function handleClickInside(event) {
      if (ref.current && ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        // console.log("you click inside");
        insideCallback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickInside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
