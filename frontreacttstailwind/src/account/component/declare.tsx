import { constUserDataDict, type tyUserDataDict } from "@/auth/component/declare";
import { constPackageYMArr } from "@/home/component/declare";
import { createContext } from "react";


//--------------------------------------------------------------------------------
// Context - for account
//--------------------------------------------------------------------------------

export type tyCustomerDict = {
  custuser?: string | null,
  customertype?: string | null,
  phone?: string | null,
  vatnumber?: string | null,
  note?: string | null,
  name?: string | null,
  line1?: string | null,
  line2?: string | null,
  city?: string | null,
  county?: string | null,
  country?: string | null,
  postcode?: string | null 
};

export const constCustomerDict: tyCustomerDict = {
  custuser: "",
  customertype: "",
  phone: "",
  vatnumber: "",
  note: "",
  name: "",
  line1: "",
  line2: "",
  city: "",
  county: "",
  country: "",
  postcode: ""
};

export type tyPackageDict = {
  id?: number | null,
  custuser?: string | null,
  puid?: number | null,
  name?: string | null,
  duration?: number | null,
  fromdate?: string | null,
  todate?: string | null,
  netprice?: number | null,
  discount?: number | null,
  vat?: number | null,
  note?: string | null,
  status?: string | null,
  canceldate?: string | null,
  cancelfromdate?: string | null
};

export const constPackageDict: tyPackageDict = {
  id: null,
  custuser: "",
  puid: null,
  name: "",
  duration: null,
  fromdate: null,
  todate: null,
  netprice: null,
  discount: null,
  vat: null,
  note: "",
  status: "",
  canceldate: null,
  cancelfromdate: null
};

export type tyBusinessDict = {
  custuser?: string | null,
  name?: string | null,
  note?: string | null,
  email?: string | null,
  line1?: string | null,
  line2?: string | null,
  city?: string | null,
  county?: string | null,
  country?: string | null,
  postcode?: string | null 
};

export const constBusinessDict: tyBusinessDict = {
  custuser: "",
  name: "",
  note: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  county: "",
  country: "",
  postcode: ""
};

export type tyPersonDict = {
  id?: number | null,
  custuser?: string | null,
  name?: string | null,
  note?: string | null,
  email?: string | null,
  line1?: string | null,
  line2?: string | null,
  city?: string | null,
  county?: string | null,
  country?: string | null,
  postcode?: string | null,
  file?: string | null,
  type?: string | null,
  size?: number | null,
  filename?: string | null,
  ext?: string | null,
  is_approved?: boolean | undefined
};

export const constPersonDict: tyPersonDict = {
  id: null,
  custuser: "",
  name: "",
  note: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  county: "",
  country: "",
  postcode: "",
  file: "",
  type: "",
  size: null,
  filename: "",
  ext: "",
  is_approved: false
};

export type tyAccountDict = {
  customer?: tyCustomerDict,
  package?: tyPackageDict[],
  business?: tyBusinessDict,
  person?: tyPersonDict[]
};

export const constAccountDict: tyAccountDict = {
  customer: constCustomerDict,
  package: [constPackageDict],
  business: constBusinessDict,
  person: [constPersonDict]
};

export type tyContextAccountValue = {
  stAccount: tyAccountDict,
  setStAccount: (value: tyAccountDict) => void,
  stAccountEdit: tyAccountDict,
  setStAccountEdit: (value: tyAccountDict) => void
};
const contextAccountValue: tyContextAccountValue = {
  stAccount: constAccountDict,
  setStAccount: (value: tyAccountDict) => {},
  stAccountEdit: constAccountDict,
  setStAccountEdit: (value: tyAccountDict) => {}
};
export const ContextAccount = createContext(contextAccountValue);


//--------------------------------------------------------------------------------
// Context - for account control
//--------------------------------------------------------------------------------

export type tyCustomerControlDict = {
  goto: string,
  userDataEditDict: tyUserDataDict,
  customerEditDict: tyCustomerDict,
  customertypeValidTF: boolean,
  nameValidTF: boolean,
  nameInvValidTF: boolean,
  line1ValidTF: boolean,
  cityValidTF: boolean,
  countryValidTF: boolean,
  postcodeValidTF: boolean
};

export const constCustomerControlDict: tyCustomerControlDict = {
  goto: "",    // values: ""/display/edit
  userDataEditDict: constUserDataDict,
  customerEditDict: constCustomerDict,
  customertypeValidTF: true,
  nameValidTF: true,
  nameInvValidTF: true,
  line1ValidTF: true,
  cityValidTF: true,
  countryValidTF: true,
  postcodeValidTF: true
};

export type tyPackageControlDict = {
  goto: string,
  packageEditDict: tyPackageDict,
  packageValidTF: boolean
};

export const constPackageControlDict: tyPackageControlDict = {
  goto: "",    // values: ""/display/edit
  packageEditDict: constPackageDict,
  packageValidTF: true
};

export type tyBusinessControlDict = {
  goto: string,
  businessEditDict: tyBusinessDict,
  nameValidTF: boolean,
  emailValidTF: boolean,
  line1ValidTF: boolean,
  cityValidTF: boolean,
  countryValidTF: boolean,
  postcodeValidTF: boolean 
};

export const constBusinessControlDict: tyBusinessControlDict = {
  goto: "",    // values: ""/display/edit
  businessEditDict: constBusinessDict,
  nameValidTF: true,
  emailValidTF: true,
  line1ValidTF: true,
  cityValidTF: true,
  countryValidTF: true,
  postcodeValidTF: true 
};

export type tyPersonControlDict = {
  goto: string,
  personEditDict: tyPersonDict,
  nameValidTF: boolean,
  emailValidTF: boolean,
  line1ValidTF: boolean,
  cityValidTF: boolean,
  countryValidTF: boolean,
  postcodeValidTF: boolean 
};

export const constPersonControlDict: tyPersonControlDict = {
  goto: "",    // values: ""/display/edit
  personEditDict: constPersonDict,
  nameValidTF: true,
  emailValidTF: true,
  line1ValidTF: true,
  cityValidTF: true,
  countryValidTF: true,
  postcodeValidTF: true 
};

export type tyAccountControlDict = {
  customer: tyCustomerControlDict,
  package: tyPackageControlDict,
  business: tyBusinessControlDict,
  person: tyPersonControlDict,
  errMsg: string
};

export const constAccountControlDict: tyAccountControlDict = {
  customer: constCustomerControlDict,
  package: constPackageControlDict,
  business: constBusinessControlDict,
  person: constPersonControlDict,
  errMsg: ""
};

export type tyContextAccountControlValue = {
  stAccountControl: tyAccountControlDict,
  setStAccountControl: (value: tyAccountControlDict) => void,
  validAccount: () => boolean
};
const contextAccountControlValue: tyContextAccountControlValue = {
  stAccountControl: constAccountControlDict,
  setStAccountControl: (value: tyAccountControlDict) => {},
  validAccount: () => true
};
export const ContextAccountControl = createContext(contextAccountControlValue);


//--------------------------------------------------------------------------------
// Context - for person ID control
//--------------------------------------------------------------------------------

export type tyPersonIDEditDict = {
  id: number | null,
  file?: File | null,
  type: string | null,
  size: number | null,
  filename: string | null,
  ext: string | null
};

export const constPersonIDEditDict = {
  id: null,
  file: null,
  type: "",
  size: null,
  filename: "",
  ext: ""
};

export type tyPersonIDControlDict = {
  goto: string,
  personIDEditDict: tyPersonIDEditDict,
  typeValidTF: boolean,
  sizeValidTF: boolean,
  saveActiveTF: boolean
  errMsg: string | null
};

export const constPersonIDControlDict: tyPersonIDControlDict = {
  goto: "display",    // values: display/edit
  personIDEditDict: constPersonIDEditDict,
  typeValidTF: true,
  sizeValidTF: true,
  saveActiveTF: false,
  errMsg: ""
};

export type tyContextPersonIDControlValue = {
  stPersonIDControl: tyPersonIDControlDict,
  setStPersonIDControl: (value: tyPersonIDControlDict) => void
};
const contextPersonIDControlValue: tyContextPersonIDControlValue = {
  stPersonIDControl: constPersonIDControlDict,
  setStPersonIDControl: (value: tyPersonIDControlDict) => {}
};
export const ContextPersonIDControl = createContext(contextPersonIDControlValue);


//--------------------------------------------------------------------------------
// Context - for package date control
//--------------------------------------------------------------------------------

export type tyPackageDateControlDict = {
  goto: string,
  packageDateDict: tyPackageDict,
  packageValidTF: boolean
};

export const constPackageDateControlDict: tyPackageDateControlDict = {
  goto: "",    // values: ""/display/edit
  packageDateDict: constPackageDict,
  packageValidTF: true
};

export type tyContextPackageDateControlValue = {
  stPackageDateControl: tyPackageDateControlDict,
  setStPackageDateControl: (value: tyPackageDateControlDict) => void
};
const contextPackageDateControlValue: tyContextPackageDateControlValue = {
  stPackageDateControl: constPackageDateControlDict,
  setStPackageDateControl: (value: tyPackageDateControlDict) => {}
};
export const ContextPackageDateControl = createContext(contextPackageDateControlValue);


//--------------------------------------------------------------------------------
// Context - for package cancel control
//--------------------------------------------------------------------------------

export type tyContextPackageCancelControlValue = {
  stPackageCancelControl: tyPackageDict,
  setStPackageCancelControl: (value: tyPackageDict) => void
};
const contextPackageCancelControlValue: tyContextPackageCancelControlValue = {
  stPackageCancelControl: constPackageDict,
  setStPackageCancelControl: (value: tyPackageDict) => {}
};
export const ContextPackageCancelControl = createContext(contextPackageCancelControlValue);


//--------------------------------------------------------------------------------
// File validation
//--------------------------------------------------------------------------------

export const constValidFileDict = {
  accept: "image/*",
  maxKB: 50,
};


//--------------------------------------------------------------------------------
// Function packageExists
//--------------------------------------------------------------------------------

export type tyPropsPackageExists = {
  packageArr: tyPackageDict[],
  packageDict: tyPackageDict
};

export function packageExists(props: tyPropsPackageExists): boolean {
  let result: boolean = false;
  if (props.packageArr.length === 0) {
    result = false;
  } else {
    result = props.packageArr.some((item) =>
      ["New", "Approved", "Active"].includes(item.status ?? "") &&
      item.id !== (props.packageDict.id ?? 0) &&
      item.puid === (props.packageDict.puid ?? 0)
    );
  };
  return result;
};


//--------------------------------------------------------------------------------
// Function sameAddressPerson
//--------------------------------------------------------------------------------

export type tyPropsSameAddressPerson = {
  personArr: tyPersonDict[]
};

export function sameAddressPerson(props: tyPropsSameAddressPerson): boolean {
  let result: boolean = true;
  if (props.personArr.length === 0) {
    result = true;
  } else {
    let line1: string = props.personArr[0].line1 ?? "####";
    let line2: string = props.personArr[0].line2 ?? "####";
    let city: string = props.personArr[0].city ?? "####";
    let county: string = props.personArr[0].county ?? "####";
    let country: string = props.personArr[0].country ?? "####";
    let postcode: string = props.personArr[0].postcode ?? "####";
    props.personArr.map((item) => {
      if (item.line1 != line1 ||
          item.line2 != line2 ||
          item.city != city ||
          item.county != county ||
          item.country != country ||
          item.postcode != postcode)
        {result = false;};
    });
  };
  return result;
};


//--------------------------------------------------------------------------------
// Function validPackage
//--------------------------------------------------------------------------------

export type tyPropsValidPackage = {
  accountDict: tyAccountDict
};

export function validPackage(props: tyPropsValidPackage): boolean {
  return !(props.accountDict.package?.map((item) => constPackageYMArr.find((item2) => item2.id === item.puid)?.customertype) ?? []).some((item) => item !== props.accountDict.customer?.customertype);
};

