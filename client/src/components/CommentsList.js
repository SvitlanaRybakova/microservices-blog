import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const CommentsList = ({ comments }) => {
 
  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="d-flex align-items-center">
            <IoChatboxEllipsesOutline color={"#6c757d"} />
            <span className="ml-2 text-secondary">{comment.content}</span>
          </div>
        ))}
    </div>
  );
};

export default CommentsList;
