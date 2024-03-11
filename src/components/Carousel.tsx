import { useIntl } from 'react-intl'
import { Swiper, SwiperSlide } from 'swiper/react'

const Carousel = () => {
  const intl = useIntl()

  const btn_knowmore = intl.formatMessage({
    id: 'page.home.btn_knowmore',
  })
  return (
    <div className="">
      <div className="md:hidden lg:hidden mx-auto">
        <Swiper spaceBetween={0} slidesPerView={1} loop={true} autoplay={true}>
          <SwiperSlide>
            <div className=" blog-slider__item swiper-slide slide-item">
              <div className="blog-slider__img">
                <img
                  src="/assets/nuevo/CARRETE ENCABEZADO-01.png"
                  alt="carrete.png"
                />
                <div className="text-under-image text-xs">
                  <p>TIEMPO DE CALIDAD CON TUS SERES QUERIDOS</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="blog-slider__item swiper-slide slide-item">
              <div className="blog-slider__img">
                <img
                  src="/assets/nuevo/CARRETE ENCABEZADO-02.png"
                  alt="carrete.png"
                />
                <div className="text-under-image text-xs">
                  <p>TIEMPO DE CALIDAD CON TUS SERES QUERIDOS</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="blog-slider__item swiper-slide slide-item">
              <div className="blog-slider__img">
                <img
                  src="/assets/nuevo/CARRETE ENCABEZADO-03.png"
                  alt="carrete.png"
                />
                <div className="text-under-image text-xs">
                  <p>TIEMPO DE CALIDAD CON TUS SERES QUERIDOS</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="md:hidden lg:hidden container px-4 mx-auto mt-4 text-center">
        <button
          className="bg-orange-800 px-3 text-white uppercase rounded-full mt-4 md:float-left"
          style={{ width: 165, height: 50 }}
        >
          {btn_knowmore}
        </button>
      </div>
    </div>
  )
}

export default Carousel
