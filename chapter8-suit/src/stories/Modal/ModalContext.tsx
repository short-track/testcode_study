import { createContext, useContext } from "react";

export type ModalStyle = "succeed" | "failed" | "busy";

export type ModalState = {
  isShown: boolean;
  message: string;
  style: ModalStyle;
};

export const initialState: ModalState = {
  isShown: false,
  message: "",
  style: "succeed",
};

export const ModalStateContext = createContext(initialState);

export type ModalAction = {
  showModal: (state?: Partial<Omit<ModalState, "isShown">>) => void;
  hideModal: () => void;
};

export const initialAction: ModalAction = {
  showModal: () => {},
  hideModal: () => {},
};

export function useModalAction() {
  return useContext(ModalActionContext);
}

export function useModalState() {
  return useContext(ModalStateContext);
}

export const ModalActionContext = createContext(initialAction);