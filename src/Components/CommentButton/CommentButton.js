import { ReactComponent as IconReply } from "../../Assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../Assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../Assets/images/icon-edit.svg";
import { CURRENT_USER_KEY } from "../../constants/constants";

const CommentButton = ({
  commentData,
  replying,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  const showAddComment = () => {
    setReplying(!replying);
  };

  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  const showEditComment = () => {
    setEditing(true);
  };

  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

  return (
    <div className="comment--btn">
      <button
        className={`reply-btn`}
        onClick={showAddComment}
        style={{
          display:
            currentUser.username != commentData.user.username ? "" : "none",
        }}
      >
        <IconReply /> Reply
      </button>
      <button
        className={`delete-btn`}
        onClick={showDeleteModal}
        style={{
          display:
            currentUser.username == commentData.user.username ? "" : "none",
        }}
      >
        <IconDelete /> Delete
      </button>
      <button
        className={`edit-btn`}
        onClick={showEditComment}
        style={{
          display:
            currentUser.username == commentData.user.username ? "" : "none",
        }}
      >
        <IconEdit /> Edit
      </button>
    </div>
  );
};

export default CommentButton;
