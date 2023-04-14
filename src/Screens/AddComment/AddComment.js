import { useState } from "react";
import { CURRENT_USER_KEY } from "../../constants/constants";
import "../../Styles/AddComment.scss";

const AddComment = ({ buttonValue, addComments, replyingTo, isReply }) => {
  const replyingToUser = replyingTo ? `@${replyingTo}, ` : "";
  const [comment, setComment] = useState(replyingToUser);
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

  const clickHandler = () => {
    if (comment === "" || comment === " ") return;

    let newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      content: comment.replace(replyingToUser, ""),
      createdAt: "now",
      score: 0,
      replies: [],
      user: currentUser,
    };

    if (isReply) {
      newComment = {
        id: Math.floor(Math.random() * 100) + 5,
        content: comment.replace(replyingToUser, ""),
        createdAt: "now",
        score: 0,
        replyingTo: replyingTo,
        user: currentUser,
      };
    }
    addComments(newComment);
    setComment("");
  };

  return (
    <div className="add-comment">
      <div
        className="profile-pic"
        style={{ backgroundImage: `url(${currentUser.image.png})` }}
      ></div>
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className="send-btn-container">
        <div className="profile-pic"></div>
        <button className="add-btn" onClick={clickHandler}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
