import { ApiHandler, handleApiRouteError, handleNotAllowed, withLogin } from "@/lib/next/api";
import { getComments, createComment } from "@/services/server/Comment";
import { validate } from "@/lib/util";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const postSchema = z.object({
  postId: z.number(),
  content: z.string().min(1).max(500),
});

export type GetReturn = Awaited<ReturnType<typeof getComments>>;
export type PostReturn = Awaited<ReturnType<typeof createComment>>;

// GET 핸들러 - 로그인 불필요
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const postId = Number(req.query.postId);
    if (isNaN(postId)) {
      res.status(400).json({ status: 400, message: "Invalid postId" });
      return;
    }
    const comments = await getComments({ postId });
    res.status(200).json(comments);
  } catch (err) {
    handleApiRouteError({ res, err });
  }
};

// POST 핸들러 - 로그인 필요
const handlePost = withLogin<PostReturn>(async (req, res) => {
  validate(req.body, postSchema);
  const data = await createComment({
    postId: req.body.postId,
    content: req.body.content,
    userId: req.user.id,
  });
  res.status(201).json(data);
});

const handler: ApiHandler<GetReturn | PostReturn> = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;

