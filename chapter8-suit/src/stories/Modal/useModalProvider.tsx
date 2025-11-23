import { useCallback, useState } from "react";
import { initialState, type ModalState } from "./ModalContext";

export function useModalProvider(defaultState?: Partial<ModalState>) {
  const [{ isShown, message, style }, setState] = useState({
    ...initialState,
    ...defaultState,
  });
  const showModal = useCallback(
    (props?: Partial<Omit<ModalState, "isShown">>) => {
      setState((prev) => ({ ...prev, ...props, isShown: true }));
    },
    []
  );
  const hideModal = useCallback(() => {
    setState((prev) => ({ ...prev, isShown: false }));
  }, []);
  return { isShown, message, style, showModal, hideModal };
}