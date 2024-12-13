import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {

	return (
    <div className="mt-5">
      <h1>Characters</h1>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDjQxUOscXedOrxZlbdL8-wkdNsLDeETQMQ&s"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
      
      <h1>Planets</h1>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQ_1IkKVG8c_TkzcptmCKJ6PcCjL1HMj0Ng&s"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
      
      <Link to="/detailedView">Go to Detailed View</Link>
    </div>
  );
};
