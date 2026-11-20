import { useState, useEffect, createContext } from 'react';
import type { IconType } from 'react-icons';
import { TbArticle } from "react-icons/tb";
import { TbMail } from "react-icons/tb";
import { LuUserCog } from "react-icons/lu";



//--------------------------------------------------------------------------------
// Screen size hook
//--------------------------------------------------------------------------------
export type tyScreenSize = {
  width: number,
  height: number
};

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<tyScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };
    // Add 'resize' event listener
    window.addEventListener('resize', handleResize);
    // Remove the event listener when the component unmounts
    return () => {window.removeEventListener('resize', handleResize)};
  }, []);

  return screenSize
};


//--------------------------------------------------------------------------------
// Context - for MainNav control
//--------------------------------------------------------------------------------

export type tyMainNavControlDict = {
  darkModeTF: boolean,
  menuMainYTF: boolean,
  menuUserTF: boolean
};

export const constMainNavControlDict: tyMainNavControlDict = {
  darkModeTF: false,
  menuMainYTF: false,
  menuUserTF: false
};

export type tyContextMainNavControlValue = {
  stMainNavControl: tyMainNavControlDict,
  setStMainNavControl: (value: tyMainNavControlDict) => void
};
const contextMainNavControlValue: tyContextMainNavControlValue = {
  stMainNavControl: constMainNavControlDict,
  setStMainNavControl: (value: tyMainNavControlDict) => {}
};
export const ContextMainNavControl = createContext(contextMainNavControlValue);


//--------------------------------------------------------------------------------
// Type & constant
//--------------------------------------------------------------------------------

export type tyMenuMainDict = {
  id: number,
  component: string,
  caption: string,
  linkto: string
};

export const constMenuMainArr: tyMenuMainDict[] = [
  {
    id: 1,
    component: "AboutUs",
    caption: "About Us",
    linkto: "/#aboutus"
  },
  {
    id: 2,
    component: "WhatWeOffer",
    caption: "Services",
    linkto: "/#whatweoffer"
  },
  {
    id: 3,
    component: "WhatDoYouNeed",
    caption: "Service Packages",
    linkto: "/#whatdoyouneed"
  },
  {
    id: 4,
    component: "HowWeDoIt",
    caption: "FAQs",
    linkto: "/#howwedoit"
  },
  {
    id: 5,
    component: "Flexibility",
    caption: "Prices",
    linkto: "/#flexibility"
  },
];

export const constMenuLinkArr: tyMenuMainDict[] = [
  {
    id: 1,
    component: "Home",
    caption: "Home",
    linkto: "/"
  },
  {
    id: 2,
    component: "Terms",
    caption: "Terms & Conditions",
    linkto: "#"  // "/terms"
  },
  {
    id: 3,
    component: "Privacy",
    caption: "Privacy Policy",
    linkto: "#"  // "/privacy"
  },
  {
    id: 4,
    component: "HelpSupport",
    caption: "Help & Support",
    linkto: "#"  // "/helpsupport"
  },
  {
    id: 5,
    component: "ContactUs",
    caption: "Contact Us",
    linkto: "#"  // "/contactus"
  }
];

export type tyMenuItemIconDict = {
  id: number,
  component: string,
  caption: string,
  linkto: string,
  icon: IconType
};

export const constMenuUserOtherArr: tyMenuItemIconDict[] = [
  {
    id: 1,
    component: "Terms",
    caption: "Terms & Conditions",
    linkto: "#",  // "/terms",
    icon: TbArticle
  },
  {
    id: 2,
    component: "ContactUs",
    caption: "Contact Us",
    linkto: "#",  // "/contactus",
    icon: TbMail
  }
];

export type tyMenuItemIconGroupDict = {
  id: number,
  component: string,
  caption: string,
  linkto: string,
  icon: IconType,
  group: string[]
};

export const constMenuUserFilteredArr: tyMenuItemIconGroupDict[] = [
  {
    id: 1,
    component: "Account",
    caption: "Account Settings",
    linkto: "/account",
    icon: LuUserCog,
    group: ["customer"]
  }
];
