import EditWishlistModal from "../WishlistForms/EditWishlistModal";


const WishlistListing = ({ currWishlist }) => {
    console.log(currWishlist);
    
    return (
        <>
            <div className="wishlist-header">
                <h1>{currWishlist?.name}</h1>
                <EditWishlistModal wishlist={currWishlist} />
            </div>
            <div>
                <p>some shit</p>
            </div>
        </>
    )
}

export default WishlistListing;