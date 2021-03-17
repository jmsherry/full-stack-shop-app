import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log("getting");
      try {
        const response = await fetch("/api/v1/products");
        console.log(
          "🚀 ~ file: App.js ~ line 12 ~ getData ~ response",
          response
        );

        if (!response.ok) throw response;

        const data = await response.json();
        console.log("🚀 ~ file: App.js ~ line 15 ~ getData ~ data", data);
        setProducts(data);
      } catch (err) {
        console.log("error", err.message || err.statusText);
      }
    };
    getData();
  }, [setProducts]);
  return (
    <div className="App">
      <h1>Products</h1>
      <ul>
        {products.map(({ title, price }) => (
          <li key={title}>
            {title} (£{price.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
