import "./App.css";
import IconMoon from "./images/icon-moon.svg";
import IconSun from "./images/icon-sun.svg";
import LightModeBg from "./images/bg-mobile-light.jpg";
import DarkModeBg from "./images/bg-mobile-dark.jpg";
import DesktopLightModeBg from "./images/bg-desktop-light.jpg";
import DesktopDarkModeBg from "./images/bg-desktop-dark.jpg";
import TODO from "./images/TODO.svg";
import IconCross from "./images/icon-cross.svg";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions";

function App() {
  const [items, setItems] = useState([
    { text: "Complete online JS Course", completed: true },
    { text: "Jog around the park 3x", completed: false },
    { text: "10 minutes meditation", completed: false },
    { text: "Read for 1 hour", completed: false },
    { text: "Pick up groceries", completed: false },
    { text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);
  const [addTodoCheckMark, setAddTodoCheckmark] = useState(false);
  const [addTodoInput, setAddTodoInput] = useState("");

  /* All -> 0 | Active -> 1 | Completed -> 2 */
  const [filterType, setFilterType] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (filterType > 2) setFilterType(2);
    else if (filterType < 0) setFilterType(0);
  }, [filterType]);

  useEffect(() => {
    document.querySelector("body").style.backgroundColor = darkTheme
      ? "#171823"
      : "#FAFAFA";
  }, [darkTheme]);

  function filter(items, type) {
    return items.filter((v) => {
      switch (type) {
        case 0:
          return true;
        case 1:
          return !v.completed;
        case 2:
          return v.completed;
      }
    });
  }

  return (
    <>
      {/* Header with logo and light/dark mode buttons */}
      <header className="app__headerContainer">
        <div className="app__BgImg">
          <img
            src={darkTheme ? DarkModeBg : LightModeBg}
            alt="bg"
            className="app__mobile"
          />
          <img
            src={darkTheme ? DesktopDarkModeBg : DesktopLightModeBg}
            alt="bg"
            className="app__desktop"
          />
        </div>
        <div className="app_header app__container">
          <img src={TODO} alt="todo" className="app__todo" />
          <img
            src={darkTheme ? IconSun : IconMoon}
            alt="moon"
            className="app__themeSwitcher"
            onClick={() => setDarkTheme(!darkTheme)}
          />
        </div>
      </header>
      <main>
        {/* Adding todo form */}
        <div className="app__container">
          <form
            className={"app__form" + (darkTheme ? " dark" : "")}
            onSubmit={(e) => {
              e.preventDefault();
              setItems([
                ...items,
                { text: addTodoInput, completed: addTodoCheckMark },
              ]);
              setAddTodoInput("");
              setAddTodoCheckmark(false);
            }}
          >
            <Checkbox
              checked={addTodoCheckMark}
              onValueChange={setAddTodoCheckmark}
              darkMode={darkTheme}
            />
            <input
              type="text"
              placeholder="Create a new todo..."
              value={addTodoInput}
              onChange={(e) => setAddTodoInput(e.currentTarget.value)}
            />
          </form>
        </div>

        {/* Todo list that ends with items left and clear completed buttons */}
        <div className="app__container">
          <div className={`app__itemsContainer ${darkTheme ? "dark" : ""}`}>
            {filter(items, filterType).map((item, index) => (
              <div key={index} className="app__todoItem">
                <Checkbox
                  checked={item.completed}
                  darkMode={darkTheme}
                  onValueChange={(val) => {
                    const newItems = [...items];
                    newItems[index].completed = val;
                    setItems(newItems);
                  }}
                />
                <span
                  style={
                    item.completed
                      ? {
                          textDecoration: "line-through",
                          color: darkTheme ? "#4D5067" : "#D1D2DA",
                        }
                      : {}
                  }
                >
                  {item.text}
                </span>
                <img
                  src={IconCross}
                  alt="delete"
                  className="app__crossButton"
                  onClick={() => {
                    setItems(items.filter((_, i) => i !== index));
                  }}
                />
              </div>
            ))}

            <div className="app__itemsOptions">
              <div>
                {filter(items, 1).length} item
                {filter(items, 1).length !== 1 && "s"} left
              </div>
              <div className="app__center">
                <FilterOptions
                  darkMode={darkTheme}
                  filterType={filterType}
                  setFilterType={setFilterType}
                />
              </div>
              <div
                onClick={() => {
                  setItems(items.filter((v) => !v.completed));
                }}
                style={{ cursor: "pointer" }}
              >
                Clear completed
              </div>
            </div>
          </div>

          {/* All active Completed filters */}
          <div className={"app__filterItems" + (darkTheme ? " dark" : "")}>
            <FilterOptions
              darkMode={darkTheme}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </div>

          {/* Hint */}
          <div className="app__hint">Drag and drop to reorder list</div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
