import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button, Input } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postid, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postid)
      // run once when the app component loads
      unsubscribe = db
        .collection("posts")
        .doc(postid)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            // snapshot.docs.map((doc) => ({
            //   id: doc.id,
            //   post: doc.data(),
            // }))
            snapshot.docs.map((doc) => (
              doc.data()
            ))
          );

          console.log(comments);
        });

    return () => {
      unsubscribe();
    };
  }, [postid]);


  const handlePostCommentsProcess = (event) => {
    // all the logic to send the message
    event.preventDefault(); // prevent form to refresh the page

    db.collection("posts")
    .doc(postid)
    .collection("comments").add({
      username: username,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

setComment('')

  }



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
      <img className="post__image" src={imageUrl}></img>

      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
      <form className="post__commentBox">
        <Input
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          className="post__input"
        ></Input>
        <Button
          type="submit"
          className="post__button"
          disabled={!comment}
           onClick={handlePostCommentsProcess}
        >
          Post
        </Button>
      </form>
      {/* username + caption */}
      <div className="post__comments">
        {comments.map(c => (
         <p><b>{c.username}</b>{c.text }</p>
        // {
        //   comment
        // }
        ))}
      </div>
    </div>
  );
}

export default Post;
