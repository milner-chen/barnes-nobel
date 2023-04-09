import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as categoryActions from "./store/category";
import * as productActions from "./store/product";
import { Route, Switch } from "react-router-dom";
// import LoginForm from "./components/LoginFormModal/LoginForm";
// import SignupFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import HomePage from "./components/HomePage";
import CarouselSwiper from "./components/CarouselSwiper";
import CartPage from "./components/CartPage";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.fetchCategories());
    dispatch(productActions.fetchProducts());
  }, [dispatch])

  return (
    // <h1>Hello from App</h1>
    <>
      <Navigation />
      {/* <CarouselSwiper /> */}
      <Switch>
        <Route exact path={`/cart`} component={CartPage} />
        <Route exact path={`/category/:category`} component={CategoryPage} />
        <Route exact path={`/:productId/`} component={ProductPage} />
        <Route path="/" component={HomePage} />
        {/* <Route path="/login" component={LoginForm} /> */}
        {/* <Route path="/signup" component={SignupFormPage} /> */}
      </Switch>
    </>
  );
}

export default App;
