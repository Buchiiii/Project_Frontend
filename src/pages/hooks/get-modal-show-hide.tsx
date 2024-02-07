import { useState } from "react";

export const GetModalShowHide = () => {
  const [show, setShow] = useState(false);
  const handleshow = () => {
    setShow(true);
  };

  const handlehide = () => {
    setShow(false);
  };

  return { show, handlehide, handleshow };
};

