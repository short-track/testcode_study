import { NotFoundError } from "@/lib/error";
import { handlePrismaError, prisma } from "..";

export async function getPost({ postId }: { postId: number }) {
  try {
    const data = await prisma.post.findUnique({
      where: { id: postId },
      include: { likes: true },
    });
    if (!data) throw new NotFoundError();
    const { createdAt, updatedAt, likes, ...res } = data;
    const likeCount = likes.length;
    const liked = likes.some((l) => l.postId === postId);
    return { ...res, likeCount, liked };
  } catch (err) {
    handlePrismaError(err);
  }
}

export async function getPostWithComments({ postId }: { postId: number }) {
  try {
    const [post, comments] = await Promise.all([
      getPost({ postId }),
      prisma.comment.findMany({
        where: { postId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      post,
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        user: comment.user,
      })),
    };
  } catch (err) {
    handlePrismaError(err);
  }
}

export type GetPostReturn = Awaited<ReturnType<typeof getPost>>;
export type GetPostWithCommentsReturn = Awaited<ReturnType<typeof getPostWithComments>>;
