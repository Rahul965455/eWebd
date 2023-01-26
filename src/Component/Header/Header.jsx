import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {


  const [selectedOption, setSelectedOption] = useState("");
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    props.filterProduct(e.target.value);
  };
  const handleReset = () => {
    setSelectedOption("");
    setSearch("");
    props.setFilter(props.product);
  };
  const handleSearch = () => {
    if (!search) {
      props.setFilter(props.product);
    } else {
      const filteredProducts = props.product.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      props.setFilter(filteredProducts);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Header
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end gap-3" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <input
              type="text"
              placeholder="Search products"
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch();
              }}
            />
          </li>
        </ul>
        <ul class="navbar-nav gap-2">
          <li className="nav-item">
            <select
              className="form-control"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              {props.categories &&
                props.categories.map((product) => (
                  <option value={product}>{product}</option>
                ))}
            </select>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
          </li>
          <li className="nav-item">
            <NavLink to="/cart" className="btn btn-primary">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
