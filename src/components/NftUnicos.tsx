import { useState } from "react";
import { useIntl } from "react-intl";

const NftUnicos = () => {
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  const [isHover4, setIsHover4] = useState(false);

  const handleMouseEnterCard1 = () => {
    setIsHover1(true);
  };

  const handleMouseLeaveCard1 = () => {
    setIsHover1(false);
  };

  const handleMouseEnterCard2 = () => {
    setIsHover2(true);
  };

  const handleMouseLeaveCard2 = () => {
    setIsHover2(false);
  };

  const handleMouseEnterCard3 = () => {
    setIsHover3(true);
  };

  const handleMouseLeaveCard3 = () => {
    setIsHover3(false);
  };

  const handleMouseEnterCard4 = () => {
    setIsHover4(true);
  };

  const handleMouseLeaveCard4 = () => {
    setIsHover4(false);
  };

  const boxStyle1 = {
    cursor: "pointer",
    backgroundColor: isHover1 ? "#FBBB89" : "#8DB57A",
    transform: isHover1 ? "translateY(-7%)" : "translateY(0%)",
    transition: "transform 0.2s ease-out",
  };

  const boxStyle2 = {
    cursor: "pointer",
    backgroundColor: isHover2 ? "#FBBB89" : "#8DB57A",
    transform: isHover2 ? "translateY(-7%)" : "translateY(0%)",
    transition: "transform 0.2s ease-out",
  };

  const boxStyle3 = {
    cursor: "pointer",
    backgroundColor: isHover3 ? "#FBBB89" : "#8DB57A",
    transform: isHover3 ? "translateY(-7%)" : "translateY(0%)",
    transition: "transform 0.2s ease-out",
  };

  const boxStyle4 = {
    cursor: "pointer",
    backgroundColor: isHover4 ? "#FBBB89" : "#8DB57A",
    transform: isHover4 ? "translateY(-7%)" : "translateY(0%)",
    transition: "transform 0.2s ease-out",
  };

  const intl = useIntl();
  const title = intl.formatMessage({ id: "page.home.nft.title" });

  const arrayNfts = [
    {
      id : 1,
      title : intl.formatMessage({ id: "page.home.nft.option1" }),
      description : intl.formatMessage({ id: "page.home.nft.option1.text"}),
      img : "assets/img/landing-mobil/icon-1.png",
      style : boxStyle1,
      mouseEnter : handleMouseEnterCard1,
      mouseLeave : handleMouseLeaveCard1,
    },
    {
      id : 2,
      title : intl.formatMessage({ id: "page.home.nft.option2" }),
      description : intl.formatMessage({ id: "page.home.nft.option2.text"}),
      img : "assets/img/landing-mobil/icon-2.png",
      style : boxStyle2,
      mouseEnter : handleMouseEnterCard2,
      mouseLeave : handleMouseLeaveCard2,
    },
    {
      id : 3,
      title : intl.formatMessage({ id: "page.home.nft.option3" }),
      description : intl.formatMessage({ id: "page.home.nft.option3.text"}),
      img : "assets/img/landing-mobil/icon-3.png",
      style : boxStyle3,
      mouseEnter : handleMouseEnterCard3,
      mouseLeave : handleMouseLeaveCard3,
    },
    {
      id : 4,
      title : intl.formatMessage({ id: "page.home.nft.option4" }),
      description : intl.formatMessage({ id: "page.home.nft.option4.text"}),
      img : "assets/img/landing-mobil/icon-4.png",
      style : boxStyle4,
      mouseEnter : handleMouseEnterCard4,
      mouseLeave : handleMouseLeaveCard4,
    },
  ];

  return (
    <div id="beneficios" className="w-100 h-auto my-8 hidden">
      <div className=" text-center ">
        <h1 className="mx-10 md:mx-32 lg:mx-32 text-3xl md:text-6xl lg:text-6xl smTextColor font-family-titles font-bold">
          {title}
        </h1>

        <div className="w-full my-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 px-5 md:px-5 lg:px-20">
          {arrayNfts.map(
            (nft, index) => (
              <div key={index}
                className="mx-3 md:mx-5 lg:mx-5 my-4 md:h-full rounded-xl col-span-4 md:col-span-1"
                style={nft.style}
                onMouseEnter={nft.mouseEnter}
                onMouseLeave={nft.mouseLeave}
              >
                <div className="h-20">
                  <img src={nft.img} alt="" className="w-36 m-0 mx-auto p-0"/>
                </div>

                <div className="text-base text-center py-2 md:py-0 px-5">
                  <span className="text-white font-family-titles font-bold">
                    {nft.title}
                  </span>

                  <br />

                  <span className="text-white text-xs font-family-text">
                    {nft.description}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NftUnicos;
