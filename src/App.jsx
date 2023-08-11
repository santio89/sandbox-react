import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

function App() {
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
      <div className={`root-theme ${darkTheme && 'dark-theme'}`}>
        <BrowserRouter>
          <Nav />
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
