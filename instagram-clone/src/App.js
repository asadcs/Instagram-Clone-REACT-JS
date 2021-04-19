import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import firebase from "firebase";
import { db, auth } from "./firebase";
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
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false)
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

  const handleSignup = (e) => {
    //setOpen(false);
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    // alert("Successfully logged in");
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName) {
        // } else {
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        //user has logged out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

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

      {user ? (
        <Button type="button" onClick={()=>auth.signOut()}>
          Logout
        </Button>
      ) : (
        <div>
           <Button type="button" onClick={handleOpen}>
          SignIn
        </Button>
        <Button type="button" onClick={handleOpen}>
          Signup
        </Button>
        </div>
      )}
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
          <form onSubmit={handleSignup} className="app__signup">
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
                  variant="outlined"
                ></Input>

                <Input
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                ></Input>

                <Input
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                ></Input>

                <Button type="submit" onClick={handleSignup}>
                  Signup
                </Button>
                <Button type="button" onClick={handleClose}>
                  Cancel
                </Button>
              </center>
            </div>
          </form>
        </div>
      </Modal>

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
