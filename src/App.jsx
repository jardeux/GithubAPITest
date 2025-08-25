import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GithubCards from "./Components/GithubCards";

function App() {
  const [count, setCount] = useState(0);
  return <GithubCards></GithubCards>;
}

export default App;
