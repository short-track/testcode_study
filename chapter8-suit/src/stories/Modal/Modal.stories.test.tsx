import { expect, test, describe } from "vitest";
import { composeStories } from "@storybook/react";
import * as stories from "./Modal.stories";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

// 스토리를 컴포저블한 형태로 변환
const { Succeed, Failed, Busy } = composeStories(stories);

describe("ModalComponent", () => {
  test("click - close button - Succeed", async () => {
    const user = userEvent.setup();
    render(<Succeed />);

    const closeButton = screen.getByText("닫기");
    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText("성공")).toBeInTheDocument();
    });
  });

  test("click - close button - Failed", async () => {
    const user = userEvent.setup();
    render(<Failed />);

    const closeButton = screen.getByText("닫기");
    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText("실패")).toBeInTheDocument();
    });
  });

  test("click - close button - Busy", async () => {
    const user = userEvent.setup();
    render(<Busy />);

    const closeButton = screen.getByText("닫기");
    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText("진행중")).toBeInTheDocument();
    });
  });
});
