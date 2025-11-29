import { useState, FormEvent } from "react";
import { getComments, postComment } from "@/services/client/Comment";
import { useRouter } from "next/router";

export function useComments(initialComments: any[], postId: number, isLoggedIn: boolean) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!content.trim()) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }

    if (content.length > 500) {
      setError("댓글은 500자를 초과할 수 없습니다.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const newComment = await postComment({ postId, content: content.trim() });
      setComments([newComment, ...comments]);
      setContent("");
    } catch (err) {
      setError("댓글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    comments,
    content,
    setContent,
    isSubmitting,
    error,
    handleSubmit,
  };
}


