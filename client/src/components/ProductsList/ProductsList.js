import React, { useContext, useEffect } from "react";
import { ProductsContext } from "./../../contexts/products.context";
import { productCategories } from "../../constants";
import { formatPrice } from "./../../utils";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
  },
  categoriesList: {
    listStyle: "none",
    padding: 0,
  },
  itemList: {
    listStyle: "none",
    padding: 0,
  },
  categoryTitle: {
    textTransform: "capitalize",
  },
}));

function ProductsList() {
  const classes = useStyles();
  const { products, loaded, fetchProducts, loading, error, deleteProduct } = useContext(
    ProductsContext
  );
  const productsByCategory = {};

  console.log("products", products);

  useEffect(() => {
    console.log("in useEffect", products, loaded);
    if (!loaded) {
      fetchProducts();
    }
  }, [loaded, fetchProducts, products]);

  if (products.length === 0) {
    return <p>No products to display</p>;
  }

  //
  for (const category of productCategories) {
    productsByCategory[category] = products.filter(
      (product) => product.category === category
    );
  }
  // console.log("productCategories", productCategories);
  // console.log("productsByCategory", productsByCategory);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const sections = Object.keys(productsByCategory).map((category) => {
    console.log(
      "🚀 ~ file: ProductsList.js ~ line 37 ~ sections ~ category",
      category
    );
    // console.log('cat', category, productsByCategory[category].map(({ _id, title, price }) => (
    //         <li key={_id}>
    //           {title} (£{price})
    //         </li>
    //       )));
    return (
      <li key={category}>
        <h2 className={classes.categoryTitle}>{category}</h2>
        <ul className={classes.itemList}>
          {productsByCategory[category].map(({ _id, title, price }) => (
            <li key={_id}>
              {title} ({formatPrice(price)})
              <IconButton aria-label="update" href={`/product/update/${_id}`}>
                <Edit />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => deleteProduct(_id)} >
                <Delete />
              </IconButton>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return <ul className={classes.categoriesList}>{sections}</ul>;
}

export default ProductsList;
