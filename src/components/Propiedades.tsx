import { Accordion } from "flowbite-react";
import axios from "axios";

import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Propiedad from "../types/propiedad";
import Semanas from "../types/semanas";
import Temps from "../types/temps";
import { useIntl } from "react-intl";
import Image from "next/image";

import { useRouter } from "next/router";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
// import { any } from "zod";
import Simulador from "./Simulador"; // Componente del simulador
import PropiedadDetalles from "./PropiedadDetalles";
import MyAccordion from "./MyAccordion";

type Props = {
  isUserLogin: string;
};

const Propiedades: React.FC<Props> = ({ isUserLogin }) => {
  const [showPropPage, setShowPropPage] = useState(false);
  const [showPropDetails, setShowPropDetails] = useState(false);

  // Variables para mostrar las secciones del detalle de la propiedad
  const [showPropVision, setShowPropVision] = useState(false);
  const [showPropLocation, setShowPropLocation] = useState(false);
  const [showPropTechnicalPLanes, setShowPropTechnicalPLanes] = useState(false);
  const [showPropAllInHands, setShowPropAllInHands] = useState(false);
  const [showPropCreditSimulator, setShowPropCreditSimulator] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [ownerships, setOwnerships] = useState([]);
  const [propiedadesModal, setPropiedadesModal] = useState({
    carousel: true,
    spacial: false,
    ubicacion: false,
    planos: false,
    specs: false,
    simulador: false,
    cotizar: false,
  });
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

  const [propiedadesSimuladorPaso2, setPropiedadesSimuladorPaso2] = useState({
    op1: false,
    op2: false,
    op3: false,
    blockFraccioPas1: false,
    blockSemanasPas1: false,
    blockUsoPersonalPas2: false,
    blockSemPas3Opc1: false,
    blockSemPas3Opc2: false,
    blockSemPas3Opc3: false,
  });

  const [propiedadesCotizar, setPropiedadesCotizar] = useState({
    pantalla1: true,
    pantalla2: false,
    pantalla3: false,
    pantalla4: false,
    pantalla5: false,
    pantalla6: false,
  });

  const [propiedadesIntereses, setPropiedadesIntereses] = useState({
    arte: false,
    ia: false,
    espiritualidad: false,
    ciencia: false,
    trabajoRemoto: false,
    hiking: false,
    playa: false,
    fitness: false,
    cine: false,
    tecnologia: false,
    redesSociales: false,
    poesia: false,
    snorkel: false,
    mascotas: false,
    arquitectura: false,
    viaje: false,
    musica: false,
    fastfoot: false,
    negocios: false,
    accesibilidad: false,
    lgbtqia: false,
    lifestyle: false,
    diseño: false,
    humor: false,
    Mindfulness: false,
    Religión: false,
    Política: false,
    Yoga: false,
    Cultura: false,
    Pesca: false,
    educacion: false,
    lectura: false,
    slowFood: false,
    buceo: false,
    astrologia: false,
    vinos: false,
    gadgets: false,
  });

  const [propiedadeFormCotizar, setPropiedadeFormCotizar] = useState({
    name: "",
    s_name: "",
    last_name: "",
    s_last_name: "",
    code_phone: "",
    phone: "",
    email: "",
    type_id: "",
    id_user: "",
    age: "",
    contactMethod: "mail",
  });

  const [propiedadeFormCheckeds, setPropiedadeFormCheckeds] = useState({
    mail: true,
    telefono: false,
    whatsapp: false,
  });

  const [propiedadesLugares, setPropiedadesLugares] = useState({
    riviera: false,
    playa: false,
    cabos: false,
    tulum: false,
    cancun: false,
    vallarta: false,
  });

  const [resumenSemanas, setResumenSemanas] = useState({
    semanaAlta: 0,
    semanaMedia: 0,
    semanaBaja: 0,
    mathSemanaAlta: 0,
    mathSemanaMedia: 0,
    mathSemanaBaja: 0,
    weeksSemanaAlta: "",
    weeksSemanaMedia: "",
    weeksSemanaBaja: "",
  });

  // variable para dependencia del UseEffect
  const [bandera, setBandera] = useState(true);

  //const [optionSelectTempAl, setOptionSelectTempAl] = useState([]);
  const optionSelectTempAl: Array<any> = [];

  const semanas: Array<Semanas> = [];

  // const propiedades: Array<Propiedad> = [];
  const [propiedades, setPropiedades] = useState(Array<Propiedad>);

  const [propiedadSelected, setPropiedadSelected] = useState<Propiedad>();

  const intl = useIntl();

  const title = intl.formatMessage({ id: "page.home.properties.title" });
  const subtitle = intl.formatMessage({ id: "page.home.properties.subtitle" });
  const features = intl.formatMessage({ id: "page.home.properties.features" });
  // const bedrooms = intl.formatMessage({ id: "page.home.properties.bedrooms" });
  const bedrooms = intl.formatMessage({
    id: "page.home.properties.bedrooms_short",
  });
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
  const quote = intl.formatMessage({ id: "page.home.properties.quote" });
  const vision360 = intl.formatMessage({
    id: "page.home.properties.360vision",
  });
  const location = intl.formatMessage({ id: "page.home.properties.location" });
  const howtoget = intl.formatMessage({ id: "page.home.properties.howtoget" });
  const technical_planes = intl.formatMessage({
    id: "page.home.properties.technical_planes",
  });
  const technical_planes_download = intl.formatMessage({
    id: "page.home.properties.technical_planes.download",
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
  const download_simulation = intl.formatMessage({
    id: "page.home.properties.download_simulation",
  });

  const btn_knowmore = intl.formatMessage({
    id: "page.home.btn_view",
    // id: "page.home.btn_knowmore",
  });

  //simulator
  const title_simulator = intl.formatMessage({
    id: "page.home.simulator.title",
  });
  const fraction = intl.formatMessage({
    id: "page.home.simulator.paso1.fraction",
  });
  const Investment = intl.formatMessage({
    id: "page.home.simulator.paso1.Investment",
  });
  const weeks = intl.formatMessage({
    id: "page.home.simulator.paso1.weeks",
  });
  const Monthlycost = intl.formatMessage({
    id: "page.home.simulator.paso1.Monthlycost",
  });
  const personaluse = intl.formatMessage({
    id: "page.home.simulator.paso2.personaluse",
  });
  const rentaluse = intl.formatMessage({
    id: "page.home.simulator.paso2.rentaluse",
  });
  const weeks_use_title = intl.formatMessage({
    id: "page.home.simulator.paso2.resumensemanas",
  });
  const resumensemanas_alta = intl.formatMessage({
    id: "page.home.simulator.paso2.resumensemanas_alta",
  });
  const resumensemanas_media = intl.formatMessage({
    id: "page.home.simulator.paso2.resumensemanas_media",
  });
  const resumensemanas_baja = intl.formatMessage({
    id: "page.home.simulator.paso2.resumensemanas_baja",
  });
  const rental = intl.formatMessage({
    id: "page.home.simulator.paso3.rental",
  });
  const dailyrent = intl.formatMessage({
    id: "page.home.simulator.paso3.dailyrent",
  });
  const Occupation = intl.formatMessage({
    id: "page.home.simulator.paso3.Occupation",
  });
  const chooseanoption = intl.formatMessage({
    id: "page.home.simulator.chooseanoption",
  });
  const btncal = intl.formatMessage({
    id: "page.home.simulator.btncal",
  });
  const btnreset = intl.formatMessage({
    id: "page.home.simulator.btnreset",
  });
  const contract1 = intl.formatMessage({
    id: "page.home.simulator.contract1",
  });
  const contract2 = intl.formatMessage({
    id: "page.home.simulator.contract2",
  });
  const contract3 = intl.formatMessage({
    id: "page.home.simulator.contract3",
  });
  const fraction_s = intl.formatMessage({
    id: "page.home.simulator.fraction_s",
  });
  const fractions_s = intl.formatMessage({
    id: "page.home.simulator.fractions_s",
  });
  const week_s = intl.formatMessage({
    id: "page.home.simulator.week_s",
  });
  const weeks_s = intl.formatMessage({
    id: "page.home.simulator.weeks_s",
  });
  const highseason = intl.formatMessage({
    id: "page.home.simulator.highseason",
  });
  const middleseason = intl.formatMessage({
    id: "page.home.simulator.middleseason",
  });
  const lowseason = intl.formatMessage({
    id: "page.home.simulator.lowseason",
  });

  useEffect(() => {
    const getOwnerships = async () => {
      await axios
        // .get("http://127.0.0.1:3100/api/mongo/ownerships")
        // .get("https://api-bunsi.herokuapp.com/api/mongo/ownerships")
        .get("https://backend-bunsi-production-ad87.up.railway.app/api/mongo/ownerships")
        .then((response) => {
          console.log(`Éxito cargando las ${response.data.Ownerships.length} propiedades`);
          setPropiedades(response.data.Ownerships);
          setOwnerships(response.data.Ownerships);
        })
        .catch((e) => {
          console.log(`Error al cargar las propiedades: ${e}`);
        });
    };
    if (bandera) {
      // console.log('Entró al if de bandera');
      getOwnerships();
      setBandera(!bandera);
    }
    console.log(ownerships);
    setIsLoading(true);
  });

  /**
   * Método que setea la propiedad seleccionada a través del botón conoce más
   * @param index Integer
   */
  const handleDepartamentoModal = async (index: any) => {
    console.log(`Entró a función handleDepartamentoModal: ${index}`);
    //if (isUserLogin === 'unauthenticated') {
    //setShowLoginModal(true)
    //} else {
    const propiedad = propiedades.find((propiedad) => propiedad.id === index);
    setPropiedadSelected(propiedad);
    setShowModal(true);
    //}
  };

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

    if (config.vision === true) {
      setShowPropVision(true);
    } else if (config.location === true) {
      setShowPropLocation(true);
    } else if (config.technical_planes === true) {
      setShowPropTechnicalPLanes(true);
    } else if (config.all_in_hands === true) {
      setShowPropAllInHands(true);
    } else if (config.credit_simulator === true) {
      setShowPropCreditSimulator(true);
    } else {
      setShowPropDetails(true);
    } // Vuelve a mostrar el detalle
  };

  /**
   * Método que setea la propiedad seleccionada y despliega su información en la vista de detalles
   * @param index Integer
   */
  const handleDepartamentoDetails = async (index: any) => {
    console.log(`Entró a función handleDepartamentoDetails: ${index}`);

    // Se oculta el HTML principal
    const mainContainerHtml = document.getElementById('mainContainer');
    const componentHeaders = document.getElementById('mainComponentsHeader');
    const todosGananHtml = document.getElementById('todos-ganan');
    const propiedadesHtml = document.getElementById('propiedades');
    const registroModalHtml = document.getElementById('registroModal');
    const proptechHtml = document.getElementById('proptech');
    const beneficiosHtml = document.getElementById('beneficios');
    const formConoceMasHtml = document.getElementById('formulario-conoce-mas');
    const textMenuMobile = document.getElementById('centerTextMobileMenu');

    // Se modifica el backgrpund
    // mainContainerHtml?.classList.add('bg-image-prop-details');
    mainContainerHtml?.classList.remove('bg-image');
    componentHeaders?.classList.add('hidden');
    todosGananHtml?.classList.add('hidden');
    propiedadesHtml?.classList.add('hidden');
    registroModalHtml?.classList.add('hidden');
    proptechHtml?.classList.add('hidden');
    beneficiosHtml?.classList.add('hidden');
    formConoceMasHtml?.classList.add('hidden');
    textMenuMobile?.classList.remove('hidden');

    const propiedad = propiedades.find((propiedad) => propiedad.id === index);
    setPropiedadSelected(propiedad);
    setShowPropPage(true);
    setShowPropDetails(true);

    console.log(`La propiedad seleccionada es: ${propiedadSelected}`);
  };

  /**
   * Método para regresar a hacer visibles los componentes
   */
  const handleBackToIndexPage = async () => {
    // Se muestra el HTML principal
    const mainContainerHtml = document.getElementById('mainContainer');
    const componentHeaders = document.getElementById('mainComponentsHeader');
    const todosGananHtml = document.getElementById('todos-ganan');
    const propiedadesHtml = document.getElementById('propiedades');
    const registroModalHtml = document.getElementById('registroModal');
    const proptechHtml = document.getElementById('proptech');
    const beneficiosHtml = document.getElementById('beneficios');
    const formConoceMasHtml = document.getElementById('formulario-conoce-mas');
    const textMenuMobile = document.getElementById('centerTextMobileMenu');

    // mainContainerHtml?.classList.remove('bg-image-prop-details');
    mainContainerHtml?.classList.add('bg-image');
    componentHeaders?.classList.remove('hidden');
    todosGananHtml?.classList.remove('hidden');
    propiedadesHtml?.classList.remove('hidden');
    registroModalHtml?.classList.remove('hidden');
    proptechHtml?.classList.remove('hidden');
    beneficiosHtml?.classList.remove('hidden');
    formConoceMasHtml?.classList.remove('hidden');
    textMenuMobile?.classList.add('hidden');

    setShowPropPage(false);
    setShowPropDetails(false);
  };

  /**
   * Resetea el cálculo del simulador
   */
  const handleBtnReset = () => {
    setPropiedadesSimulador({
      ...propiedadesSimulador,
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
    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      op1: false,
      op2: false,
      op3: false,
      blockFraccioPas1: false,
      blockSemanasPas1: false,
      blockUsoPersonalPas2: false,
      blockSemPas3Opc1: false,
      blockSemPas3Opc2: false,
      blockSemPas3Opc3: false,
    });
    setResumenSemanas({
      ...resumenSemanas,
      semanaAlta: 0,
      semanaMedia: 0,
      semanaBaja: 0,
      mathSemanaAlta: 0,
      mathSemanaMedia: 0,
      mathSemanaBaja: 0,
      weeksSemanaAlta: "",
      weeksSemanaMedia: "",
      weeksSemanaBaja: "",
    });
  };

  const handleCloseMiniModal = () => {
    setPropiedadesModal({
      ...propiedadesModal,
      carousel: true,
      spacial: false,
      ubicacion: false,
      planos: false,
      specs: false,
      simulador: false,
      cotizar: false,
    });

    setPropiedadesSimulador({
      ...propiedadesSimulador,
      op1: false,
      op2: false,
      selectPas1: 0,
      selectSemPas1: 0,
      selectSemPas1Input: 0,
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
      selectSemPas1InputTxt: "",
      selectHighSeason: -1,
      selectMiddleSeason: -1,
      selectLowSeason: -1,
    });

    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      op1: false,
      op2: false,
      op3: false,
      blockFraccioPas1: false,
      blockSemanasPas1: false,
      blockUsoPersonalPas2: false,
      blockSemPas3Opc1: false,
      blockSemPas3Opc2: false,
      blockSemPas3Opc3: false,
    });

    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: true,
      pantalla2: false,
      pantalla3: false,
      pantalla4: false,
      pantalla5: false,
      pantalla6: false,
    });

    setPropiedadesIntereses({
      ...propiedadesCotizar,
      arte: false,
      ia: false,
      espiritualidad: false,
      ciencia: false,
      trabajoRemoto: false,
      hiking: false,
      playa: false,
      fitness: false,
      cine: false,
      tecnologia: false,
      redesSociales: false,
      poesia: false,
      snorkel: false,
      mascotas: false,
      arquitectura: false,
      viaje: false,
      musica: false,
      fastfoot: false,
      negocios: false,
      accesibilidad: false,
      lgbtqia: false,
      lifestyle: false,
      diseño: false,
      humor: false,
      Mindfulness: false,
      Religión: false,
      Política: false,
      Yoga: false,
      Cultura: false,
      Pesca: false,
      educacion: false,
      lectura: false,
      slowFood: false,
      buceo: false,
      astrologia: false,
      vinos: false,
      gadgets: false,
    });

    setResumenSemanas({
      ...resumenSemanas,
      semanaAlta: 0,
      semanaMedia: 0,
      semanaBaja: 0,
      mathSemanaAlta: 0,
      mathSemanaMedia: 0,
      mathSemanaBaja: 0,
      weeksSemanaAlta: "",
      weeksSemanaMedia: "",
      weeksSemanaBaja: "",
    });
  };

  const handlecostoVivienda = () => {
    const costoVivienda = propiedadSelected?.conoceMas.simulador.costovivienda;
    return "$ " + costoVivienda?.toLocaleString("en-US") + " MXN";
  };

  const handleSetSemanasFracccion = () => {
    const new_array = [];
    const fracc = Number(propiedadSelected?.caracteristicas.fracciones);
    const dis = Number(propiedadSelected?.caracteristicas.disponibles);
    for (let i = 0; i < fracc; i++) {
      if (i + 1 == 1) {
        new_array.push(
          <option value={i + 1}>
            {i + 1} {fraction_s}
          </option>
        );
      } else {
        if (i + 1 <= dis) {
          new_array.push(
            <option value={i + 1}>
              {i + 1} {fractions_s}
            </option>
          );
        } else {
          new_array.push(
            <option value={i + 1}>
              {i + 1} {fractions_s}
            </option>
          );
        }
      }
    }
    return new_array;
  };

  const handleSetSemanasUsoPersonal = (n: number) => {
    const n_semanas = n;
    const new_array = [];
    for (let i = 0; i < n_semanas; i++) {
      if (i + 1 == 1) {
        new_array.push(
          <option value={i + 1}>
            {i + 1} {week_s}
          </option>
        );
      } else {
        new_array.push(
          <option value={i + 1}>
            {i + 1} {weeks_s}
          </option>
        );
      }
    }
    return new_array;
  };

  const handleSetInversion = (e: any) => {
    console.log("inversion: " + propiedadSelected?.caracteristicas.precioMXN);
    const value_e = Number(e.target.value);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      numInversion: value_e,
    });
  };

  const getRenta1Temps = () => {
    const new_array = [];
    if (propiedadesSimulador.disabledTempAlta == true) {
      new_array.push(
        <option value="1" disabled>
          {highseason}
        </option>
      );
    } else {
      new_array.push(<option value="1">{highseason}</option>);
    }
    if (propiedadesSimulador.disabledTempMedia == true) {
      new_array.push(
        <option value="2" disabled>
          {middleseason}
        </option>
      );
    } else {
      new_array.push(<option value="2">{middleseason}</option>);
    }
    if (propiedadesSimulador.disabledTempBaja == true) {
      new_array.push(
        <option value="3" disabled>
          {lowseason}
        </option>
      );
    } else {
      new_array.push(<option value="3">{lowseason}</option>);
    }
    return new_array;
  };

  const handleSetRenta1 = (e: any) => {
    const value_e = Number(e.target.value);
    const name_s = e.target.name;
    console.log(name_s);
    switch (name_s) {
      case "select_temp_op1":
        if (value_e == 1) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta1: value_e,
            disabledTempAlta: true,
            rentaDiariaOpc1: "$9,000 MXN*",
            ocupacionOpc1: "90%",
          });
        }
        if (value_e == 2) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta1: value_e,
            disabledTempMedia: true,
            rentaDiariaOpc1: "$6,600 MXN*",
            ocupacionOpc1: "60%",
          });
        }
        if (value_e == 3) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta1: value_e,
            disabledTempBaja: true,
            rentaDiariaOpc1: "$4,400 MXN*",
            ocupacionOpc1: "40%",
          });
        }
        break;
      case "select_temp_op2":
        if (value_e == 1) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta2: value_e,
            disabledTempAlta: true,
            rentaDiariaOpc2: "$9,000 MXN*",
            ocupacionOpc2: "90%",
          });
        }
        if (value_e == 2) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta2: value_e,
            disabledTempMedia: true,
            rentaDiariaOpc2: "$6,600 MXN*",
            ocupacionOpc2: "60%",
          });
        }
        if (value_e == 3) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta2: value_e,
            disabledTempBaja: true,
            rentaDiariaOpc2: "$4,400 MXN*",
            ocupacionOpc2: "40%",
          });
        }
        break;
      case "select_temp_op3":
        if (value_e == 1) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta3: value_e,
            disabledTempAlta: true,
            rentaDiariaOpc3: "$9,000 MXN*",
            ocupacionOpc3: "90%",
          });
        }
        if (value_e == 2) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta3: value_e,
            disabledTempMedia: true,
            rentaDiariaOpc3: "$6,600 MXN*",
            ocupacionOpc3: "60%",
          });
        }
        if (value_e == 3) {
          setPropiedadesSimulador({
            ...propiedadesSimulador,
            selectRenta3: value_e,
            disabledTempBaja: true,
            rentaDiariaOpc3: "$4,400 MXN*",
            ocupacionOpc3: "40%",
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSetTotalTempAlta = (e: any) => {
    const value_e = Number(e.target.value);
    const calTempAlta = 9000 * value_e;
    const total =
      calTempAlta +
      propiedadesSimulador.totalTempMedia +
      propiedadesSimulador.totalTempBaja;
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      totalTempAlta: total,
    });
  };

  const handleSelectPas1 = (e: any) => {
    const value_e = Number(e.target.value);
    const fracciones = propiedadSelected?.caracteristicas.fracciones;
    let fracc_seman = 0;
    switch (fracciones) {
      case "10":
        fracc_seman = 5;
        break;
      case "8":
        fracc_seman = 6;
        break;
      case "6":
        fracc_seman = 8;
        break;
      case "4":
        fracc_seman = 13;
        break;
      case "2":
        fracc_seman = 26;
        break;
    }

    const semanasFraccionN = Number(fracc_seman * value_e).toFixed();
    let semanasFraccion = Number(semanasFraccionN);

    console.log("fracciones", fracciones);

    switch (value_e) {
      case 1:
        if (fracciones == "8") {
          semanasFraccion = 7;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 2,
            semanaMedia: 3,
            semanaBaja: 2,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 6;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 2,
            semanaMedia: 2,
            semanaBaja: 2,
          });
        }
        break;
      case 2:
        if (fracciones == "8") {
          semanasFraccion = 14;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 4,
            semanaMedia: 5,
            semanaBaja: 5,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 12;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 4,
            semanaMedia: 4,
            semanaBaja: 4,
          });
        }
        break;
      case 3:
        if (fracciones == "8") {
          semanasFraccion = 21;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 6,
            semanaMedia: 7,
            semanaBaja: 8,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 18;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 6,
            semanaMedia: 6,
            semanaBaja: 6,
          });
        }
        break;
      case 4:
        if (fracciones == "8") {
          semanasFraccion = 27;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 8,
            semanaMedia: 9,
            semanaBaja: 10,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 24;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 8,
            semanaMedia: 8,
            semanaBaja: 8,
          });
        }
        break;
      case 5:
        if (fracciones == "8") {
          semanasFraccion = 33;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 10,
            semanaMedia: 11,
            semanaBaja: 13,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 30;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 10,
            semanaMedia: 10,
            semanaBaja: 10,
          });
        }
        break;
      case 6:
        if (fracciones == "8") {
          semanasFraccion = 40;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 12,
            semanaMedia: 13,
            semanaBaja: 16,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 36;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 12,
            semanaMedia: 12,
            semanaBaja: 12,
          });
        }
        break;
      case 7:
        if (fracciones == "8") {
          semanasFraccion = 47;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 14,
            semanaMedia: 15,
            semanaBaja: 18,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 41;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 13,
            semanaMedia: 14,
            semanaBaja: 14,
          });
        }
        break;
      case 8:
        if (fracciones == "8") {
          semanasFraccion = 53;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 16,
            semanaMedia: 17,
            semanaBaja: 20,
          });
        } else if (fracciones == "10") {
          semanasFraccion = 45;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 14,
            semanaMedia: 15,
            semanaBaja: 17,
          });
        }
        break;
      case 9:
        if (fracciones == "10") {
          semanasFraccion = 49;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 15,
            semanaMedia: 16,
            semanaBaja: 19,
          });
        }
        break;
      case 10:
        if (fracciones == "10") {
          semanasFraccion = 53;
          setResumenSemanas({
            ...resumenSemanas,
            semanaAlta: 16,
            semanaMedia: 17,
            semanaBaja: 21,
          });
        }
        break;
      default:
        setResumenSemanas({
          ...resumenSemanas,
          semanaAlta: 0,
          semanaMedia: 0,
          semanaBaja: 0,
        });
        break;
    }

    handleSetSemanasUsoPersonal(semanasFraccion);
    const inversion = (
      Number(propiedadSelected?.caracteristicas.precioMXN) * value_e
    ).toFixed();
    const inversionN = Number(inversion);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectPas1: value_e,
      selectSemPas1: semanasFraccion,
      selectSemPas1Input: semanasFraccion,
      selectSemPas1InputTxt: String(semanasFraccion),
      inversionFraccion: inversionN,
      inversionFraccionTxt: "$ " + inversionN.toLocaleString("en-US") + " MXN*",
      op1: false,
      op2: false,
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
      semPas1: 0,
    });
    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      blockFraccioPas1: true,
      op1: false,
      op2: false,
      op3: false,
      blockSemanasPas1: false,
      blockUsoPersonalPas2: false,
      blockSemPas3Opc1: false,
      blockSemPas3Opc2: false,
      blockSemPas3Opc3: false,
    });
  };

  const handleSelectHighSeason = (e: any) => {
    const value_e = Number(e.target.value);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectHighSeason: value_e,
    });
    const weeksHighSeason = resumenSemanas.semanaAlta;
    const mathWeeksHighSeason = weeksHighSeason - value_e;
    let strWeeks = "";
    if (mathWeeksHighSeason === 0) {
      strWeeks = mathWeeksHighSeason + " " + weeks_s;
    } else if (mathWeeksHighSeason === 1) {
      strWeeks = mathWeeksHighSeason + " " + week_s;
    } else {
      strWeeks = mathWeeksHighSeason + " " + weeks_s;
    }
    setResumenSemanas({
      ...resumenSemanas,
      mathSemanaAlta: 9000 * mathWeeksHighSeason,
      weeksSemanaAlta: strWeeks,
    });
  };

  const handleSelectMiddleSeason = (e: any) => {
    const value_e = Number(e.target.value);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectMiddleSeason: value_e,
    });
    const weeksMiddleSeason = resumenSemanas.semanaMedia;
    const mathWeeksMiddleSeason = weeksMiddleSeason - value_e;
    let strWeeks = "";
    if (mathWeeksMiddleSeason === 0) {
      strWeeks = mathWeeksMiddleSeason + " " + weeks_s;
    } else if (mathWeeksMiddleSeason === 1) {
      strWeeks = mathWeeksMiddleSeason + " " + week_s;
    } else {
      strWeeks = mathWeeksMiddleSeason + " " + weeks_s;
    }
    setResumenSemanas({
      ...resumenSemanas,
      mathSemanaMedia: 6600 * mathWeeksMiddleSeason,
      weeksSemanaMedia: strWeeks,
    });
  };

  const handleSelectLowSeason = (e: any) => {
    const value_e = Number(e.target.value);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectLowSeason: value_e,
    });
    const weekslowSeason = resumenSemanas.semanaBaja;
    const mathWeeksLowSeason = weekslowSeason - value_e;
    let strWeeks = "";
    if (mathWeeksLowSeason === 0) {
      strWeeks = mathWeeksLowSeason + " " + weeks_s;
    } else if (mathWeeksLowSeason === 1) {
      strWeeks = mathWeeksLowSeason + " " + week_s;
    } else {
      strWeeks = mathWeeksLowSeason + " " + weeks_s;
    }
    setResumenSemanas({
      ...resumenSemanas,
      mathSemanaBaja: 4400 * mathWeeksLowSeason,
      weeksSemanaBaja: strWeeks,
    });
  };

  const setWeeksTemHigh = (sem: number) => {
    const content = [];
    for (let i = 0; i <= sem; i++) {
      if (i == 0) {
        content.push(
          <option value={i}>
            {i} {weeks_s}
          </option>
        );
      } else if (i == 1) {
        content.push(
          <option value={i}>
            {i} {week_s}
          </option>
        );
      } else {
        content.push(
          <option value={i}>
            {i} {weeks_s}
          </option>
        );
      }
    }
    return content;
  };

  const setWeeksTemMiddle = (sem: number) => {
    const content = [];
    for (let i = 0; i <= sem; i++) {
      if (i == 0) {
        content.push(
          <option value={i}>
            {i} {weeks_s}
          </option>
        );
      } else if (i == 1) {
        content.push(
          <option value={i}>
            {i} {week_s}
          </option>
        );
      } else {
        content.push(
          <option value={i}>
            {i} {weeks_s}
          </option>
        );
      }
    }
    return content;
  };

  const setWeeksTemLow = (sem: number) => {
    const content = [];
    for (let i = 0; i <= sem; i++) {
      if (i == 0) {
        content.push(
          <option value={i}>
            {i} {weeks_s}
          </option>
        );
      } else if (i == 1) {
        content.push(
          <option value={i}>
            {i} {week_s}
          </option>
        );
      } else {
        content.push(
          <option value={i}>
            {i} {weeks_s}
          </option>
        );
      }
    }
    return content;
  };

  const handleSelectsUsoPersonalPas2 = (e: any) => {
    const value_e = Number(e.target.value);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectUsoPersonalPas2: e.target.value,
      selectRenta2: 0,
      selectRenta3: 0,
    });
    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      blockUsoPersonalPas2: true,
    });
    const sem_fracciones = propiedadesSimulador.selectSemPas1;
    const total_renta = sem_fracciones - value_e;
    semanas.push({ id: 1, value: total_renta + " Semanas" });
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      usoRentaPas2: String(total_renta),
      usoRentaPas2Num: total_renta,
      NUMselectSemPas3Opc1: total_renta,
    });
    getSemanas2Pas3(0);
    getSemanas3Pas3(0);
    console.log("Uso renta: " + propiedadesSimulador.usoRentaPas2);
  };

  const handleSelectsSemPas1 = (e: any) => {
    const value_e = Number(e.target.value);
    switch (value_e) {
      case 1:
        setPropiedadesSimuladorPaso2({
          ...propiedadesSimuladorPaso2,
          op1: false,
          op2: false,
          op3: false,
          blockSemanasPas1: true,
        });
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas1: value_e,
          selectUsoPersonalPas2: 0,
          usoRentaPas2: "",
        });
        break;
      case 2:
        setPropiedadesSimuladorPaso2({
          ...propiedadesSimuladorPaso2,
          op1: true,
          op2: false,
          op3: false,
          blockSemanasPas1: true,
        });
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas1: value_e,
          selectUsoPersonalPas2: 0,
          usoRentaPas2: "",
        });
        break;
      case 3:
        setPropiedadesSimuladorPaso2({
          ...propiedadesSimuladorPaso2,
          op1: true,
          op2: true,
          op3: false,
          blockSemanasPas1: true,
        });
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas1: value_e,
          selectUsoPersonalPas2: 0,
          usoRentaPas2: "",
        });
        break;
      case 4:
        setPropiedadesSimuladorPaso2({
          ...propiedadesSimuladorPaso2,
          op1: true,
          op2: true,
          op3: true,
          blockSemanasPas1: true,
        });
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas1: value_e,
          selectUsoPersonalPas2: 0,
          usoRentaPas2: "",
        });
        break;
      default:
        setPropiedadesSimuladorPaso2({
          ...propiedadesSimuladorPaso2,
          op1: true,
          op2: true,
          op3: true,
          blockSemanasPas1: true,
        });
        break;
    }
    console.log(value_e);
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectSemPas1: value_e,
      selectUsoPersonalPas2: 0,
      usoRentaPas2: "",
    });
    console.log(propiedadesSimulador.selectSemPas1);
  };

  const handleSemPas3Opc1 = (e: any) => {
    const value_e = Number(e.target.value);
    const n = propiedadesSimulador.NUMselectSemPas3Opc1 - value_e;
    const n_tem = propiedadesSimulador.selectRenta1;
    let calTempAlta = 0;
    let calTempMedia = 0;
    let calTempBaja = 0;
    switch (n_tem) {
      case 1:
        calTempAlta = 72000 * value_e * 0.9;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc1: value_e,
          NUMselectSemPas3Opc2: n,
          totalTempAlta: calTempAlta,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempAlta,
        });
        console.log(calTempAlta);
        break;
      case 2:
        calTempMedia = 52800 * value_e * 0.6;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc1: value_e,
          NUMselectSemPas3Opc2: n,
          totalTempMedia: calTempMedia,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempMedia,
        });
        console.log(calTempMedia);
        break;
      case 3:
        calTempBaja = 35200 * value_e * 0.4;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc1: value_e,
          NUMselectSemPas3Opc2: n,
          totalTempBaja: calTempBaja,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempBaja,
        });
        console.log(calTempBaja);
        break;

      default:
        break;
    }
    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      blockSemPas3Opc1: true,
    });
  };

  const handleSemPas3Opc2 = (e: any) => {
    const value_e = Number(e.target.value);
    const n = propiedadesSimulador.NUMselectSemPas3Opc2 - value_e;
    const n_tem = propiedadesSimulador.selectRenta2;
    let calTempAlta = 0;
    let calTempMedia = 0;
    let calTempBaja = 0;
    console.log("select rental 2", n_tem);
    switch (n_tem) {
      case 1:
        calTempAlta = 72000 * value_e * 0.9;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc2: value_e,
          NUMselectSemPas3Opc3: n,
          totalTempAlta: calTempAlta,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempAlta,
        });
        console.log(calTempAlta);
        break;
      case 2:
        calTempMedia = 52800 * value_e * 0.6;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc2: value_e,
          NUMselectSemPas3Opc3: n,
          totalTempMedia: calTempMedia,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempMedia,
        });
        console.log(calTempMedia);
        break;
      case 3:
        calTempBaja = 35200 * value_e * 0.4;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc2: value_e,
          NUMselectSemPas3Opc3: n,
          totalTempBaja: calTempBaja,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempBaja,
        });
        console.log(calTempBaja);
        break;
      default:
        break;
    }
    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      blockSemPas3Opc2: true,
    });
  };

  const handleSemPas3Opc3 = (e: any) => {
    const value_e = Number(e.target.value);
    const n_tem = propiedadesSimulador.selectRenta3;
    let calTempAlta = 0;
    let calTempMedia = 0;
    let calTempBaja = 0;
    switch (n_tem) {
      case 1:
        calTempAlta = 72000 * value_e * 0.9;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc3: value_e,
          totalTempAlta: calTempAlta,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempAlta,
        });
        console.log(calTempAlta);
        break;
      case 2:
        calTempMedia = 52800 * value_e * 0.6;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc3: value_e,
          totalTempMedia: calTempMedia,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempMedia,
        });
        console.log(calTempMedia);
        break;
      case 3:
        calTempBaja = 35200 * value_e * 0.4;
        setPropiedadesSimulador({
          ...propiedadesSimulador,
          selectSemPas3Opc3: value_e,
          totalTempBaja: calTempBaja,
          totalCalcular: propiedadesSimulador.totalCalcular + calTempBaja,
        });
        console.log(calTempBaja);
        break;
      default:
        break;
    }
    setPropiedadesSimuladorPaso2({
      ...propiedadesSimuladorPaso2,
      blockSemPas3Opc3: true,
    });
  };

  const getSemanasFraccion = (frac: number) => {
    console.log("entro a las semanas");
    const content = [];
    const options = 6 * frac;
    content.push(
      <option value={options}>
        {options} {weeks_s}
      </option>
    );
    handleSetSemanasUsoPersonal(options);
    /* setPropiedadesSimulador({
      ...propiedadesSimulador,
      selectSemPas1:options
    }); */
    return content;
  };

  const getSemanasPas3 = (sem: number) => {
    const content = [];
    for (let i = 0; i < sem; i++) {
      if (i == 0) {
        content.push(
          <option value={i + 1}>
            {i + 1} {week_s}
          </option>
        );
      } else {
        content.push(
          <option value={i + 1}>
            {i + 1} {weeks_s}
          </option>
        );
      }
    }
    return content;
  };

  const getSemanas2Pas3 = (sem: number) => {
    const content = [];
    for (let i = 0; i < sem; i++) {
      if (i == 0) {
        content.push(
          <option value={i + 1}>
            {i + 1} {week_s}
          </option>
        );
      } else {
        content.push(
          <option value={i + 1}>
            {i + 1} {weeks_s}
          </option>
        );
      }
    }
    return content;
  };

  const getSemanas3Pas3 = (sem: number) => {
    const content = [];
    for (let i = 0; i < sem; i++) {
      if (i == 0) {
        content.push(
          <option value={i + 1}>
            {i + 1} {week_s}
          </option>
        );
      } else {
        content.push(
          <option value={i + 1}>
            {i + 1} {weeks_s}
          </option>
        );
      }
    }
    return content;
  };

  const handleConoceMas = (option: string) => {
    switch (option) {
      case "spacial":
        setPropiedadesModal({
          ...propiedadesModal,
          carousel: false,
          spacial: true,
          ubicacion: false,
          planos: false,
          specs: false,
          simulador: false,
          cotizar: false,
        });
        break;
      case "ubicacion":
        setPropiedadesModal({
          ...propiedadesModal,
          carousel: false,
          spacial: false,
          ubicacion: true,
          planos: false,
          specs: false,
          simulador: false,
          cotizar: false,
        });
        break;
      case "planos":
        setPropiedadesModal({
          ...propiedadesModal,
          carousel: false,
          spacial: false,
          ubicacion: false,
          planos: true,
          specs: false,
          simulador: false,
          cotizar: false,
        });
        break;
      case "specs":
        setPropiedadesModal({
          ...propiedadesModal,
          carousel: false,
          spacial: false,
          ubicacion: false,
          planos: false,
          specs: true,
          simulador: false,
          cotizar: false,
        });
        break;
      case "simulador":
        setPropiedadesModal({
          ...propiedadesModal,
          carousel: false,
          spacial: false,
          ubicacion: false,
          planos: false,
          specs: false,
          simulador: true,
          cotizar: false,
        });
        break;
      case "cotizar":
        setPropiedadesModal({
          ...propiedadesModal,
          carousel: false,
          spacial: false,
          ubicacion: false,
          planos: false,
          specs: false,
          simulador: false,
          cotizar: true,
        });
        break;
      default:
        break;
    }
  };

  const handleBtnCalcular = () => {
    console.log("entro al boton");
    console.log(propiedadesSimulador.totalCalcular);
    console.log(propiedadesSimulador.totalTempAlta);
    console.log(propiedadesSimulador.totalTempMedia);
    console.log(propiedadesSimulador.totalTempBaja);
    const suma =
      resumenSemanas.mathSemanaAlta +
      resumenSemanas.mathSemanaMedia +
      resumenSemanas.mathSemanaBaja;
    const sem_Uso = propiedadesSimulador.usoRentaPas2Num;
    const opc_temp_baja = propiedadesSimulador.selectSemPas3Opc1;
    const opc_temp_media = propiedadesSimulador.selectSemPas3Opc2;
    const opc_temp_alta = propiedadesSimulador.selectSemPas3Opc3;
    const sem_usadas = opc_temp_baja + opc_temp_media + opc_temp_alta;
    const sem_reales = sem_Uso - sem_usadas;
    const costoVivienda = propiedadSelected?.conoceMas.simulador.costovivienda;
    const sumaSemanas =
      Number(costoVivienda) * (propiedadesSimulador.selectSemPas1 / 4);
    const suma_total_simulador = Number(suma) - sumaSemanas;
    console.log(
      "math",
      Number(costoVivienda) + " " + propiedadesSimulador.selectSemPas1 + "/" + 4
    );
    console.log("suma semanas con el costo de vivienda", sumaSemanas);
    console.log("costo vivienda", costoVivienda);
    if (sem_reales > 1) {
      setPropiedadesSimulador({
        ...propiedadesSimulador,
        badgeSemanas: true,
      });
    } else {
      setPropiedadesSimulador({
        ...propiedadesSimulador,
        badgeSemanas: false,
        totalSimulador: suma_total_simulador.toLocaleString("en-US"),
      });
    }
  };

  const handleCloseModal = () => {
    setPropiedadesSimulador({
      ...propiedadesSimulador,
      badgeSemanas: false,
    });
  };

  const handleBtnSigPantalla1 = () => {
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: false,
      pantalla3: false,
      pantalla4: true,
      pantalla5: false,
      pantalla6: false,
    });
  };

  const handleBtnAntPantalla2 = () => {
    console.log("obj", propiedadeFormCotizar);
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: false,
      pantalla3: false,
      pantalla4: false,
      pantalla5: true,
      pantalla6: false,
    });
  };

  const handleBtnSigPantalla2 = () => {
    console.log("obj", propiedadeFormCotizar);
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: false,
      pantalla3: false,
      pantalla4: false,
      pantalla5: false,
      pantalla6: true,
    });
  };

  const handleBtnAntPantalla3 = () => {
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: true,
      pantalla3: false,
      pantalla4: false,
      pantalla5: false,
      pantalla6: false,
    });
  };

  const handleBtnSigPantalla3 = () => {
    console.log(propiedadeFormCheckeds);
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: false,
      pantalla3: false,
      pantalla4: true,
      pantalla5: false,
      pantalla6: false,
    });
  };

  const handleBtnAntPantalla4 = () => {
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: true,
      pantalla2: false,
      pantalla3: false,
      pantalla4: false,
      pantalla5: false,
      pantalla6: false,
    });
  };

  const handleBtnSigPantalla4 = () => {
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: false,
      pantalla3: false,
      pantalla4: false,
      pantalla5: true,
      pantalla6: false,
    });
  };

  const handleBtnAntPantalla5 = () => {
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: false,
      pantalla3: false,
      pantalla4: true,
      pantalla5: false,
      pantalla6: false,
    });
  };

  const handleBtnSigPantalla5 = () => {
    setPropiedadesCotizar({
      ...propiedadesCotizar,
      pantalla1: false,
      pantalla2: true,
      pantalla3: false,
      pantalla4: false,
      pantalla5: false,
      pantalla6: false,
    });
  };

  const handleSwitchCheckContact = (e: any) => {
    const value = e.target.value;
    switch (value) {
      case "mail":
        setPropiedadeFormCheckeds({
          ...propiedadeFormCheckeds,
          mail: !propiedadeFormCheckeds.mail,
          whatsapp: false,
          telefono: false,
        });
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          contactMethod: value,
        });
        break;
      case "telefono":
        setPropiedadeFormCheckeds({
          ...propiedadeFormCheckeds,
          mail: false,
          whatsapp: false,
          telefono: !propiedadeFormCheckeds.telefono,
        });
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          contactMethod: value,
        });
        break;
      case "whatsapp":
        setPropiedadeFormCheckeds({
          ...propiedadeFormCheckeds,
          mail: false,
          whatsapp: !propiedadeFormCheckeds.whatsapp,
          telefono: false,
        });
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          contactMethod: value,
        });
        break;
      default:
        break;
    }
  };

  const handleSwitchCheckLugares = (name: string) => {
    switch (name) {
      case "NAYARIT":
        setPropiedadesLugares({
          ...propiedadesLugares,
          riviera: !propiedadesLugares.riviera,
        });
        break;
      case "CARMEN":
        setPropiedadesLugares({
          ...propiedadesLugares,
          playa: !propiedadesLugares.playa,
        });
        break;
      case "cabos":
        setPropiedadesLugares({
          ...propiedadesLugares,
          cabos: !propiedadesLugares.cabos,
        });
        break;
      case "tulum":
        setPropiedadesLugares({
          ...propiedadesLugares,
          tulum: !propiedadesLugares.tulum,
        });
        break;
      case "cancun":
        setPropiedadesLugares({
          ...propiedadesLugares,
          cancun: !propiedadesLugares.cancun,
        });
        break;
      case "vallarta":
        setPropiedadesLugares({
          ...propiedadesLugares,
          vallarta: !propiedadesLugares.vallarta,
        });
        break;

      default:
        break;
    }
  };

  const handleSwitchCheckInteres = (name: string) => {
    switch (name) {
      case "arte":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          arte: !propiedadesIntereses.arte,
        });
        break;
      case "ia":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          ia: !propiedadesIntereses.ia,
        });
        break;
      case "espiritualidad":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          espiritualidad: !propiedadesIntereses.espiritualidad,
        });
        break;
      case "ciencia":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          ciencia: !propiedadesIntereses.ciencia,
        });
        break;
      case "trabajoRemoto":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          trabajoRemoto: !propiedadesIntereses.trabajoRemoto,
        });
        break;
      case "hiking":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          hiking: !propiedadesIntereses.hiking,
        });
        break;
      case "playa":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          playa: !propiedadesIntereses.playa,
        });
        break;
      case "fitness":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          fitness: !propiedadesIntereses.fitness,
        });
        break;
      case "cine":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          cine: !propiedadesIntereses.cine,
        });
        break;
      case "tecnologia":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          tecnologia: !propiedadesIntereses.tecnologia,
        });
        break;
      case "redesSociales":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          redesSociales: !propiedadesIntereses.redesSociales,
        });
        break;
      case "poesia":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          poesia: !propiedadesIntereses.poesia,
        });
        break;
      case "snorkel":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          snorkel: !propiedadesIntereses.snorkel,
        });
        break;
      case "mascotas":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          mascotas: !propiedadesIntereses.mascotas,
        });
        break;
      case "arquitectura":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          arquitectura: !propiedadesIntereses.arquitectura,
        });
        break;
      case "viaje":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          viaje: !propiedadesIntereses.viaje,
        });
        break;
      case "musica":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          musica: !propiedadesIntereses.musica,
        });
        break;
      case "fastfoot":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          fastfoot: !propiedadesIntereses.fastfoot,
        });
        break;
      case "negocios":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          negocios: !propiedadesIntereses.negocios,
        });
        break;
      case "accesibilidad":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          accesibilidad: !propiedadesIntereses.accesibilidad,
        });
        break;
      case "lgbtqia":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          lgbtqia: !propiedadesIntereses.lgbtqia,
        });
        break;
      case "lifestyle":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          lifestyle: !propiedadesIntereses.lifestyle,
        });
        break;
      case "diseño":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          diseño: !propiedadesIntereses.diseño,
        });
        break;
      case "humor":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          humor: !propiedadesIntereses.humor,
        });
        break;
      case "Mindfulness":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          Mindfulness: !propiedadesIntereses.Mindfulness,
        });
        break;
      case "Religión":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          Religión: !propiedadesIntereses.Religión,
        });
        break;
      case "Política":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          Política: !propiedadesIntereses.Política,
        });
        break;
      case "Yoga":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          Yoga: !propiedadesIntereses.Yoga,
        });
        break;
      case "Cultura":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          Cultura: !propiedadesIntereses.Cultura,
        });
        break;
      case "Pesca":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          Pesca: !propiedadesIntereses.Pesca,
        });
        break;
      case "educacion":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          educacion: !propiedadesIntereses.educacion,
        });
        break;
      case "lectura":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          lectura: !propiedadesIntereses.lectura,
        });
        break;
      case "slowFood":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          slowFood: !propiedadesIntereses.slowFood,
        });
        break;
      case "buceo":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          buceo: !propiedadesIntereses.buceo,
        });
        break;
      case "astrologia":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          astrologia: !propiedadesIntereses.astrologia,
        });
        break;
      case "vinos":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          vinos: !propiedadesIntereses.vinos,
        });
        break;
      case "gadgets":
        setPropiedadesIntereses({
          ...propiedadesIntereses,
          gadgets: !propiedadesIntereses.gadgets,
        });
        break;
      default:
        break;
    }
  };

  const handleSetInfoUser = (e: any) => {
    const id_input = e.target.id;
    const value = e.target.value;
    switch (id_input) {
      case "txtName":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          name: value,
        });
        break;
      case "txtApellido":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          last_name: value,
        });
        break;
      case "txtCodePhone":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          code_phone: value,
        });
        break;
      case "txtPhone":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          phone: value,
        });
        break;
      case "txtTypeId":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          type_id: value,
        });
        break;
      case "txtIdUser":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          id_user: value,
        });
        break;
      case "txtSname":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          s_name: value,
        });
        break;
      case "txtSlastname":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          s_last_name: value,
        });
        break;
      case "txtEmail":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          email: value,
        });
        break;
      case "txtEdad":
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          age: value,
        });
        break;
      case "txtContactMethodWhatsapp":
        setPropiedadeFormCheckeds({
          ...propiedadeFormCheckeds,
          mail: false,
          telefono: false,
          whatsapp: !propiedadeFormCheckeds.whatsapp,
        });
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          contactMethod: value,
        });
        break;
      case "txtContactMethodTelefono":
        setPropiedadeFormCheckeds({
          ...propiedadeFormCheckeds,
          mail: false,
          whatsapp: false,
          telefono: !propiedadeFormCheckeds.telefono,
        });
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          contactMethod: value,
        });
        break;
      case "txtContactMethodMail":
        setPropiedadeFormCheckeds({
          ...propiedadeFormCheckeds,
          mail: !propiedadeFormCheckeds.mail,
          whatsapp: false,
          telefono: false,
        });
        setPropiedadeFormCotizar({
          ...propiedadeFormCotizar,
          contactMethod: value,
        });
        break;
      case "txtRivieraNayarit":
        setPropiedadesLugares({
          ...propiedadesLugares,
          riviera: !propiedadesLugares.riviera,
        });
        break;
      case "txtPlayaCarmen":
        setPropiedadesLugares({
          ...propiedadesLugares,
          playa: !propiedadesLugares.playa,
        });
        break;
      case "txtCabos":
        setPropiedadesLugares({
          ...propiedadesLugares,
          cabos: !propiedadesLugares.cabos,
        });
        break;
      case "txtTulum":
        setPropiedadesLugares({
          ...propiedadesLugares,
          tulum: !propiedadesLugares.tulum,
        });
        break;
      case "txtCancun":
        setPropiedadesLugares({
          ...propiedadesLugares,
          cancun: !propiedadesLugares.cancun,
        });
        break;
      case "txtVallarta":
        setPropiedadesLugares({
          ...propiedadesLugares,
          vallarta: !propiedadesLugares.vallarta,
        });
        break;
      default:
        break;
    }
  };

  const getPlacesUsers = () => {
    const objLugares = [];

    if (propiedadesLugares.riviera) {
      objLugares.push("Riviera Nayarit");
    }
    if (propiedadesLugares.playa) {
      objLugares.push("Playa del Carmen");
    }
    if (propiedadesLugares.cabos) {
      objLugares.push("Los Cabos");
    }
    if (propiedadesLugares.tulum) {
      objLugares.push("Tulum");
    }
    if (propiedadesLugares.cancun) {
      objLugares.push("Cancún");
    }
    if (propiedadesLugares.vallarta) {
      objLugares.push("Puerto Vallarta");
    }

    return objLugares;
  };

  const getInteresesUsers = () => {
    const objIntereses = [];

    if (propiedadesIntereses.arte) {
      objIntereses.push("Arte");
    }
    if (propiedadesIntereses.ia) {
      objIntereses.push("Inteligencia Artificial");
    }
    if (propiedadesIntereses.espiritualidad) {
      objIntereses.push("Espiritualidad");
    }
    if (propiedadesIntereses.ciencia) {
      objIntereses.push("Ciencia");
    }
    if (propiedadesIntereses.trabajoRemoto) {
      objIntereses.push("Trabajo Remoto");
    }
    if (propiedadesIntereses.hiking) {
      objIntereses.push("Hiking");
    }
    if (propiedadesIntereses.playa) {
      objIntereses.push("Playa");
    }
    if (propiedadesIntereses.fitness) {
      objIntereses.push("Fitness");
    }
    if (propiedadesIntereses.cine) {
      objIntereses.push("Cine");
    }
    if (propiedadesIntereses.tecnologia) {
      objIntereses.push("Tecnologia");
    }
    if (propiedadesIntereses.redesSociales) {
      objIntereses.push("Redes Sociales");
    }
    if (propiedadesIntereses.poesia) {
      objIntereses.push("Poesia");
    }
    if (propiedadesIntereses.snorkel) {
      objIntereses.push("Snorkel");
    }
    if (propiedadesIntereses.mascotas) {
      objIntereses.push("Mascotas");
    }
    if (propiedadesIntereses.arquitectura) {
      objIntereses.push("Arquitectura");
    }
    if (propiedadesIntereses.viaje) {
      objIntereses.push("Viaje");
    }
    if (propiedadesIntereses.musica) {
      objIntereses.push("Musica");
    }
    if (propiedadesIntereses.fastfoot) {
      objIntereses.push("Fast Foot");
    }
    if (propiedadesIntereses.negocios) {
      objIntereses.push("Negocios");
    }
    if (propiedadesIntereses.accesibilidad) {
      objIntereses.push("Accesibilidad");
    }
    if (propiedadesIntereses.lgbtqia) {
      objIntereses.push("lgbtqia");
    }
    if (propiedadesIntereses.lifestyle) {
      objIntereses.push("Lifestyle");
    }
    if (propiedadesIntereses.diseño) {
      objIntereses.push("Diseño");
    }
    if (propiedadesIntereses.humor) {
      objIntereses.push("Humor");
    }
    if (propiedadesIntereses.Mindfulness) {
      objIntereses.push("Mindfulness");
    }
    if (propiedadesIntereses.Religión) {
      objIntereses.push("Religión");
    }
    if (propiedadesIntereses.Política) {
      objIntereses.push("Política");
    }
    if (propiedadesIntereses.Yoga) {
      objIntereses.push("Yoga");
    }
    if (propiedadesIntereses.Cultura) {
      objIntereses.push("Cultura");
    }
    if (propiedadesIntereses.Pesca) {
      objIntereses.push("Pesca");
    }
    if (propiedadesIntereses.educacion) {
      objIntereses.push("Educacion");
    }
    if (propiedadesIntereses.lectura) {
      objIntereses.push("Lectura");
    }
    if (propiedadesIntereses.slowFood) {
      objIntereses.push("Slow Food");
    }
    if (propiedadesIntereses.buceo) {
      objIntereses.push("Buceo");
    }
    if (propiedadesIntereses.astrologia) {
      objIntereses.push("Astrologia");
    }
    if (propiedadesIntereses.vinos) {
      objIntereses.push("Vinos");
    }
    if (propiedadesIntereses.gadgets) {
      objIntereses.push("Gadgets");
    }
    return objIntereses;
  };

  const handleBtnEnviar = async () => {
    console.log("enviando info");
    const objLugares = getPlacesUsers();
    const objIntereses = getInteresesUsers();

    const objInfoUser = {
      names: propiedadeFormCotizar.name,
      last_names: propiedadeFormCotizar.s_name,
      phone_code: propiedadeFormCotizar.code_phone,
      phone: propiedadeFormCotizar.phone,
      email: propiedadeFormCotizar.email,
      password: "",
      type_id_user: propiedadeFormCotizar.type_id,
      id_user: propiedadeFormCotizar.id_user,
      age: propiedadeFormCotizar.age,
      aditional_information: {
        contact_method: propiedadeFormCotizar.contactMethod,
        properties: objLugares,
        interests: objIntereses,
      },
    };

    //BUNSI API LOCAL
    await axios
      .post("http://localhost:3100/api/mongo/user/new", objInfoUser)
      .then((response) => {
        console.log(response);
        handleCloseMiniModal();
      })
      .catch((e) => {
        console.log(e);
      });

    //BUNSI API PROD
    /* await axios
      .post("https://api-bunsi.herokuapp.com/api/mongo/user/new", objInfoUser)
      .then((response) => {
        console.log(response);
        handleCloseMiniModal();
      })
      .catch((e) => {
        console.log(e);
      }); */
  };

  //AIzaSyA1t6r8UMmqZ2uQP48BtXnXMRhcmTrHY3s
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBO3uOnkqdnRQkaZFDry6jq_5Qv8H4v6oE",
  });

  const containerStyle = {
    width: "100%",
    height: "18rem",
  };

  const onLoad = (marker: any) => {
    console.log("marker: ", marker);
  };

  return (
    <>
      <div
        id="propiedades" className="hidden" /*className={`${!showPropDetail ? "block" : "hidden"}`} /* className="hidden md:block lg:block lg:container lg:mx-auto mt-48 h-auto"*/
      >
        <h1 className="text-center text-4xl md:text-6xl smTextColor font-family-titles font-bold mt-28 lg:mt-28">
          {title} {""}
          <span className="underline text-subtitle-color">{subtitle} </span>
        </h1>

        {/* Carrusel desktop */}
        <div className="hidden md:block lg:block lg:container lg:mx-auto h-auto">
          <div className="container-fluid mt-10 p-5">
            <div className="w-full flex flex-wrap mt-5">
              {propiedades &&
                propiedades.map((propiedad, index) => (
                  <div
                    key={index}
                    className={`${propiedad.width} pr-3 mb-3 test`}
                  >
                    <div className="relative w-full h-96">
                      <Image
                        src={propiedad.image}
                        alt={"" + propiedad.id}
                        layout="fill"
                        className="w-full h-96 object-cover m-auto bg-cover bg-center rounded-xl"
                      />

                      <div className="pb-2 absolute bottom-0 bg-green-deparments-cards opacity-80 w-full rounded-b-lg">
                        <div className="flex flex-row">
                          <div className="w-2/3">
                            <p className="px-3 pt-3 text-md text-white font-family-text">
                              {propiedad.titulo},
                            </p>

                            <p className="px-3 text-xl font-bold text-white font-family-text">
                              {intl.locale == "es" ? (
                                <>{propiedad?.descripcion}</>
                              ) : (
                                <>{propiedad?.descripcionEn}</>
                              )}
                            </p>
                          </div>

                          <div className="w-1/3 m-auto">
                            <button
                              onClick={() =>
                                handleDepartamentoModal(propiedad.id)
                              }
                              className="bg-btn-brown md:w-30 px-2 py-2 md:mr-5 md:bottom-0 md:left-0 uppercase opacity-90 rounded-full text-white float-right"
                            >
                              {btn_knowmore}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Carrusel mobile */}
        <div className="block md:hidden lg:hidden lg:container lg:mx-auto h-auto">
          <div className="container-fluid mt-1 p-5">
            <div className="w-full flex flex-wrap mt-1">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000 }}
                className="h-full z-0"
              >
                {propiedades &&
                  propiedades.map((propiedad, index) => (
                    <SwiperSlide key={index}>
                      <div key={index} className={`w-full pr-px mb-3 test`}>
                        <div className="relative w-full h-96">
                          <Image
                            src={propiedad.image}
                            alt={"" + propiedad.id}
                            layout="fill"
                            className="w-full h-96 object-cover m-auto bg-cover bg-center rounded-xl"
                          />
                          <div className="pb-3 pt-3 absolute bottom-0 bg-green-deparments-cards opacity-80 w-full rounded-b-lg">
                            <div className="flex flex-row">
                              <div className="w-2/3">
                                <p className="text-left px-3 text-sm md:text-base text-white font-bold font-family-text">
                                  {propiedad.titulo},
                                </p>

                                <p className="text-left px-3 text-sm md:text-base text-white font-family-text">
                                  {intl.locale == "es" ? (
                                    <>{propiedad?.descripcion}</>
                                  ) : (
                                    <>{propiedad?.descripcionEn}</>
                                  )}
                                </p>
                              </div>

                              <div className="w-1/3 m-auto">
                                <button
                                  onClick={() =>
                                    handleDepartamentoDetails(propiedad.id)
                                  }
                                  className="bg-btn-brown md:w-30 px-4 mx-2 py-2 md:mr-5 md:bottom-0 md:left-0 text-sm md:text-base uppercase opacity-90 rounded-full text-white float-right"
                                >
                                  {btn_knowmore}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* <PropiedadDetalles show={showPropPage} propertySelected={propiedadSelected} propertySimulador={propiedadesSimulador} resSemanas={resumenSemanas} /> */}
      {/* Considerar meter esta sección en un componente */}
      <div id="prop-page" className={`${showPropPage ? "block" : "hidden"} pt-16 md:pt-0`}>
        <div className="header-2 pt-0.5" style={{backgroundColor: '#83AB7A'}}>
          <div className="grid grid-cols-6">
            <div className="col-start-2 col-span-4 flex items-center justify-center text-2xl smTextColor">
              <h1 className="text-center text-xl md:text-6xl smTextColor font-family-titles font-bold mt-2">
                {propiedadSelected
                  ? propiedadSelected.titulo
                  : "No hay nada seleccionado"}
                {/* <span className="underline text-subtitle-color">{subtitle} </span> */}
              </h1>
            </div>
            <div
              className="col-span-1 flex items-center justify-end text-2xl smTextColor mr-2"
              onClick={handleBackToIndexPage}
            >
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
              {propiedadSelected?.carouselImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-60 md:h-96 w-full">
                    <Image
                      src={image}
                      alt="image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className={`prop-details ${showPropDetails ? "block" : "hidden"}`}
          >
            {/* Características */}
            <div className="grid grid-cols-6 mx-3 border-t-2 border-color-bunsi">
              <div className="col-span-6 flex items-center text-left my-2">
                <p className="text-xl smTextColor font-semibold">{features}:</p>
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
                  {propiedadSelected?.caracteristicas.habitaciones} {bedrooms}
                </span>
              </div>
              <div className="col-span-2 mx-0.5">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  <i className="fa-solid fa-toilet mr-1"></i>
                  {propiedadSelected?.caracteristicas.banos} {toilets}
                </span>
              </div>
              <div className="col-span-2 m-0.5 text-base">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  {/* <span className="w-full h-16 self-center text-center border-bunsi-s-green border-2 m-0.5 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg"> */}
                  ${propiedadSelected?.caracteristicas.precioUSD} US
                  <br />$
                  {propiedadSelected?.caracteristicas.precioMXN?.toLocaleString(
                    "en-US"
                  )}{" "}
                  MX
                </span>
              </div>
              <div className="col-span-2 m-0.5 text-base">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  {propiedadSelected?.caracteristicas.fracciones} {fractions}
                </span>
              </div>
              <div className="col-span-2 m-0.5 text-base">
                <span className="flex w-full h-16 justify-center items-center border-bunsi-s-green border-2 px-1 py-2 font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                  {propiedadSelected?.caracteristicas.disponibles} {availables}
                </span>
              </div>
            </div>

            {/* Conoce más */}
            <div className="grid grid-cols-6 mx-3">
              <div className="col-span-6 flex items-center text-left mb-2">
                <p className="text-xl smTextColor font-semibold">
                  {learnmore}:
                </p>
              </div>
              <div className="col-span-6 mx-0.5">
                <div
                  onClick={() => handleShowPropDetailsModal({ vision: true })}
                  className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg"
                >
                  <div className="col-span-1">
                    <img
                      src="assets/nuevo/icons/IMAGENES CATALOGO-01.svg"
                      alt="option1"
                      className="h-12 bg-bunsi-strong-green rounded-full pointer "
                    />
                  </div>
                  <div className="col-span-4">{vision360}</div>
                  <div className="col-span-1 flex justify-center items-center">
                    <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                  </div>
                </div>

                <div
                  onClick={() => handleShowPropDetailsModal({ location: true })}
                  className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg"
                >
                  <div className="col-span-1">
                    <img
                      src="assets/nuevo/icons/IMAGENES CATALOGO-02.svg"
                      alt="option1"
                      className="h-12 bg-bunsi-strong-green rounded-full pointer "
                    />
                  </div>
                  <div className="col-span-4">{location}</div>
                  <div className="col-span-1 flex justify-center items-center">
                    <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                  </div>
                </div>

                <div
                  onClick={() =>
                    handleShowPropDetailsModal({ technical_planes: true })
                  }
                  className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg"
                >
                  <div className="col-span-1">
                    <img
                      src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg"
                      alt="option1"
                      className="h-12 bg-bunsi-strong-green rounded-full pointer "
                    />
                  </div>
                  <div className="col-span-4">{technical_planes}</div>
                  <div className="col-span-1 flex justify-center items-center">
                    <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                  </div>
                </div>

                <div
                  onClick={() =>
                    handleShowPropDetailsModal({ all_in_hands: true })
                  }
                  className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg"
                >
                  <div className="col-span-1">
                    <img
                      src="assets/nuevo/icons/IMAGENES CATALOGO-04.svg"
                      alt="option1"
                      className="h-12 bg-bunsi-strong-green rounded-full pointer "
                    />
                  </div>
                  <div className="col-span-4">{allinhands}</div>
                  <div className="col-span-1 flex justify-center items-center">
                    <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                  </div>
                </div>

                <div
                  onClick={() =>
                    handleShowPropDetailsModal({ credit_simulator: true })
                  }
                  className="grid grid-cols-6 flex text-white w-full bg-bunsi-strong-green justify-center items-center font-semibold smTextColor mb-3 md:mb-3 rounded-lg"
                >
                  <div className="col-span-1">
                    <img
                      src="assets/nuevo/icons/IMAGENES CATALOGO-05.svg"
                      alt="option1"
                      className="h-12 bg-bunsi-strong-green rounded-full pointer "
                    />
                  </div>
                  <div className="col-span-4">{credit_simulator}</div>
                  <div className="col-span-1 flex justify-center items-center">
                    <i className="fa-solid fa-circle-plus text-white align-middle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visión */}
          <div
            className={`prop-details-vision bg-bunsi-s-bone ${
              showPropVision ? "block" : "hidden"
            }`}
          >
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img
                  src="assets/nuevo/icons/IMAGENES CATALOGO-01.svg"
                  alt="option1"
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">{vision360}</p>
              </div>
              <div
                className="col-span-1 flex items-center justify-end text-2xl smTextColor"
                onClick={() => handleShowPropDetailsModal({})}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                <div className="relative w-full md:h-96">
                  {/* <div className="relative w-full h-48 md:h-96"> */}
                  <img
                    src="/assets/nuevo/departamentos/360_area.png"
                    alt="360_area"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div
            className={`prop-details-vision bg-bunsi-s-bone ${
              showPropLocation ? "block" : "hidden"
            }`}
          >
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img
                  src="assets/nuevo/icons/IMAGENES CATALOGO-02.svg"
                  alt="option1"
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">{location}</p>
              </div>
              <div
                className="col-span-1 flex items-center justify-end text-2xl smTextColor"
                onClick={() => handleShowPropDetailsModal({})}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                <div className="relative w-full h-72 md:h-96 mx-auto">
                  {propiedadSelected &&
                  propiedadSelected.conoceMas.ubicacion ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={{
                        lat: propiedadSelected?.lat || 0,
                        lng: propiedadSelected?.lon || 0,
                      }}
                      zoom={12}
                    >
                      <MarkerF
                        onLoad={onLoad}
                        position={{
                          lat:
                            Number(
                              propiedadSelected?.conoceMas.ubicacion.lat
                            ) || 0,
                          lng:
                            Number(
                              propiedadSelected?.conoceMas.ubicacion.lon
                            ) || 0,
                        }}
                      ></MarkerF>
                    </GoogleMap>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Planos técnicos */}
          <div
            className={`prop-details-vision bg-bunsi-s-bone ${
              showPropTechnicalPLanes ? "block" : "hidden"
            }`}
          >
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img
                  src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg"
                  alt="option1"
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {technical_planes}
                </p>
              </div>
              <div
                className="col-span-1 flex items-center justify-end text-2xl smTextColor"
                onClick={() => handleShowPropDetailsModal({})}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                {/* <div className="relative w-full md:h-96"> */}
                <img
                  src={propiedadSelected?.conoceMas.planos.image || ""}
                  alt="technical_planes_1"
                />
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Todo en tus manos */}
          <div
            className={`prop-details-vision bg-bunsi-s-bone ${
              showPropAllInHands ? "block" : "hidden"
            }`}
          >
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img
                  src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg"
                  alt="option1"
                  className="h-12 w-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {allinhands}
                </p>
              </div>
              <div
                className="col-span-1 flex items-center justify-end text-2xl smTextColor"
                onClick={() => handleShowPropDetailsModal({})}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6">
                <MyAccordion title={nature} isActive={0} icon={`assets/nuevo/icons/naturaleza.svg`} 
                  myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#004523"}}>
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
                </MyAccordion>

                <MyAccordion title={experiences} isActive={0} icon={`assets/nuevo/icons/experiencias.svg`} 
                  myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#004523"}}>
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
                </MyAccordion>
                
                <MyAccordion title={social} isActive={0} icon={`assets/nuevo/icons/social.svg`} 
                  myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#004523"}}>
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
                </MyAccordion>
                
                <MyAccordion title={culture} isActive={0} icon={`assets/nuevo/icons/cultura.svg`} 
                  myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#004523"}}>
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
                </MyAccordion>
                
                <MyAccordion title={health} isActive={0} icon={`assets/nuevo/icons/salud.svg`} 
                  myStyles={{headerBackColor:"#e9e9e9", headerBackColorActive: "#F3F4F6", textColor:"#004523"}}>
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
                </MyAccordion>
              </div>
            </div>
          </div>

          {/* Simulador */}
          <div
            className={`prop-details-vision bg-bunsi-s-bone ${
              showPropCreditSimulator ? "block" : "hidden"
            }`}
          >
            <div className="grid grid-cols-6 mx-3 border-b-2 border-color-bunsi py-3">
              <div className="col-span-1 flex items-center text-left">
                <img
                  src="assets/nuevo/icons/IMAGENES CATALOGO-05.svg"
                  alt="option1"
                  className="h-12 bg-bunsi-strong-green rounded-full pointer "
                />
              </div>
              <div className="col-span-4 flex items-center text-left">
                <p className="text-xl smTextColor font-semibold">
                  {credit_simulator}
                </p>
              </div>
              <div
                className="col-span-1 flex items-center justify-end text-2xl smTextColor"
                onClick={() => handleShowPropDetailsModal({})}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
            </div>
            <div className="grid grid-cols-6 py-3">
              <div className="col-span-6 flex items-center text-left">
                {propiedadSelected && (
                  <div className="">
                    <Simulador
                      propertySelected={propiedadSelected}
                      propertySimulador={propiedadesSimulador}
                      resSemanas={resumenSemanas}
                    ></Simulador>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <>
          {/* Aquí empieza la lógica del modal */}
          <div
            className={`${
              showModal
                ? "modalBackdropEntering"
                : "hidden ease-in modalBackdropLeaving"
            } relative z-50`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-50 overflow-y-auto w-full lg:w-full xl:w-full 2xl:w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                  className={`${
                    propiedadesModal.carousel ? "" : "bg-modal-backdrop"
                  } relative transform overflow-x-auto rounded-lg text-left transition-all m-3 sm:my-8 sm:w-full md:w-full lg:w-2/3`}
                >
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {propiedadesModal.carousel && (
                      <div>
                        <div className="flex justify-between w-full bg-bunsi-s-green p-5">
                          <div className="flex justify-between w-full border-b-2 border-green-900">
                            <div></div>
                            <div
                              className="relative w-6 h-6 cursor-pointer mb-2"
                              onClick={() => setShowModal(false)}
                            >
                              <Image
                                src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06.png"
                                alt="CerrarBtn.png"
                                layout="fill"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Este carrusel se usa nada más para la vista mobile del modal */}
                        <div id="carusel">
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
                                  <div className="relative h-48 md:h-96 w-full">
                                    <Image
                                      src={image}
                                      alt="image"
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>
                                </SwiperSlide>
                              )
                            )}
                          </Swiper>
                        </div>
                        <div className="w-full grid grid-cols-12 justify-between border-b-2 border-green-900 bg-bunsi-w-green">
                          {/* <div className="w-full flex justify-between border-b-2 border-green-900 bg-bunsi-w-green"> */}
                          <div className="self-center pl-2 col-span-3">
                            <p className="text-base md:text-xl smTextColor font-semibold uppercase">
                              {propiedadSelected?.titulo}
                            </p>
                          </div>
                          <div className="px-2 col-end-12 col-span-8">
                            <p className="text-md text-right px-2 text-white font-normal">
                              {propiedadSelected?.titulo},
                              <br />
                              {intl.locale == "es" ? (
                                <>{propiedadSelected?.descripcion}</>
                              ) : (
                                <>{propiedadSelected?.descripcionEn}</>
                              )}
                            </p>
                          </div>
                          <div className="self-center text-center col-span-1">
                            <i className="fa-solid fa-location-dot text-white align-middle px-2"></i>
                          </div>
                        </div>
                        <div className="w-full bg-bunsi-s-green p-5">
                          <p className="text-xl smTextColor font-semibold">
                            {features}:
                          </p>
                          <ul className="md:flex justify-evenly mt-4">
                            <li className="self-center border-bunsi-s-green border-2 px-2 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                              <i className="fa-solid fa-hashtag mr-1"></i>
                              {propiedadSelected?.caracteristicas.metros} m2
                            </li>
                            <li className="self-center border-bunsi-s-green border-2 px-2 py-2 font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                              <i className="fa-solid fa-bed mr-1"></i>
                              {
                                propiedadSelected?.caracteristicas.habitaciones
                              }{" "}
                              {bedrooms}
                            </li>
                            <li className="self-center border-bunsi-s-green border-2 px-2 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                              <i className="fa-solid fa-toilet mr-1"></i>
                              {propiedadSelected?.caracteristicas.banos}{" "}
                              {toilets}
                            </li>
                            <li className="self-center text-sm border-bunsi-s-green border-2 px-3  uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                              $ {propiedadSelected?.caracteristicas.precioUSD}{" "}
                              US <br />${" "}
                              {propiedadSelected?.caracteristicas.precioMXN?.toLocaleString(
                                "en-US"
                              )}{" "}
                              MX
                            </li>
                            <li className="md:heartbeat self-center border-bunsi-s-green border-2 px-2 py-2 uppercase font-semibold smTextColor mb-1 md:mb-0 md:mr-3 rounded-lg">
                              {propiedadSelected?.caracteristicas.fracciones}{" "}
                              {fractions}
                            </li>
                            {propiedadSelected?.caracteristicas.disponibles !==
                              "0" && (
                              <li className="md:heartbeat self-center border-bunsi-s-green border-2 px-2 py-2 uppercase font-semibold smTextColor rounded-lg">
                                {propiedadSelected?.caracteristicas.disponibles}{" "}
                                {availables}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                    {propiedadesModal.spacial && (
                      <div>
                        <div className="flex justify-between w-full bg-bunsi-s-green p-5">
                          <div className="flex justify-between w-full border-b-2 border-green-900">
                            <p className="text-3xl uppercase smTextColor font-bold font-family-titles">
                              {vision360}
                            </p>
                            <div
                              className="relative w-6 h-6 cursor-pointer"
                              onClick={handleCloseMiniModal}
                            >
                              <Image
                                src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06.png"
                                alt="CerrarBtn.png"
                                layout="fill"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-1 bg-bunsi-s-green">
                          <div className="relative w-full h-40 md:h-96">
                            <Image
                              src="/assets/nuevo/departamentos/360_area.png"
                              alt="360_area"
                              layout="fill"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {propiedadesModal.ubicacion && (
                      <div>
                        <div className="flex justify-between w-full bg-bunsi-s-green p-5">
                          <div className="flex justify-between w-full border-b-2 border-green-900">
                            <p className="text-3xl uppercase smTextColor font-bold font-family-titles">
                              {location}
                            </p>
                            <div className="relative w-6 h-6 cursor-pointer">
                              <Image
                                src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06.png"
                                alt="close_btn.png"
                                layout="fill"
                                onClick={handleCloseMiniModal}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="w-full bg-bunsi-s-green p-1 mx-auto">
                            <div className="relative w-full h-72 md:h-96 mx-auto">
                              {/*<Image
                                src={
                                  propiedadSelected?.conoceMas.ubicacion
                                    .image || ''
                                }
                                alt="map"
                                layout="fill"
                              /> */}
                              <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                  lat: propiedadSelected?.lat || 0,
                                  lng: propiedadSelected?.lon || 0,
                                }}
                                zoom={12}
                              >
                                <MarkerF
                                  onLoad={onLoad}
                                  position={{
                                    lat:
                                      Number(
                                        propiedadSelected?.conoceMas.ubicacion
                                          .lat
                                      ) || 0,
                                    lng:
                                      Number(
                                        propiedadSelected?.conoceMas.ubicacion
                                          .lon
                                      ) || 0,
                                  }}
                                ></MarkerF>
                              </GoogleMap>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {propiedadesModal.planos && (
                      <div>
                        <div className="flex justify-between w-full bg-bunsi-s-green p-5">
                          <div className="flex justify-between w-full border-b-2 border-green-900">
                            <p className="text-3xl uppercase smTextColor font-bold font-family-titles">
                              {technical_planes}
                            </p>
                            <div className="relative">
                              <Image
                                src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06.png"
                                alt="close_btn.png"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                                onClick={handleCloseMiniModal}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="w-full bg-bunsi-s-green p-1">
                            <div className="relative w-full h-40 md:h-96 mx-auto">
                              <Image
                                src={
                                  propiedadSelected?.conoceMas.planos.image ||
                                  ""
                                }
                                alt="planos"
                                layout="fill"
                              />
                            </div>
                            <div className="w-full flex justify-center">
                              <div></div>
                              <div>
                                <button className="bg-btn-brown px-10 h-10 text-white uppercase rounded-full self-center">
                                  {technical_planes_download}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {propiedadesModal.specs && (
                      <div>
                        <div className="flex justify-between w-full bg-bunsi-s-green p-5">
                          <div className="flex justify-between w-full border-b-2 border-green-900">
                            <p className="text-3xl uppercase smTextColor font-bold">
                              {allinhands}
                            </p>
                            <div className="relative">
                              <Image
                                src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06.png"
                                alt="close_btn.png"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                                onClick={handleCloseMiniModal}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-bunsi-s-green">
                          <div className="w-full">
                            <MyAccordion title={nature} isActive={0} icon={`assets/nuevo/icons/todo en tus manos-24.svg`} 
                              myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#FFFFFF"}}>
                                <div className="w-full flex space-x-60 px-10">
                                  <div className="w-1/2">
                                    <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                      Playas
                                    </p>
                                    <ul className="list-disc pl-5 scrool-vertical">
                                      {propiedadSelected?.conoceMas.specs.natural.playas.map(
                                        (playa, index) => (
                                          <li
                                            className="text-white flex justify-between"
                                            key={index}
                                          >
                                            <div>{playa.nombre}</div>
                                            <div>{playa.kilometros}</div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div className="w-1/2">
                                    <div className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                      <div className="flex justify-start">
                                        Montañas
                                      </div>
                                    </div>
                                    <ul className="list-disc pl-5 scrool-vertical">
                                      {propiedadSelected?.conoceMas.specs.natural.montañas.map(
                                        (montana, index) => (
                                          <li
                                            className="text-white flex justify-between"
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
                            </MyAccordion>

                            <MyAccordion title={experiences} isActive={0} icon={`assets/nuevo/icons/todo en tus manos-22.svg`} 
                            myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#FFFFFF"}}>
                              <div className="w-full flex space-x-60 px-10">
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Excursiones
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.experiencias.excursiones.map(
                                      (excursion, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{excursion.nombre}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Tours
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.experiencias.tour.map(
                                      (tour, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{tour.nombre}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </MyAccordion>

                            <MyAccordion title={social} isActive={0} icon={`assets/nuevo/icons/todo en tus manos-21.svg`} 
                            myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#FFFFFF"}}>
                              <div className="w-full flex space-x-60 px-10">
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Restaurantes
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.social.restaurantes.map(
                                      (restaurant, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{restaurant.nombre}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Tiendas
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.social.tiendas.map(
                                      (tienda, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{tienda.nombre}</div>
                                          <div>{tienda.kilometros}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </MyAccordion>

                            <MyAccordion title={culture} isActive={0} icon={`assets/nuevo/icons/todo en tus manos-28.svg`} 
                            myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#FFFFFF"}}>
                              <div className="w-full flex space-x-60 px-10">
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Musica
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.cultura.musica.map(
                                      (musica, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{musica.nombre}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Deporte
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.cultura.deporte.map(
                                      (deporte, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{deporte.nombre}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </MyAccordion>

                            <MyAccordion title={health} isActive={0} icon={`assets/nuevo/icons/todo en tus manos-27.svg`} 
                            myStyles={{headerBackColor:"#E9E9E9", headerBackColorActive: "#F3F4F6", textColor:"#FFFFFF"}}>
                              <div className="w-full flex space-x-60 px-10">
                                <div className="w-1/2">
                                  <p className="text-white text-2xl border-b-2 border-bunsi-s-white">
                                    Hospitales
                                  </p>
                                  <ul className="list-disc pl-5 scrool-vertical">
                                    {propiedadSelected?.conoceMas.specs.salud.hospitales.map(
                                      (hospital, index) => (
                                        <li
                                          className="text-white flex justify-between"
                                          key={index}
                                        >
                                          <div>{hospital.nombre}</div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <div className="w-1/2"></div>
                              </div>
                            </MyAccordion>
                          </div>
                        </div>
                      </div>
                    )}
                    {propiedadesModal.simulador && (
                      <div>
                        <div className="flex justify-between w-full bg-bunsi-s-green p-5">
                          <div className="flex justify-between w-full border-b-2 border-green-900">
                            <p className="text-3xl uppercase smTextColor font-bold font-family-titles">
                              {credit_simulator}
                            </p>
                            <img
                              src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06.png"
                              alt="close_btn.png"
                              className="w-6 h-6 cursor-pointer"
                              onClick={handleCloseMiniModal}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="w-full bg-bunsi-s-green p-5">
                            <Simulador
                              propertySelected={propiedadSelected}
                              propertySimulador={propiedadesSimulador}
                              resSemanas={resumenSemanas}
                            ></Simulador>
                          </div>
                        </div>
                      </div>
                    )}
                    {propiedadesModal.cotizar && (
                      <div
                        style={{
                          backgroundImage: `url("/assets/nuevo/bgBunsi.png")`,
                          backgroundSize: "16%",
                          backgroundOrigin: "border-box",
                          backgroundRepeat: "repeat-x",
                          backgroundPosition: "50px 98.5%",
                        }}
                      >
                        <div className="flex justify-between w-full">
                          <div className="flex justify-between w-full">
                            <p className="text-3xl uppercase smTextColor font-bold font-family-titles"></p>
                            <img
                              src="/assets/nuevo/departamentos/IMAGENES CATALOGO-06-cerrar.png"
                              alt="close_btn.png"
                              className="w-6 h-6 cursor-pointer"
                              onClick={handleCloseMiniModal}
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          {propiedadesCotizar.pantalla1 && (
                            <div
                              className="flex flex-row"
                              style={{
                                marginBottom: "-28px",
                              }}
                            >
                              <div className="flex-initial w-16 p-2 content-center"></div>
                              <div className="flex-auto p-2">
                                <div
                                  className="bg-bunsi-s-bone border-t-2 border-r-2 border-l-2 border-b-2 border-green-700 rounded-lg text-center"
                                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                                >
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl title-font-cotizar div-width-parent">
                                      <div className="text-copy-cotizar mt-20 spacing-cotizar">
                                        Formulario de cliente
                                      </div>
                                      <div className="border-b-2 border-green-700 div-width-border mt-5"></div>
                                    </div>
                                  </div>
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl div-width-parent">
                                      <div className="text-copy-cotizar-2 mt-5 div-width-border spacing-cotizar">
                                        Complete la siguiente información para
                                        acceder a la cotización de tu
                                        Departamento.
                                      </div>
                                      <div className="text-copy-cotizar-2 mt-12 mb-32 div-width-border">
                                        <button
                                          className="font-p-5-sm-calcular font-p-5-sm btn-calcular-css text-white rounded-lg px-10"
                                          onClick={handleBtnSigPantalla1}
                                        >
                                          INICIAR
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-initial w-16 p-2 content-center"></div>
                            </div>
                          )}
                          {propiedadesCotizar.pantalla4 && (
                            <div
                              className="flex flex-row"
                              style={{
                                marginBottom: "-25px",
                              }}
                            >
                              <div className="flex-initial w-16 p-2 content-center">
                                <div
                                  className="flex-auto div-width-parent content-center"
                                  style={{ height: "100%" }}
                                >
                                  <div
                                    className="text-copy-cotizar-2 div-width-border"
                                    style={{ height: "100%" }}
                                  >
                                    <img
                                      src="assets/nuevo/icons/flecha-anterior.svg"
                                      alt="option1"
                                      className="h-20 pointer-btn-sig-ant"
                                      onClick={handleBtnAntPantalla4}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex-auto p-2">
                                <div
                                  className="bg-bunsi-s-bone border-t-2 border-r-2 border-l-2 border-b-2 border-green-700 rounded-lg text-center"
                                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                                >
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl title-font-cotizar div-width-parent">
                                      <div
                                        className="text-copy-cotizar mt-20 spacing-cotizar"
                                        style={{ lineHeight: "55px" }}
                                      >
                                        ¿Cuál es tu lugar <br></br> favorito?
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row text-center mt-10">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckLugares("NAYARIT")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesLugares.riviera
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        RIVIERA NAYARIT
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckLugares("CARMEN")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesLugares.playa
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        PLAYA DEL CARMEN
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckLugares("cabos")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesLugares.cabos
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        LOS CABOS
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckLugares("tulum")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesLugares.tulum
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        TULUM
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckLugares("cancun")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesLugares.cancun
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        CANCÚN
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckLugares("vallarta")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesLugares.vallarta
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        VALLARTA
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 mb-32 mt-5">
                                    <div className="flex-auto text-2xl"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-initial w-16 p-2 content-center">
                                <div
                                  className="flex-auto div-width-parent content-center"
                                  style={{ height: "100%" }}
                                >
                                  <div
                                    className="text-copy-cotizar-2 div-width-border"
                                    style={{ height: "100%" }}
                                  >
                                    <img
                                      src="assets/nuevo/icons/flecha-siguiente.svg"
                                      alt="option1"
                                      className="h-20 pointer-btn-sig-ant"
                                      onClick={handleBtnSigPantalla4}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {propiedadesCotizar.pantalla5 && (
                            <div
                              className="flex flex-row"
                              style={{
                                marginBottom: "-28px",
                              }}
                            >
                              <div className="flex-initial w-16 p-2 content-center">
                                <div
                                  className="flex-auto div-width-parent content-center"
                                  style={{ height: "100%" }}
                                >
                                  <div
                                    className="text-copy-cotizar-2 div-width-border"
                                    style={{ height: "100%" }}
                                  >
                                    <img
                                      src="assets/nuevo/icons/flecha-anterior.svg"
                                      alt="option1"
                                      className="h-20 pointer-btn-sig-ant"
                                      onClick={handleBtnAntPantalla5}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex-auto p-2">
                                <div
                                  className="bg-bunsi-s-bone border-t-2 border-r-2 border-l-2 border-b-2 border-green-700 rounded-lg text-center"
                                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                                >
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl title-font-cotizar div-width-parent">
                                      <div className="text-copy-cotizar mt-20 mb-10 spacing-cotizar">
                                        Intereses
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("arte")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.arte
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Arte
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("gadgets")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.gadgets
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Gadgets
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres(
                                          "espiritualidad"
                                        )
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.espiritualidad
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Espiritualidad
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("ciencia")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.ciencia
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Ciencia
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres(
                                          "trabajoRemoto"
                                        )
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.trabajoRemoto
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Trabajo remoto
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("hiking")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.hiking
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Hiking
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("playa")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.playa
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Playa
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("fitness")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.fitness
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Fitness
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("cine")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.cine
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Cine
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("tecnologia")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.tecnologia
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Tecnología
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres(
                                          "redesSociales"
                                        )
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.redesSociales
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Redes sociales
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("poesia")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.poesia
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Poesia
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("snorkel")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.snorkel
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Snorkel
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("mascotas")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.mascotas
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Mascotas
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("arquitectura")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.arquitectura
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Arquitectura
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("viaje")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.viaje
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Viaje
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("musica")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.musica
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Música
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("fastfoot")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.fastfoot
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Fast food
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("negocios")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.negocios
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Negocios
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres(
                                          "accesibilidad"
                                        )
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.accesibilidad
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Accesibilidad
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("lgbtqia")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.lgbtqia
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        LGTBI
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("lifestyle")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.lifestyle
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Lifestyle
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("diseño")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.diseño
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Diseño
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("humor")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.humor
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Humor
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("Mindfulness")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.Mindfulness
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Mindfulness
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("Religión")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.Religión
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Religión
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("Política")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.Política
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Política
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("Yoga")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.Yoga
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Yoga
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("Cultura")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.Cultura
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Cultura
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("Pesca")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.Pesca
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Pesca
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("educacion")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.educacion
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Educación
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("lectura")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.lectura
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Lectura
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("slowFood")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.slowFood
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Slow food
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 text-center mb-40">
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("buceo")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.buceo
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Buceo
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("astrologia")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.astrologia
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Astrología
                                      </p>
                                    </div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("vinos")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.vinos
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Vinos
                                      </p>
                                    </div>
                                  </div>
                                  {/* <div className="flex flex-row p-2 text-center mb-24">
                                    <div className="flex-1 text-2xl div-width-parent"></div>
                                    <div
                                      className="flex-1 text-2xl div-width-parent"
                                      onClick={() =>
                                        handleSwitchCheckInteres("gadgets")
                                      }
                                    >
                                      <p
                                        className={`check-palabra ${
                                          propiedadesIntereses.gadgets
                                            ? "check-palabra-check"
                                            : ""
                                        }`}
                                      >
                                        Gadgets
                                      </p>
                                    </div>
                                    <div className="flex-1 text-2xl div-width-parent"></div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="flex-initial w-16 p-2 content-center">
                                <div
                                  className="flex-auto div-width-parent content-center"
                                  style={{ height: "100%" }}
                                >
                                  <div
                                    className="text-copy-cotizar-2 div-width-border"
                                    style={{ height: "100%" }}
                                  >
                                    <img
                                      src="assets/nuevo/icons/flecha-siguiente.svg"
                                      alt="option1"
                                      className="h-20 pointer-btn-sig-ant"
                                      onClick={handleBtnSigPantalla5}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {propiedadesCotizar.pantalla2 && (
                            <div
                              className="flex flex-row"
                              style={{
                                marginBottom: "-28px",
                              }}
                            >
                              <div className="flex-initial w-16 p-2 content-center">
                                <div
                                  className="flex-auto div-width-parent content-center"
                                  style={{ height: "100%" }}
                                >
                                  <div
                                    className="text-copy-cotizar-2 div-width-border"
                                    style={{ height: "100%" }}
                                  >
                                    <img
                                      src="assets/nuevo/icons/flecha-anterior.svg"
                                      alt="option1"
                                      className="h-20 pointer-btn-sig-ant"
                                      onClick={handleBtnAntPantalla2}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex-auto p-2">
                                <div
                                  className="bg-bunsi-s-bone border-t-2 border-r-2 border-l-2 border-b-2 border-green-700 rounded-lg text-center"
                                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                                >
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl title-font-cotizar div-width-parent">
                                      <div className="text-copy-cotizar mt-20 spacing-cotizar">
                                        Información básica
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row p-2 mb-32 mt-5">
                                    <div className="flex-auto text-2xl">
                                      <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          NOMBRE(S)
                                        </p>
                                        <input
                                          id="txtName"
                                          type="text"
                                          style={{ width: "60%" }}
                                          className="bg-green-deparments-cards h-7 rounded-lg"
                                          onChange={handleSetInfoUser}
                                          value={propiedadeFormCotizar.name}
                                        />
                                      </div>
                                      <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          CORREO ELECTRÓNICO
                                        </p>
                                        <input
                                          id="txtEmail"
                                          type="text"
                                          style={{ width: "60%" }}
                                          className="bg-green-deparments-cards h-7 rounded-lg"
                                          onChange={handleSetInfoUser}
                                          value={propiedadeFormCotizar.email}
                                        />
                                      </div>
                                      <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          TELÉFONO
                                        </p>
                                        <div
                                          style={{
                                            width: "60%",
                                          }}
                                        >
                                          <select
                                            id="txtCodePhone"
                                            className="bg-btn-brown text-white rounded-lg"
                                            defaultValue="0"
                                            name="select_temp_op1"
                                            style={{ width: "100%" }}
                                            onChange={handleSetInfoUser}
                                            value={
                                              propiedadeFormCotizar.code_phone
                                            }
                                          >
                                            <option value="0" selected>
                                              Código de país
                                            </option>
                                            <option value="+52">
                                              +52 México
                                            </option>
                                            <option value="+1">
                                              +1 Estados Unidos
                                            </option>
                                            <option value="+55">
                                              +55 Brasil
                                            </option>
                                          </select>
                                        </div>
                                        <input
                                          id="txtPhone"
                                          type="text"
                                          style={{ width: "60%" }}
                                          className="bg-green-deparments-cards h-7 rounded-lg mt-1"
                                          onChange={handleSetInfoUser}
                                          value={propiedadeFormCotizar.phone}
                                        />
                                      </div>
                                      {/* <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          IDENTIFICACIÓN
                                        </p>
                                        <div
                                          style={{
                                            width: "60%",
                                          }}
                                        >
                                          <select
                                            id="txtTypeId"
                                            className="bg-btn-brown text-white rounded-lg"
                                            defaultValue="0"
                                            name="select_temp_op1"
                                            style={{ width: "100%" }}
                                            onChange={handleSetInfoUser}
                                            value={
                                              propiedadeFormCotizar.type_id
                                            }
                                          >
                                            <option value="Pasaporte" selected>
                                              Pasaporte
                                            </option>
                                            <option value="INE">INE</option>
                                          </select>
                                        </div>
                                        <input
                                          id="txtIdUser"
                                          type="text"
                                          style={{ width: "60%" }}
                                          className="bg-green-deparments-cards h-7 rounded-lg mt-1"
                                          onChange={handleSetInfoUser}
                                          value={propiedadeFormCotizar.id_user}
                                        />
                                      </div> */}
                                    </div>
                                    <div className="flex-auto text-2xl">
                                      <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          APELLIDO(S)
                                        </p>
                                        <input
                                          id="txtSname"
                                          type="text"
                                          style={{ width: "60%" }}
                                          className="bg-green-deparments-cards h-7 rounded-lg"
                                          onChange={handleSetInfoUser}
                                          value={propiedadeFormCotizar.s_name}
                                        />
                                      </div>
                                      <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          EDAD
                                        </p>
                                        <select
                                          id="txtEdad"
                                          className="bg-btn-brown text-white rounded-lg"
                                          style={{ width: "60%" }}
                                          defaultValue="0"
                                          name="select_temp_op1"
                                          onChange={handleSetInfoUser}
                                          value={propiedadeFormCotizar.age}
                                        >
                                          <option value="20-30" selected>
                                            20-30 AÑOS
                                          </option>
                                          <option value="31-40">
                                            31-40 AÑOS
                                          </option>
                                          <option value="41-+">41-+</option>
                                        </select>
                                      </div>
                                      <div className="mt-5 div-width-parent">
                                        <p
                                          className="text-copy-cotizar-3"
                                          style={{ width: "60%" }}
                                        >
                                          ¿POR DÓNDE PREFIERES QUE TE
                                          CONTACTEMOS?
                                        </p>
                                        <select
                                          id="txtContacto"
                                          className="bg-btn-brown text-white rounded-lg"
                                          style={{ width: "60%" }}
                                          defaultValue="0"
                                          name="select_temp_op1"
                                          onChange={handleSwitchCheckContact}
                                          value={
                                            propiedadeFormCotizar.contactMethod
                                          }
                                        >
                                          <option value="mail" selected>
                                            Mail
                                          </option>
                                          <option value="telefono">
                                            Llamada telefonica
                                          </option>
                                          <option value="whatsapp">
                                            Whatsapp
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-initial w-16 p-2 content-center">
                                <div
                                  className="flex-auto div-width-parent content-center"
                                  style={{ height: "100%" }}
                                >
                                  <div
                                    className="text-copy-cotizar-2 div-width-border"
                                    style={{ height: "100%" }}
                                  >
                                    <img
                                      src="assets/nuevo/icons/flecha-siguiente.svg"
                                      alt="option1"
                                      className="h-20 pointer-btn-sig-ant"
                                      onClick={handleBtnSigPantalla2}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {propiedadesCotizar.pantalla6 && (
                            <div
                              className="flex flex-row"
                              style={{
                                marginBottom: "-28px",
                              }}
                            >
                              <div className="flex-initial w-16 p-2 content-center"></div>
                              <div className="flex-auto p-2">
                                <div
                                  className="bg-bunsi-s-bone border-t-2 border-r-2 border-l-2 border-b-2 border-green-700 rounded-lg text-center"
                                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                                >
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl title-font-cotizar div-width-parent">
                                      <img
                                        src="assets/nuevo/logoCotizar.png"
                                        alt=""
                                        className="w-96"
                                      />
                                      <div className="text-copy-cotizar spacing-cotizar">
                                        Gracias
                                      </div>
                                      <div className="border-b-2 border-green-700 div-width-border mt-5"></div>
                                    </div>
                                  </div>
                                  <div className="flex p-2">
                                    <div className="flex-auto text-2xl div-width-parent">
                                      <div
                                        className="text-copy-cotizar-2 mt-5 div-width-border spacing-cotizar"
                                        style={{ lineHeight: "35px" }}
                                      >
                                        En breve nuestro equipo se contactará
                                        contigo.
                                      </div>
                                      <div className="text-copy-cotizar-2 mt-12 mb-32 div-width-border">
                                        <button
                                          className="font-p-5-sm-calcular font-p-5-sm btn-calcular-css text-white rounded-lg px-10"
                                          onClick={handleBtnEnviar}
                                        >
                                          Enviar
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-initial w-16 p-2 content-center"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {!propiedadesModal.cotizar && (
                      <div
                        className={
                          propiedadesModal.carousel
                            ? "w-full bg-bunsi-s-green px-5"
                            : "w-full"
                        }
                      >
                        {propiedadesModal.carousel === true && (
                          <p className="text-xl smTextColor font-semibold">
                            {learnmore}:
                          </p>
                        )}
                        <div
                          className={
                            propiedadesModal.carousel
                              ? "flex justify-between py-5"
                              : "flex justify-between"
                          }
                        >
                          <ul className="flex justify-evenly md:space-x-3">
                            <li
                              className={`w-14 h-14 rounded-full cursor-pointer ${
                                !propiedadesModal.ubicacion &&
                                !propiedadesModal.planos &&
                                !propiedadesModal.specs &&
                                !propiedadesModal.simulador
                                  ? ""
                                  : "mt-3"
                              }`}
                              onClick={() => handleConoceMas("spacial")}
                            >
                              {propiedadesModal.spacial === true ? (
                                <img
                                  src="assets/nuevo/departamentos/IMAGENES CATALOGO-15.png"
                                  alt="option1"
                                />
                              ) : (
                                <img
                                  src="assets/nuevo/icons/IMAGENES CATALOGO-01.svg"
                                  alt="option1"
                                  className="h-12 bg-bunsi-strong-green rounded-full pointer box-style-propiedades"
                                />
                              )}
                            </li>
                            <li
                              className={`w-14 h-14 rounded-full cursor-pointer ${
                                !propiedadesModal.spacial &&
                                !propiedadesModal.planos &&
                                !propiedadesModal.specs &&
                                !propiedadesModal.simulador
                                  ? ""
                                  : "mt-3"
                              }`}
                              onClick={() => handleConoceMas("ubicacion")}
                            >
                              {propiedadesModal.ubicacion === true ? (
                                <img
                                  src="assets/nuevo/departamentos/IMAGENES CATALOGO-16.png"
                                  alt="option1"
                                />
                              ) : (
                                <img
                                  src="assets/nuevo/icons/IMAGENES CATALOGO-02.svg"
                                  alt="option1"
                                  className="h-12 bg-bunsi-strong-green rounded-full pointer box-style-propiedades"
                                />
                              )}
                            </li>
                            <li
                              className={`w-14 h-14 rounded-full cursor-pointer ${
                                !propiedadesModal.spacial &&
                                !propiedadesModal.ubicacion &&
                                !propiedadesModal.specs &&
                                !propiedadesModal.simulador
                                  ? ""
                                  : "mt-3"
                              }`}
                              onClick={() => handleConoceMas("planos")}
                            >
                              {propiedadesModal.planos === true ? (
                                <img
                                  src="assets/nuevo/departamentos/IMAGENES CATALOGO-17.png"
                                  alt="option1"
                                />
                              ) : (
                                <img
                                  src="assets/nuevo/icons/IMAGENES CATALOGO-03.svg"
                                  alt="option1"
                                  className="h-12 bg-bunsi-strong-green rounded-full pointer box-style-propiedades"
                                />
                              )}
                            </li>
                            <li
                              className={`w-14 h-14 rounded-full cursor-pointer ${
                                !propiedadesModal.spacial &&
                                !propiedadesModal.ubicacion &&
                                !propiedadesModal.planos &&
                                !propiedadesModal.simulador
                                  ? ""
                                  : "mt-3"
                              }`}
                              onClick={() => handleConoceMas("specs")}
                            >
                              {propiedadesModal.specs === true ? (
                                <img
                                  src="assets/nuevo/departamentos/IMAGENES CATALOGO-18.png"
                                  alt="option1"
                                />
                              ) : (
                                <img
                                  src="assets/nuevo/icons/IMAGENES CATALOGO-04.svg"
                                  alt="option1"
                                  className="h-12 bg-bunsi-strong-green rounded-full pointer box-style-propiedades"
                                />
                              )}
                            </li>
                            <li
                              className={`w-14 h-14 rounded-full cursor-pointer ${
                                !propiedadesModal.ubicacion &&
                                !propiedadesModal.planos &&
                                !propiedadesModal.specs &&
                                !propiedadesModal.spacial
                                  ? ""
                                  : "mt-3"
                              }`}
                              onClick={() => handleConoceMas("simulador")}
                            >
                              {propiedadesModal.simulador === true ? (
                                <img
                                  src="assets/nuevo/departamentos/IMAGENES CATALOGO-19.png"
                                  alt="option1"
                                />
                              ) : (
                                <img
                                  src="assets/nuevo/icons/IMAGENES CATALOGO-05.svg"
                                  alt="option1"
                                  className="h-12 bg-bunsi-strong-green rounded-full pointer box-style-propiedades"
                                />
                              )}
                            </li>
                          </ul>
                          {/* Botoon de contacto */}
                          <button
                            className={`hidden md:block ${
                              propiedadesModal.carousel
                                ? `bg-btn-brown px-10 h-10 text-white uppercase rounded-full self-center`
                                : `bg-gray-600 px-10 h-10 text-white uppercase rounded-full self-center`
                            }`}
                            onClick={() => handleConoceMas("cotizar")}
                          >
                            {quote}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LoginModal
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        </>
      ) : null}
    </>
  );
};

export default Propiedades;
