import React from "react";
import { CloseIcon, HamburgerIcon, SmallDotdotLogo } from "../../images/svg";

/**
 *
 */
const Hamburger = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const openHamburgerHandler = () => {
    setIsOpen(true);
  };

  const closeHamburgerHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openHamburgerHandler}>
        <HamburgerIcon />
      </button>
      <div className={`hamburger wrap${isOpen ? " active" : ""}`}>
        <div className="title">
          <SmallDotdotLogo />
          <button onClick={closeHamburgerHandler}>
            <CloseIcon />
          </button>
        </div>
      </div>
      {isOpen && <div className={`hamburger dim${isOpen ? " active" : ""}`} />}
    </>
  );
};

export default Hamburger;

