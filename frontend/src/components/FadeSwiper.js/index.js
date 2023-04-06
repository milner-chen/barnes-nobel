import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade'; // fade effect
import "swiper/css/navigation"; // arrows
import "swiper/css/pagination"; // clickable circles
import slide1 from '../../assets/slide_1.jpg'
import slide2 from '../../assets/slide_2.jpg'
import slide3 from '../../assets/slide_3.jpg'
import slide4 from '../../assets/slide_4.jpg'
import './FadeSwiper.css';

const FadeSwiper = () => {

    // const swiper = new Swiper('.swiper', {
    //     direction: horizontal,
    //     loop: true,
    //     navigation: {
    //         nextPic: '.swiper-button-next',
    //         prevPic: '.swiper-button-prev'
    //     },
    //     sc
    // })

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };

    return (
        <>
            <Swiper className="fade-swiper"
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                pagination={{
                    pagination
                }}
                loop={true}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
            >
                <SwiperSlide>
                    <img src={slide1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} />
                </SwiperSlide>
            </Swiper>
                {/* <p>Source: barnesandnoble.com</p> */}
        </>
    )
}

export default FadeSwiper;