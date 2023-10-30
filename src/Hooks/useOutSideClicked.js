import { useEffect } from "react";

function useOutSideClicked(ref, setShowBooking, id, showBooking) {
  useEffect(() => {
    function handleOutSideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id != id
      ) {
        setShowBooking(false);
      }
    }
    document.addEventListener("mousedown", handleOutSideClick);
    !showBooking
      ? document.removeEventListener("mousedown", handleOutSideClick)
      : "";

    return;
  }, []);
}

export default useOutSideClicked;
