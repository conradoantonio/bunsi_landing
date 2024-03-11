import { Modal } from "flowbite-react";

type Props = {
  showPrivacidadModal: boolean;
  setShowPrivacidadModal: (val: boolean) => void;
};

const PrivacidadModal: React.FC<Props> = ({
  showPrivacidadModal,
  setShowPrivacidadModal,
}) => {
  return (
    <Modal
      id="registroModal"
      title="Registro"
      show={showPrivacidadModal}
      onClose={() => setShowPrivacidadModal(!showPrivacidadModal)}
      size="4xl"
    >
      <div style={{ backgroundColor: "red" }}>
        <Modal.Header
          style={{ backgroundColor: "#fcbe85", borderBottomWidth: "0px" }}
        ></Modal.Header>
        <div className="bg-modal-login">
          <div className="bg-modal-login">
            <div>
              <p className="text-4xl smTextColor font-semibold text-center">
                Aviso de privacidad integral
              </p>
            </div>
            <div className="flex justify-center">
              {/* <p className="mt-5 mb-5 pr-5 pl-5 text-center text-color-brown">
                Bunsi mejor conocido como Bunsi, con domicilio en calle 54 y
                portal de internet www.bunsi.com, es el responsable del uso y
                protección de sus datos personales, y al respecto le informamos
                lo siguiente:
              </p> */}
            </div>
            <div className="pr-5 pl-5 pb-5 mt-5 justify-center">
              <div className="">
                <iframe
                  src="https://drive.google.com/file/d/1Rc92rmcUVLIRDUwYJIZvTZ5Qr4p77yMs/preview"
                  width="100%"
                  height="680"
                  allow="autoplay"
                ></iframe>
                <button
                  className="mt-5 btn-privacidad"
                  onClick={() => setShowPrivacidadModal(!showPrivacidadModal)}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PrivacidadModal;
