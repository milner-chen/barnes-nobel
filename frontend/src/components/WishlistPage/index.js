import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as wishlistActions from '../../store/wishlist';
import CreateWishlistModal from "../WishlistForms/CreateWishlistModal";

const WishlistPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session?.user);
    // const wishlists = useSelector(state => state?.wishlists);
    const wishlists = useSelector(state => Object.values(state.wishlists));

    useEffect(() => {
        if (user) {
            dispatch(wishlistActions.fetchWishlists(user.id));
        }
    }, [user])
    

    // will have to open the login modal later
    if (!user) return <h1>you aint logged in bro!!</h1>;

    return (
        <div>
            <h1>{user.firstName}</h1>
            <div>
                {wishlists.map((list, i) => {
                    return <p  key={i}>{list.name}</p>
                })}
            </div>
            {/* <p>+ Create New Wishlist</p> */}
            <CreateWishlistModal userId={user?.id}/>
        </div>
    )
}

export default WishlistPage;