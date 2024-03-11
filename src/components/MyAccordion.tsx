import React, { useState, ReactNode } from "react";
import { useIntl } from "react-intl";
// import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode,
    title : string,
    isActive : number,
    icon: string,
    myStyles:any
}
const MyAccordion = ({ children, ...props }: Props) => {
    const [item, setItem] = useState(props);


    const handleToggleActive = () => {
        const newActive = item.isActive === 1 ? 0 : 1;
        setItem({...item, isActive: newActive});
        console.log(`isActive ${item.isActive}`);
    }
  return (
    <div className={`bg-[${item.myStyles.headerBackColor}] p-5 border border-[#c9c6c655] rounded-md duration-500 group ${item.isActive === 1 ? 'is-active' : ''}`} style={{ color: item.myStyles.textColor }}>
        <div className="flex items-center hover:cursor-pointer" onClick={handleToggleActive}>
            <div className={`flex w-full text-3xl duration-500 ${item.myStyles.titleBold === 1 ? 'font-semibold' : ''} group-[.is-active]:font-bold `}>
                {item.title}
                <span className="self-center ml-3">
                    <img src={item.icon} alt="social-icon" className="w-8 h-8"/>
                </span>
            </div>
            {/* <div className={`text-xl rotate-90 group-[.is-active]:rotate-[270deg]`}  */}
            <div className={`text-xs duration-500 font-semibold ${item.isActive === 1 ? 'rotate-[180deg]' : ''}`}> 
                <i className="fa-solid fa-chevron-down"></i>
            </div>
        </div>
        <div className={`overflow-hidden duration-500 ${item.isActive === 1 ? 'max-h-100px' : 'max-h-0'}`}>
        {/* <div className="overflow-hidden max-h-0 group-[.is-active:max-h-100px]"> */}
            {children}
        </div>
    </div>
  );
};

export default MyAccordion;
