import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({username}) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress();
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      (complete) => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username:username
            });
            setProgress(0);
            setCaption("")
            setImage(null)
          });
      }
    );
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="imageupload">
        <progress value={progress} max="100" className="imageupload__progress"> </progress>
      <Input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      ></Input>
      <Input type="file" onChange={handleChange}></Input>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
