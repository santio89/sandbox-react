import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import './styles/css/styles.css'
import { useDispatch } from "react-redux";
import { authStateAction } from "./store/actions/auth.action";
import { getDefaultPresets } from "./store/actions/presets.action";
import { Toaster } from 'sonner'

function App() {
  const dispatch = useDispatch();
  const rootRef = useRef()

  const Layout = () => (
    <>
      <Nav rootRef={rootRef} />
      <div className="mainContainer">
        <Outlet />
      </div>
    </>
  );

  useEffect(() => {
    let ignore = false;
    !ignore && dispatch(authStateAction())
    !ignore && dispatch(getDefaultPresets())
    return () => { ignore = true };
  }, [])

  return (
    <>
      <div className={`root-theme`} ref={rootRef}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shared/:userShareId/:snippetShareId" element={<Home sharedSnippetHome={true} />} />
              <Route path="/shared/*" element={<Home sharedSnippetHome={true} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
