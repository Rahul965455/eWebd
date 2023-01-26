import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../Redux/CreateCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const SubHeader = ({products }) => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();
  const handleChecked = (e, prod) => {
    if (e.target.checked === true) {
      let updatedQuantity = quantity[prod.id] === 0 ? 1 : quantity[prod.id];
      setProduct([...product, { ...prod, quantity: updatedQuantity }]);
      dispatch(addToCart({ ...prod, quantity: updatedQuantity }));
    } else if (e.target.checked === false) {
      setProduct(
        product.filter((e) => {
          return e.id !== prod.id;
        })
      );
      dispatch(deleteFromCart(prod.id));
    }
  };

  const handleQuantity = (e, prodId) => {
    setQuantity({ ...quantity, [prodId]: e.target.value });
  };

  return (
    <div>
      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr className="text-center">
            <th scope="col" style={{ width: "16.66%" }}>
              Image
            </th>
            <th scope="col" style={{ width: "16.66%" }}>
              Name
            </th>
            <th scope="col" style={{ width: "16.66%" }}>
              Price
            </th>
            <th scope="col" style={{ width: "16.66%" }}>
       Rating
            </th>
            <th scope="col" style={{ width: "16.66%" }}>
              Select
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="text-center">
              <td>
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{prod.title}</td>
              <td>{prod.price}</td>
              <td>{prod.rating.rate}</td>
              <div >
              <td className="p-2">
                <input
                className="text-center"
                  type="text"
                  placeholder="Quantity"
                  onChange={(e) => handleQuantity(e, prod.id)}
                  value={quantity[prod.id] || ""}
                />
              </td>
              <td className="p-2"><FontAwesomeIcon icon={faShoppingCart} /></td>
              <td className="p-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleChecked(e, prod)}
                />
              </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SubHeader;
