import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import firebase from "firebase";
import db from "./firebase";
import { Button, Input, makeStyles, Modal } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([
    // {
    //   username: "Asad",
    //   caption: "Wow",
    //   imageUrl: "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
    // },
    // {
    //   username: "Xerxes",
    //   caption: "Wow",
    //   imageUrl: "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
    // },
  ]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // run once when the app component loads
    db.collection("posts")
      // .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
        console.log(posts);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__headerImage">
        <img
          alt="Instagram"
          height="70px"
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
        ></img>
      </div>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        ></Post>
      ))}

      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className="app__headerImage">
            <center>
              <img
                alt="Instagram"
                height="70px"
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
              ></img>

              <Input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>

              <Input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>

              <Input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </center>
          </div>

          <Button type="button" onClick={handleClose}>
            close
          </Button>
          <Button type="button" onClick={handleClose}>
            close
          </Button>
        </div>
      </Modal>
      <Button type="button" onClick={handleOpen}>
        open
      </Button>

      {/* <Post
        username="Asad"
        caption="Wow"
    imageUrl="https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"></Post>
      <Post
        username="Asad"
        caption="Wow"
        imageUrl="https://homepages.cae.wisc.edu/~ece533/images/baboon.png"
      ></Post>
      <Post
        username="Asad"
        caption="Wow"
        imageUrl="https://homepages.cae.wisc.edu/~ece533/images/boat.png"></Post>
      <Post
        username="Asad"
        caption="Wow"
        imageUrl="https://homepages.cae.wisc.edu/~ece533/images/mountain.png"
      ></Post> */}
      {/* Header */}

      {/* Posts */}
    </div>
  );
}

export default App;
