import { handlePrismaError, prisma } from "..";

export async function getComments({ postId }: { postId: number }) {
  try {
    const comments = await prisma.comment.findMany({
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
    });
    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: comment.user,
    }));
  } catch (err) {
    handlePrismaError(err);
  }
}

export async function createComment({
  postId,
  content,
  userId,
}: {
  postId: number;
  content: string;
  userId: number;
}) {
  try {
    // 작성하시오
  } catch (err) {
    handlePrismaError(err);
  }
}

export type GetCommentsReturn = Awaited<ReturnType<typeof getComments>>;
export type CreateCommentReturn = Awaited<ReturnType<typeof createComment>>;


