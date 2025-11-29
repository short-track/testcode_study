import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import { login, url } from "./util";

test.describe("기사 상세 페이지 댓글 작성", () => {
  const path = "/my/posts/3";
  const userName: UserName = "JPub";

  test("로그인 상태가 아니면, 댓글 textarea가 disabled 상태이다.", async ({ page }) => {
    // 작성하시오
  });

  test("댓글 작성 후, 댓글 작성 버튼을 클릭하면 댓글이 생성된다.", async ({ page }) => {
    // 작성하시오
  });

  test("댓글이 생성되면, 상단의 '댓글{n}'의 숫자가 올라가고 댓글 목록에 추가된다.", async ({ page }) => {
    // 작성하시오
  });

  test("접근성 검증", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
