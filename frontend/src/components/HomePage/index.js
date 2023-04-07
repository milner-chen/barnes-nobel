import CarouselSwiper from "../CarouselSwiper/index.js";
import FadeSwiper from "../FadeSwiper.js"
import './HomePage.css'

const HomePage = () => {
    return (
        <div className="home-page">
            <FadeSwiper />
            <CarouselSwiper />
            <CarouselSwiper />
            <CarouselSwiper />
        </div>
    )
}

export default HomePage;