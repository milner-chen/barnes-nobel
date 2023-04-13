import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector} from "react-redux";
import './CarouselSwiper.css';

// import slide1 from '../../assets/slide_1.jpg';
// import slide2 from '../../assets/slide_2.jpg';
// import slide3 from '../../assets/slide_3.jpg';
// import slide4 from '../../assets/slide_4.jpg';
import { getCategoryProducts } from "../../store/product";
import { NavLink } from "react-router-dom";

// const CarouselSwiper = () => {
const CarouselSwiper = ({ category }) => {
    // console.log("category", category);
    // debugger
    const photos = useSelector(getCategoryProducts(category));

    // console.log("photos on this page", photos);
    // const dispatch = useDispatch();
    // const photos = [slide1, slide2, slide3, slide4,
    //     slide1, slide2, slide3, slide4,
    //     slide1, slide2, slide3, slide4];

    if (!photos) return null;
    
    return (
        <div className="swiper-holder">
            <h1>{category}</h1>
            <Swiper
            speed={700}
                className="carousel"
                slidesPerView={7}
                slidesPerGroup={7}
                slidesPerGroupAuto={true}
                // slidesPerGroupSkip={1}
                spaceBetween={15}
                pagination={{
                    clickable: true
                }}
                navigation={true}
                loop={true}
                modules={[Navigation, Pagination]}
            >
                {photos.map(photo => {
                    return <SwiperSlide key={photo.id} className="carousel-slide">
                        <NavLink to={`/${photo.id}`} >
                            <img className="carousel-img" src={photo.photoUrl} />
                        </NavLink>
                    </SwiperSlide>
                })}
                {photos.map(photo => {
                    return <SwiperSlide key={photo.id * 2} className="carousel-slide">
                        <NavLink to={`/${photo.id}`} >
                            <img className="carousel-img" src={photo.photoUrl} />
                        </NavLink>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export default CarouselSwiper;