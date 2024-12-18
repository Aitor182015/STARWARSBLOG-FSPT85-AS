import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img src="https://cdn.worldvectorlogo.com/logos/star-wars.svg" alt="Star Wars" style={{ width: "80px", height: "auto" }} />
				</span>
			</Link>
			<div className="ml-auto">
				<Link to="/">
					<button className="btn btn-primary">Favorites *numero*</button>
				</Link>
			</div>
		</nav>
	);
};
