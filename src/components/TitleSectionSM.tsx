import { useIntl } from "react-intl";

const TitleSectionSM = () => {
  const intl = useIntl();

  const title = intl.formatMessage({ id: "page.home.title" });
  const subtitle = intl.formatMessage({
    id: "page.home.subtitle",
  });
  const description1 = intl.formatMessage({
    id: "page.home.description1",
  });
  const description2 = intl.formatMessage({
    id: "page.home.description2",
  });
  const description3 = intl.formatMessage({
    id: "page.home.description3",
  });
  const description4 = intl.formatMessage({
    id: "page.home.description4",
  });
  return (
    <div>
      <div className="sm:container pt-32 md:pt-0 sm:px-4 sm:mx-auto md:hidden lg:hidden">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-white font-family-titles">
            {title} <span className="text-green-800 underline">{subtitle}</span>
          </h1>
        </div>
        <div className="md:flex md:flex-wrap px-4 md:-mx-4 mt-6 md:mt-12">
          <div className="md:w-1/3 md:px-4 xl:px-6 text-xs mt-8 md:mt-0 text-center">
            <p className="smTextColor mb-3 font-family-text">
              {description1}
            </p>
            <p className="smTextColor mb-3 font-family-text">
              {description2}
            </p>
            <p className="smTextColor mb-3 font-family-text">
              {description3}
            </p>
            <p className="text-white mb-3 font-family-text">
              <span className="font-bold">BUNSI</span> {description4}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSectionSM;
