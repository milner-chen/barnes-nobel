import { NavLink } from "react-router-dom";
import './PageItemInfo.css';

const PageItemInfo = ({ product }) => {
    return (
        <div className='item-info'>
            <div className="top-info">
                <NavLink to={`/${product.id}`}>
                    <h2 className='title'>{product.name}</h2>
                </NavLink>
                <p className="seller">by {product.seller}</p>
                <p>
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                </p>
            </div>
            <div className="bottom-info">
                <div className="info-block">
                    <p >Format</p>
                    <div className="line"></div>
                    <p className="format">{product.format}</p>
                    {/* <div className="line"></div> */}
                </div>
                <div className="info-block">
                    <p>Price</p>
                    <div className="line"></div>
                    <p className='price'>${product.price}</p>
                    {/* <div className="line"></div> */}
                </div>
                <div className="info-block">
                    <p>Availability</p>
                    <div className="line"></div>
                    <p>
                    <i className="fa-solid fa-check"></i> {product.availability}</p>
                    {/* <div className="line"></div> */}
                </div>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default PageItemInfo;