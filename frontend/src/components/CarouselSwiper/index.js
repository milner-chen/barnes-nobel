import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './CarouselSwiper.css';
import { useSelector} from "react-redux";

// import slide1 from '../../assets/slide_1.jpg';
// import slide2 from '../../assets/slide_2.jpg';
// import slide3 from '../../assets/slide_3.jpg';
// import slide4 from '../../assets/slide_4.jpg';
import { getCategoryProducts } from "../../store/product";

// const CarouselSwiper = () => {
const CarouselSwiper = ({ category }) => {
    console.log("category", category);
    // debugger
    const photos = useSelector(getCategoryProducts(category));

    console.log("photos on this page", photos);
    // const dispatch = useDispatch();
    // const photos = [slide1, slide2, slide3, slide4,
    //     slide1, slide2, slide3, slide4,
    //     slide1, slide2, slide3, slide4];

    if (!photos) return null;
    
    return (
        <>
            <Swiper
            speed={700}
                className="carousel"
                slidesPerView={5}
                slidesPerGroup={5}
                slidesPerGroupAuto={true}
                // slidesPerGroupSkip={1}
                spaceBetween={45}
                pagination={{
                    clickable: true
                }}
                navigation={true}
                loop={true}
                modules={[Navigation, Pagination]}
            >
                {photos.map(photo => {
                    return <SwiperSlide className="carousel-slide"><img src={photo.photoUrl} /></SwiperSlide>
                })}
                {/* <SwiperSlide className="carousel-slide"><p>slide 1</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 2</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 3</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 4</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 5</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 6</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 7</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 8</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 9</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 10</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 11</p> </SwiperSlide>
                <SwiperSlide className="carousel-slide"><p>slide 12</p> </SwiperSlide> */}
            </Swiper>
        </>
    )
}

export default CarouselSwiper;