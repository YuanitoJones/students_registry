"use client";

import { Spinner } from "@chakra-ui/react";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { IAddress, IEmail, IPhone, IStudent } from "../types/globalTypes";
import { useParams } from "next/navigation";
import studentRegistryClient from "../api/studentRegistryClient";

interface StudentState extends IStudent {
   editDialog: boolean;
   registerdialog: boolean;
}

interface UserAction {
   type: string;
   payload: any;
}

interface IStudentContext extends StudentState {
   SET_EDIT_DIALOG: (open: boolean) => void;
   SET_REGISTER_DIALOG: (open: boolean) => void;
   SET_STUDENT: (studentInfo: IStudent) => void;
   ADD_EMAIL: (email: IEmail) => void;
   UPDATE_EMAIL: (emails: IEmail[], oldEmail: string, email: IEmail) => void;
   DELETE_EMAIL: (emails: IEmail[], email: string) => void;
   ADD_PHONE: (phone: IPhone) => void;
   UPDATE_PHONE: (phones: IPhone[], phone_id: number, phone: IPhone) => void;
   DELETE_PHONE: (phones: IPhone[], phone_id: number) => void;
   ADD_ADDRESS: (address: IAddress) => void;
   UPDATE_ADDRESS: (addresses: IAddress[], address_id: number, address: IAddress) => void;
   DELETE_ADDRESS: (addresses: IAddress[], address_id: number) => void;
}

const initialState: StudentState = {
   student_id: 0,
   first_name: "",
   middle_name: "",
   last_name: "",
   gender: "",
   emails: [],
   phones: [],
   addresses: [],
   editDialog: false,
   registerdialog: false,
};

function reducer(state: StudentState, action: UserAction): StudentState {
   switch (action.type) {
      case "SET_EDIT_DIALOG":
         return {
            ...state,
            editDialog: action.payload,
         };
      case "SET_REGISTER_DIALOG":
         return {
            ...state,
            registerdialog: action.payload,
         };
      case "SET_STUDENT":
         return { ...state, ...action.payload };
      //#region emails
      case "ADD_EMAIL":
         return {
            ...state,
            emails: [action.payload, ...state.emails],
         };
      case "UPDATE_EMAIL":
         return {
            ...state,
            emails: [
               ...state.emails.slice(0, action.payload.index),
               action.payload.email,
               ...state.emails.slice(action.payload.index + 1),
            ],
         };
      case "DELETE_EMAIL":
         return {
            ...state,
            emails: [...state.emails.slice(0, action.payload), ...state.emails.slice(action.payload + 1)],
         };
      //#endregion
      //#region phones
      case "ADD_PHONE":
         return {
            ...state,
            phones: [action.payload, ...state.phones],
         };
      case "UPDATE_PHONE":
         return {
            ...state,
            phones: [
               ...state.phones.slice(0, action.payload.index),
               action.payload.phone,
               ...state.phones.slice(action.payload.index + 1),
            ],
         };
      case "DELETE_PHONE":
         return {
            ...state,
            phones: [...state.phones.slice(0, action.payload), ...state.phones.slice(action.payload + 1)],
         };
      //#endregion
      //#region addresses
      case "ADD_ADDRESS":
         return {
            ...state,
            addresses: [action.payload, ...state.addresses],
         };
      case "UPDATE_ADDRESS":
         return {
            ...state,
            addresses: [
               ...state.addresses.slice(0, action.payload.index),
               action.payload.address,
               ...state.addresses.slice(action.payload.index + 1),
            ],
         };
      case "DELETE_ADDRESS":
         return {
            ...state,
            addresses: [...state.addresses.slice(0, action.payload), ...state.addresses.slice(action.payload + 1)],
         };
      //#endregion
      default:
         return state;
   }
}

export const StudentContext = createContext<IStudentContext | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
   const { student_id } = useParams();
   const [state, dispatch] = useReducer(reducer, initialState);
   const [loadingstudent, setLoadingStudent] = useState(true);

   //#region Callbacks
   const SET_EDIT_DIALOG = useCallback((open: boolean) => {
      dispatch({ type: "SET_EDIT_DIALOG", payload: open });
   }, []);
   const SET_REGISTER_DIALOG = useCallback((open: boolean) => {
      dispatch({ type: "SET_REGISTER_DIALOG", payload: open });
   }, []);

   const SET_STUDENT = useCallback((studentInfo: IStudent) => {
      dispatch({ type: "SET_STUDENT", payload: studentInfo });
   }, []);

   const ADD_EMAIL = useCallback((email: IEmail) => {
      dispatch({ type: "ADD_EMAIL", payload: email });
   }, []);

   const UPDATE_EMAIL = useCallback((emails: IEmail[], oldEmail: string, email: IEmail) => {
      const foundEmailIndex = emails.findIndex((em) => em.email === oldEmail);
      dispatch({
         type: "UPDATE_EMAIL",
         payload: {
            index: foundEmailIndex,
            email,
         },
      });
   }, []);
   const DELETE_EMAIL = useCallback((emails: IEmail[], email: string) => {
      const foundEmailIndex = emails.findIndex((em) => em.email === email);
      dispatch({ type: "DELETE_EMAIL", payload: foundEmailIndex });
   }, []);

   const ADD_PHONE = useCallback((phone: IPhone) => {
      dispatch({ type: "ADD_PHONE", payload: phone });
   }, []);

   const UPDATE_PHONE = useCallback((phones: IPhone[], phone_id: number, phone: IPhone) => {
      const foundPhoneIndex = phones.findIndex((ph) => ph.phone_id === phone_id);
      dispatch({
         type: "UPDATE_PHONE",
         payload: {
            index: foundPhoneIndex,
            phone,
         },
      });
   }, []);
   const DELETE_PHONE = useCallback((phones: IPhone[], phone_id: number) => {
      const foundPhoneIndex = phones.findIndex((ph) => ph.phone_id === phone_id);
      dispatch({ type: "DELETE_PHONE", payload: foundPhoneIndex });
   }, []);
   const ADD_ADDRESS = useCallback((address: IAddress) => {
      dispatch({ type: "ADD_ADDRESS", payload: address });
   }, []);

   const UPDATE_ADDRESS = useCallback((addresses: IAddress[], address_id: number, address: IAddress) => {
      const foundAddressIndex = addresses.findIndex((ad) => ad.address_id === address_id);
      dispatch({
         type: "UPDATE_ADDRESS",
         payload: {
            index: foundAddressIndex,
            address,
         },
      });
   }, []);
   const DELETE_ADDRESS = useCallback((addresses: IAddress[], address_id: number) => {
      const foundAddressIndex = addresses.findIndex((ad) => ad.address_id === address_id);
      dispatch({ type: "DELETE_ADDRESS", payload: foundAddressIndex });
   }, []);

   //#endregion

   useEffect(() => {
      const fetchStudentData = async () => {
         const response = await studentRegistryClient.getStudentById(Number(student_id));
         SET_STUDENT(response);
         setLoadingStudent(false);
      };
      if (!student_id) return;
      fetchStudentData();
   }, []);

   const value = useMemo(
      () => ({
         ...state,
         SET_EDIT_DIALOG,
         SET_REGISTER_DIALOG,
         SET_STUDENT,
         ADD_EMAIL,
         UPDATE_EMAIL,
         DELETE_EMAIL,
         ADD_PHONE,
         UPDATE_PHONE,
         DELETE_PHONE,
         ADD_ADDRESS,
         UPDATE_ADDRESS,
         DELETE_ADDRESS,
      }),
      [state],
   );
   return <StudentContext.Provider value={value}>{loadingstudent ? <Spinner /> : children}</StudentContext.Provider>;
}
