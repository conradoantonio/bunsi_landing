import { Modal } from "flowbite-react";

type Props = {
  showRegistroModal: boolean;
  setShowRegistroModal: (val: boolean) => void;
};

const RegistroModal: React.FC<Props> = ({
  showRegistroModal,
  setShowRegistroModal,
}) => {
  return (
    <Modal
      id="registroModal"
      title="Registro"
      show={showRegistroModal}
      onClose={() => setShowRegistroModal(!showRegistroModal)}
      size="4xl"
    >
      <div style={{ backgroundColor: "red" }}>
        <Modal.Header
          style={{ backgroundColor: "#fcbe85", borderBottomWidth: "0px" }}
        ></Modal.Header>
        <div className="bg-modal-login">
          <div className="bg-modal-login py-14">
            <div>
              <p className="text-7xl smTextColor font-semibold text-center">
                No te lo <span className="underline text-white">pierdas</span>
              </p>
            </div>
            <div className="flex justify-center">
              <p className="mt-5 mb-5 text-2xl text-center text-color-brown">
                ¡Complete el siguiente formulario para no quedarte fuera!
              </p>
            </div>
            <div className="w-1/2 mx-auto mt-5">
              <form className="mt-5 w-full wrapper">
                <div className="input-data">
                  <input type="text" className="w-full" />
                  <div className="underline" />
                  <label>Nombre</label>
                </div>
                <br />
                <div className="input-data">
                  <input type="text" className="w-full" />
                  <div className="underline" />
                  <label>Teléono</label>
                </div>
                <br />
                <div className="input-data">
                  <input type="email" className="w-full" />
                  <div className="underline" />
                  <label>Correo electronicó</label>
                </div>
                <div className="w-full mt-5">
                  <label style={{ color: "white" }} className="w-full">
                    <input
                      className="form-check-input chkbx-form mr-2"
                      type="checkbox"
                    />
                    Acepto términos y condiciones
                  </label>
                  <br />
                  <label style={{ color: "white" }} className="w-full">
                    <input
                      className="form-check-input chkbx-form mr-2"
                      type="checkbox"
                    />
                    Deseo recibir información actualizada de BUNSI
                  </label>
                </div>
                <div className="w-full text-center mt-5">
                  <button className="bg-btn-brown px-12 py-3 uppercase text-white rounded-full font-semibold">
                    ENVIAR
                  </button>
                </div>
                <div className="w-full p-1 mt-5">
                  <img
                    className="img-logo mx-auto"
                    src="/assets/img/landing-mobil/logo-bunsi.png"
                    alt="Logo BUNSI FOOTER"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegistroModal;
