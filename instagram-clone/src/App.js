import { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {

  const [posts, setPosts] = useState([
    {username:'Asad',
      caption:'Wow',
      imageUrl:'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png'
    },
    {username:'Xerxes',
      caption:'Wow',
      imageUrl:'https://homepages.cae.wisc.edu/~ece533/images/boat.png'
    }
  ])
  return (
    <div className="app">
      <div className="app__headerImage">
        <img
          alt="Instagram"
          height="70px"
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
        ></img>
      </div>

{
  posts.map(post=>(
    <Post
        username={post.username}
        caption={post.caption}
    imageUrl={post.imageUrl}>      
    </Post>
  ))
}      

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
