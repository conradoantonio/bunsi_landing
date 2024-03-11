import { FormEventHandler, useState } from "react";
import { useIntl } from "react-intl";
import { trpc } from "../utils/trpc";
import axios from "axios";
import { goToContactForm } from '../../public/assets/js/script';
import PrivacidadModal from "../components/Privacidad";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Result } from "postcss";

const Input = ({ label = "", name = "", type = "text", ...rest }) => {
  return (
    <div className="relative z-0 w-full mb-8">
      <input
        {...rest}
        id={name}
        type={type}
        placeholder=""
        className="pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 md:border-b-4 lg:border-b-4 appearance-none focus:outline-none focus:ring-0 focus:border-white border-white"
      />
      <label
        htmlFor={name}
        className="absolute text-xs md:text-base lg:text-base duration-300 top-3 -z-1 origin-0 text-white font-family-text"
      >
        {label}
      </label>
    </div>
  );
};

const handleBtnEnviarForm = async () => {
  console.log("enviando info");
  
  const objInfoUser = {};
  // const objInfoUser = {
  //   names: propiedadeFormCotizar.name,
  //   last_names: propiedadeFormCotizar.s_name,
  //   phone_code: propiedadeFormCotizar.code_phone,
  //   phone: propiedadeFormCotizar.phone,
  //   email: propiedadeFormCotizar.email,
  //   password: "",
  //   type_id_user: propiedadeFormCotizar.type_id,
  //   id_user: propiedadeFormCotizar.id_user,
  //   age: propiedadeFormCotizar.age,
  //   aditional_information: {
  //     contact_method: propiedadeFormCotizar.contactMethod,
  //     properties: objLugares,
  //     interests: objIntereses,
  //   },
  // };
  await axios
    .post("https://api-bunsi.herokuapp.com/api/mongo/user/new", objInfoUser)
    .then((response) => {
      console.log(response);
      // handleCloseMiniModal();
    })
    .catch((e) => {
      console.log(e);
    });
};

const NoTeLoPierdas = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [showPrivacidadModal, setShowPrivacidadModal] = useState(false);

  const sendMail = trpc.useMutation("mail.sendMail");
  const MySwal = withReactContent(Swal);
  // Método para
  const showSwal = (config:any) => {
    MySwal.fire({
      title: config.title,
      html : config.content,
      showCloseButton:config.showCloseBtn,
      showConfirmButton:config.showConfirmBtn,
      allowOutsideClick:config.allowOutsideClick,
      timer:config.timer ?? null,
    }).then(() => {
      if( config.callback !== undefined) {
        return config.callback();
      } 
    })
  }
  // Método para enviar el correo electrónico
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log({ nombre, email, telefono });
    
    const objInfoUser = {
      nombre: nombre,
      email : email,
      telefono : telefono
    };

    const beneficiosHtml = document.getElementById('beneficios');
    const propiedadesHtml = document.getElementById('propiedades');
    const proptechHtml = document.getElementById('proptech');
    
    beneficiosHtml?.classList.remove('hidden');
    propiedadesHtml?.classList.remove('hidden');
    proptechHtml?.classList.remove('hidden');

    const swalLoading = {
      type:'loader',
      title: "Espere un momento por favor",
      content: <div className="h-12"><i className="fa-solid fa-spinner fa-spin" style={{fontSize:"40px"}}></i></div>,
      showCloseBtn:false,
      showConfirmBtn:false,
      allowOutsideClick: false
    }
    showSwal(swalLoading);
    localStorage.setItem('formSent', '1');
    
    await axios
    .post("https://api-bunsi.herokuapp.com/api/mongo/user/notify", objInfoUser)
    // .post("http://127.0.0.1:3100/api/mongo/user/notify", objInfoUser)
    .then((response) => {
      // MySwal.close();
      // goToContactForm( document.getElementById('mainComponentsHeader'));
      const swalResConfig = {
        type:'success',
        title: "Bien",
        content: <div className="h-12">Información enviada correctamente</div>,
        showCloseBtn:false,
        showConfirmBtn:true,
        allowOutsideClick: true,
        timer:3000,
        callback : () => {
          goToContactForm( document.getElementById('propiedades'));
        }
      }
      // goToContactForm( document.getElementById('propiedades'));
      showSwal(swalResConfig);

      setNombre("");
      setEmail("");
      setTelefono("");
      console.log(`Envío de formulario exitoso: ${response}`);
      // handleCloseMiniModal();
    })
    .catch((e) => {
    // MySwal.close();
      const swalErrConfig = {
        type:'error',
        title: "Whops",
        content: <div className="h-12">Algo salió mal</div>,
        showCloseBtn:true,
        showConfirmBtn:false,
        allowOutsideClick: true,
        timer:3000
      }

      showSwal(swalErrConfig);

      console.log(`Error en envío de formulario ${e}`);
    });
    
  };

  const intl = useIntl();
  const title = intl.formatMessage({ id: "page.home.dontmissit.title" });
  const subtitle = intl.formatMessage({ id: "page.home.dontmissit.subtitle" });
  const description = intl.formatMessage({
    id: "page.home.dontmissit.description",
  });
  const name = intl.formatMessage({ id: "page.home.dontmissit.form.name" });
  const emailText = intl.formatMessage({
    id: "page.home.dontmissit.form.email",
  });
  const phone = intl.formatMessage({ id: "page.home.dontmissit.form.phone" });
  const preferences = intl.formatMessage({
    id: "page.home.dontmissit.form.preferences",
  });
  const pricesup = intl.formatMessage({
    id: "page.home.dontmissit.form.pricesup",
  });
  const pricesdown = intl.formatMessage({
    id: "page.home.dontmissit.form.pricesdown",
  });
  const location = intl.formatMessage({
    id: "page.home.dontmissit.form.location",
  });
  const sendbtn = intl.formatMessage({
    id: "page.home.dontmissit.form.sendbtn",
  });

  const handleOpenPrivacidad = () => {
    setShowPrivacidadModal(true);
  };

  return (
    <div className="w-100 h-auto" id="formulario-conoce-mas">
      <PrivacidadModal
        showPrivacidadModal={showPrivacidadModal}
        setShowPrivacidadModal={setShowPrivacidadModal}
      />
      <div className="relative">
        <img src="assets/img/landing-mobil/bg-form.png" alt="" />
        <form onSubmit={handleSubmit}>
          <div
            className="top-9 md:top-32 lg:top-32 w-full"
            style={{ backgroundColor: "#EEB281", marginTop: "-1px;" }}
          >
            <h1 className="mx-14 md:mx-32 lg:mx-32 text-4xl md:text-6xl lg:text-6xl smTextColor font-family-titles font-bold text-center">
              {title}
            </h1>

            <div className="mt-10 mx-11 md:mx-40 lg:mx-40">
              <p className="break-words text-orange-800 mb-3 font-family-text text-xs md:text-base lg:text-base">
                {subtitle}
              </p>
            </div>

            <div className="mx-11 md:mx-40 lg:mx-40">
              <p className="break-words text-orange-800 mb-3 font-family-text text-xs md:text-base lg:text-base">
                {description}
              </p>
            </div>

            <div className="md:mb-2 lg:mb-2 mx-11 md:mx-40 lg:mx-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-4 lg:gap-4">
              <div>
                <Input
                  label={name}
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(v: any) => setNombre(v.target.value)}
                  required
                />
              </div>

              <div>
                <Input
                  label={emailText}
                  name="email"
                  type="text"
                  value={email}
                  onChange={(v: any) => setEmail(v.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mx-11 md:mx-40 lg:mx-40 grid grid-cols-1 gap-2 md:gap-4 lg:gap-4">
              <div>
                <Input
                  label={phone}
                  name="telefono"
                  type="text"
                  value={telefono}
                  onChange={(v: any) => setTelefono(v.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mx-11 md:mx-40 lg:mx-40 grid grid-cols-1 gap-2 md:gap-4 lg:gap-4">
              <div className="border-0 border-b-2 md:border-b-4 lg:border-b-4 border-white">
                <p className="text-white font-family-text text-xs md:text-base lg:text-base">
                  {preferences}
                </p>
              </div>

              <div className="md:mx-20 lg:mx-20">
                <div>
                  <input
                    className="form-check-input appearance-none h-4 w-4 border border-white rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-white font-family-text text-xs md:text-base lg:text-base">
                    {pricesup}
                  </span>
                </div>

                <div>
                  <input
                    className="form-check-input appearance-none h-4 w-4 border border-white rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-white font-family-text text-xs md:text-base lg:text-base">
                    {pricesdown}
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-11 md:mx-40 lg:mx-40 grid grid-cols-1 gap-2 md:gap-4 lg:gap-4">
              <div className="border-0 border-b-2 md:border-b-4 lg:border-b-4 border-white">
                <p className="text-white font-family-text text-xs md:text-base lg:text-base">
                  {location}
                </p>
              </div>

              <div className="md:mx-20 lg:mx-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  <div>
                    <input
                      className="form-check-input appearance-none h-4 w-4 border border-white rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-white font-family-text text-xs md:text-base lg:text-base">
                      Rivera Maya
                    </span>
                  </div>

                  <div>
                    <input
                      className="form-check-input appearance-none h-4 w-4 border border-white rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-white font-family-text text-xs md:text-base lg:text-base">
                      Cabo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                  <div>
                    <input
                      className="form-check-input appearance-none h-4 w-4 border border-white rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-white font-family-text text-xs md:text-base lg:text-base">
                      Rivera Nayarit
                    </span>
                  </div>

                  <div>
                    <input
                      className="form-check-input appearance-none h-4 w-4 border border-white rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-white font-family-text text-xs md:text-base lg:text-base">
                      La Paz
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-4 md:mx-32 lg:mx-32 my-5 w-100 text-center md:text-right lg:text-right">
              <button
                type="submit"
                // onClick={handleBtnEnviarForm}
                className="m-4 md:mx-16 lg:mx-16 px-10 md:px-16 py-2 bg-orange-800 rounded-3xl text-white"
              >
                {sendbtn}
              </button>
            </div>

            <div className="mb-10 mx-11 md:mx-40 lg:mx-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <div>
                <img
                  className="w-52 mx-auto"
                  src="assets/img/landing-mobil/logo-bunsi.png"
                  alt=""
                />
              </div>

              <div>
                <span className="text-xs text-green-600">
                  Consulte nuestro{" "}
                  <button
                    type="button"
                    onClick={handleOpenPrivacidad}
                    className="heartbeat aviso-privacidad"
                  >
                    aviso de privacidad
                  </button>
                </span>
                <span className="text-xs text-green-600">
                  <br />
                  Copyright 2022©.{" "}
                  <span className="font-bold font-family-text">Bunsi</span> is a
                  lifestyle that will change the way you enjoy vacation
                  ownership.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoTeLoPierdas;
