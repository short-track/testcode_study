import { Comment } from "@prisma/client";

// 코드를 작성하시오
export const commentsFixture = (): Omit<Comment, "id" | "createdAt" | "updatedAt">[] => [
];


