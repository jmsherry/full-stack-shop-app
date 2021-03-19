import React, { createContext, useState, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const ProductsContext = createContext({
  fetchProducts: () => [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  loaded: false,
  loading: false,
  error: null,
  products: [],
});

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();

  const fetchProducts = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch("/api/v1/products");
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      setProducts(data);
      // setLoading(false);
      // console.log('products from context', products);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded("true");
    }
  }, [error, loaded, loading]);

  const addProduct = useCallback(
    async (formData) => {
      try {
        const response = await fetch("/api/v1/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedProduct = await response.json();
        console.log("got data", savedProduct);
        setProducts([...products, savedProduct]);
        addToast(`Saved ${savedProduct.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        addToast(`Error ${err.message || err.statusText}`, {
          appearance: "error",
        });
      }
    },
    [addToast, products]
  );

  const updateProduct = useCallback(
    async (id, updates) => {
      let newProduct = null;
      try {
        const response = await fetch(`/api/v1/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updates),
        });
        if (response.status !== 200) {
          throw response;
        }
        // Get index
        const index = products.findIndex((product) => product._id === id);

        // Get actual product
        const oldProduct = products[index];
        console.log(
          "🚀 ~ file: products.context.js ~ line 95 ~ updateProduct ~ oldProduct",
          oldProduct
        );

        // Merge with updates
        newProduct = {
          // legit use of 'var', so can be seen in catch block
          ...oldProduct,
          ...updates, // order here is important for the override!!
        };
        console.log(
          "🚀 ~ file: products.context.js ~ line 99 ~ updateProduct ~ newProduct",
          newProduct
        );
        // recreate the products array
        const updatedProducts = [
          ...products.slice(0, index),
          newProduct,
          ...products.slice(index + 1),
        ];
        console.log("🚀 ~ file: products.context.js ~ line 120 ~ updatedProducts", updatedProducts)
        setProducts(updatedProducts);
        addToast(`Updated ${newProduct.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        addToast(`Error: Failed to update ${newProduct.title}`, {
          appearance: "error",
        });
      }
    },
    [addToast, products]
  );

  const deleteProduct = useCallback(
    async (id) => {
      let deletedProduct = null;
      try {
        const response = await fetch(`/api/v1/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = products.findIndex((product) => product._id === id);
        deletedProduct = products[index];
        // recreate the products array without that product
        const updatedProducts = [
          ...products.slice(0, index),
          ...products.slice(index + 1),
        ];
        setProducts(updatedProducts);
        addToast(`Deleted ${deletedProduct.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        addToast(`Error: Failed to update ${deletedProduct.title}`, {
          appearance: "error",
        });
      }
    },
    [addToast, products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
