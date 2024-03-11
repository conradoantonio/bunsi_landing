import { useState, FormEventHandler } from "react";
import { signIn } from "next-auth/react";
import { Modal } from "flowbite-react";
import Router from "next/router";

type Props = {
  showLoginModal: boolean;
  setShowLoginModal: (val: boolean) => void;
};

const LoginModal: React.FC<Props> = ({ showLoginModal, setShowLoginModal }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(res);

    if (res?.status === 200) {
      Router.replace("/");
      setShowLoginModal(false);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Modal
      id="loginModal"
      title="Login"
      show={showLoginModal}
      onClose={() => setShowLoginModal(!showLoginModal)}
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
              <form className="mt-5 w-full wrapper" onSubmit={handleSubmit}>
                <div className="input-data">
                  <input
                    type="email"
                    className="w-full"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="underline" />
                  <label>Correo electronicó</label>
                </div>
                <br />
                <div className="input-data">
                  <input
                    type="password"
                    className="w-full"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      })
                    }
                  />
                  <div className="underline" />
                  <label>Password</label>
                </div>
                <div className="w-full text-center mt-5">
                  <button
                    type="submit"
                    className="bg-btn-brown px-12 py-3 uppercase text-white rounded-full font-semibold"
                  >
                    Login
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

export default LoginModal;
