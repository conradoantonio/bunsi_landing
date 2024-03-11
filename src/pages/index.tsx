import type { NextPage } from "next";
import Head from "next/head";
import { useIntl } from "react-intl";
import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from "react-router-dom";
// import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
// import { trpc } from "../utils/trpc";

import "swiper/css";
import "swiper/css/navigation";
import Navbar from "../components/Navbar";
import TitleSectionSM from "../components/TitleSectionSM";

import TitleSectionLG from "../components/TitleSectionLG";
import Carousel from "../components/Carousel";
import TodosGananSM from "../components/TodosGananSM";
import Propiedades from "../components/Propiedades";
import { useEffect, useState } from "react";
import RegistroModal from "../components/RegistroModal";

import PropTech from "../components/PropTech";
import NftUnicos from "../components/NftUnicos";
import NoTeLoPierdas from "../components/Formulario";
import ChatBubble from "../components/ChatBubble";

import ReactGA from "react-ga";
import { showSecondarySectionsLanding } from '../../public/assets/js/script';

const TRACKING_ID = "G-0BSDCQ293W"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();
  // const { data: session, status } = useSession();
  console.log(status);
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  const intl = useIntl();

  const title = intl.formatMessage({ id: "page.home.head.title" });
  const description = intl.formatMessage({
    id: "page.home.head.description",
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
  
      const chatBubble = document.getElementById("chatBubble");
      setTimeout(() => {
        chatBubble?.classList.remove("chatBubble-hide");
        chatBubble?.classList.add("chatBubble-show");
      }, 1000);
  
      setTimeout(() => {
        chatBubble?.classList.remove("chatBubble-show");
        chatBubble?.classList.add("chatBubble-hide");
      }, 7000);

      const formSent = localStorage.getItem('formSent');
      if ( formSent == "1" ) {
        showSecondarySectionsLanding( true );
      } else {
        showSecondarySectionsLanding( false );
      }
      console.log();
  
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Root/>}>
  //       <Route index path="/" element={<h1>Home aquí</h1>}></Route>
  //       <Route path="/propiedad" element={<h1>Propiedad acá</h1>}></Route>
  //     </Route>
  //   )
  // )

  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      {/* ReactDOM.hydrate(
        <React.StrictMode>
        <RouterProvider router={router}/>
        </React.StrictMode>,
        document.getElementById("root")
      );
     */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <div id="mainContainer" className="header-2 bg-todos-ganan bg-image md:bg-image-md md:no-image md:h-0">
          <div className="md:bg-todos-ganan">
            <Navbar
              status={status}
              showRegistroModal={showRegistroModal}
              setShowRegistroModal={setShowRegistroModal}
            />
            <TitleSectionLG />
            <ChatBubble />
          </div>

          <div id="mainComponentsHeader">
            <TitleSectionSM />
            <Carousel />
          </div>

          {/*
          todos-ganan
          propiedades
          registroModal
          proptech
          beneficios
          formulario-conoce-mas
          */}
          <TodosGananSM />
          <Propiedades isUserLogin={status} />
          {isLoading && status != "authenticated" ? (
            <RegistroModal
              showRegistroModal={showRegistroModal}
              setShowRegistroModal={setShowRegistroModal}
            />
          ) : null}
          <PropTech/>
          {/* <PropTech goToContactForm={goToContactForm} /> */}
          <NftUnicos />
          <NoTeLoPierdas />
        </div>
      </>
    </>
  );

};

export default Home;


// const Root = () => {
//   return (
//     <>
//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/propiedad">Property</Link>
//       </div>

//       <div>
//         <Outlet></Outlet>
//       </div>
//     </>
//   )
// }

// const AuthShowcase: React.FC = () => {
//   const { data: secretMessage } = trpc.useQuery(["auth.getSecretMessage"]);
//   const { data: sessionData } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p className="text-2xl text-blue-500">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && (
//         <p className="text-2xl text-blue-500">{secretMessage}</p>
//       )}
//       <button
//         className="px-4 py-2 border border-black text-xl rounded-md bg-violet-50 hover:bg-violet-100 shadow-lg'"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
