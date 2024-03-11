import { useState } from 'react'
import { useIntl } from 'react-intl'
import { goToContactForm } from '../../public/assets/js/script';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import PropTechRow from "../types/prop-tech-carousel";
import 'swiper/css';
import 'swiper/css/pagination';


import { useRouter } from 'next/router'

const PropTech = (props:any) => {
  // const {goToContactForm} = props;
  const [secuency, setSecuency] = useState('assets/img/landing-mobil/1.png')

  const [isTittle1, setTittle1] = useState(false)
  const [isTittle2, setTittle2] = useState(true)
  const [isTittle3, setTittle3] = useState(true)
  const [isTittle4, setTittle4] = useState(true)

  const intl = useIntl()
  const title = intl.formatMessage({ id: 'page.home.proptech.title' })
  const subtitle = intl.formatMessage({ id: 'page.home.proptech.subtitle' })
  const description = intl.formatMessage({
    id: 'page.home.proptech.description',
  })

  const textScreen1 = intl.formatMessage({
    id: 'page.home.proptech.mainmenu.text',
  })
  const menuScreen1 = intl.formatMessage({ id: 'page.home.proptech.mainmenu' })
  const [titleScreen1, setScreen1] = useState(textScreen1)

  const textScreen2 = intl.formatMessage({
    id: 'page.home.proptech.calendar.text',
  })
  const menuScreen2 = intl.formatMessage({ id: 'page.home.proptech.calendar' })
  const [titleScreen2, setScreen2] = useState(menuScreen2)

  const textScreen3 = intl.formatMessage({
    id: 'page.home.proptech.support.text',
  })
  const menuScreen3 = intl.formatMessage({ id: 'page.home.proptech.support' })
  const [titleScreen3, setScreen3] = useState(menuScreen3)

  const textScreen4 = intl.formatMessage({
    id: 'page.home.proptech.account.text',
  })

  const btn_knowmore = intl.formatMessage({
    id: 'page.home.btn_knowmore',
  })

  const carouselRows: Array<PropTechRow> = [
    {
      id : 1,
      title :intl.formatMessage({ id: 'page.home.proptech.mainmenu' }),
      desc : intl.formatMessage({ id: 'page.home.proptech.mainmenu.text' }),
      photo : "/assets/img/landing-mobil/1.png"
    },
    {
      id : 2,
      title :intl.formatMessage({ id: 'page.home.proptech.calendar' }),
      desc : intl.formatMessage({ id: 'page.home.proptech.calendar.text' }),
      photo : "/assets/img/landing-mobil/3.png"
    },
    {
      id : 3,
      title :intl.formatMessage({ id: 'page.home.proptech.support' }),
      desc : intl.formatMessage({ id: 'page.home.proptech.support.text' }),
      photo : "/assets/img/landing-mobil/4.png"
    },
    {
      id : 4,
      title :intl.formatMessage({ id: 'page.home.proptech.account' }),
      desc : intl.formatMessage({ id: 'page.home.proptech.account.text' }),
      photo : "/assets/img/landing-mobil/2.png"
    },
  ];

  const menuScreen4 = intl.formatMessage({ id: 'page.home.proptech.account' })
  const [titleScreen4, setScreen4] = useState(menuScreen4)

  const handlerFirstClick = () => {
    setScreen1(textScreen1)
    setScreen2(menuScreen2)
    setScreen3(menuScreen3)
    setScreen4(menuScreen4)

    setSecuency('assets/img/landing-mobil/1.png')

    setTittle1(false)
    setTittle2(true)
    setTittle3(true)
    setTittle4(true)
  }

  const handlerSecondClick = () => {
    setScreen1(menuScreen1)
    setScreen2(textScreen2)
    setScreen3(menuScreen3)
    setScreen4(menuScreen4)

    setSecuency('assets/img/landing-mobil/3.png')

    setTittle1(true)
    setTittle2(false)
    setTittle3(true)
    setTittle4(true)
  }

  const handlerThirdClick = () => {
    setScreen1(menuScreen1)
    setScreen2(menuScreen2)
    setScreen3(textScreen3)
    setScreen4(menuScreen4)

    setSecuency('assets/img/landing-mobil/4.png')

    setTittle1(true)
    setTittle2(true)
    setTittle3(false)
    setTittle4(true)
  }

  const handlerFourClick = () => {
    setScreen1(menuScreen1)
    setScreen2(menuScreen2)
    setScreen3(menuScreen3)
    setScreen4(textScreen4)

    setSecuency('assets/img/landing-mobil/2.png')

    setTittle1(true)
    setTittle2(true)
    setTittle3(true)
    setTittle4(false)
  }

  const router = useRouter();

  return (
    <div id="proptech" className="hidden h-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 relative mt-9 lg:mt-28"
      style={{
        backgroundImage: `url("assets/nuevo/sombra.png")`,
        objectFit: 'cover'
      }}
    >
      <div className="col-span-1 md:col-span-2">
        <h1 className="text-4xl md:text-6xl smTextColor font-family-titles text-center font-bold">
          {title} <span className="underline text-orange-300">{subtitle}</span>
        </h1>
        <br />
        <p className="text-orange-800 text-center hidden md:block">{description}</p>
      </div>

      {/* Bloque de código de carrusel para vista responsiva */}
      <div className="col-span-1 md:hidden">
        {/* <div className="grid grid-cols-1"> */}
        <Swiper spaceBetween={0} slidesPerView={1} loop={true} autoplay={{ delay: 5000}} pagination={true} modules={[Pagination]} className=" h-full z-0 grid grid-cols-1">
          {carouselRows.map((row, index) => (
            <SwiperSlide key={index}>
            <div className="slide-item">
              <div className="">
                <img src={row.photo} alt="mobile1.png" />
                <div className="text-under-image" style={{marginTop: "-75px"}}>
                  <div className="text-center w-full col-span-2" style={{}}>
                    <h5 className="mx-10 text-md smTextColor font-family-titles font-bold">{row.title}</h5>
                    <span className={'text-color-brown text-sm md:text-md'}> {row.desc}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </div>


      {/* <div className="absolute -z-10">
        <img src="assets/nuevo/sombra.png" alt="sombra_palma.png" />
      </div> */}

      <div className="relative h-screens hidden md:block">
        <div
          className="absolute mt-24 w-full rounded-full"
          style={{
            // backgroundImage:'assets/nuevo/sombra.png',
            // backgroundColor: '#90B87A',
            height: '70vh',
            transform: 'translateX(-60%)',
          }}
        ></div>

        <div className="absolute mt-4">
          <img className="hidden md:block lg:block" src={secuency} alt="" style={{ height: '90vh' }} />
          <img className="block md:hidden lg:hidden" src={secuency} alt="" style={{ height: '70vh' }} />
        </div>
      </div>

      {/* <div className="mt-10 hidden md:block lg:block"> */}
      {/* Despliega el contenido */}
      <div className="mt-10 hidden md:block">
        
        <div className="flex flex-row mt-10 cursor-pointer" onClick={handlerFirstClick}>
          <div className="w-1/6 md:w-1/6 lg:w-1/6">
            <h1 className="text-6xl md:text-6xl lg:text-6xl font-family-titles font-bold heartbeat text-color-green"> 1 </h1>
          </div>
          <div className="border-0 border-b-2 border-green-600 w-full" onClick={handlerFirstClick}>
            <span className={ isTittle1 ? 'text-color-green text-xl font-bold' : 'text-color-brown text-xs' } >
              {titleScreen1}
            </span>
          </div>
        </div>

        <div className="flex flex-row mt-10 cursor-pointer" onClick={handlerSecondClick}>
          <div className="w-1/6 md:w-1/6 lg:w-1/6">
            <h1 className="text-6xl md:text-6xl lg:text-6xl font-family-titles font-bold heartbeat text-color-green"> 2 </h1>
          </div>
          <div className="border-0 border-b-2 border-green-600 w-full" onClick={handlerSecondClick}>
            <span className={ isTittle2 ? 'text-color-green text-xl font-bold' : 'text-color-brown text-xs' } >
              {titleScreen2}
            </span>
          </div>
        </div>

        <div className="flex flex-row mt-10 cursor-pointer" onClick={handlerThirdClick}>
          <div className="w-1/6 md:w-1/6 lg:w-1/6">
            <h1 className="text-6xl md:text-6xl lg:text-6xl font-family-titles font-bold heartbeat text-color-green"> 3 </h1>
          </div>
          <div className="border-0 border-b-2 border-green-600 w-full" onClick={handlerThirdClick}>
            <span className={ isTittle3 ? 'text-color-green text-xl font-bold' : 'text-color-brown text-xs' } >
              {titleScreen3}
            </span>
          </div>
        </div>

        <div className="flex flex-row mt-10 cursor-pointer" onClick={handlerFourClick}>
          <div className="w-1/6 md:w-1/6 lg:w-1/6">
            <h1 className="text-6xl md:text-6xl lg:text-6xl font-family-titles font-bold heartbeat text-color-green"> 4 </h1>
          </div>
          <div className="border-0 border-b-2 border-green-600 w-full">
            <span className={ isTittle4 ? 'text-color-green text-xl font-bold' : 'text-color-brown text-xs' } >
              {titleScreen4}
            </span>
          </div>
        </div>

      </div>
      <div className="col-span-1 md:col-span-2 text-center mt-0 md:mt-8">
        <button onClick={() => goToContactForm( document.getElementById('formulario-conoce-mas') )}
          className="bg-btn-brown md:w-40 px-2 py-3 md:mr-5 md:bottom-0 md:left-0 uppercase opacity-90 rounded-full text-white my-14">
          {btn_knowmore}
        </button>
      </div>
    </div>
  )
}

export default PropTech
