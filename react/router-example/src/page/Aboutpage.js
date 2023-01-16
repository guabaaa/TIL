import React from "react";
import { useNavigate } from "react-router-dom";

const Aboutpage = () => {
  const navigate = useNavigate();
  const goToHomepage = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>About page!</h1>
      <button onClick={goToHomepage}>Go to Gomepage</button>
    </div>
  );
};

export default Aboutpage;
