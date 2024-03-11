import { Accordion } from "flowbite-react";

import { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Propiedad from "../types/propiedad";
import { useIntl } from "react-intl";
import Image from "next/image";


import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Simulador from './Simulador';// Componente del simulador

const PropiedadDetalles = (props:any) => {
  
  const [showPropPage, setShowPropPage] = useState(false);
  const [showPropDetails, setShowPropDetails] = useState(false);
  
  // Variables para mostrar las secciones del detalle de la propiedad
  const [showPropVision, setShowPropVision] = useState(false);
  const [showPropLocation, setShowPropLocation] = useState(false);
  const [showPropTechnicalPLanes, setShowPropTechnicalPLanes] = useState(false);
  const [showPropAllInHands, setShowPropAllInHands] = useState(false);
  const [showPropCreditSimulator, setShowPropCreditSimulator] = useState(false);
  
  const [propiedadesSimulador, setPropiedadesSimulador] = useState({
    op1: false,
    op2: false,
    selectPas1: 0,
    selectSemPas1: 0,
    selectSemPas1Input: 0,
    selectSemPas1InputTxt: "",
    selectUsoPersonalPas2: 0,
    usoRentaPas2Num: 0,
    usoRentaPas2: "",
    NUMselectSemPas3Opc1: 0,
    selectSemPas3Opc1: 0,
    NUMselectSemPas3Opc2: 0,
    selectSemPas3Opc2: 0,
    NUMselectSemPas3Opc3: 0,
    selectSemPas3Opc3: 0,
    numInversion: 0,
    totalTempAlta: 0,
    totalTempMedia: 0,
    totalTempBaja: 0,
    totalCalcular: 0,
    selectRenta1: 0,
    selectRenta2: 0,
    selectRenta3: 0,
    disabledTempAlta: false,
    disabledTempMedia: false,
    disabledTempBaja: false,
    rentaDiariaOpc1: "",
    ocupacionOpc1: "",
    rentaDiariaOpc2: "",
    ocupacionOpc2: "",
    rentaDiariaOpc3: "",
    ocupacionOpc3: "",
    badgeSemanas: false,
    totalSimulador: "0",
    inversionFraccion: 0,
    inversionFraccionTxt: "",
    semPas1: 0,
    selectHighSeason: -1,
    selectMiddleSeason: -1,
    selectLowSeason: -1,
  });
  
  const [resumenSemanas, setResumenSemanas] = useState({});
  
  const [propiedadSelected, setPropiedadSelected] = useState<Propiedad>();
  
  const {show, propertySelected, propertySimulador, resSemanas} = props;
  
  console.log(`Info variables: show ${show}, propertySelected ${propertySelected}, propertySimulador ${propertySimulador}, resSemanas ${resSemanas}`);

  const intl = useIntl();

  const features = intl.formatMessage({ id: "page.home.properties.features" });
  // const bedrooms = intl.formatMessage({ id: "page.home.properties.bedrooms" });
  const bedrooms = intl.formatMessage({ id: "page.home.properties.bedrooms_short" });
  const toilets = intl.formatMessage({ id: "page.home.properties.toilets" });
  const fractions = intl.formatMessage({
    id: "page.home.properties.fractions",
  });
  const availables = intl.formatMessage({
    id: "page.home.properties.availables",
  });
  const learnmore = intl.formatMessage({
    id: "page.home.properties.learnmore",
  });
  const vision360 = intl.formatMessage({
    id: "page.home.properties.360vision",
  });
  const location = intl.formatMessage({ id: "page.home.properties.location" });
  const technical_planes = intl.formatMessage({
    id: "page.home.properties.technical_planes",
  });
  const allinhands = intl.formatMessage({
    id: "page.home.properties.allinhands",
  });
  const nature = intl.formatMessage({ id: "page.home.properties.nature" });
  const experiences = intl.formatMessage({
    id: "page.home.properties.experiences",
  });
  const social = intl.formatMessage({ id: "page.home.properties.social" });
  const culture = intl.formatMessage({ id: "page.home.properties.culture" });
  const health = intl.formatMessage({ id: "page.home.properties.health" });
  const credit_simulator = intl.formatMessage({
    id: "page.home.properties.credit_simulator",
  });

  useEffect(() => {
    setPropiedadSelected(propertySelected);
    setPropiedadesSimulador(propertySimulador);
    setResumenSemanas(resSemanas);
    setShowPropPage(show);
    setShowPropDetails(show);
  });

  /**
   * Método que permite setear la configuración del modal de detalles de propiedad para la vista movil
   * @param config 
   */
  const handleShowPropDetailsModal = async (config: any) => {
    setShowPropDetails(false);
    setShowPropVision(false);
    setShowPropLocation(false);
    setShowPropTechnicalPLanes(false);
    setShowPropAllInHands(false);
    setShowPropCreditSimulator(false);

    if (config.vision === true) { setShowPropVision(true); }
    else if (config.location === true) { setShowPropLocation(true); }
    else if (config.technical_planes === true) { setShowPropTechnicalPLanes(true); }
    else if (config.all_in_hands === true) { setShowPropAllInHands(true); }
    else if (config.credit_simulator === true) { setShowPropCreditSimulator(true); }
    else { setShowPropDetails(true);} // Vuelve a mostrar el detalle
  };
  
  /**
   * Método para regresar a hacer visibles los componentes
   */
  const handleBackToIndexPage = async () => {
    console.log('Hola handleBackToIndexPage');
    // Se muestra el HTML principal
    const componentHeaders = document.getElementById('mainComponentsHeader');
    const componentBody = document.getElementById('mainComponentsBody');

    componentHeaders?.classList.remove('hidden');
    componentBody?.classList.remove('hidden');

    setShowPropPage(false);
    setShowPropDetails(false);
  }

  const handleCloseModal = () => {
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      badgeSemanas: false,
    });
  };

  const containerStyle = {
    width: "100%",
    height: "18rem",
  };

  const onLoad = (marker: any) => {
    console.log("marker: ", marker);
  };

  return (
    <>
      {/* Considerar meter esta sección en un componente */}
      <div id="prop-page" >
        <div className="header-2 pt-0.5" style={{backgroundColor: '#83AB7A'}}>
          <div className="grid grid-cols-6">
            <div className="col-start-2 col-span-4 flex items-center justify-center text-2xl smTextColor">
              <h1 className="text-center text-xl md:text-6xl smTextColor font-family-titles font-bold mt-2">
                {propiedadSelected ? propiedadSelected.titulo : 'No hay nada seleccionado'}
                {/* <span className="underline text-subtitle-color">{subtitle} </span> */}
              </h1>
            </div>
            <div className="col-span-1 flex items-center justify-end text-2xl smTextColor mr-2" onClick={handleBackToIndexPage}>
              <i className="fa-regular fa-circle-xmark"></i>
            </div>
          </div>
          <p className="text-lg text-center px-2 text-white font-normal mb-2">
            {intl.locale == "es" ? (
              <>{propiedadSelected?.descripcion}</>
            ) : (
              <>{propiedadSelected?.descripcionEn}</>
            )}
          </p>
          <div id="carusel-prop-details">
            <Swiper 
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
            >
              {propiedadSelected?.carouselImages.map(
                (image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-60 md:h-96 w-full">
                      <Image src={image} alt="image" layout="fill" objectFit="cover"/>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
          
          <div className={`prop-details ${showPropDetails ? "block" : "hidden"}`}>
            {/* Detalle informativo del modal */}
            <div className="grid grid-cols-6 px-3">
              <div className="col-span-2 flex items-center">
                <h1 className="text-left text-lg md:text-6xl smTextColor font-family-titles font-bold">
                  {propiedadSelected ? propiedadSelected.titulo : 'No hay nada seleccionado'}
                </h1>
              </div>
              <div className="col-span-4 flex items-center">
                <p className="text-right text-base smTextColor font-family-text">
                  {intl.locale == "es" ? (
                    <>{propiedadSelected?.descripcion}</>
                  ) : (
                    <>{propiedadSelected?.descripcionEn}</>
                  )}
                </p>
              </div>
            </div>
            
            {/* Características */}
            <div className="grid grid-cols-6 mx-3 border-t-2 border-color-bunsi">
              <div className="col-span-6 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {features}:
                </p>
              </div>

              <div className="col-span-2 mx-0.5">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  <i className="fa-solid fa-hashtag mr-1"></i>
                  {propiedadSelected?.caracteristicas.metros} m2
                </span>
              </div>
              <div className="col-span-2 mx-0.5">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  <i className="fa-solid fa-bed mr-1"></i>
                  { propiedadSelected?.caracteristicas.habitaciones }{" "} {bedrooms}
                </span>
              </div>
              <div className="col-span-2 mx-0.5">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  <i className="fa-solid fa-toilet mr-1"></i>
                  {propiedadSelected?.caracteristicas.banos}{" "} {toilets}
                </span>
              </div>
              <div className="col-span-2 m-0.5 text-base">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                {/* <span className="w-full h-16 self-center text-center border-bunsi-s-green border-2 m-0.5 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg"> */}
                  ${propiedadSelected?.caracteristicas.precioUSD}{" "}US
                  <br />
                  ${propiedadSelected?.caracteristicas.precioMXN?.toLocaleString("en-US")}{" "}MX
                </span>
              </div>
              <div className="col-span-2 m-0.5 text-base">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  {propiedadSelected?.caracteristicas.fracciones}{" "}
                  {fractions}
                </span>
              </div>
              <div className="col-span-2 m-0.5 text-base">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  {propiedadSelected?.caracteristicas.disponibles}{" "}
                  {availables}
                </span>
              </div>
            </div>
            
            {/* Conoce más */}
            <div className="grid grid-cols-6 mx-3">
              <div className="col-span-6 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {learnmore}:
                </p>
              </div>
              <div className="col-span-6 mx-0.5">
                  <div onClick={() => handleShowPropDetailsModal({vision : true})} className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg">
                    <div className="col-span-1">
                      <img src="assets/nuevo/icons/IMAGENES CATALOGO-01.svg" alt="option1" 
                        className="h-12 bg-bunsi-strong-green rounded-full pointer "
                      />
                    </div>
                    <div className="col-span-4">
                      {vision360}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                    </div>
                  </div>

                  <div onClick={() => handleShowPropDetailsModal({location : true})} className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg">
                    <div className="col-span-1">
                      <img src="assets/nuevo/icons/IMAGENES CATALOGO-02.svg" alt="option1" 
                        className="h-12 bg-bunsi-strong-green rounded-full pointer "
                      />
                    </div>
                    <div className="col-span-4">
                      {location}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                    </div>
                  </div>

                  <div onClick={() => handleShowPropDetailsModal({technical_planes : true})} className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg">
                    <div className="col-span-1">
                      <img src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg" alt="option1" 
                        className="h-12 bg-bunsi-strong-green rounded-full pointer "
                      />
                    </div>
                    <div className="col-span-4">
                      {technical_planes}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                    </div>
                  </div>

                  <div onClick={() => handleShowPropDetailsModal({all_in_hands : true})} className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg">
                    <div className="col-span-1">
                      <img src="assets/nuevo/icons/IMAGENES CATALOGO-04.svg" alt="option1" 
                        className="h-12 bg-bunsi-strong-green rounded-full pointer "
                      />
                    </div>
                    <div className="col-span-4">
                      {allinhands}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                    </div>
                  </div>

                  <div onClick={() => handleShowPropDetailsModal({credit_simulator : true})} className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg">
                    <div className="col-span-1">
                      <img src="assets/nuevo/icons/IMAGENES CATALOGO-05.svg" alt="option1" 
                        className="h-12 bg-bunsi-strong-green rounded-full pointer "
                      />
                    </div>
                    <div className="col-span-4">
                      {credit_simulator}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                    </div>
                  </div>

              </div>

            </div>
          </div>

          {/* Visión */}
          <div className={`prop-details-vision bg-bunsi-s-bone ${showPropVision ? "block" : "hidden"}`}>
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img src="assets/nuevo/icons/IMAGENES CATALOGO-01.svg" alt="option1" 
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {vision360}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end text-2xl smTextColor" onClick={() => handleShowPropDetailsModal({})}>
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                <div className="relative w-full md:h-96">
                {/* <div className="relative w-full h-48 md:h-96"> */}
                  <img src="/assets/nuevo/departamentos/360_area.png" alt="360_area" />
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className={`prop-details-vision bg-bunsi-s-bone ${showPropLocation ? "block" : "hidden"}`}>
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img src="assets/nuevo/icons/IMAGENES CATALOGO-02.svg" alt="option1" 
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {location}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end text-2xl smTextColor" onClick={() => handleShowPropDetailsModal({})}>
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                <div className="relative w-full h-72 md:h-96 mx-auto">
                {propiedadSelected && propiedadSelected.conoceMas.ubicacion ? (
                  <GoogleMap mapContainerStyle={containerStyle} center={{ lat: propiedadSelected?.lat || 0, lng: propiedadSelected?.lon || 0 }} zoom={12} >
                    <MarkerF
                      onLoad={onLoad}
                      position={{
                        lat: Number( propiedadSelected?.conoceMas.ubicacion.lat ) || 0,
                        lng: Number( propiedadSelected?.conoceMas.ubicacion.lon ) || 0,
                      }}
                    ></MarkerF>
                  </GoogleMap>
                ) : ''}
                </div>
              </div>
            </div>
          </div>
          
          {/* Planos técnicos */}
          <div className={`prop-details-vision bg-bunsi-s-bone ${showPropTechnicalPLanes ? "block" : "hidden"}`}>
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg" alt="option1" 
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {technical_planes}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end text-2xl smTextColor" onClick={() => handleShowPropDetailsModal({})}>
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                {/* <div className="relative w-full md:h-96"> */}
                  <img src={propiedadSelected?.conoceMas.planos.image || ""} alt="technical_planes_1" />
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Todo en tus manos */}
          <div className={`prop-details-vision bg-bunsi-s-bone ${showPropAllInHands ? "block" : "hidden"}`}>
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg" alt="option1" 
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {allinhands}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end text-2xl smTextColor" onClick={() => handleShowPropDetailsModal({})}>
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6">
                <Accordion flush alwaysOpen={false}>
                  <Accordion.Panel>
                    <Accordion.Title className="text-3xl" style={{ color: "#004523" }}>
                      <div className="flex justify-between">
                        {nature}{" "}
                        <span className="self-center ml-3">
                          <img src="assets/nuevo/icons/todo en tus manos-24.svg" alt="social-icon" className="w-8 h-8"/>
                        </span>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content>
                      {/* <div className="grid grid-cols-6 smTextColor scrool-vertical"> */}
                      <div className="grid grid-cols-6 smTextColor">
                        <div className="col-span-6 md:col-span-3">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Playas
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.natural.playas.map(
                              (playa, index) => (
                                <li className="flex justify-between" key={index}>
                                  <div>{playa.nombre}</div>
                                  <div>{playa.kilometros}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="col-span-6 md:col-span-3 pt-3 md:pt-0">
                          <div className="text-2xl border-b-2 border-color-bunsi">
                            <div className="flex justify-start">
                              Montañas
                            </div>
                          </div>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.natural.montañas.map(
                              (montana, index) => (
                                <li
                                  className="flex justify-between"
                                  key={index}
                                >
                                  <div>{montana.nombre}</div>
                                  <div>{montana.kilometros}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="text-3xl" style={{ color: "#004523" }}>
                      <div className="flex justify-between">
                        {experiences}{" "}
                        <span className="self-center ml-3">
                          <img src="assets/nuevo/icons/todo en tus manos-22.svg" alt="social-icon" className="w-8 h-8"/>
                        </span>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="grid grid-cols-6 smTextColor">
                      {/* <div className="grid grid-cols-6 smTextColor scrool-vertical"> */}
                        <div className="col-span-6 md:col-span-3">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Excursiones
                          </p>
                          <ul className="list-disc ">
                            {propiedadSelected?.conoceMas.specs.experiencias.excursiones.map(
                              (excursion, index) => (
                                <li
                                  className="flex justify-between"
                                  key={index}
                                >
                                  <div>{excursion.nombre}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="col-span-6 md:col-span-3 pt-3 md:pt-0">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Tours
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.experiencias.tour.map(
                              (tour, index) => (
                                <li
                                  className="flex justify-between"
                                  key={index}
                                >
                                  <div>{tour.nombre}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="text-3xl" style={{ color: "#004523" }}>
                      <div className="flex justify-between">
                        {social}{" "}
                        <span className="self-center ml-3">
                          <img src="assets/nuevo/icons/todo en tus manos-21.svg" alt="social-icon" className="w-8 h-8"/>
                        </span>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="grid grid-cols-6 smTextColor">
                      {/* <div className="grid grid-cols-6 smTextColor scrool-vertical"> */}
                        <div className="col-span-6 md:col-span-3">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Restaurantes
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.experiencias.excursiones.map(
                              (excursion, index) => (
                                <li className="flex justify-between" key={index}>
                                  <div>{excursion.nombre}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="col-span-6 md:col-span-3 pt-3 md:pt-0">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Tiendas
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.social.tiendas.map(
                              (tienda, index) => (
                                <li className="flex justify-between" key={index}>
                                  <div>{tienda.nombre}</div>
                                  <div>{tienda.kilometros}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="text-3xl" style={{ color: "#004523" }}>
                      <div className="flex justify-between">
                        {culture}{" "}
                        <span className="self-center ml-3">
                          <img src="assets/nuevo/icons/todo en tus manos-28.svg" alt="social-icon" className="w-8 h-8"/>
                        </span>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="grid grid-cols-6 smTextColor">
                      {/* <div className="grid grid-cols-6 smTextColor scrool-vertical"> */}
                        <div className="col-span-6 md:col-span-3">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Musica
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.cultura.musica.map(
                              (musica, index) => (
                                <li className="flex justify-between" key={index} >
                                  <div>{musica.nombre}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="col-span-6 md:col-span-3 pt-3 md:pt-0">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                            Deporte
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.cultura.deporte.map(
                              (deporte, index) => (
                                <li
                                  className="flex justify-between"
                                  key={index}
                                >
                                  <div>{deporte.nombre}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="text-3xl" style={{ color: "#004523" }}>
                      <div className="flex justify-between">
                        {health}{" "}
                        <span className="self-center ml-3">
                          <img src="assets/nuevo/icons/todo en tus manos-28.svg" alt="social-icon" className="w-8 h-8"/>
                        </span>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content>
                    <div className="grid grid-cols-6 smTextColor">
                      {/* <div className="grid grid-cols-6 smTextColor scrool-vertical"> */}
                        <div className="col-span-6 md:col-span-3">
                          <p className="text-2xl border-b-2 border-color-bunsi">
                          Hospitales
                          </p>
                          <ul className="list-disc">
                            {propiedadSelected?.conoceMas.specs.salud.hospitales.map(
                              (hospital, index) => (
                                <li className="flex justify-between" key={index} >
                                  <div>{hospital.nombre}</div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            </div>
          </div>
          
          {/* Simulador */}
          <div className={`prop-details-vision bg-bunsi-s-bone ${showPropCreditSimulator ? "block" : "hidden"}`}>
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img src="assets/nuevo/icons/IMAGENES CATALOGO-05.svg" alt="option1" 
                  className="h-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {credit_simulator}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end text-2xl smTextColor" onClick={() => handleShowPropDetailsModal({})}>
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                {propiedadSelected && (
                  <div className="">
                    <Simulador propertySelected={propiedadSelected} propertySimulador={propiedadesSimulador} resSemanas={resumenSemanas} ></Simulador>
                    {/* De aquí para abajo se tomará el componente del simulador */}
                    
                    {/* No sé que hace esto */}
                    <div className="w-full flex mt-3 p-2 text-center">
                      {propiedadesSimulador.badgeSemanas && (
                        <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    No se han completado todas las
                                    semanas en renta.
                                  </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => handleCloseModal()}
                                  >
                                    cerrar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </>
  );
};

export default PropiedadDetalles;
