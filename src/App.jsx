import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setThemeReducer } from "./store/actions/theme.action";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const darkTheme = useSelector(state => state.darkTheme);

  const toggleDarkTheme = () => {
    dispatch(setThemeReducer(false))
  }

  const Layout = () => (
    <>
      <div className="mainContainer">
        <Outlet />
      </div>
    </>
  );

  useEffect(()=>{
    console.log(darkTheme)
  }, [darkTheme])

  return (
    <>
      <div className={darkTheme ? 'root-theme dark-theme' : 'root-theme'}>
        <BrowserRouter>
          <Nav darkTheme={darkTheme} toggleDarkTheme={toggleDarkTheme} />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>

          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
