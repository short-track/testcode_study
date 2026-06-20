import "@testing-library/jest-dom/vitest";
import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./Modal.stories";
import { test, expect } from "vitest";

const { Succeed, Failed, Busy } = composeStories(stories);

test("Succeed 의 dialog 텍스트 확인", () => {
  render(<Succeed />);
  expect(screen.getByRole("dialog")).toHaveTextContent("성공했습니다");
});

test("Failed 의 dialog 텍스트 확인", () => {
  render(<Failed />);
  expect(screen.getByRole("dialog")).toHaveTextContent("실패했습니다");
});

test("Busy 의 dialog 텍스트 확인", () => {
  render(<Busy />);
  expect(screen.getByRole("dialog")).toHaveTextContent("통신 중입니다");
});
