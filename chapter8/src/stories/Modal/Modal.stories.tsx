import type { Decorator, Meta, StoryObj } from "@storybook/react";
import type { ModalState } from "./ModalContext";
import { ModalProvider } from "./ModalProvider";

const ModalStory = () => null;

const meta = {
  title: "Stories/Modal",
  component: ModalStory,
} satisfies Meta<typeof ModalStory>;

export default meta;

export const createDecorator = (
  defaultState?: Partial<ModalState>,
): Decorator => {
  return function Decorator(Story) {
    return (
      <ModalProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </ModalProvider>
    );
  };
};

type Story = StoryObj<typeof meta>;

export const Succeed: Story = {
  decorators: [
    createDecorator({
      message: "성공했습니다",
      style: "succeed",
    }),
  ],
};

export const Failed: Story = {
  decorators: [
    createDecorator({
      message: "실패했습니다",
      style: "failed",
    }),
  ],
};

export const Busy: Story = {
  decorators: [
    createDecorator({
      message: "통신 중입니다",
      style: "busy",
    }),
  ],
};
