import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCodeHtml, setCodeCss, setCodeJs } from "../store/actions/code.action";

export default function Home() {
    const [tabActive, setTabActive] = useState("html")
    const [clearConfirm, setClearConfirm] = useState(false);
    const dispatch = useDispatch()
    const html = useSelector(state => state.code.html)
    const css = useSelector(state => state.code.css)
    const js = useSelector(state => state.code.js)

    const setHtml = (html) => {
        dispatch(setCodeHtml(html))
    }
    const setCss = (css) => {
        dispatch(setCodeCss(css))
    }
    const setJs = (js) => {
        dispatch(setCodeJs(js))
    }
    const resetCode = (code) => {
        switch (code) {
            case 'html':
                dispatch(setCodeHtml(""))
                break;
            case 'css':
                dispatch(setCodeCss(""))
                break;
            case 'js':
                dispatch(setCodeJs(""))
                break;
            default:
                return
        }
        setClearConfirm(false);
    }

    const iframe = useRef(null)
    const textarea = useRef(null)

    const [textCursor, setTextCursor] = useState(null)

    const insertTabs = (type) => {
        const text = `${textarea.current.value.substring(
            0, textarea.current.selectionStart)}${"  "}${textarea.current.value.substring(
                textarea.current.selectionEnd,
                textarea.current.value.length
            )}`;

        const selection = (textarea.current.selectionEnd - textarea.current.selectionStart)

        setTextCursor(textarea.current.selectionEnd - selection + 2)

        switch (type) {
            case 'html':
                setHtml(text);
                break;
            case 'css':
                setCss(text);
                break;
            case 'js':
                setJs(text);
                break;
            default:
                return
        }
    }

    useEffect(() => {
        iframe.current.contentWindow.document.open();
        iframe.current.contentWindow.document.write(
            html + `<style>` + css + `</style>` + `<script>` + js + `</script>`
        )
        iframe.current.contentWindow.document.close()

        if (textCursor) {
            textarea.current.selectionStart = textCursor;
            textarea.current.selectionEnd = textCursor;
            setTextCursor(null)
        }
    }, [html, css, js])

    return (
        <div className="home">
            <div className="tabs">
                <div className="tabs__option"><button data-active={tabActive === "html"} onClick={() => setTabActive("html")}>HTML</button></div>
                <div className="tabs__option"><button data-active={tabActive === "css"} onClick={() => setTabActive("css")}>CSS</button></div>
                <div className="tabs__option"><button data-active={tabActive === "js"} onClick={() => setTabActive("js")}>JS</button></div>
            </div>
            <div className="mainCode">
                <div className="mainCode__input">
                    <div className="mainCode__input__type">
                        <span className="mainCode__input__type__active">
                            <span>INPUT-</span>
                            <span>{tabActive.toUpperCase()}</span>
                        </span>
                        {
                            clearConfirm ?
                                <span className="mainCode__input__type__clearConfirm">
                                    <span>Clear?</span>
                                    <span className="mainCode__input__type__clearConfirm__buttons">
                                        <button onClick={() => { resetCode(tabActive) }}>Yes</button>
                                        <button onClick={() => { setClearConfirm(false) }}>No</button>
                                    </span>
                                </span>
                                :
                                <button className="mainCode__input__type__clear" title="Clear" onClick={() => { setClearConfirm(true) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-slash-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </button>
                        }
                    </div>
                    {tabActive === "html" &&
                        <textarea ref={textarea} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`}`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                insertTabs("html")
                            }
                        }}></textarea>
                    }
                    {tabActive === "css" &&
                        <textarea ref={textarea} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`}`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                insertTabs("css")
                            }
                        }}></textarea>
                    }
                    {tabActive === "js" &&
                        <textarea ref={textarea} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`}`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                insertTabs("js")
                            }
                        }}></textarea>
                    }
                </div>
                <div className={`mainCode__output `}>
                    <p>OUTPUT</p>
                    <div className={`mainCode__output__iframeWrapper ${html === "" && css === "" && js === "" && `dim`}`}>
                        <iframe ref={iframe} className="mainCode__output__iframe">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
