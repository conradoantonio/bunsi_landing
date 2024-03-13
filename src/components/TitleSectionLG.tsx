import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'
import { useIntl } from 'react-intl'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useRouter } from 'next/router'

const TitleSectionLG = () => {
  const intl = useIntl()

  const title = intl.formatMessage({ id: 'page.home.title' })
  const subtitle = intl.formatMessage({
    id: 'page.home.subtitle',
  })
  const description1 = intl.formatMessage({
    id: 'page.home.description1',
  })
  const description2 = intl.formatMessage({
    id: 'page.home.description2',
  })
  const description3 = intl.formatMessage({
    id: 'page.home.description3',
  })
  const description4 = intl.formatMessage({
    id: 'page.home.description4',
  })
  const btn_knowmore = intl.formatMessage({
    id: 'page.home.btn_knowmore',
  })

  const image_description1 = intl.formatMessage({
    id: 'page.home.image_description1',
  })
  const image_description2 = intl.formatMessage({
    id: 'page.home.image_description2',
  })
  const image_description3 = intl.formatMessage({
    id: 'page.home.image_description3',
  })
  // Init state
  const [activeNavbarText, setActiveNavbarText] = useState(
    'TIEMPO DE CALIDAD CON TUS SERES QUERIDOS',
  )

  const navbarItems = [
    {
      id: 1,
      title: image_description1,
      image: '/assets/nuevo/CARRETE ENCABEZADO-02.png',
    },
    {
      id: 2,
      title: image_description2,
      image: '/assets/nuevo/CARRETE ENCABEZADO-01.png',
    },
    {
      id: 3,
      title: image_description3,
      image: '/assets/nuevo/CARRETE ENCABEZADO-03.png',
    },
  ]

  SwiperCore.use([Autoplay])
  const [swiperInit, setSwiper] = useState({
    slideNext: () => {
      return
    },
    slidePrev: () => {
      return
    },
  })

  const handleChangeSlide = (index: SwiperCore) => {
    const { realIndex } = index
    setActiveNavbarText('' + navbarItems[realIndex]?.title)
  }

  const swiperNextSlide: MouseEventHandler<HTMLButtonElement> = () => {
    // Changin the images state
    swiperInit.slideNext()
  }

  const swiperPrevSlide: MouseEventHandler<HTMLButtonElement> = () => {
    swiperInit.slidePrev()
  }

  const router = useRouter()

  return (
    <div className="w-full bg-todos-ganan md:mt-24 xl:mt-32">
      <div className="hidden md:block mx-auto pl-10 lg:container">
        <div className="grid grid-cols-2 gap-4 relative">
          <div className="md:pt-auto xl:mt-0">
            <div>
              <h1 className="md:w-3/4 lg:w-full md:text-6xl lg:text-7xl lg:mt-5 smTextColor font-family-titles font-bold mb-10 ">
                {title}{' '}
                <span className="underline text-subtitle-color">
                  {subtitle}
                </span>
              </h1>
            </div>
            {/* <div className="md:mt-5 md:h-1/3 lg:h-2/5 lg:mt-7 xl:h-1/2 xl:mt-10"></div> */}
            <div>
              <p className="text-color-brown mt-5 mb-3 font-family-text font-medium md:text-sm">
                {description1}
              </p>
              <p className="text-color-brown mb-3 font-family-text font-medium md:text-sm">
                {description2}
                {/* <span className="font-bold">BUNSI</span> */}
              </p>
              <p className="text-color-brown mb-3 font-family-text font-medium md:text-sm">
                {description3}
              </p>
              <p className="smTextColor mb-3 font-family-text font-medium md:text-sm">
                <span className="font-bold">BUNSI</span> {description4}
              </p>
            </div>
          </div>
          <div className="w-full">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
              }}
              onSlideChange={(index) => handleChangeSlide(index)}
              onSwiper={(swiper) => setSwiper(swiper)}
              className="h-full z-0"
            >
              <div className="slider md:h-2/4 lg:h-3/4">
                {navbarItems.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div className="w-full rounded-3xl" >
                      <img src={item.image} alt="BUNSI"/>
                        {/* <Image
                          src={item.image}
                          alt="BUNSI"
                          layout="fill"
                          className="w-full rounded-3xl"
                        /> */}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </div>
            </Swiper>
            <div className="flex justify-between bg-todos-ganan">
              <div className="mt-4">
                <button
                  onClick={swiperPrevSlide}
                  id="btn-prev"
                  className="md:mr-2 md:w-10 md:h-10 bg-green-500 rounded-full text-white"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={swiperNextSlide}
                  id="btn-next"
                  className="md:mr-2 md:w-10 md:h-10 bg-green-500 rounded-full text-white"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="bg-color-subtext md:w-64 lg:w-3/4 px-4 py-5 opacity-90 rounded-lg self-center -mt-10">
                <p className="smTextColor md:text-md font-bold text-center uppercase">
                  {activeNavbarText}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full">
            <button
              onClick={() => router.push('/#formulario-conoce-mas')}
              className="bg-btn-brown md:w-40 px-2 py-3 md:mr-5 md:bottom-0 md:left-0 uppercase opacity-90 rounded-full text-white float-left"
            >
              {btn_knowmore}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleSectionLG
