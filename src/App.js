import React, { useState, useEffect } from "react";
import Header from "./Component/Header/Header";
import SubHeader from "./Component/Header/SubHeader";
import AddToCart from "./Component/AddCart/AddToCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setFilter(data);
    }

    async function fetchCategories() {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    }

    fetchData();
    fetchCategories();
  }, []);

  const filterProduct = (cat) => {
    if (cat) {
      const updatedList = products.filter((x) => x.category === cat);
      setFilter(updatedList);
    } else {
      setFilter(products);
    }
  };


  return (
    <div>
      <BrowserRouter>
        <Header
          categories={categories}
          filterProduct={filterProduct}
          setFilter={setFilter}
          product={products}
          items={items}
        />
        <Routes>
          <Route
            path="/"
            element={
              <SubHeader
                setItems={setItems}
                products={filter}
              />
            }
          ></Route>
          <Route path="/cart" element={<AddToCart/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
