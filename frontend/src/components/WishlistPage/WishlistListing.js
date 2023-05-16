import { useDispatch, useSelector } from "react-redux";
import EditWishlistModal from "../WishlistForms/EditWishlistModal";
import { useEffect } from "react";
import * as wishlistItemActions from "../../store/wishlistItem";
import WishlistPageItem from "../WishlistForms/WishlistPageItem";

const WishlistListing = ({ currWishlist }) => {
    // console.log("the currentWishlist on the other side", currWishlist);
    const dispatch = useDispatch();

    // const items = useSelector(state => Object.values(state?.wishlistItems).filter(item => item?.wishlistId === currWishlist?.id));
    const items = useSelector(state => Object.values(state?.wishlistItems));
    const products = useSelector(wishlistItemActions.getItems);

    const fetch = async () => {
        await dispatch(wishlistItemActions.fetchWishlistItems(currWishlist?.id));
    }
    
    useEffect(() => {
        fetch();
        // console.log("these are the items that should be displayed", products);
    }, [currWishlist]);

    return (
        <>
            <div className="wishlist-header">
                <h1>{currWishlist?.name}</h1>
                <EditWishlistModal wishlist={currWishlist} />
            </div>
            <div>
                {products ? products.map((item, i) =>
                    <WishlistPageItem key={item?.id} product={item} item={items[i]} />
                ) : <p>Nothing here yet c:</p>}
            </div>
        </>
    )
}

export default WishlistListing;