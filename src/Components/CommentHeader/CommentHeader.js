import CommentButton from "../CommentButton/CommentButton";
import { CURRENT_USER_KEY } from "../../constants/constants";

const CommentHeader = ({
  commentData,
  replying,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  return (
    <div className="comment--header">
      <div
        className={`profile-pic`}
        style={{ backgroundImage: `url(${commentData.user.image.png})` }}
      ></div>
      <div className="username">{commentData.user.username}</div>
      {currentUser.username == commentData.user.username && (
        <div className="you-tag">you</div>
      )}
      <div className="comment-posted-time">{commentData.createdAt}</div>
      <CommentButton
        commentData={commentData}
        replying={replying}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
