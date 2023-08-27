import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import './styles/css/prism.css'
import './styles/css/styles.css'
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authStateAction } from "./store/actions/auth.action";
import { Toaster } from 'sonner'


function App() {
  const dispatch = useDispatch();
  const rootTheme = useRef();

  const Layout = () => (
    <>
      <div className="mainContainer">
        <Outlet />
      </div>
    </>
  );

  useEffect(() => {
    dispatch(authStateAction())
  }, [])

  return (
    <>
      <div ref={rootTheme} className={`root-theme`}>
        <Toaster />
        <BrowserRouter>
          <Nav rootTheme={rootTheme} />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
