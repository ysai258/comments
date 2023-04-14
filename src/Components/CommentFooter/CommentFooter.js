import CommentVotes from "../CommentVotes/CommentVotes";
import CommentButton from "../CommentButton/CommentButton";
const CommentFooter = ({
  updateScore,
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
  type,
}) => {
  return (
    <div className="comment--footer">
      <CommentVotes
        updateScore={updateScore}
        commentData={commentData}
        type={type}
      />
      <CommentButton
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};
export default CommentFooter;
