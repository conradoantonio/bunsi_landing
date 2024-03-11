// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";

type Props = {
  status: string;
  showRegistroModal: boolean;
  setShowRegistroModal: (val: boolean) => void;
};

const Navbar: React.FC<Props> = ({ status, setShowRegistroModal }) => {
  // Obtain default locale from Next.js i18n config
  const router = useRouter();
  const changeLangTo = router.locale === "es" ? "en" : "es";
  const handleChangeLang = () => {
    // document.cookie = `NEXT_LOCALE=${changeLangTo};path=${path};max-age=31536000`;
    console.log("changeLangTo", changeLangTo);
    document.cookie = `NEXT_LOCALE=${changeLangTo}`;
    router.push("/", "/", { locale: changeLangTo });
  };

  const intl = useIntl();

  const benefits = intl.formatMessage({ id: "page.home.navbar.benefits" });
  const proptech = intl.formatMessage({ id: "page.home.navbar.proptech" });
  const properties = intl.formatMessage({
    id: "page.home.navbar.properties",
  });
  const join = intl.formatMessage({ id: "page.home.navbar.join" });

  useEffect(() => {
    // Get NEXT_LOCALE cookie
    const cookie = document.cookie;
    if (cookie.includes("NEXT_LOCALE=en")) {
      router.push("/", "/", { locale: "en" });
    } else {
      router.push("/", "/", { locale: "es" });
    }
  }, []);

  const toggleMenu = () => {
    const collapse = document.querySelector("#navbar-sticky");
    collapse?.classList.toggle("hidden");
    collapse?.classList.toggle("block");
  };

  return (
    <>
    <nav className="mobile-only:bg-image-prop-details md:bg-todos-ganan fixed top-0 z-50 flex w-full justify-between items-center">
        <div className="flex sm:flex-wrap md:flex-nowrap justify-between items-center w-full">
          {/* Logo desktop */}
          <a href="#" className="hidden md:block flex items-center h-16 sm:h-16 md:h-24 md:w-80 lg:w-500 xl:h-32 sm:bg-transparent md:bg-primary-green">
            <div className="bg-logo mx-auto w-3/4 h-full py-12 px-10 "></div>
          </a>
          {/* Logo mobile */}
          <a href="#" className="block md:hidden flex items-center h-16 sm:h-16 md:h-24 md:w-80 lg:w-500 xl:h-32 sm:bg-transparent md:bg-primary-green">
            <div className="bg-logo-mobile mx-auto w-3/4 h-full py-0 px-9"></div>
          </a>

          <div id="centerTextMobileMenu" className="flex md:order-2 hidden">
            <h5 className="underline underline-offset-8 text-white text-lg" style={{textDecorationColor: "#DFB079"}}>
              Catálogo de <span style={{color: "#DFB079"}}>propiedades</span>
            </h5>
          </div>

          {/* Burger button */}
          <div className="flex md:order-2">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="bg-transparent inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <ul className="hidden md:block">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-color-brown rounded md:bg-transparent uppercase"
                  aria-current="page"
                  onClick={handleChangeLang}
                >
                  ENG/ESP
                </a>
              </li>
            </ul>
          </div>

          {/* Menu desplegable */}
          <div
            className="hidden justify-between items-center w-full md:flex md:order-1 last:float-right md:w-4/5"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 w-full md:bg-todos-ganan last:float-right">
              <li>
                <a
                  href="#beneficios"
                  className="block py-2 pr-4 pl-3 text-color-brown rounded hover:bg-todos-ganan md:bg-transparent uppercase"
                  aria-current="page"
                >
                  {benefits}
                </a>
              </li>
              <li>
                <a
                  href="#proptech"
                  className="block py-2 pr-4 pl-3 text-color-brown rounded md:bg-transparent uppercase"
                  aria-current="page"
                >
                  {proptech}
                </a>
              </li>
              <li>
                <a
                  href="#propiedades"
                  className="block py-2 pr-4 pl-3 text-color-brown rounded md:bg-transparent uppercase"
                  aria-current="page"
                >
                  {properties}
                </a>
              </li>
              {status !== "authenticated" ? (
                <li onClick={() => setShowRegistroModal(true)}>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-color-brown rounded md:bg-transparent uppercase"
                    aria-current="page"
                  >
                    {join}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
