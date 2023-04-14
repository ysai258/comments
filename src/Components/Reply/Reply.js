import { useState } from "react";
import AddComment from "../../Screens/AddComment/AddComment";
import DeleteModal from "../DeleteModal/DeleteModal";
import CommentVotes from "../CommentVotes/CommentVotes";
import CommentHeader from "../CommentHeader/CommentHeader";
import CommentFooter from "../CommentFooter/CommentFooter";
import "../../Styles/Comments.scss";

const Reply = ({
  commentData,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  const addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  const commentContent = () => {
    return !editing ? (
      <div className="comment-content">
        <span className="replyingTo">{`@${commentData.replyingTo}`}</span>
        {commentData.content}
      </div>
    ) : (
      <textarea
        className="content-edit-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    );
  };

  const updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  const deleteReply = () => {
    deleteComment(commentData.id, "reply");
    setDeleting(false);
  };

  return (
    <div className={`comment-container`}>
      <div className="comment">
        <CommentVotes
          updateScore={updateScore}
          commentData={commentData}
          type="reply"
        />
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />

          {commentContent()}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
          type="reply"
        />
      </div>

      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.user.username}
          isReply={true}
        />
      )}

      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteReply}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Reply;
