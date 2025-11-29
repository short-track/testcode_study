import { Comment } from "@prisma/client";

// 작성하시오
export const commentsFixture = (): Omit<Comment, "id" | "createdAt" | "updatedAt">[] => [
];


