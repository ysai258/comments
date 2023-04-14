import { useState, useEffect } from "react";
import { COMMENTS_KEY, CURRENT_USER_KEY } from "./constants/constants";
import Comment from "./Screens/Comments/Comments";
import AddComment from "./Screens/AddComment/AddComment";
import data from "./data.json";
import "./Styles/app.scss";
function App() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(COMMENTS_KEY));

    localData !== null && localData?.length > 0
      ? setComments(localData)
      : setComments(data.comments);

    setCurrentUser(data.currentUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.currentUser));
  }, []);

  useEffect(() => {
    if (comments.length > 0)
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    deleteModal
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModal]);

  const addComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
  };

  const deleteComment = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      updatedComments = updatedComments.filter((comment) => comment.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((reply) => reply.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    setComments(updatedComments);
  };

  const editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((comment) => {
        if (comment.id === id) {
          comment.content = content;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            reply.content = content;
          }
        });
      });
    }

    setComments(updatedComments);
  };

  const updateReply = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.forEach((comment) => {
      if (comment.id === id) {
        comment.replies = [...replies];
      }
    });
    setComments(updatedComments);
  };

  const updateScore = (score, id, type, method) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((comment) => {
        if (comment.id === id) {
          comment.score = score;
          comment.voted = method === "upvote" ? true : false;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            reply.score = score;
            reply.voted = method === "upvote" ? true : false;
          }
        });
      });
    }
    setComments(updatedComments);
  };
  return (
    <div className="App">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentData={comment}
          updateScore={updateScore}
          updateReplies={updateReply}
          editComment={editComment}
          commentDelete={deleteComment}
          setDeleteModalState={setDeleteModal}
        />
      ))}
      {currentUser && (
        <AddComment buttonValue={"send"} addComments={addComment} />
      )}
    </div>
  );
}

export default App;
