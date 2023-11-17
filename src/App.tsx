import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import Tweets from "./components/Tweets";
import RightSide from "./components/RightSide";
import defaultTweets from "./assets/data/tweets.js";
import user from "./assets/data/user.js";

type ThemeType = "light" | "dark";

const ThemeContext = createContext<ThemeType>("light");
const userContext = createContext(user)
const AppContext = createContext(undefined);

function retrieveTheme(): ThemeType {
  const themeData = localStorage.getItem("theme");
  if (themeData === "dark") return themeData;
  return "light";
}

function App() {
  const [tweets, setTweets] = useState(defaultTweets);
  const [theme, setTheme] = useState(retrieveTheme());

  useEffect(() => {
    theme === "light"
      ? (document.body.style.backgroundColor = "white")
      : (document.body.style.backgroundColor = "black");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <AppContext.Provider value={{ user, tweets, theme, setTheme, setTweets }}>
        <div className="container">
          <Header />
          <Tweets />
          <RightSide />
        </div>
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
}

// NOTE! Instead of `export default App` we use `export { App }` here because we have
// more than one thing to export from this file.
export { App, AppContext };
