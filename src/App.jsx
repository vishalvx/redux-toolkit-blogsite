import "./App.css";
import AddPostForm from "./components/post/AddPostForm";
import PostsList from "./components/post/PostsList";

function App() {
  return (
    <>
      <main className="feed__wrapper">
        <AddPostForm />
        <PostsList />
      </main>
    </>
  );
}

export default App;
