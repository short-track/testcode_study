import type { ReactNode } from "react";
import { ModalComponent } from "./ModalComponent";
import {
  ModalActionContext,
  type ModalState,
  ModalStateContext,
} from "./ModalContext";
import { useModalProvider } from "./useModalProvider";

export type { ModalState };

export const ModalProvider = ({
  children,
  defaultState,
}: {
  children: ReactNode;
  defaultState?: Partial<ModalState>;
}) => {
  const { isShown, message, style, showModal, hideModal } =
    useModalProvider(defaultState);
  return (
    <ModalStateContext.Provider value={{ isShown, message, style }}>
      <ModalActionContext.Provider value={{ showModal, hideModal }}>
        {children}
        {isShown && <ModalComponent message={message} style={style} />}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};