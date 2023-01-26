import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, deleteFromCart } from "../Redux/CreateCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Badge, Table, Card, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddToCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  let subtotal = 0;
  items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  const total = subtotal;

  const handleUpdate = (itemId, quantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: quantity }));
  };

  const handleDelete = (itemId) => {
    dispatch(deleteFromCart(itemId));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="text-center">
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Image
                      src={item.image}
                      alt={item.title}
                      thumbnail
                      style={{ width: "100px" }}
                    />
                  {item.title.slice(0, 12)}...
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleUpdate(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>{" "}
                    <Badge variant="secondary">{item.quantity}</Badge>{" "}
                    <Button
                      variant="success"
                      onClick={() => handleUpdate(item.id, item.quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-md-4">
          <Card>
            <Card.Body>
              <Card.Title>Cart Totals</Card.Title>
              <hr />
              <Card.Text>Subtotal: ${subtotal.toFixed(2)}</Card.Text>
              <hr />
              <Card.Text>Total: ${total.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AddToCart;
