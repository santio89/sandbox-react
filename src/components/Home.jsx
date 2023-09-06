import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCodeHtml, setCodeCss, setCodeJs } from "../store/actions/code.action";
import { html_beautify, css_beautify, js_beautify } from "js-beautify";
import { Link, useParams } from "react-router-dom";
import { setLoadSnippet } from "../store/actions/modal.action";
import getSharedSnippet from "../utils/getSharedSnippet";
import SplitPane from 'react-split-pane'
import Prism from '../utils/prism.js'

export default function Home({ sharedSnippetHome }) {
    const { userShareId, snippetShareId } = useParams();
    const [tabActive, setTabActive] = useState("html")
    const [clearConfirm, setClearConfirm] = useState(false)
    const dispatch = useDispatch()
    const html = useSelector(state => state.html.present.html)
    const css = useSelector(state => state.css.present.css)
    const js = useSelector(state => state.js.present.js)
    const darkTheme = useSelector(state => state.theme.darkTheme)
    const loadSnippet = useSelector(state => state.modal.loadSnippet)
    const createNew = useSelector(state => state.modal.createNew)
    const modalActive = useSelector(state => state.modal.active)
    const [downloadBlob, setDownloadBlob] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("")
    const [codeOutput, setCodeOutput] = useState("")
    const [copyClipboard, setCopyClipboard] = useState(false)
    const [downloadCode, setDownloadCode] = useState(false)
    const [sharedSnippet, setSharedSnippet] = useState(null)
    const [sharedLoading, setSharedLoading] = useState(false)

    const [prismContentHtml, setPrismContentHtml] = useState(html)
    const [prismContentCss, setPrismContentCss] = useState(css)
    const [prismContentJs, setPrismContentJs] = useState(js)

    const [panelDrag, setPanelDrag] = useState(false)

    const iframe = useRef(null)
    /* textarea: code input */
    const textareaHtml = useRef(null)
    const textareaCss = useRef(null)
    const textareaJs = useRef(null)

    /* codeInput: pre-code input */
    const codeInputHtml = useRef(null)
    const codeInputCss = useRef(null)
    const codeInputJs = useRef(null)

    const [textCursor, setTextCursor] = useState(null)
    const [currentCursorHtml, setCurrentCursorHtml] = useState(0)
    const [currentCursorCss, setCurrentCursorCss] = useState(0)
    const [currentCursorJs, setCurrentCursorJs] = useState(0)
    const [currentScrollHtml, setCurrentScrollHtml] = useState(0)
    const [currentScrollCss, setCurrentScrollCss] = useState(0)
    const [currentScrollJs, setCurrentScrollJs] = useState(0)

    const [panelBreakpoint, setPanelBreakpont] = useState(window.innerWidth < 800 ? true : false)

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
                const beautify = html_beautify(html, { indent_size: 2, indent_with_tabs: true, space_in_empty_paren: true })
                const selection = (textareaHtml.current.selectionEnd)
                setHtml(beautify)
                setTextCursor(selection)
                break;
            }
            case 'css': {
                const beautify = css_beautify(css, { indent_size: 2, indent_with_tabs: true, space_in_empty_paren: true })
                const selection = (textareaCss.current.selectionEnd)
                setCss(beautify)
                setTextCursor(selection)
                break;
            }
            case 'js': {
                const beautify = js_beautify(js, { indent_size: 2, indent_with_tabs: true, space_in_empty_paren: true })
                const selection = (textareaJs.current.selectionEnd)
                setJs(beautify)
                setTextCursor(selection)
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
                setCurrentScrollHtml(textareaHtml.current.scrollTop)
                break;
            case 'css':
                codeInputCss.current.scrollTop = textareaCss.current.scrollTop;
                setCurrentScrollCss(textareaCss.current.scrollTop)
                break;
            case 'js':
                codeInputJs.current.scrollTop = textareaJs.current.scrollTop;
                setCurrentScrollJs(textareaJs.current.scrollTop)
                break;
            default:
                return
        }
    }

    const syncScrollReverse = () => {
        switch (tabActive) {
            case 'html':
                textareaHtml.current.scrollTop = codeInputHtml.current.scrollTop;
                setCurrentScrollHtml(codeInputHtml.current.scrollTop)
                break;
            case 'css':
                textareaCss.current.scrollTop = codeInputCss.current.scrollTop;
                setCurrentScrollCss(codeInputCss.current.scrollTop)
                break;
            case 'js':
                textareaJs.current.scrollTop = codeInputJs.current.scrollTop;
                setCurrentScrollJs(codeInputJs.current.scrollTop)
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

    const insertComment = () => {
        let text;
        let selection;
        switch (tabActive) {
            case 'html': {
                if (textareaHtml.current.value.startsWith("<!--", textareaHtml.current.selectionStart) && textareaHtml.current.value.endsWith("-->", textareaHtml.current.selectionEnd)) {
                    text = textareaHtml.current.value.replace("<!--", "").replace("-->", "");
                    selection = (textareaHtml.current.selectionEnd)
                    setHtml(text);
                    setTextCursor(selection - 3)
                } else {
                    text = `${textareaHtml.current.value.substring(
                        0, textareaHtml.current.selectionStart)}${"<!-- "}${textareaHtml.current.value.substring(
                            textareaHtml.current.selectionStart,
                            textareaHtml.current.selectionEnd
                        )}${" -->"}${textareaHtml.current.value.substring(
                            textareaHtml.current.selectionEnd,
                            textareaHtml.current.value.length
                        )}`;

                    selection = (textareaHtml.current.selectionEnd)
                    setHtml(text);
                    setTextCursor(selection + 5)
                }
                break;
            }
            case 'css': {
                if (textareaCss.current.value.startsWith("/*", textareaCss.current.selectionStart) && textareaCss.current.value.endsWith("*/", textareaCss.current.selectionEnd)) {
                    text = textareaCss.current.value.replace("/*", "").replace("*/", "");
                    selection = (textareaCss.current.selectionEnd)
                    setCss(text);
                    setTextCursor(selection - 3)
                } else {
                    text = `${textareaCss.current.value.substring(
                        0, textareaCss.current.selectionStart)}${"/* "}${textareaCss.current.value.substring(
                            textareaCss.current.selectionStart,
                            textareaCss.current.selectionEnd
                        )}${" */"}${textareaCss.current.value.substring(
                            textareaCss.current.selectionEnd,
                            textareaCss.current.value.length
                        )}`;

                    selection = (textareaCss.current.selectionEnd)
                    setCss(text);
                    setTextCursor(selection + 3)
                }
                break;
            }
            case 'js': {
                if (textareaJs.current.value.startsWith("/*", textareaJs.current.selectionStart) && textareaJs.current.value.endsWith("*/", textareaJs.current.selectionEnd)) {
                    text = textareaJs.current.value.replace("/*", "").replace("*/", "");
                    selection = (textareaJs.current.selectionEnd)
                    setJs(text);
                    setTextCursor(selection - 3)
                } else {
                    text = `${textareaJs.current.value.substring(
                        0, textareaJs.current.selectionStart)}${"/* "}${textareaJs.current.value.substring(
                            textareaJs.current.selectionStart,
                            textareaJs.current.selectionEnd
                        )}${" */"}${textareaJs.current.value.substring(
                            textareaJs.current.selectionEnd,
                            textareaJs.current.value.length
                        )}`;

                    selection = (textareaJs.current.selectionEnd)
                    setJs(text);
                    setTextCursor(selection + 3)
                }
                break;
            }
            default:
                return
        }
    }

    const setClickCursor = () => {
        switch (tabActive) {
            case 'html': {
                setCurrentCursorHtml(textareaHtml.current.selectionEnd)
                setCurrentScrollHtml(textareaHtml.current.scrollTop)
                break;
            }
            case 'css': {
                setCurrentCursorCss(textareaCss.current.selectionEnd)
                setCurrentScrollCss(textareaCss.current.scrollTop)
                break;
            }
            case 'js': {
                setCurrentCursorJs(textareaJs.current.selectionEnd)
                setCurrentScrollJs(textareaJs.current.scrollTop)
                break;
            }
            default:
                return
        }
    }

    const checkInput = (e) => {
        if (e.key.toUpperCase() === "TAB") {
            e.preventDefault();
            insertTabs()
        } else if (e.key.toUpperCase() === "Z" && e.ctrlKey) {
            e.preventDefault();
            switch (tabActive) {
                case 'html': {
                    const selection = (textareaHtml.current.selectionEnd - 1)
                    dispatch({ type: "HTML_UNDO" })
                    setTextCursor(selection)
                    break;
                }
                case 'css': {
                    const selection = (textareaCss.current.selectionEnd - 1)
                    dispatch({ type: "CSS_UNDO" })
                    setTextCursor(selection)
                    break;
                }
                case 'js': {
                    const selection = (textareaJs.current.selectionEnd - 1)
                    dispatch({ type: "JS_UNDO" })
                    setTextCursor(selection)
                    break;
                }
                default:
                    return
            }
        } else if (e.key.toUpperCase() === "Y" && e.ctrlKey) {
            e.preventDefault();
            switch (tabActive) {
                case 'html': {
                    const selection = (textareaHtml.current.selectionEnd + 1)
                    dispatch({ type: "HTML_REDO" })
                    setTextCursor(selection)
                    break;
                }
                case 'css': {
                    const selection = (textareaCss.current.selectionEnd + 1)
                    dispatch({ type: "CSS_REDO" })
                    setTextCursor(selection)
                    break;
                }
                case 'js': {
                    const selection = (textareaJs.current.selectionEnd + 1)
                    dispatch({ type: "JS_REDO" })
                    setTextCursor(selection)
                    break;
                }
                default:
                    return
            }
        } else if (e.key.toUpperCase() === "F" && e.altKey && e.shiftKey) {
            e.preventDefault();
            beautify()
        } else if (e.key.toUpperCase() === "A" && e.altKey && e.shiftKey) {
            e.preventDefault()
            insertComment();
        }
        syncScroll();
    }

    useEffect(() => {
        let timeout = null;
        if (createNew) {
            setPrismContentHtml("")
            setPrismContentCss("")
            setPrismContentJs("")
        }
        if (loadSnippet) {
            setCodeOutput(`<body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script>`)

            textareaHtml.current.scrollTop = 0
            textareaCss.current.scrollTop = 0
            textareaJs.current.scrollTop = 0
            codeInputHtml.current.scrollTop = 0
            codeInputCss.current.scrollTop = 0
            codeInputJs.current.scrollTop = 0
            textareaHtml.current.selectionStart = 0
            textareaHtml.current.selectionEnd = 0
            textareaCss.current.selectionStart = 0
            textareaCss.current.selectionEnd = 0
            textareaJs.current.selectionStart = 0
            textareaJs.current.selectionEnd = 0
            setCurrentScrollHtml(0)
            setCurrentScrollCss(0)
            setCurrentScrollJs(0)
            setCurrentCursorHtml(0)
            setCurrentCursorCss(0)
            setCurrentCursorJs(0)

            switch (tabActive) {
                case 'html':
                    textareaHtml.current.focus()
                    break;
                case 'css':
                    textareaCss.current.focus()
                    break;
                case 'js':
                    textareaJs.current.focus()
                    break;
                default:
                    return
            }
        } else {
            timeout = setTimeout(() => {
                setCodeOutput(`<body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script>`)
            }, 1000);
        }

        if (textCursor || textCursor === 0) {
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
                setCurrentCursorHtml(textareaHtml.current.selectionEnd)
                setCurrentScrollHtml(textareaHtml.current.scrollTop)
                break;
            case 'css':
                if (css && css[css.length - 1] === "\n") {
                    setPrismContentCss(css + " ");
                } else {
                    setPrismContentCss(css);
                }
                setCurrentCursorCss(textareaCss.current.selectionEnd)
                setCurrentScrollCss(textareaCss.current.scrollTop)
                break;
            case 'js':
                if (js && js[js.length - 1] === "\n") {
                    setPrismContentJs(js + " ");
                } else {
                    setPrismContentJs(js);
                }
                setCurrentCursorJs(textareaJs.current.selectionEnd)
                setCurrentScrollJs(textareaJs.current.scrollTop)
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
        let timeout = null;
        if (downloadCode) {
            timeout = setTimeout(() => {
                setDownloadCode(false)
            }, 1000)
        }

        return () => clearTimeout(timeout)
    }, [downloadCode])

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

                textareaHtml.current.focus()
                textareaHtml.current.selectionStart = currentCursorHtml
                textareaHtml.current.selectionEnd = currentCursorHtml
                textareaHtml.current.scrollTop = currentScrollHtml

                break;
            }
            case 'css': {
                let trimCss = css;
                while (trimCss && trimCss[trimCss.length - 1] === "\n") {
                    trimCss = trimCss.slice(0, -1);
                }
                setCss(trimCss)
                setPrismContentCss(trimCss)

                textareaCss.current.focus()
                textareaCss.current.selectionStart = currentCursorCss
                textareaCss.current.selectionEnd = currentCursorCss
                textareaCss.current.scrollTop = currentScrollCss

                break;
            }
            case 'js': {
                let trimJs = js;
                while (trimJs && trimJs[trimJs.length - 1] === "\n") {
                    trimJs = trimJs.slice(0, -1);
                }
                setJs(trimJs)
                setPrismContentJs(trimJs)

                textareaJs.current.focus()
                textareaJs.current.selectionStart = currentCursorJs
                textareaJs.current.selectionEnd = currentCursorJs
                textareaJs.current.scrollTop = currentScrollJs

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
    }, [prismContentHtml, prismContentCss, prismContentJs, tabActive, panelBreakpoint, sharedSnippet])

    useEffect(() => {
        const resizeBox = new ResizeObserver(entries => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                /* don't sync if pane hasn't been resized manually */
                if (cr.height === 0) return
                switch (tabActive) {
                    case 'html':
                        if (String(textareaHtml.current.style.height) === "") return
                        break;
                    case 'css':
                        if (String(textareaCss.current.style.height) === "") return
                        break;
                    case 'js':
                        if (String(textareaJs.current.style.height) === "") return
                        break;
                }


                /*resize panel sync:16padding+4border=20px */
                codeInputHtml.current.style.height = cr.height + 20 + "px"
                codeInputCss.current.style.height = cr.height + 20 + "px"
                codeInputJs.current.style.height = cr.height + 20 + "px"
                codeInputHtml.current.style.maxHeight = codeInputHtml.current.style.height
                codeInputCss.current.style.maxHeight = codeInputCss.current.style.height
                codeInputJs.current.style.maxHeight = codeInputJs.current.style.height
                textareaHtml.current.style.height = cr.height + 20 + "px"
                textareaCss.current.style.height = cr.height + 20 + "px"
                textareaJs.current.style.height = cr.height + 20 + "px"
            }
        });

        resizeBox.observe(textareaHtml.current)
        resizeBox.observe(textareaCss.current)
        resizeBox.observe(textareaJs.current)

        return () => resizeBox.disconnect()
    }, [panelBreakpoint, tabActive])

    useEffect(() => {
        if (loadSnippet) {
            setClearConfirm(false)
        }
    }, [loadSnippet])

    useEffect(() => {
        if (sharedSnippetHome) {
            setSharedLoading(true)
            const setShared = (snippet) => {
                setSharedSnippet(snippet)
                setSharedLoading(false)
            }
            getSharedSnippet(userShareId, snippetShareId, setShared)
        }
    }, [sharedSnippetHome])

    useEffect(() => {
        const setShared = (html, css, js) => {
            dispatch(setLoadSnippet(true))
            setHtml(html)
            setCss(css)
            setJs(js)
        }

        sharedSnippet && setShared(sharedSnippet.html, sharedSnippet.css, sharedSnippet.js)
    }, [sharedSnippet])

    useEffect(() => {
        const tabShortcut = (e) => {
            if (modalActive) return

            if (e.code.toUpperCase() === "DIGIT1" && e.altKey && e.shiftKey) {
                e.preventDefault()
                setTabActive("html")
            }
            else if (e.code.toUpperCase() === "DIGIT2" && e.altKey && e.shiftKey) {
                e.preventDefault()
                setTabActive("css")
            }
            else if (e.code.toUpperCase() === "DIGIT3" && e.altKey && e.shiftKey) {
                e.preventDefault()
                setTabActive("js")
            }
        }

        const windowPaneResizeFix = () => {
            const containertWidth = document.querySelector(".SplitPane.vertical")?.getBoundingClientRect().width
            const paneWidth = document.querySelector(".Pane.vertical.Pane1")?.getBoundingClientRect().width
            const paneStyleWidth = document.querySelector(".Pane.vertical.Pane1")?.style.width


            if (String(paneStyleWidth).endsWith("px")) {
                document.querySelector(".Pane.vertical.Pane1").style.width = (paneWidth / containertWidth) * 100 + "%"
            }
        }

        const paneResizeEvent = () => {
            window.innerWidth < 800 ? setPanelBreakpont(true) : setPanelBreakpont(false)
        }

        const paneEvent = () => {
            paneResizeEvent()
            windowPaneResizeFix()
        }

        window.addEventListener("resize", paneEvent)
        document.addEventListener("keydown", tabShortcut)

        return () => { window.removeEventListener("resize", paneEvent); document.removeEventListener("keydown", tabShortcut) }
    }, [])

    return (
        <div className="home">
            {sharedSnippetHome && sharedLoading ?
                <div className="home__sharedLoading">
                    <h2>LOADING SNIPPET</h2>
                    <div className="loader">Loading...</div>
                </div>
                :
                (sharedSnippetHome && !sharedLoading && !sharedSnippet ?
                    <>
                        <div className="home__sharedNotFound">
                            <h2>SNIPPET NOT FOUND</h2>
                            <p>The requested snippet doesn&apos;t exist or isn&apos;t available right now.</p>
                            <Link className="" to={"/"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                                </svg>
                                <span>SANDBOX</span>
                            </Link>
                        </div>

                        <div className="d-none">
                            <div className="tabs">
                                <div className="tabs__option"><button title="HTML (alt+shift+1)" data-active={tabActive === "html"} onClick={() => setTabActive("html")}>HTML</button></div>
                                <div className="tabs__option"><button title="CSS (alt+shift+2)" data-active={tabActive === "css"} onClick={() => setTabActive("css")}>CSS</button></div>
                                <div className="tabs__option"><button title="JS (alt+shift+3)" data-active={tabActive === "js"} onClick={() => setTabActive("js")}>JS</button></div>
                            </div>
                            <div className="mainCode">
                                {panelBreakpoint ?
                                    <>
                                        <div className={`mainCode__input NoSplitPane`}>
                                            <div className="mainCode__input__type">
                                                <span className="mainCode__input__type__active">
                                                    <span>INPUT-</span>
                                                    <span>{tabActive.toUpperCase()}</span>
                                                </span>
                                                <span className="mainCode__input__type__btnWrapper">
                                                    {
                                                        <button className="mainCode__input__type__format" title="Format code (alt+shift+f)" onClick={() => { beautify() }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code" viewBox="0 0 16 16">
                                                                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                                                            </svg>
                                                        </button>
                                                    }
                                                    {
                                                        <button className="mainCode__input__type__comment" title="Insert comment (alt+shift+a)" onClick={() => { insertComment() }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-asterisk" viewBox="0 0 16 16">
                                                                <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                                            </svg>
                                                        </button>
                                                    }
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
                                                <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${html === "" && `dim pre`}`} aria-hidden="true" ref={codeInputHtml}>
                                                    <code className={`language-html code`}>
                                                        {prismContentHtml}
                                                    </code>
                                                </pre>

                                                <textarea ref={textareaHtml} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`} textarea`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                            </div>

                                            <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                                <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${css === "" && `dim pre`}`} aria-hidden="true" ref={codeInputCss}>
                                                    <code className="language-css code">
                                                        {prismContentCss}
                                                    </code>
                                                </pre>

                                                <textarea ref={textareaCss} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`} textarea`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                            </div>

                                            <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                                <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${js === "" && `dim pre`}`} aria-hidden="true" ref={codeInputJs}>
                                                    <code className="language-js code">
                                                        {prismContentJs}
                                                    </code>
                                                </pre>

                                                <textarea ref={textareaJs} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`} textarea`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                            </div>

                                        </div>
                                        <div className={`mainCode__output NoSplitPane`}>
                                            <div className="mainCode__output__type">
                                                <span className="mainCode__output__type__active">
                                                    <span>OUTPUT</span>
                                                </span>
                                                <span className="mainCode__output__type__btnWrapper">
                                                    {
                                                        downloadCode ?
                                                            <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-check-fill" viewBox="0 0 16 16">
                                                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                                </svg>
                                                            </Link>
                                                            :
                                                            <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-arrow-down-fill" viewBox="0 0 16 16">
                                                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                                                                </svg>
                                                            </Link>
                                                    }

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
                                    </>
                                    :
                                    <SplitPane split="vertical" minSize={300} defaultSize={"42%"} maxSize={-300} onDragStarted={() => {setPanelDrag(true)}} onDragFinished={() => {setPanelDrag(false); Prism.highlightAll()}}>
                                        <div className={`mainCode__input ${panelDrag && "pe-none"}`}>
                                            <div className="mainCode__input__type">
                                                <span className="mainCode__input__type__active">
                                                    <span>INPUT-</span>
                                                    <span>{tabActive.toUpperCase()}</span>
                                                </span>
                                                <span className="mainCode__input__type__btnWrapper">
                                                    {
                                                        <button className="mainCode__input__type__format" title="Format code (alt+shift+f)" onClick={() => { beautify() }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code" viewBox="0 0 16 16">
                                                                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                                                            </svg>
                                                        </button>
                                                    }
                                                    {
                                                        <button className="mainCode__input__type__comment" title="Insert comment (alt+shift+a)" onClick={() => { insertComment() }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-asterisk" viewBox="0 0 16 16">
                                                                <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                                            </svg>
                                                        </button>
                                                    }
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
                                                <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${html === "" && `dim pre`}`} aria-hidden="true" ref={codeInputHtml}>
                                                    <code className={`language-html code`} >
                                                        {prismContentHtml}
                                                    </code>
                                                </pre>

                                                <textarea ref={textareaHtml} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`} textarea`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                            </div>

                                            <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                                <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${css === "" && `dim pre`}`} aria-hidden="true" ref={codeInputCss}>
                                                    <code className="language-css code">
                                                        {prismContentCss}
                                                    </code>
                                                </pre>

                                                <textarea ref={textareaCss} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`} textarea`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                            </div>

                                            <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                                <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${js === "" && `dim pre`}`} aria-hidden="true" ref={codeInputJs}>
                                                    <code className="language-js code">
                                                        {prismContentJs}
                                                    </code>
                                                </pre>

                                                <textarea ref={textareaJs} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`} textarea`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                            </div>

                                        </div>

                                        <div className={`mainCode__output ${panelDrag && "pe-none"}`}>
                                            <div className="mainCode__output__type">
                                                <span className="mainCode__output__type__active">
                                                    <span>OUTPUT</span>
                                                </span>
                                                <span className="mainCode__output__type__btnWrapper">
                                                    {
                                                        downloadCode ?
                                                            <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-check-fill" viewBox="0 0 16 16">
                                                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                                </svg>
                                                            </Link>
                                                            :
                                                            <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-arrow-down-fill" viewBox="0 0 16 16">
                                                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                                                                </svg>
                                                            </Link>
                                                    }

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
                                    </SplitPane>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="tabs">
                            <div className="tabs__option"><button title="HTML (alt+shift+1)" data-active={tabActive === "html"} onClick={() => setTabActive("html")}>HTML</button></div>
                            <div className="tabs__option"><button title="CSS (alt+shift+2)" data-active={tabActive === "css"} onClick={() => setTabActive("css")}>CSS</button></div>
                            <div className="tabs__option"><button title="JS (alt+shift+3)" data-active={tabActive === "js"} onClick={() => setTabActive("js")}>JS</button></div>
                        </div>
                        <div className="mainCode">
                            {panelBreakpoint ?
                                <>
                                    <div className={`mainCode__input NoSplitPane`}>
                                        <div className="mainCode__input__type">
                                            <span className="mainCode__input__type__active">
                                                <span>INPUT-</span>
                                                <span>{tabActive.toUpperCase()}</span>
                                            </span>
                                            <span className="mainCode__input__type__btnWrapper">
                                                {
                                                    <button className="mainCode__input__type__format" title="Format code (alt+shift+f)" onClick={() => { beautify() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code" viewBox="0 0 16 16">
                                                            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className="mainCode__input__type__comment" title="Insert comment (alt+shift+a)" onClick={() => { insertComment() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-asterisk" viewBox="0 0 16 16">
                                                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                                        </svg>
                                                    </button>
                                                }
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
                                            <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${html === "" && `dim pre`}`} aria-hidden="true" ref={codeInputHtml}>
                                                <code className={`language-html code`} >
                                                    {prismContentHtml}
                                                </code>
                                            </pre>

                                            <textarea ref={textareaHtml} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`} textarea`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                            <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${css === "" && `dim pre`}`} aria-hidden="true" ref={codeInputCss}>
                                                <code className="language-css code">
                                                    {prismContentCss}
                                                </code>
                                            </pre>

                                            <textarea ref={textareaCss} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`} textarea`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                            <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${js === "" && `dim pre`}`} aria-hidden="true" ref={codeInputJs}>
                                                <code className="language-js code">
                                                    {prismContentJs}
                                                </code>
                                            </pre>

                                            <textarea ref={textareaJs} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`} textarea`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                        </div>

                                    </div>
                                    <div className={`mainCode__output NoSplitPane`}>
                                        <div className="mainCode__output__type">
                                            <span className="mainCode__output__type__active">
                                                <span>OUTPUT</span>
                                            </span>
                                            <span className="mainCode__output__type__btnWrapper">
                                                {
                                                    downloadCode ?
                                                        <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-check-fill" viewBox="0 0 16 16">
                                                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                            </svg>
                                                        </Link>
                                                        :
                                                        <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-arrow-down-fill" viewBox="0 0 16 16">
                                                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                                                            </svg>
                                                        </Link>
                                                }

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
                                </>
                                :
                                <SplitPane split="vertical" minSize={300} defaultSize={"42%"} maxSize={-300} onDragStarted={() => {setPanelDrag(true)}} onDragFinished={() => {setPanelDrag(false); Prism.highlightAll()}}>
                                    <div className={`mainCode__input ${panelDrag && "pe-none"}`}>
                                        <div className="mainCode__input__type">
                                            <span className="mainCode__input__type__active">
                                                <span>INPUT-</span>
                                                <span>{tabActive.toUpperCase()}</span>
                                            </span>
                                            <span className="mainCode__input__type__btnWrapper">
                                                {
                                                    <button className="mainCode__input__type__format" title="Format code (alt+shift+f)" onClick={() => { beautify() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code" viewBox="0 0 16 16">
                                                            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className="mainCode__input__type__comment" title="Insert comment (alt+shift+a)" onClick={() => { insertComment() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-asterisk" viewBox="0 0 16 16">
                                                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                                        </svg>
                                                    </button>
                                                }
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
                                            <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${html === "" && `dim pre`}`} aria-hidden="true" ref={codeInputHtml}>
                                                <code className={`language-html code`} >
                                                    {prismContentHtml}
                                                </code>
                                            </pre>

                                            <textarea ref={textareaHtml} spellCheck="false" className={`mainCode__input__text ${html === "" && `dim`} textarea`} value={html} onChange={e => setHtml(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                            <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${css === "" && `dim pre`}`} aria-hidden="true" ref={codeInputCss}>
                                                <code className="language-css code">
                                                    {prismContentCss}
                                                </code>
                                            </pre>

                                            <textarea ref={textareaCss} spellCheck="false" className={`mainCode__input__text ${css === "" && `dim`} textarea`} value={css} onChange={e => setCss(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${darkTheme ? "code-dark" : "code-light"}`}>
                                            <pre onScroll={() => syncScrollReverse()} className={`line-numbers mainCode__input__text ${js === "" && `dim pre`}`} aria-hidden="true" ref={codeInputJs}>
                                                <code className="language-js code">
                                                    {prismContentJs}
                                                </code>
                                            </pre>

                                            <textarea ref={textareaJs} spellCheck="false" className={`mainCode__input__text ${js === "" && `dim`} textarea`} value={js} onChange={e => setJs(e.target.value)} onKeyDown={(e) => { checkInput(e); setClickCursor(e) }} onScroll={() => { syncScroll() }} onClick={(e) => { setClickCursor(e) }}></textarea>
                                        </div>

                                    </div>

                                    <div className={`mainCode__output ${panelDrag && "pe-none"}`}>
                                        <div className="mainCode__output__type">
                                            <span className="mainCode__output__type__active">
                                                <span>OUTPUT</span>
                                            </span>
                                            <span className="mainCode__output__type__btnWrapper">
                                                {
                                                    downloadCode ?
                                                        <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-check-fill" viewBox="0 0 16 16">
                                                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                            </svg>
                                                        </Link>
                                                        :
                                                        <Link to={downloadUrl} target="_blank" download title="Download code output" onClick={() => setDownloadCode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-arrow-down-fill" viewBox="0 0 16 16">
                                                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z" />
                                                            </svg>
                                                        </Link>
                                                }

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
                                </SplitPane>
                            }
                        </div>
                    </>
                )


            }
        </div>
    )
}
