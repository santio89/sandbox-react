import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCodeHtml, setCodeCss, setCodeJs } from "../store/actions/code.action";
import { Link } from "react-router-dom";
import Prism from 'prismjs'
import '../utils/prism/prism-dark.css'


export default function Home() {
    const [tabActive, setTabActive] = useState("html")
    const [clearConfirm, setClearConfirm] = useState(false);
    const dispatch = useDispatch()
    const html = useSelector(state => state.code.html)
    const css = useSelector(state => state.code.css)
    const js = useSelector(state => state.code.js)
    const [downloadBlob, setDownloadBlob] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("")

    const [prismContentHtml, setPrismContentHtml] = useState(html)
    const [prismContentCss, setPrismContentCss] = useState(css)
    const [prismContentJs, setPrismContentJs] = useState(js)

    const iframe = useRef(null)
    const textarea = useRef(null)

    const codeInput = useRef(null)

    const [textCursor, setTextCursor] = useState(null)

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

    const syncScroll = () => {
        codeInput.current.scrollTop = textarea.current.scrollTop;
        codeInput.current.scrollLeft = textarea.current.scrollLeft;

    }

    const enableClear = () => {
        switch (tabActive) {
            case 'html':
                if (html === "") {
                    return
                }
                break;
            case 'css':
                if (css === "") {
                    return
                }
                break;
            case 'js':
                if (js === "") {
                    return
                }
                break;
            default:
                return
        }
        setClearConfirm(true)
    }

    const setFullscreen = () => {
        console.log(iframe.current)
        iframe.current.requestFullscreen()
    }

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
        const newCode = html + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script>\n`
        iframe.current.contentWindow.document.open();
        iframe.current.contentWindow.document.write(newCode)
        iframe.current.contentWindow.document.close()

        if (textCursor) {
            textarea.current.selectionStart = textCursor;
            textarea.current.selectionEnd = textCursor;
            setTextCursor(null)
        }

        switch (tabActive) {
            case 'html':
                setPrismContentHtml(html)
                if (html === "") {
                    setClearConfirm(false)
                }
                break;
            case 'css':
                setPrismContentCss(css)
                if (css === "") {
                    setClearConfirm(false)
                }
                break;
            case 'js':
                setPrismContentJs(js)
                if (js === "") {
                    setClearConfirm(false)
                }
                break;
            default:
                return
        }

        const newBlob = new Blob([newCode], { type: 'text/html' });
        setDownloadBlob(newBlob)

    }, [html, css, js])

    useEffect(() => {
        setClearConfirm(false)

        switch (tabActive) {
            case 'html':
                setPrismContentHtml(html)
                break;
            case 'css':
                setPrismContentCss(css)
                break;
            case 'js':
                setPrismContentJs(js)
                break;
            default:
                return
        }
    }, [tabActive])

    useEffect(() => {
        if (downloadBlob !== "") {
            const newDownloadUrl = window.URL.createObjectURL(downloadBlob);
            setDownloadUrl(newDownloadUrl)
        }

        return () => {
            window.URL.revokeObjectURL(downloadUrl)
        }
    }, [downloadBlob])

    useEffect(() => {
        Prism.highlightAll()
    }, [prismContentHtml, prismContentCss, prismContentJs, tabActive])

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
                        <span className="mainCode__input__type__btnWrapper">
                            <Link to={downloadUrl} target="_blank" download title="Download">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-arrow-down-fill" viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                                </svg>
                            </Link>
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
                                    <button className="mainCode__input__type__clear" title="Clear" onClick={() => { enableClear() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-slash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
                                        </svg>
                                    </button>
                            }
                        </span>

                    </div>
                    {tabActive === "html" &&
                        <div className="mainCode__input__textWrapper">
                            <pre className={`mainCode__input__text ${html === "" && `dim pre`}`} aria-hidden="true" ref={codeInput}>
                                <code className="language-html code" >
                                    {prismContentHtml}
                                </code>
                            </pre>

                            <textarea ref={textarea} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`} textarea`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => {
                                if (e.key === "Tab") {
                                    e.preventDefault();
                                    insertTabs("html")
                                }
                                syncScroll();
                            }} onScroll={() => { syncScroll() }}></textarea>
                        </div>}
                    {tabActive === "css" &&
                        <div className="mainCode__input__textWrapper">
                            <pre className={`mainCode__input__text ${css === "" && `dim pre`}`} aria-hidden="true" ref={codeInput}>
                                <code className="language-css code">
                                    {prismContentCss}
                                </code>
                            </pre>

                            <textarea ref={textarea} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`} textarea`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => {
                                if (e.key === "Tab") {
                                    e.preventDefault();
                                    insertTabs("css");
                                    syncScroll()
                                }
                            }} onScroll={() => { syncScroll() }}></textarea>
                        </div>
                    }
                    {tabActive === "js" &&
                        <div className="mainCode__input__textWrapper">
                            <pre className={`mainCode__input__text ${js === "" && `dim pre`}`} aria-hidden="true" ref={codeInput}>
                                <code className="language-js code">
                                    {prismContentJs}
                                </code>
                            </pre>

                            <textarea ref={textarea} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`} textarea`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => {
                                if (e.key === "Tab") {
                                    e.preventDefault();
                                    insertTabs("js");
                                    syncScroll()
                                }
                            }} onScroll={() => { syncScroll() }}></textarea>
                        </div>
                    }
                </div>
                <div className={`mainCode__output `}>
                    <div className="mainCode__output__type">
                        <span className="mainCode__output__type__active">
                            <span>OUTPUT</span>
                        </span>
                        <button className="mainCode__output__type__full" title="Fullscreen" onClick={() => { setFullscreen() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-arrows-fullscreen" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                            </svg>
                        </button>
                    </div>
                    <div className={`mainCode__output__iframeWrapper ${html === "" && css === "" && js === "" && `dim`}`}>
                        <iframe allow="fullscreen" ref={iframe} className="mainCode__output__iframe">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
