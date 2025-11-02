// [문제] 테스트 코드를 작성해주세요.

import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { screen } from "@testing-library/react";
import Posts from "./page";
import { setupMockServer } from "@/mocks/server";
import { postHandlers } from "@/mocks/post";

describe('Posts', () => {
  it('posts 데이터를 조회해서 화면에 표시해야 한다', async () => {

  }); 

  it('검색 창은 htmlFor 연결이 되어야하고, placeholder 속성을 가지고 있어야 한다', () => {

  });
});
