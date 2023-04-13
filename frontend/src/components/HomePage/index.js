import CarouselSwiper from "../CarouselSwiper/index.js";
import FadeSwiper from "../FadeSwiper.js"
import './HomePage.css'

const HomePage = () => {
    return (
        <div className="home-page">
            <FadeSwiper />
            <div className="swiper-holder">
                <CarouselSwiper category='fantasy' />
                <CarouselSwiper category='science Fiction' />
                <CarouselSwiper category='classics' />
            </div>
        </div>
    )
}

export default HomePage;