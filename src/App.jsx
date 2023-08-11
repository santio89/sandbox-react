import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useRef } from "react";
import { useSelector } from "react-redux";

function App() {
  const rootTheme = useRef()
  const darkTheme = useSelector(state => state.theme.darkTheme);

  const Layout = () => (
    <>
      <div className="mainContainer">
        <Outlet />
      </div>
    </>
  );

  return (
    <>
      <div ref={rootTheme} className={`root-theme ${darkTheme && 'dark-theme'}`}>
        <BrowserRouter>
          <Nav rootTheme={rootTheme} />
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
