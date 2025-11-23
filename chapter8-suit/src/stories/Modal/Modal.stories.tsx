// 1. 스토리북 코드 작성
// 2. 스토리북 테스트

import type { PartialStoryFn } from "storybook/internal/csf";
import type { ModalState } from "./ModalContext";
import { ModalProvider } from "./ModalProvider";
import type { Meta, ReactRenderer } from "@storybook/react";
import type { Args } from "@storybook/csf";
import { ModalComponent } from "./ModalComponent";

function createDecorator(defaultState?: Partial<ModalState>) {
  return function Decorator(Story: PartialStoryFn<ReactRenderer, Args>) {
    return (
      <ModalProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </ModalProvider>
    );
  };
}

export default {
  component: ModalComponent,
  decorators: [createDecorator()],
} as Meta<typeof ModalComponent>;

export const Succeed = {
  decorators: [
    createDecorator({
      message: "성공",
      style: "succeed",
    }),
  ],
};

export const Failed = {
  decorators: [
    createDecorator({
      message: "실패",
      style: "failed",
    }),
  ],
};

export const Busy = {
  decorators: [
    createDecorator({
      message: "진행중",
      style: "busy",
    }),
  ],
};
