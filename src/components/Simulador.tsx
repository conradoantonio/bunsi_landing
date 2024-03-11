import axios from "axios";
import { useState, useEffect } from "react";
import Propiedad from "../types/propiedad";
import Semanas from "../types/semanas";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

const Simulador = (props: any) => {
  // Aquí van enlistados los métodos que se usarán en el simulador jeje

  const { propertySelected, propertySimulador, resSemanas } = props;

  const [propiedadesModal, setPropiedadesModal] = useState({
    carousel: true,
    spacial: false,
    ubicacion: false,
    planos: false,
    specs: false,
    simulador: false,
    cotizar: false,
  });
  const [propiedadesSimulador, setPropiedadesSimulador] =
    useState(propertySimulador);

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

  const [resumenSemanas, setResumenSemanas] = useState(resSemanas);

  const semanas: Array<Semanas> = [];

  const [propiedadSelected, setPropiedadSelected] =
    useState<Propiedad>(propertySelected);

  const intl = useIntl();

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

  return (
    <>
      {propertySelected && (
        <div className="">
          {/* De aquí para abajo se tomará el componente del simulador */}
          <div className="md:bg-bunsi-s-bone md:border-2 md:border-green-900 md:text-center">
            <div className="grid grid-cols-6 p-2">
              <div className="col-span-6 smTextColor md:text-2xl md:text-copy md:title-font-2">
                <p className="text-center">{title_simulator}</p>
              </div>
            </div>
            <div className="grid grid-cols-6 p-3 scroll-simulator">
              {/* Paso 1 casi meramente informativo */}
              <div className="col-span-6 md:col-span-2 md:border-r-2 md:border-green-900">
                <div className="grid grid-cols-6 p-3 scroll-simulator">
                  <div className="col-span-6">
                    <div className="flex justify-center">
                      <div className="circle-number">1</div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center">
                      <div>
                        <label className="title-font block text-center">
                          {fraction}
                        </label>
                        <select
                          style={{ color: "#ffffff !important" }}
                          className="block font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectPas1}
                          value={propiedadesSimulador.selectPas1}
                          onChange={handleSelectPas1}
                        >
                          <option value="0" disabled>
                            {chooseanoption}
                          </option>
                          {handleSetSemanasFracccion()}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center">
                      <div>
                        <label className="title-font block text-center">
                          {" "}
                          {Investment}{" "}
                        </label>
                        <input
                          type="text"
                          onChange={handleSetInversion}
                          value={propiedadesSimulador.inversionFraccionTxt}
                          disabled
                          className="block font-size-btn bg-green-deparments-cards smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center text-center">
                      <div>
                        <label className="title-font block text-center">
                          {weeks}
                        </label>
                        <input
                          className="block font-size-btn bg-green-deparments-cards smTextColor px-sim-15 h-10 rounded-full self-center w-40"
                          type="text"
                          value={`${propiedadesSimulador.selectSemPas1InputTxt} ${weeks_s}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center items-center">
                      <div>
                        <label className="title-font block text-center">
                          {Monthlycost}
                        </label>
                        <input
                          type="text"
                          disabled
                          value={handlecostoVivienda()}
                          name=""
                          id=""
                          className="block font-size-btn bg-green-deparments-cards-2 smTextColor-2 px-sim-15 h-10 rounded-full self-center w-full md:w-40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Paso 2 para seleccionar semanas de uso personal */}
              <div className="col-span-6 md:col-span-2 md:border-r-2 md:border-green-900">
                <div className="grid grid-cols-6 p-3 scroll-simulator">
                  <div className="col-span-6">
                    <div className="flex justify-center">
                      <div className="circle-number">2</div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center">
                      <p className="title-font"> {personaluse} </p>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center items-center">
                      <div>
                        <label className="block title-font text-center">{` ${highseason} `}</label>
                        <select
                          className="block font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectHighSeason}
                          value={propiedadesSimulador.selectHighSeason}
                          onChange={handleSelectHighSeason}
                        >
                          <option value="-1" selected>
                            {" "}
                            {chooseanoption}{" "}
                          </option>
                          {setWeeksTemHigh(resumenSemanas.semanaAlta)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center items-center">
                      <div>
                        <label className="block text-center title-font">{` ${middleseason} `}</label>
                        <select
                          className="block font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectMiddleSeason}
                          value={propiedadesSimulador.selectMiddleSeason}
                          onChange={handleSelectMiddleSeason}
                        >
                          <option value="null" selected>
                            {" "}
                            {chooseanoption}{" "}
                          </option>
                          {setWeeksTemMiddle(resumenSemanas.semanaMedia)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1">
                    <div className="flex justify-center items-center">
                      <div>
                        <label className="block text-center title-font">{` ${lowseason} `}</label>
                        <select
                          className="block font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectLowSeason}
                          value={propiedadesSimulador.selectLowSeason}
                          onChange={handleSelectLowSeason}
                        >
                          <option value="null" selected>
                            {" "}
                            {chooseanoption}{" "}
                          </option>
                          {setWeeksTemLow(resumenSemanas.semanaBaja)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 p-1 flex flex-col text-center">
                    <div className="title-font">{weeks_use_title}</div>
                    <input
                      type="text"
                      disabled
                      value={
                        resumenSemanas.semanaAlta + " " + resumensemanas_alta
                      }
                      name=""
                      id=""
                      className="font-size-btn bg-btn-brown text-white px-sim-15 h-7 rounded-full self-center w-52 text-xs"
                    />
                    <input
                      type="text"
                      disabled
                      value={
                        resumenSemanas.semanaMedia + " " + resumensemanas_media
                      }
                      name=""
                      id=""
                      className="font-size-btn bg-[#184823] text-white px-sim-15 h-7 rounded-full self-center w-52 text-xs mt-2"
                    />
                    <input
                      type="text"
                      disabled
                      value={
                        resumenSemanas.semanaBaja + " " + resumensemanas_baja
                      }
                      name=""
                      id=""
                      className="font-size-btn bg-green-deparments-cards smTextColor px-sim-15 h-7 rounded-full self-center w-52 text-xs mt-2"
                    />
                  </div>
                </div>
              </div>
              {/* Paso 3 para cálculo automático de semanas restantes */}
              <div className="col-span-6 md:col-span-2 md:border-r-2 md:border-green-900 text-center">
                <div className="grid grid-cols-6 p-3 scroll-simulator">
                  <div className="col-span-6">
                    <div className="flex justify-center">
                      <div className="circle-number">3</div>
                    </div>
                  </div>
                  {/* Temporada alta */}
                  <div className="col-span-6 p-1">
                    <div className="p-0">
                      <div className="title-font">{rental}</div>
                      <div>
                        <input
                          type="text"
                          value={highseason}
                          disabled={true}
                          style={{
                            backgroundColor: "#85331d",
                            color: "white",
                          }}
                          className="font-size-btn smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                        <input
                          type="text"
                          value={resumenSemanas.weeksSemanaAlta}
                          disabled={true}
                          style={{
                            backgroundColor: "#85331d",
                            color: "white",
                          }}
                          name={"highSeasonSem"}
                          className="font-size-btn smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                      </div>
                    </div>
                    <div className="p-0">
                      <label className="label-sim title-font-2">
                        {dailyrent}{" "}
                      </label>
                      <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                        $9,000
                        {/* {resumenSemanas.mathSemanaAlta.toLocaleString(
                          "en"
                        )}{" "} */}
                        MXN
                      </label>
                    </div>
                    <div className="p-0">
                      <label className="label-sim title-font-2">
                        {" "}
                        {Occupation}{" "}
                      </label>
                      <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                        80%
                        {/* {propiedadesSimulador.ocupacionOpc1} */}
                      </label>
                    </div>
                  </div>
                  {/* Temporada media */}
                  <div className="col-span-6 p-1">
                    <div className="p-0">
                      {/* <div className="title-font">{rental}</div> */}
                      <div>
                        <input
                          type="text"
                          value={middleseason}
                          disabled={true}
                          style={{
                            backgroundColor: "#85331d",
                            color: "white",
                          }}
                          className="font-size-btn smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                        <input
                          type="text"
                          value={resumenSemanas.weeksSemanaMedia}
                          disabled={true}
                          style={{
                            backgroundColor: "#85331d",
                            color: "white",
                          }}
                          name={"middleSeasonSem"}
                          className="font-size-btn smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                      </div>
                    </div>
                    <div className="p-0">
                      <label className="label-sim title-font-2">
                        {dailyrent}{" "}
                      </label>
                      <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                        $6,600
                        {/* {resumenSemanas.mathSemanaMedia.toLocaleString(
                          "en"
                        )}{" "} */}
                        MXN
                      </label>
                    </div>
                    <div className="p-0">
                      <label className="label-sim title-font-2">
                        {" "}
                        {Occupation}{" "}
                      </label>
                      <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                        60%
                        {/* {propiedadesSimulador.ocupacionOpc1} */}
                      </label>
                    </div>
                  </div>
                  {/* Temporada baja */}
                  <div className="col-span-6 p-1">
                    <div className="p-0">
                      {/* <div className="title-font">{rental}</div> */}
                      <div>
                        <input
                          type="text"
                          value={lowseason}
                          disabled={true}
                          style={{
                            backgroundColor: "#85331d",
                            color: "white",
                          }}
                          className="font-size-btn smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                        <input
                          type="text"
                          value={resumenSemanas.weeksSemanaBaja}
                          disabled={true}
                          style={{
                            backgroundColor: "#85331d",
                            color: "white",
                          }}
                          name={"lowSeasonSem"}
                          className="font-size-btn smTextColor h-10 rounded-full self-center w-40 px-sim-10"
                        />
                      </div>
                    </div>
                    <div className="p-0">
                      <label className="label-sim title-font-2">
                        {dailyrent}{" "}
                      </label>
                      <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                        $4,400
                        {/* {resumenSemanas.mathSemanaBaja.toLocaleString(
                          "en"
                        )}{" "} */}
                        MXN
                      </label>
                    </div>
                    <div className="p-0">
                      <label className="label-sim title-font-2">
                        {" "}
                        {Occupation}{" "}
                      </label>
                      <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                        40%
                        {/* {propiedadesSimulador.ocupacionOpc1} */}
                      </label>
                    </div>
                  </div>

                  {propiedadesSimulador.selectSemPas3Opc1 <
                    propiedadesSimulador.NUMselectSemPas3Opc1 && (
                    <div className="p-1">
                      <div className="p-1">
                        <div className="title-font">{rental}</div>
                        <select
                          className="font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectRenta2}
                          value={propiedadesSimulador.selectRenta2}
                          onChange={handleSetRenta1}
                          name="select_temp_op2"
                          disabled={
                            propiedadesSimulador.selectRenta2 > 0 ? true : false
                          }
                        >
                          <option value="0" selected disabled>
                            {chooseanoption}
                          </option>
                          {getRenta1Temps()}
                        </select>
                        <select
                          id="sop2"
                          name="sop2"
                          className="font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectSemPas3Opc2}
                          value={propiedadesSimulador.selectSemPas3Opc2}
                          disabled={
                            propiedadesSimuladorPaso2.blockSemPas3Opc2
                              ? true
                              : false
                          }
                          onChange={handleSemPas3Opc2}
                        >
                          <option value="0" selected>
                            0 {weeks_s}
                          </option>
                          {getSemanas2Pas3(
                            propiedadesSimulador.NUMselectSemPas3Opc2
                          )}
                        </select>
                      </div>
                      <div className="p-0">
                        <label className="label-sim title-font-2">
                          {dailyrent}{" "}
                        </label>
                        <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                          {propiedadesSimulador.rentaDiariaOpc2}
                        </label>
                      </div>
                      <div className="p-0">
                        <label className="label-sim title-font-2">
                          {" "}
                          {Occupation}{" "}
                        </label>
                        <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                          {propiedadesSimulador.ocupacionOpc2}
                        </label>
                      </div>
                    </div>
                  )}
                  {propiedadesSimulador.selectSemPas3Opc2 <
                    propiedadesSimulador.NUMselectSemPas3Opc2 && (
                    <div className="p-1">
                      <div className="p-1">
                        <div className="title-font">{rental}</div>
                        <select
                          className="font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectRenta3}
                          value={propiedadesSimulador.selectRenta3}
                          onChange={handleSetRenta1}
                          name="select_temp_op3"
                          disabled={
                            propiedadesSimulador.selectRenta3 > 0 ? true : false
                          }
                        >
                          <option value="0" selected disabled>
                            {chooseanoption}
                          </option>
                          {getRenta1Temps()}
                        </select>
                        <select
                          className="font-size-btn bg-btn-brown px-sim-15 h-10 text-white rounded-full self-center w-40"
                          defaultValue={propiedadesSimulador.selectSemPas3Opc3}
                          value={propiedadesSimulador.selectSemPas3Opc3}
                          disabled={
                            propiedadesSimuladorPaso2.blockSemPas3Opc3
                              ? true
                              : false
                          }
                          onChange={handleSemPas3Opc3}
                        >
                          <option value="0" selected>
                            0 {weeks_s}
                          </option>
                          {getSemanas3Pas3(
                            propiedadesSimulador.NUMselectSemPas3Opc3
                          )}
                        </select>
                      </div>
                      <div className="p-0">
                        <label className="label-sim title-font-2">
                          {dailyrent}{" "}
                        </label>
                        <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                          {propiedadesSimulador.rentaDiariaOpc3}
                        </label>
                      </div>
                      <div className="p-0">
                        <label className="label-sim title-font-2">
                          {" "}
                          {Occupation}{" "}
                        </label>
                        <label className="bg-sm-input label-sim rounded-full px-2 h-2">
                          {propiedadesSimulador.ocupacionOpc3}
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Desgloza los botones de acción */}
          <div className="grid grid-cols-6 md:mt-3 md:p-2 text-center">
            <div className="col-span-6 md:col-span-2 pb-1.5">
              <button
                className="heartbeat font-p-5-sm-calcular font-p-5-sm btn-calcular-css text-white rounded-full px-10"
                onClick={handleBtnReset}
              >
                {btnreset}
              </button>
            </div>
            <div className="col-span-6 md:col-span-2 py-1.5">
              <label className="bg-sm-input-total font-p-5-sm label-sim text-white rounded-full px-10">
                $ {propiedadesSimulador.totalSimulador} MXN *
              </label>
            </div>
            <div className="col-span-6 md:col-span-2 py-1.5">
              <button
                className="font-p-5-sm-calcular font-p-5-sm btn-calcular-css text-white rounded-full px-10"
                onClick={handleBtnCalcular}
              >
                {btncal}
              </button>
            </div>
          </div>

          {/* Desgloza los diálogos del simulador */}
          <div className="flex-auto px-4 py-4 md:px-0 md:py-0">
            <p className="text-xs text-center md:font-term-sm">{contract1}</p>
            <p className="text-xs text-center md:font-term-sm">{contract2}</p>
            <p className="text-xs text-center md:font-term-sm">{contract3}</p>
          </div>
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
                          No se han completado todas las semanas en renta.
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
    </>
  );
};

export default Simulador;
