import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wishlistActions from '../../store/wishlist';
import CreateWishlistModal from "../WishlistForms/CreateWishlistModal";
import "../WishlistForms/WishlistForms.css";
import WishlistListing from "./WishlistListing";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import { useHistory } from "react-router-dom";

const WishlistPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session?.user);
    // const wishlists = useSelector(state => state?.wishlists);
    const wishlists = useSelector(state => Object.values(state?.wishlists));
    const [currWishlist, setCurrWishlist] = useState(0);

    const fetch = async () => {
        await dispatch(wishlistActions.fetchWishlists(user?.id));
    }

    useEffect(() => {
        // if (user) {
            fetch();
        // }
    }, [user, wishlists[currWishlist]?.name])

    useEffect(() => {
        dispatch(wishlistActions.fetchWishlists(user?.id));
        setCurrWishlist(0);
    }, [wishlists.length])

    // const [showList, setShowList] = useState(false);
    // const closeList = () => {
    //     setShowList(false);
    // }
    
    // // will have to open the login modal later
    // if (!user) return (
    // // <h1>you aint logged in bro!!</h1>
    // <Modal onClose={closeList} >
    //     <LoginForm />
    // </Modal>
    // );

    if (!user) history.push("/");

    return (
        <>
        <div className="wishlist-title">
            <span />
            <h1>Your Wishlists</h1>
            <span />
        </div>
        <div className="wishlist-page">
            {/* <h1>{user.firstName}</h1> */}
            <div className="sizing">
                <div className="list-list">
                    <p className="list-title">YOUR WISHLISTS</p>
                    {wishlists.map((list, i) => {
                        return <p className="wishlist" onClick={() => {setCurrWishlist(i); /*console.log("current wishlist after updating", currWishlist)*/}} key={i}>{list.name}</p>
                    })}
                    <CreateWishlistModal userId={user?.id}/>
                </div>
                <div className="main-content">
                    {/* <p>+ Create New Wishlist</p> */}
                    {/* <p>{ currWishlist ? "okay" : wishlists[0]?.name }</p> */}
                    {/* <p>{ wishlists[currWishlist]?.name }</p> */}
                    <WishlistListing currWishlist={ wishlists[currWishlist] } />
                </div>
            </div>
        </div>
        </>
    )
}

export default WishlistPage;