import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";

function Post({username,caption,imageUrl}) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt="Asadullah"
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
        />

        <h3>{username}</h3>
      </div>
      {/* header - >avatar  + u sernam */}

      {/* image */}
      <img
        className="post__image"
        src={imageUrl}></img>

      <h4 className="post__text">
        <strong>{username} </strong>{caption}
      </h4>
      {/* username + caption */}
    </div>
  );
}

export default Post;
