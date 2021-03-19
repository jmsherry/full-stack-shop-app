import React from "react";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { MenuProvider } from "./contexts/menu.context";
import { ProductsProvider } from "./contexts/products.context";
import "./App.css";

// Pages
import Home from "./pages/Home/Home";
import AddProduct from "./pages/AddProduct/AddProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import NotFound from "./pages/404/404";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <MenuProvider>
          <ProductsProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/product/add" component={AddProduct} />
              <Route path="/product/update/:id" component={UpdateProduct} />
              <Route path="*" component={NotFound} />
            </Switch>
          </ProductsProvider>
        </MenuProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
