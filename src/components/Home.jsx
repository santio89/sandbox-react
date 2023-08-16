import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCodeHtml, setCodeCss, setCodeJs } from "../store/actions/code.action";
import { Link } from "react-router-dom";
import Prism from 'prismjs'
import '../styles/css/prism.css'
import { html_beautify } from "js-beautify";
import { css_beautify } from "js-beautify";
import { js_beautify } from "js-beautify";


export default function Home() {
    const [tabActive, setTabActive] = useState("html")
    const [clearConfirm, setClearConfirm] = useState(false);
    const dispatch = useDispatch()
    const html = useSelector(state => state.code.html)
    const css = useSelector(state => state.code.css)
    const js = useSelector(state => state.code.js)
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const loadSnippet = useSelector(state => state.modal.loadSnippet)
    const [downloadBlob, setDownloadBlob] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("")
    const [codeOutput, setCodeOutput] = useState("")
    const [copyClipboard, setCopyClipboard] = useState(false)

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
    const resetCode = () => {
        switch (tabActive) {
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
    const beautify = () => {
        switch (tabActive) {
            case 'html': {
                const beautify = html_beautify(html)
                setHtml(beautify)
                break;
            }
            case 'css': {
                const beautify = css_beautify(css)
                setCss(beautify)
                break;
            }
            case 'js': {
                const beautify = js_beautify(js)
                setJs(beautify)
                break;
            }
            default:
                return
        }
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

    const copyToClipboard = () => {
        switch (tabActive) {
            case 'html':
                navigator.clipboard.writeText(html);
                break;
            case 'css':
                navigator.clipboard.writeText(css);
                break;
            case 'js':
                navigator.clipboard.writeText(js);
                break;
            default:
                return
        }
        setCopyClipboard(true)
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
        let timeout = null;
        if (loadSnippet) {
            setCodeOutput(`<body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script>`)
        } else {
            timeout = setTimeout(() => {
                setCodeOutput(`<body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script>`)
            }, 1000);
        }

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
                break;
            case 'css':
                if (css && css[css.length - 1] === "\n") {
                    setPrismContentCss(css + " ");
                } else {
                    setPrismContentCss(css);
                }
                break;
            case 'js':
                if (js && js[js.length - 1] === "\n") {
                    setPrismContentJs(js + " ");
                } else {
                    setPrismContentJs(js);
                }
                break;
            default:
                return
        }

        return () => clearTimeout(timeout)
    }, [html, css, js])

    useEffect(() => {
        const newBlob = new Blob([codeOutput], { type: 'text/html' });
        setDownloadBlob(newBlob)
    }, [codeOutput])

    useEffect(() => {
        let timeout = null;
        if (copyClipboard) {
            timeout = setTimeout(() => {
                setCopyClipboard(false)
            }, 1000)
        }

        return () => clearTimeout(timeout)
    }, [copyClipboard])

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
        if (loadSnippet) {
            setClearConfirm(false)
        }
    }, [loadSnippet])

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
                            <button className="mainCode__input__type__format" title="Format code" onClick={() => { beautify() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                                </svg>
                            </button>
                            {
                                copyClipboard ?
                                    <button className="mainCode__input__type__clip" title="Copy to clipboard" onClick={() => { copyToClipboard() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi clipboard-check-fill" viewBox="0 0 16 16">
                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                        </svg>
                                    </button>
                                    :
                                    <button className="mainCode__input__type__clip" title="Copy to clipboard" onClick={() => { copyToClipboard() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-clipboard-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z" />
                                        </svg>
                                    </button>
                            }

                            {
                                clearConfirm ?
                                    <span className="mainCode__input__type__clearConfirm">
                                        <span>Clear?</span>
                                        <span className="mainCode__input__type__clearConfirm__buttons">
                                            <button onClick={() => { resetCode() }}>Yes</button>
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
                        <span className="mainCode__output__type__btnWrapper">
                            <Link to={downloadUrl} target="_blank" download title="Download code output">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-arrow-down-fill" viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                                </svg>
                            </Link>
                            <button className="mainCode__output__type__full" title="Fullscreen" onClick={() => { setFullscreen() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-arrows-fullscreen" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div className={`mainCode__output__iframeWrapper ${codeOutput === ("" || `<body>\n` + "" + `\n</body>\n` + `\n<style>\n` + "" + `\n</style>\n` + `\n<script>\n` + "" + `\n</script>`) && `dim`}`}>
                        <iframe srcDoc={codeOutput} allow="fullscreen" ref={iframe} className="mainCode__output__iframe" title="Output">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
