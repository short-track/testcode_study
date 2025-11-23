import { useModalAction, type ModalStyle } from "./ModalContext";
import { useState, useEffect } from "react";
import { useModalState } from "./ModalContext";
import "./modal.css";

type Props = { message: string; style: ModalStyle };

export const ModalComponent = ({ message, style }: Props) => {
  const [isMount, setIsMount] = useState(false);
  const { isShown } = useModalState();
  const { hideModal } = useModalAction();

  useEffect(() => {
    if (isShown) {
      setIsMount(true);
    } else {
      setIsMount(false);
    }
  }, [isShown]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="module"
      data-style={style}
      data-mounted={isMount}
    >
      <div>
        <button className="close-button" onClick={hideModal}>닫기</button>
        {style === "succeed" ? (
          <p>✓ 성공</p>
        ) : style === "failed" ? (
          <p>✗ 실패</p>
        ) : (
          <p>⟳ 진행중</p>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};