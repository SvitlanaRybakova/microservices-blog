import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const CommentsList = ({ comments }) => {
  const renderedComments = (comment) => {

    let content;

    if (comment.status === "approved") content = comment.content;
    if (comment.status === "rejected")
      content = "This comment has been rejected";
    if (comment.status === "pending")
      content = "This comment is awaiting moderation ";

    return content;
  };

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="d-flex align-items-center">
            <IoChatboxEllipsesOutline color={"#6c757d"} />
            <span className="ml-2 text-secondary">
              {renderedComments(comment)}
            </span>
          </div>
        ))}
    </div>
  );
};

export default CommentsList;
