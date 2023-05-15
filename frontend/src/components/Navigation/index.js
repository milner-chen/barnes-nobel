// import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import './Navigation.css'
import * as categoryActions from "../../store/category";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCartItems, getItemsCount } from "../../store/cartItem";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SearchBar from "../SearchBar";

const Navigation = () => {
    const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.user);

    // let links;
    // currentUser ? links = <ProfileButton user={ currentUser } />
    //             : links = (
    //                 <>
    //                     <NavLink to="/login">Log In</NavLink>
    //                     <NavLink to="/signup">Sign Up</NavLink>
    //                 </>
    //             )

    const categories = useSelector(state => Object.keys(state.category));
    const user = useSelector(state => state.session?.user);
    let sum = useSelector(getItemsCount);
    // console.log("cats:", categories);

    const [showList, setShowList] = useState(false);
    const closeList = () => {
        setShowList(false);
    }

    const handleWish = () => {
        if (user?.id && showList) {
            
        }
    }

    return (
        <div className="nav">
            {/* <div className="top-slider"></div> */}
            <ul className="mid-nav-bar">
                <ProfileButton />
                <p>|</p>
                    {user?.id && (
                    <NavLink exact to="/wishlist"  className="nav-wishlist" >
                        <i className="fa-regular fa-heart" />
                        <p>WISHLIST</p>
                    </NavLink>)}
                    {!user?.id && (
                        <div className="nav-wishlist" onClick={() => setShowList(true)}>
                            <i className="fa-regular fa-heart" />
                            <p>WISHLIST</p>
                        </div>
                    )}
                    {showList && !user?.id && (
                        <Modal onClose={closeList} >
                            <LoginForm />
                        </Modal>
                    )}

            </ul>
            <ul className="logo">
                <NavLink exact to="/"><h1>Barnes<span>&#38;</span>Nobel</h1></NavLink>
                {/* <div className="search-bar">
                    <input
                    type="text"
                    placeholder="Search by Title, Author, or Keyword"
                    />
                </div> */}
                <SearchBar />
                <div className="nav-links">
                    {/* <div className="social-links"> */}
                        <a target="_blank" href="https://github.com/milner-chen/barnes-nobel/">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/milner-chen-841330216/">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    {/* </div> */}
                    <NavLink className="shopping-cart-link" exact to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <p className="circle">{sum}</p>
                    </NavLink>
                </div>
            </ul>
            <ul className="cat-nav-bar">{categories.map((cat, i) => <NavLink to={`/category/${cat}`} key={i}>{cat}</NavLink>)}</ul>
        </div>
    )
}

export default Navigation;