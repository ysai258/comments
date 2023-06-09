import { useState } from "react";
import { ReactComponent as IconPlus } from "../../Assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../Assets/images/icon-minus.svg";
import { CURRENT_USER_KEY } from "../../constants/constants";
const CommentVotes = ({ updateScore, commentData, type }) => {
  const [score, setScore] = useState(commentData.score);
  const [voted, setVoted] = useState(commentData.voted ?? false);
  const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  const upVote = () => {
    if (currentUser.username == commentData.user.username) return;
    if (voted === false) {
      let n = score + 1;
      setScore(n);
      updateScore(n, commentData.id, type, "upvote");
      setVoted(true);
    }
  };

  const downVote = () => {
    if (currentUser.username == commentData.user.username) return;
    if (voted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, commentData.id, type, "downvote");
      setVoted(false);
    }
  };

  return (
    <div className="comment--votes">
      <button className="plus-btn" onClick={upVote} aria-label="plus-btn">
        <IconPlus />
      </button>
      <div className="votes-counter">{commentData.score}</div>
      <button className="minus-btn" onClick={downVote} aria-label="minus-btn">
        <IconMinus />
      </button>
    </div>
  );
};

export default CommentVotes;
