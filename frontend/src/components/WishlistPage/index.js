import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wishlistActions from '../../store/wishlist';
import CreateWishlistModal from "../WishlistForms/CreateWishlistModal";
import "../WishlistForms/WishlistForms.css";
import WishlistListing from "./WishlistListing";

const WishlistPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session?.user);
    // const wishlists = useSelector(state => state?.wishlists);
    const wishlists = useSelector(state => Object.values(state?.wishlists));
    const [currWishlist, setCurrWishlist] = useState(wishlists[0]);

    useEffect(() => {
        if (user) {
            dispatch(wishlistActions.fetchWishlists(user.id));
        }
    }, [user, currWishlist])

    useEffect(() => {
        dispatch(wishlistActions.fetchWishlists(user.id));
        setCurrWishlist(wishlists[0]);
    }, [wishlists.length])
    

    // will have to open the login modal later
    if (!user) return <h1>you aint logged in bro!!</h1>;

    return (
        <div className="wishlist-page">
            {/* <h1>{user.firstName}</h1> */}
            <div className="sizing">
                <div className="list-list">
                    <p className="list-title">YOUR WISHLISTS</p>
                    {wishlists.map((list, i) => {
                        return <p className="wishlist" onClick={() => setCurrWishlist(wishlists[i])} key={i}>{list.name}</p>
                    })}
                    <CreateWishlistModal userId={user?.id}/>
                </div>
                <div className="main-content">
                    {/* <p>+ Create New Wishlist</p> */}
                    {/* <p>{ currWishlist ? "okay" : wishlists[0]?.name }</p> */}
                    <WishlistListing currWishlist={ currWishlist ? currWishlist : wishlists[0] } />
                </div>
            </div>
        </div>
    )
}

export default WishlistPage;