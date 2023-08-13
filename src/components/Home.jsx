import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCodeHtml, setCodeCss, setCodeJs } from "../store/actions/code.action";
import { Link } from "react-router-dom";
import Prism from 'prismjs'
import '../styles/css/prism.css'


export default function Home() {
    const [tabActive, setTabActive] = useState("html")
    const [clearConfirm, setClearConfirm] = useState(false);
    const dispatch = useDispatch()
    const html = useSelector(state => state.code.html)
    const css = useSelector(state => state.code.css)
    const js = useSelector(state => state.code.js)
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const [downloadBlob, setDownloadBlob] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("")

    const [prismContentHtml, setPrismContentHtml] = useState(html)
    const [prismContentCss, setPrismContentCss] = useState(css)
    const [prismContentJs, setPrismContentJs] = useState(js)

    const iframe = useRef(null)
    const textareaHtml = useRef(null)
    const textareaCss = useRef(null)
    const textareaJs = useRef(null)

    const codeInputHtml = useRef(null)
    const codeInputCss = useRef(null)
    const codeInputJs = useRef(null)

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
        switch (tabActive) {
            case 'html':
                codeInputHtml.current.scrollTop = textareaHtml.current.scrollTop;
                break;
            case 'css':
                codeInputCss.current.scrollTop = textareaCss.current.scrollTop;
                break;
            case 'js':
                codeInputJs.current.scrollTop = textareaJs.current.scrollTop;
                break;
            default:
                return
        }
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
        iframe.current.requestFullscreen()
    }

    const insertTabs = () => {
        let text;
        switch (tabActive) {
            case 'html': {
                text = `${textareaHtml.current.value.substring(
                    0, textareaHtml.current.selectionStart)}${"\t"}${textareaHtml.current.value.substring(
                        textareaHtml.current.selectionEnd,
                        textareaHtml.current.value.length
                    )}`;

                const selection = (textareaHtml.current.selectionEnd - textareaHtml.current.selectionStart)

                setHtml(text);
                setTextCursor(textareaHtml.current.selectionEnd - selection + 1)
                break;
            }
            case 'css': {
                text = `${textareaCss.current.value.substring(
                    0, textareaCss.current.selectionStart)}${"\t"}${textareaCss.current.value.substring(
                        textareaCss.current.selectionEnd,
                        textareaCss.current.value.length
                    )}`;

                const selection = (textareaCss.current.selectionEnd - textareaCss.current.selectionStart)

                setCss(text);
                setTextCursor(textareaCss.current.selectionEnd - selection + 1)
                break;
            }
            case 'js': {
                text = `${textareaJs.current.value.substring(
                    0, textareaJs.current.selectionStart)}${"\t"}${textareaJs.current.value.substring(
                        textareaJs.current.selectionEnd,
                        textareaJs.current.value.length
                    )}`;

                const selection = (textareaJs.current.selectionEnd - textareaJs.current.selectionStart)

                setJs(text);
                setTextCursor(textareaJs.current.selectionEnd - selection + 1)
                break;
            }
            default:
                return
        }
    }

    useEffect(() => {
        const newCode = `\n<body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script>\n`
        iframe.current.contentWindow.document.open();
        iframe.current.contentWindow.document.write(newCode)
        iframe.current.contentWindow.document.close()

        if (textCursor) {
            switch (tabActive) {
                case 'html':
                    textareaHtml.current.selectionStart = textCursor;
                    textareaHtml.current.selectionEnd = textCursor;
                    break;
                case 'css':
                    textareaCss.current.selectionStart = textCursor;
                    textareaCss.current.selectionEnd = textCursor;
                    break;
                case 'js':
                    textareaJs.current.selectionStart = textCursor;
                    textareaJs.current.selectionEnd = textCursor;
                    break;
                default:
                    return
            }
            setTextCursor(null)
        }

        switch (tabActive) {
            case 'html':
                if (html && html[html.length - 1] === "\n") {
                    setPrismContentHtml(html + " ");
                } else {
                    setPrismContentHtml(html);
                }
                if (html === "") {
                    setClearConfirm(false)
                }
                break;
            case 'css':
                if (css && css[css.length - 1] === "\n") {
                    setPrismContentCss(css + " ");
                } else {
                    setPrismContentCss(css);
                }
                if (css === "") {
                    setClearConfirm(false)
                }
                break;
            case 'js':
                if (js && js[js.length - 1] === "\n") {
                    setPrismContentJs(js + " ");
                } else {
                    setPrismContentJs(js);
                }
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
            case 'html': {
                let trimHtml = html;
                while (trimHtml && trimHtml[trimHtml.length - 1] === "\n") {
                    trimHtml = trimHtml.slice(0, -1);
                }
                setHtml(trimHtml)
                setPrismContentHtml(trimHtml)
                break;
            }
            case 'css': {
                let trimCss = css;
                while (trimCss && trimCss[trimCss.length - 1] === "\n") {
                    trimCss = trimCss.slice(0, -1);
                }
                setCss(trimCss)
                setPrismContentCss(trimCss)
                break;
            }
            case 'js': {
                let trimJs = js;
                while (trimJs && trimJs[trimJs.length - 1] === "\n") {
                    trimJs = trimJs.slice(0, -1);
                }
                setJs(trimJs)
                setPrismContentJs(trimJs)
                break;
            }
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
        syncScroll()
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

                    <div className={`mainCode__input__textWrapper ${tabActive !== "html" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                        <pre className={`mainCode__input__text ${html === "" && `dim pre`}`} aria-hidden="true" ref={codeInputHtml}>
                            <code className={`language-html code`} >
                                {prismContentHtml}
                            </code>
                        </pre>

                        <textarea ref={textareaHtml} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`} textarea`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                insertTabs()
                            }
                            syncScroll();
                        }} onScroll={() => { syncScroll() }}></textarea>
                    </div>

                    <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                        <pre className={`mainCode__input__text ${css === "" && `dim pre`}`} aria-hidden="true" ref={codeInputCss}>
                            <code className="language-css code">
                                {prismContentCss}
                            </code>
                        </pre>

                        <textarea ref={textareaCss} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`} textarea`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                insertTabs();
                                syncScroll()
                            }
                        }} onScroll={() => { syncScroll() }}></textarea>
                    </div>

                    <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                        <pre className={`mainCode__input__text ${js === "" && `dim pre`}`} aria-hidden="true" ref={codeInputJs}>
                            <code className="language-js code">
                                {prismContentJs}
                            </code>
                        </pre>

                        <textarea ref={textareaJs} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`} textarea`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                insertTabs();
                                syncScroll()
                            }
                        }} onScroll={() => { syncScroll() }}></textarea>
                    </div>

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
                        <iframe allow="fullscreen" ref={iframe} className="mainCode__output__iframe" title="Output">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
