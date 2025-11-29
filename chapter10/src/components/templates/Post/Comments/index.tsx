import { Button } from "@/components/atoms/Button";
import { Textarea } from "@/components/atoms/Textarea";
import { useComments } from "./useComments";
import styles from "./styles.module.css";

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    imageUrl: string;
  };
};

type Props = {
  postId: number;
  initialComments: Comment[];
  isLoggedIn: boolean;
};

export const Comments = ({ postId, initialComments, isLoggedIn }: Props) => {
  const { comments, content, setContent, isSubmitting, error, handleSubmit } =
    useComments(initialComments, postId, isLoggedIn);

  return (
    <div className={styles.module}>
      <h2 className={styles.title}>댓글 {comments.length}</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            isLoggedIn
              ? "댓글을 입력하세요 (최대 500자)"
              : "로그인 후 댓글을 작성할 수 있습니다."
          }
          disabled={!isLoggedIn || isSubmitting}
          maxLength={500}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button
          type="submit"
          className={styles.submitButton}
          disabled={!isLoggedIn || isSubmitting || !content.trim()}
          theme="blue"
        >
          {isSubmitting ? "작성 중..." : "댓글 작성"}
        </Button>
      </form>

      <div className={styles.list}>
        {comments.length === 0 ? (
          <p className={styles.empty}>첫 댓글을 작성해보세요!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <img
                src={comment.user.imageUrl}
                alt={comment.user.name}
                className={styles.avatar}
              />
              <div className={styles.content}>
                <div className={styles.header}>
                  <span>{comment.user.name}</span>
                  <span className={styles.date}>
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className={styles.text}>{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


