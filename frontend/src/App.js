import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as categoryActions from "./store/category";
import * as productActions from "./store/product";
import * as cartItemActions from "./store/cartItem";
import * as wishlistActions from "./store/wishlist";
import { Route, Switch } from "react-router-dom";
// import LoginForm from "./components/LoginFormModal/LoginForm";
// import SignupFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import HomePage from "./components/HomePage";
import CarouselSwiper from "./components/CarouselSwiper";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import WishlistPage from "./components/WishlistPage";
import SearchPage from "./components/SearchPage";
import NotFoundPage from "./components/NotFoundPage";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    // localStorage.setItem("cart", localStorage.getItem('cart'));
    dispatch(categoryActions.fetchCategories());
    dispatch(productActions.fetchProducts());
    // if (user) dispatch(cartItemActions.fetchCartItems(user.id));
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(cartItemActions.fetchCartItems(user.id));
      // dispatch(wishlistActions.fetchWishlists(user.id));
    }
  }, [user]);

  return (
    // <h1>Hello from App</h1>
    <>
      <Navigation />
      {/* <CarouselSwiper /> */}
      <Switch>
        <Route exact path={`/search`} component={SearchPage} />
        <Route exact path={`/cart`} component={CartPage} />
        <Route exact path={`/category/:category`} component={CategoryPage} />
        <Route exact path={`/wishlist`} component={WishlistPage} />
        <Route exact path={`/404`} component={NotFoundPage} />
        <Route exact path={`/:productId`} component={ProductPage} />
        <Route path="/" component={HomePage} />
        {/* <Route path="/login" component={LoginForm} /> */}
        {/* <Route path="/signup" component={SignupFormPage} /> */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
