import { FiUser } from "react-icons/fi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { TbMailStar } from "react-icons/tb";
import { BsBuildingCheck } from "react-icons/bs";
import { MdSettingsOverscan } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { TbPackages } from "react-icons/tb";
import { LiaMailBulkSolid } from "react-icons/lia";
import { TbMail } from "react-icons/tb";
import { PiBuildingOffice } from "react-icons/pi";
import type { IconType } from "react-icons";


//--------------------------------------------------------------------------------
// Type & constant
//--------------------------------------------------------------------------------

type tyAboutUsDict = {
  subject: string,
  title: string,
  note: string
};

export const constAboutUsDict: tyAboutUsDict = {
  subject: "About Us",
  title: "Virtual Office Services for You and your Business",
  note: "We are the address and virtual office service provider happy to become an extension of what you and your business needs. For our local and international customers, from start-up enterprises to growing businesses we help you and your company with a stable address presence, mail and parcel forwarding."
};

type tySubjectTitleDict = {
  subject: string,
  title: string
};

export const constWhatWeOfferDict: tySubjectTitleDict = {
  subject: "What we offer",
  title: "Our Services"
};

export type tyServiceDict = {
  id: number,
  name: string,
  note: string,
  icon: IconType
};

export const constServiceArr: tyServiceDict[] = [
  {
    id: 1,
    name: "Registered Office Address",
    note: "You can use our address as Registered Office Address with Companies House.",
    icon: PiBuildingOffice
  },
  {
    id: 2,
    name: "Director's Service Address",
    note: "One company officer can use our address as Service Address with Companies House. Regardless of the number of positions held in the business, this person can be the Director, Shareholder, Member, Person of Significant Control (PSC), Secretary etc. Although only the first person is included in the package, additional officers can be included at an additional cost per person, per year (see one-off and other prices).",
    icon: FaRegAddressCard
  },
  {
    id: 3,
    name: "Statutory Mail Scanning & Forwarding By Email",
    note: "We open, scan and email you any mail sent from Companies House or HM Revenue & Customs addressed to your company. This is done the same working day it arrives, free of charge. All scans are done in color at 300 dpi resolution, then saved as PDF file with fully searchable text. Original documents are held and available on request for 30 calendar days before being securely destroyed. Please note mail from any other sender is not included with this service.",
    icon: MdSettingsOverscan
  },
  {
    id: 4,
    name: "Statutory Mail Forwarding By Post",
    note: "We forward you any mail sent from Companies House or HM Revenue & Customs addressed to your company. This is done the same working day it arrives, free of charge, via 2nd Class Royal Mail (to your personal UK mailing address) or International Air Mail (to your personal mailing address abroad). Please note mail from any other sender is not included with this service.",
    icon: TbMailStar
  },
  {
    id: 5,
    name: "Business (Trading) Address",
    note: "You can use our address as Business Address (a.k.a. Trading Address).",
    icon: PiBuildingOffice
  },
  {
    id: 6,
    name: "Director's Correspondence Address",
    note: "One company officer can use our address as Correspondence Address with business partners, customers, suppliers, banks etc. Regardless of the number of positions held in the business, this person can be the Director, Shareholder, Member, Person of Significant Control (PSC), Secretary etc. Although only the first person is included in the package, additional officers can be included at an additional cost per person, per year (see one-off and other prices).",
    icon: FaRegAddressCard
  },
  {
    id: 7,
    name: "Correspondence Address",
    note: "You can use our address as Correspondence Address with friends, suppliers, banks etc. You may be a digital nomad, contractor or on vacation away from home, temporarily abroad, or just need a temporary mailing address.",
    icon: FaRegAddressCard
  },
  {
    id: 8,
    name: "Mail Scanning & Forwarding By Email",
    note: "We open, scan and email you any mail sent from business partners, customers, suppliers, banks etc. addressed to you and your company. This is done the same working day it arrives, free of charge. All scans are done in color at 300 dpi resolution, then saved as PDF file with fully searchable text. Original documents are held and available on request for 30 calendar days before being securely destroyed. Please note statutory mail from Companies House or HM Revenue & Customs is not included with this service.",
    icon: MdSettingsOverscan
  },
  {
    id: 9,
    name: "Mail Forwarding By Post",
    note: "We forward you any mail sent from business partners, customers, suppliers, banks etc. addressed to you and your company. This is done the same working day it arrives, via 2nd Class Royal Mail (to your personal UK mailing address) or International Air Mail (to your personal mailing address abroad). We only pass on the cost of postage billed to us, without any additional costs and fees. Please note statutory mail from Companies House or HM Revenue & Customs is not included with this service.",
    icon: TbMail
  },
  {
    id: 10,
    name: "Mail Holding",
    note: "Mail can be held free of charge before forwarding for up to one month, after which forwarding or collection will be required. This service enables services such as Sender Information, You Can Collect.",
    icon: LiaMailBulkSolid
  },
  {
    id: 11,
    name: "Parcel Forwarding",
    note: "We forward you any parcel sent from business partners, customers, suppliers, banks etc. addressed to you and your company. This is done the same working day it arrives, via Royal Mail or your chosen (or arranged) courier, to your personal address in UK or abroad. We only pass on the cost of any postage or shipping billed to us, without any additional costs and fees. Please note that we cannot handle pallets, items heavier than 20kg, and items larger than 75cm x 75cm x 75cm (except for flat-pack items, like furniture, not longer than 2 meters, and not heavier than 20kg).",
    icon: TfiPackage
  },
  {
    id: 12,
    name: "Parcel Holding",
    note: "Parcel can be held free of charge before forwarding for up to one month, after which forwarding or collection will be required. This service enables services such as Sender Information, You Can Collect.",
    icon: TbPackages
  },
  {
    id: 13,
    name: "Address Verification",
    note: "We will support you in using our address with your Amazon, Google  and other business listings that require address verification. Please note this service is available for 12 months subscriptions only.",
    icon: BsBuildingCheck
  }
];

export const constWhatDoYouNeedDict: tySubjectTitleDict = {
  subject: "What do you need?",
  title: "Our Service Packages"
};

export type tyCustomerTypeDict = {
  id: number,
  name: string
  note: string,
  icon: IconType
};

export const constCustomerTypeArr: tyCustomerTypeDict[] = [
  {
    id: 1,
    name: "Business",
    note: "For incorporated and unincorporated businesses.",
    icon: MdOutlineBusinessCenter
  },
  {
    id: 2,
    name: "Personal",
    note: "For personal use, no business activity.",
    icon: FiUser
  }
];

export type tyServiceYNDict = {
  id: number,
  value: boolean
};

export type tyPriceDict = {
  name: string,
  duration: number,
  netprice: number,
  discount: number
};

export type tyPackageYMDict = {
  id: number,
  customertype: string,
  name: string,
  service: tyServiceYNDict[],
  m1: tyPriceDict,
  m12: tyPriceDict,
  vat: number
};

export const constPackageYMArr: tyPackageYMDict[] = [
  { 
    id: 1,
    customertype: "Business",
    name: "eAddress",
    service: [
      {id: 1, value: true},
      {id: 2, value: true},
      {id: 3, value: true},
      {id: 4, value: false},
      {id: 5, value: false},
      {id: 6, value: false},
      {id: 7, value: false},
      {id: 8, value: false},
      {id: 9, value: false},
      {id: 10, value: false},
      {id: 11, value: false},
      {id: 12, value: false},
      {id: 13, value: false}
    ],
    m1: {
      name: "eAddress (monthly)",
      duration: 1,
      netprice: 0,
      discount: 0
    },
    m12: {
      name: "eAddress (yearly)",
      duration: 12,
      netprice: 22,
      discount: 0
    },
    vat: 0.2
  },
  { 
    id: 2,
    customertype: "Business",
    name: "Address",
    service: [
      {id: 1, value: true},
      {id: 2, value: true},
      {id: 3, value: false},
      {id: 4, value: true},
      {id: 5, value: false},
      {id: 6, value: false},
      {id: 7, value: false},
      {id: 8, value: false},
      {id: 9, value: false},
      {id: 10, value: false},
      {id: 11, value: false},
      {id: 12, value: false},
      {id: 13, value: false}
    ],
    m1: {
      name: "Address (monthly)",
      duration: 1,
      netprice: 0,
      discount: 0
    },
    m12: {
      name: "Address (yearly)",
      duration: 12,
      netprice: 32,
      discount: 0
    },
    vat: 0.2
  },
  { 
    id: 3,
    customertype: "Business",
    name: "eOffice",
    service: [
      {id: 1, value: false},
      {id: 2, value: false},
      {id: 3, value: false},
      {id: 4, value: false},
      {id: 5, value: true},
      {id: 6, value: true},
      {id: 7, value: false},
      {id: 8, value: true},
      {id: 9, value: false},
      {id: 10, value: false},
      {id: 11, value: false},
      {id: 12, value: false},
      {id: 13, value: true}
    ],
    m1: {
      name: "eOffice (monthly)",
      duration: 1,
      netprice: 10,
      discount: 0
    },
    m12: {
      name: "eOffice (yearly)",
      duration: 12,
      netprice: 120,
      discount: 0.15
    },
    vat: 0.2
  },
  { 
    id: 4,
    customertype: "Business",
    name: "Office",
    service: [
      {id: 1, value: false},
      {id: 2, value: false},
      {id: 3, value: false},
      {id: 4, value: false},
      {id: 5, value: true},
      {id: 6, value: true},
      {id: 7, value: false},
      {id: 8, value: false},
      {id: 9, value: true},
      {id: 10, value: true},
      {id: 11, value: true},
      {id: 12, value: true},
      {id: 13, value: true}
    ],
    m1: {
      name: "Office (monthly)",
      duration: 1,
      netprice: 16,
      discount: 0
    },
    m12: {
      name: "Office (yearly)",
      duration: 12,
      netprice: 192,
      discount: 0.15
    },
    vat: 0.2
  },
  { 
    id: 5,
    customertype: "Personal",
    name: "eMailBox",
    service: [
      {id: 1, value: false},
      {id: 2, value: false},
      {id: 3, value: false},
      {id: 4, value: false},
      {id: 5, value: false},
      {id: 6, value: false},
      {id: 7, value: true},
      {id: 8, value: true},
      {id: 9, value: false},
      {id: 10, value: false},
      {id: 11, value: false},
      {id: 12, value: false},
      {id: 13, value: false}
    ],
    m1: {
      name: "eMailBox (monthly)",
      duration: 1,
      netprice: 7,
      discount: 0
    },
    m12: {
      name: "eMailBox (yearly)",
      duration: 12,
      netprice: 84,
      discount: 0.15
    },
    vat: 0.2
  },
  { 
    id: 6,
    customertype: "Personal",
    name: "MailBox",
    service: [
      {id: 1, value: false},
      {id: 2, value: false},
      {id: 3, value: false},
      {id: 4, value: false},
      {id: 5, value: false},
      {id: 6, value: false},
      {id: 7, value: true},
      {id: 8, value: false},
      {id: 9, value: true},
      {id: 10, value: true},
      {id: 11, value: true},
      {id: 12, value: true},
      {id: 13, value: false}
    ],
    m1: {
      name: "MailBox (monthly)",
      duration: 1,
      netprice: 13,
      discount: 0
    },
    m12: {
      name: "MailBox (yearly)",
      duration: 12,
      netprice: 156,
      discount: 0.15
    },
    vat: 0.2
  }
];

export const constHowWeDoItDict: tySubjectTitleDict = {
  subject: "How we do it?",
  title: "Frequently Asked Questions"
};

export type tyCategoryDict = {
  id: number,
  name: string
};

export const constCategoryArr: tyCategoryDict[] = [
  {
    id: 1,
    name: "Notion",
  },
  {
    id: 2,
    name: "Service package",
  },
  {
    id: 3,
    name: "Account",
  },
  {
    id: 4,
    name: "Payment",
  },
  {
    id: 5,
    name: "Correspondence",
  }
];

export type tyFaqDict = {
  id: number,
  category: number,
  question: string,
  answer: string
};

export const constFaqArr: tyFaqDict[] = [
  {
    id: 1,
    category: 1,
    question: "What is a registered office address?",
    answer: "A registered office address is the official physical address of a registered company. It is publicly listed on the registrar (e.g., Companies House) and serves as the official location for receiving statutory mail, legal documents, and official government correspondence."
  },
  {
    id: 2,
    category: 1,
    question: "What is a service address?",
    answer: "A service address is the official correspondence address for company officers (such as directors or Persons with Significant Control) used to receive statutory mail and legal notices from government bodies like Companies House. It ensures personal privacy by keeping your residential address off the public record."
  },
  {
    id: 3,
    category: 1,
    question: "What is a business address (a.k.a. trading address)?",
    answer: "A business address (also known as a trading or correspondence address) is the primary physical location where a company operates day-to-day, manages its real activity, and receives general client or supplier mail. It is the address advertised on websites, business cards, invoices, and marketing materials."
  },
  {
    id: 4,
    category: 1,
    question: "What is a postage deposit?",
    answer: "When we forward your first mail/parcel that requires postage we normally take a £10 postage deposit. This amount may be higher, but just enough to cover the postage cost of the first mail(s)/parcel(s). We then deduct postage costs from this amount, and when it runs out, we take another £10 when we need to forward something."
  },
  {
    id: 5,
    category: 2,
    question: "Which service package should I choose?",
    answer: "If you don't have an interest in a company (digital nomad, contractor inside IR35, on vacation away from home, temporarily abroad, or just need a temporary mailing address etc.), the eMaiBox or MailBox service package may be useful for you. If you have an interest in a company (director, shareholder, member, person of significant control (PSC), secretary etc.), one of the eAddress or Address, and one of the eOffice or Office service packages may be useful for you."
  },
  {
    id: 6,
    category: 2,
    question: "What is the address I can use for my service?",
    answer: "house no Street name, City, County, Post code, UK"
  },
  {
    id: 7,
    category: 2,
    question: "What are your opening hours?",
    answer: "Our office is open Monday to Friday from 09:00h to 18:00h, and on Saturday from 09:30h to 13:30h, excluding bank holidays."
  },
  {
    id: 8,
    category: 2,
    question: "Am I tied into a contract? Can I cancel my service anytime? Can I get a prorated refund?",
    answer: "You are not tied into a contract. There is no obligation to renew your service with us. If you purchase a monthly service you can cancel at any time before the month renews. Same with our yearly services. Please note that for annual services, the months used or started will be revalued at the monthly service price and the difference will be refunded. There is no prorated refund for annual services, without a monthly service alternative."
  },
  {
    id: 9,
    category: 2,
    question: "How do I cancel my service?",
    answer: "Just log in to your account and click Cancel for services you don't need any more. Alternatively contact us via our website or email to let us know. It is completely normal if you no longer need our service, either permanently or temporarily. We are always here happy to help now and in the future."
  },
  {
    id: 10,
    category: 2,
    question: "What is the renewal price of my service package?",
    answer: "We provide clear, stable and predictable pricing, and as such the renewal will cost you just the same as the previous year. We can't promise that the price will never change, but we can promise that it will always be competitive when it does, and we will let you know weeks, if not months, in advance."
  },
  {
    id: 11,
    category: 2,
    question: "What if someone visits the office address?",
    answer: "We will contact you via email, letting you know someone has visited and if they leave a message."
  },
  {
    id: 12,
    category: 3,
    question: "How long does it take to set-up an account with you?",
    answer: "All our services are available to use straight away when payment is completed. After you have signed up via our website, you will receive a welcome email with everything you need to know, so you can get started right away. For example you can start using your new Registered Office Address with you company at Companies House. Please be aware we will require you to provide your ID documents before we can forward anything."
  },
  {
    id: 13,
    category: 3,
    question: "Do I need to provide ID documents?",
    answer: "Yes. We are required to obtain this by law. It is easy and simple to submit what is required, securely via our encrypted upload service. "
  },
  {
    id: 14,
    category: 3,
    question: "Can you give me my last used personal mailing address?",
    answer: "Your personal mailing address, where we forward your and your company's mails and parcels, is not considered to be your residential address. Despite this, sharing it with third parties is not part of our service. We are not able to fulfil such a request, even for you or your authorized representative. However, you can access and even modify it on your account with us."
  },
  {
    id: 15,
    category: 4,
    question: "What payment methods do you take?",
    answer: "We accept payment via debit and credit cards. We do not accept cash payments."
  },
  {
    id: 16,
    category: 4,
    question: "What will I be charged for postage?",
    answer: "To send anything from a letter up to 2kg we use 2nd Class Royal Mail (to your personal UK mailing address) or International Air Mail (to your personal mailing address abroad). Anything larger than 2kg is sent via the courier that offers the best price in the given parcel category, or your chosen (or arranged) courier. For mails and parcels covered by your service package we only pass on the cost of postage billed to us, without any additional costs and fees. For mails and parcels not covered by your service package on top of the cost of postage billed to us we are charging an extra one-off fee."
  },
  {
    id: 17,
    category: 5,
    question: "How many mails and parcels are included in the package?",
    answer: "We do not limit the number of items you can receive, or charge any fees for forwarding these items. We only pass on the cost of postage billed to us, without any additional costs and fees."
  },
  {
    id: 18,
    category: 5,
    question: "When can I expect my correspondence?",
    answer: "All mails and parcels are sorted and forwarded the same working day, subject to collection cut off times."
  },
  {
    id: 19,
    category: 5,
    question: "Can you provide me information about the sender?",
    answer: "Yes. Upon your express request, we will provide information about the sender, their name and address (indicated on the shipment), type and size of the mail/parcel. Please note that this service is only available if you have selected a package with mail/parcel holding service."
  },
  {
    id: 20,
    category: 5,
    question: "Can I collect my correspondence?",
    answer: "Yes. Contacting us, you may choose to collect some of your mails/parcels. Please be aware we will require you to provide your photo ID before we hand over anything. Please note that this service is only available if you have selected a package with mail/parcel holding service."
  },
  {
    id: 21,
    category: 5,
    question: "Can I have a large item delivered or forwarded?",
    answer: "No! Please note that we cannot handle pallets, items heavier than 20kg, and items larger than 75cm x 75cm x 75cm (except for flat-pack items, like furniture, not longer than 2 meters, and not heavier than 20kg)."
  },
  {
    id: 22,
    category: 5,
    question: "What happens to my scanned paper letters?",
    answer: "Original documents are held and available on request for 30 calendar days before being securely destroyed."
  },
  {
    id: 23,
    category: 5,
    question: "What if anything not covered by my service arrives?",
    answer: "We will contact you via email on the day anything not covered by your service arrives. You can pay a one-off fee to have the item forwarded to you. You can upgrade your service and have any mail or packages delivered to our office and forwarded. Or you can tell us that it's not wanted, we will then return it to the sender."
  }
];

export const constFlexibilityDict: tySubjectTitleDict = {
  subject: "Flexibility in service",
  title: "One-off and Other Prices"
};

export type tyFlexibilityPriceDict = {
  id: number,
  uploadid: string,
  name: string,
  note: string,
  netprice: number,
  vat: number
};

export const constFlexibilityPriceArr: tyFlexibilityPriceDict[] = [
  {
    id: 1,
    uploadid: "addofficerserviceaddress",
    name: "Additional officer's Service Address fee",
    note: "One company officer can use our address as Service Address with Companies House. Regardless of the number of positions held in the business, this person can be the Director, Shareholder, Member, Person of Significant Control (PSC), Secretary etc. Although only the first person is included in the package, additional officers can be included at an additional cost per person, per year.",
    netprice: 5,
    vat: 0.2
  },
  {
    id: 2,
    uploadid: "addofficercorrespaddress",
    name: "Additional officer's Correspondence Address fee",
    note: "One company officer can use our address as Correspondence Address with business partners, customers, suppliers, banks etc. Regardless of the number of positions held in the business, this person can be the Director, Shareholder, Member, Person of Significant Control (PSC), Secretary etc. Although only the first person is included in the package, additional officers can be included at an additional cost per person, per year.",
    netprice: 5,
    vat: 0.2
  },
  {
    id: 3,
    uploadid: "mailbyemail ",
    name: "Mail scanning & forwarding by email admin fee",
    note: "This fee applies to all mails not included in your service package. The fee is per mail.",
    netprice: 8,
    vat: 0.2
  },
  {
    id: 4,
    uploadid: "mailbypost",
    name: "Mail forwarding by post admin fee",
    note: "This fee applies to all mails not included in your service package. The fee is per mail. We pass on the cost of postage too.",
    netprice: 8,
    vat: 0.2
  },
  {
    id: 5,
    uploadid: "parcelforward",
    name: "Parcel forwarding admin fee",
    note: "This fee applies to all parcels not included in your service package. The fee is per parcel. We pass on the cost of postage too.",
    netprice: 8,
    vat: 0.2
  },
  {
    id: 6,
    uploadid: "mailholding",
    name: "Mail holding fee",
    note: "This fee applies to all mails held after the holding time allowance included in your service package, and to all mails held not included in your service package starting with the second night. The fee is per mail, per every started 7 nights interval.",
    netprice: 1,
    vat: 0.2
  },
  {
    id: 7,
    uploadid: "parcelholding",
    name: "Parcel holding fee",
    note: "This fee applies to all parcels held after the holding time allowance included in your service package, and to all parcels held not included in your service package starting with the second night. The fee is per parcel, per every started 7 nights interval.",
    netprice: 1,
    vat: 0.2
  },
  {
    id: 8,
    uploadid: "outofofficehours",
    name: "Pre-arranged out of office hours delivery/collection fee",
    note: "This fee applies to all pre-arranged out of office hours deliveries and collections.",
    netprice: 30,
    vat: 0.2
  },
  {
    id: 9,
    uploadid: "unpleasantvisit",
    name: "Unpleasant visit admin fee",
    note: "This fee applies to dealing with an unpleasant visit related to your business practice, such as an enforcement officer for bad debts etc.",
    netprice: 30,
    vat: 0.2
  }
];

