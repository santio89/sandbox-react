import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCodeHtml, setCodeCss, setCodeJs, setLineHighlight, setMinimap, setWordWrap } from "../store/actions/code.action";
import { setCurrentSnippet } from "../store/actions/theme.action";
import { Link, useParams } from "react-router-dom";
import { setLoadSnippet } from "../store/actions/modal.action";
import getSharedSnippet from "../utils/getSharedSnippet";
import SplitPane from 'react-split-pane'
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';




export default function Home({ sharedSnippetHome }) {
    const { userShareId, snippetShareId } = useParams();
    const [tabActive, setTabActive] = useState("html")
    const [clearConfirm, setClearConfirm] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const html = useSelector(state => state.html.present.html)
    const css = useSelector(state => state.css.present.css)
    const js = useSelector(state => state.js.present.js)
    const darkTheme = useSelector(state => state.theme.darkTheme)
    const loadSnippet = useSelector(state => state.modal.loadSnippet)
    const createNew = useSelector(state => state.modal.createNew)
    const modalActive = useSelector(state => state.modal.active)
    /* const [downloadBlob, setDownloadBlob] = useState("") */
    const [downloadUrl, setDownloadUrl] = useState("")
    const [codeOutput, setCodeOutput] = useState("")
    const [copyClipboard, setCopyClipboard] = useState(false)
    const [downloadCode, setDownloadCode] = useState(false)
    const [sharedSnippet, setSharedSnippet] = useState(null)
    const [sharedLoading, setSharedLoading] = useState(true)
    const currentSnippet = useSelector(state => state.theme.currentSnippet)
    const lineHighlight = useSelector(state => state.editor.lineHighlight)
    const minimap = useSelector(state => state.editor.minimap)
    const wordWrap = useSelector(state => state.editor.wordWrap)

    const [panelDrag, setPanelDrag] = useState(false)
    const iframe = useRef(null)
    const iframeWrapper = useRef(null)

    const editorHtml = useRef(null);
    const editorCss = useRef(null);
    const editorJs = useRef(null);
    const htmlWrapper = useRef(null);
    const cssWrapper = useRef(null);
    const jsWrapper = useRef(null);
    const splitPane = useRef(null)

    const [panelBreakpoint, setPanelBreakpont] = useState(window.innerWidth < 800 ? true : false)

    const monacoOptions = {
        minimap: { enabled: minimap },
        wordWrap: wordWrap,
        renderLineHighlight: lineHighlight,
        scrollbar: { verticalScrollbarSize: "12px", horizontalScrollbarSize: "12px" },
        padding: { top: 8, bottom: 8 },
        glyphMargin: false,
        fixedOverflowWidgets: true,
        folding: false,
        scrollBeyondLastLine: false,
    }

    const handleEditorMount = (e, type) => {
        switch (type) {
            case 'html':
                editorHtml.current = e
                break;
            case 'css':
                editorCss.current = e
                break;
            case 'js':
                editorJs.current = e
                break;
        }

        /* add word wrap command */
        e.addCommand(monaco.KeyCode.KeyZ | monaco.KeyMod.Alt, () => {
            const options = e.getOptions();
            const currentWordWrap = options._values[147].isViewportWrapping;

            currentWordWrap ? dispatch(setWordWrap("off")) : dispatch(setWordWrap("on"))
        });
    }

    const setHtml = (html) => {
        dispatch(setCodeHtml(html))
    }

    const setCss = (css) => {
        dispatch(setCodeCss(css))
    }

    const setJs = (js) => {
        dispatch(setCodeJs(js))
    }

    const toggleLineHighlight = () => {
        lineHighlight === "all" ? dispatch(setLineHighlight("none")) : dispatch(setLineHighlight("all"))
    }

    const toggleMinimap = () => {
        minimap ? dispatch(setMinimap(false)) : dispatch(setMinimap(true))
    }

    const toggleWordWrap = () => {
        wordWrap === "on" ? dispatch(setWordWrap("off")) : dispatch(setWordWrap("on"))
    }

    const runFormatCode = () => {
        switch (tabActive) {
            case 'html':
                editorHtml?.current?.focus()
                editorHtml?.current?.getAction('editor.action.formatDocument').run();
                break;
            case 'css':
                editorCss?.current?.focus()
                editorCss?.current?.getAction('editor.action.formatDocument').run();
                break;
            case 'js':
                editorJs?.current?.focus()
                editorJs?.current?.getAction('editor.action.formatDocument').run();
                break;
        }
    }

    const focusCurrentTab = () => {
        switch (tabActive) {
            case 'html':
                editorHtml?.current?.focus()
                break;
            case 'css':
                editorCss?.current?.focus()
                break;
            case 'js':
                editorJs?.current?.focus()
                break;
        }
    }

    const showCommandPalette = () => {
        switch (tabActive) {
            case 'html':
                editorHtml?.current?.focus()
                editorHtml?.current?.getAction('editor.action.quickCommand')?.run()
                break;
            case 'css':
                editorCss?.current?.focus()
                editorCss?.current?.getAction('editor.action.quickCommand')?.run()
                break;
            case 'js':
                editorJs?.current?.focus()
                editorJs?.current?.getAction('editor.action.quickCommand')?.run()
                break;
            default:
                return
        }
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

    useEffect(() => {
        let timeout = null;
        if (createNew || loadSnippet) {
            /* clear undo-redo stack */
            let modelHtml = editorHtml?.current?.getModel();
            let modelCss = editorCss?.current?.getModel();
            let modelJs = editorJs?.current?.getModel();
            if (modelHtml) {
                modelHtml.setValue("")
                modelHtml.setValue(html)
            }
            if (modelCss) {
                modelCss.setValue("")
                modelCss.setValue(css)
            }
            if (modelJs) {
                modelJs.setValue("")
                modelJs.setValue(js)
            }

            /* editorHtml?.current?.getAction('editor.action.formatDocument')?.run()
            editorCss?.current?.getAction('editor.action.formatDocument')?.run()
            editorJs?.current?.getAction('editor.action.formatDocument')?.run() */

            const codeString = `<!DOCTYPE html><html><body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script></html>`
            const blob = new Blob([codeString], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            setCodeOutput(url)

            /* focus tab if new */
            createNew && focusCurrentTab()

            const startSelection = {
                endColumn: 1,
                endLineNumber: 1,
                positionColumn: 1,
                positionLineNumber: 1,
                selectionStartColumn: 1,
                selectionStartLineNumber: 1,
                startColumn: 1,
                startLineNumber: 1,
            }

            editorHtml?.current?.setSelection(startSelection)
            editorCss?.current?.setSelection(startSelection)
            editorJs?.current?.setSelection(startSelection)
        } else {
            timeout = setTimeout(() => {
                const codeString = `<!DOCTYPE html><html><body>\n` + html + `\n</body>\n` + `\n<style>\n` + css + `\n</style>\n` + `\n<script>\n` + js + `\n</script></html>`
                const blob = new Blob([codeString], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                setCodeOutput(url)
            }, 1000);
        }

        return () => clearTimeout(timeout)
    }, [html, css, js])

    useEffect(() => {
        /* const newBlob = new Blob([codeOutput], { type: 'text/html' });
        setDownloadBlob(newBlob) */
        setDownloadUrl(codeOutput)
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
        focusCurrentTab()
    }, [tabActive])

    /* useEffect(() => {
        if (downloadBlob !== "") {
            const newDownloadUrl = window.URL.createObjectURL(downloadBlob);
            setDownloadUrl(newDownloadUrl)
        }

        return () => {
            window.URL.revokeObjectURL(downloadUrl)
        }
    }, [downloadBlob]) */

    useEffect(() => {
        loadSnippet && setClearConfirm(false)
    }, [loadSnippet])

    useEffect(() => {
        createNew && setClearConfirm(false)
    }, [createNew])

    useEffect(() => {
        if (sharedSnippetHome) {
            const setShared = (snippet) => {
                setSharedSnippet(snippet)
                setSharedLoading(false)
            }
            getSharedSnippet(userShareId, snippetShareId, setShared)
        } else {
            setSharedLoading(false)
        }
    }, [sharedSnippetHome])

    useEffect(() => {
        const setShared = (sharedSnippet) => {
            dispatch(setLoadSnippet(true))
            dispatch(setCurrentSnippet(sharedSnippet))
            setHtml(sharedSnippet.html)
            setCss(sharedSnippet.css)
            setJs(sharedSnippet.js)
        }

        sharedSnippet && setShared(sharedSnippet)
    }, [sharedSnippet])

    useEffect(() => {
        /* clear undo-redo stack */
        let modelHtml = editorHtml?.current?.getModel();
        let modelCss = editorCss?.current?.getModel();
        let modelJs = editorJs?.current?.getModel();

        if (!user.userId) {
            if (modelHtml) modelHtml.setValue("");
            if (modelCss) modelCss.setValue("");
            if (modelJs) modelJs.setValue("");
        } else {
            if (modelHtml) {
                modelHtml.setValue("")
                modelHtml.setValue(html)
            }
            if (modelCss) {
                modelCss.setValue("")
                modelCss.setValue(css)
            }
            if (modelJs) {
                modelJs.setValue("")
                modelJs.setValue(js)
            }
        }
    }, [user])

    useEffect(() => {
        const windowPaneResizeEvent = () => {
            const paneElem = splitPane.current?.pane1
            const containerElem = splitPane.current?.splitPane
            const paneWidth = paneElem?.getBoundingClientRect()?.width
            const paneStyleWidth = paneElem?.style?.width
            const containertWidth = containerElem?.getBoundingClientRect()?.width

            if (String(paneStyleWidth).endsWith("px")) {
                paneElem.style.width = (paneWidth / containertWidth) * 100 + "%"
            }
        }

        const defaultSizeEvent = () => {
            const paneElem = splitPane.current?.pane1
            if (paneElem) paneElem.style.width = "42%"
            htmlWrapper.current.style.height = "100%"
            cssWrapper.current.style.height = "100%"
            jsWrapper.current.style.height = "100%"
            iframeWrapper.current.style.height = "100%"
        }

        /* no ref provided */
        const resizer = document.querySelector(".Resizer.vertical")

        if (splitPane.current) {
            resizer?.addEventListener("dblclick", defaultSizeEvent)
            window.addEventListener("resize", windowPaneResizeEvent)
        }

        return () => {
            resizer?.removeEventListener("dblclick", defaultSizeEvent)
            window.removeEventListener("resize", windowPaneResizeEvent)
        }
    }, [splitPane.current])

    useEffect(() => {
        const paneResizeEvent = () => {
            window.innerWidth < 800 ? setPanelBreakpont(true) : setPanelBreakpont(false)
        }

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

        window.addEventListener("resize", paneResizeEvent)
        document.addEventListener("keydown", tabShortcut)
        editorHtml?.current?.focus()

        return () => {
            window.removeEventListener("resize", paneResizeEvent)
            document.removeEventListener("keydown", tabShortcut)
        }
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
                    </>
                    :
                    <>
                        <div className="tabs">
                            <div className="tabs__option"><button title="HTML (alt+shift+1)" data-active={tabActive === "html"} onClick={() => setTabActive("html")}><span>HTML</span></button></div>
                            <div className="tabs__option"><button title="CSS (alt+shift+2)" data-active={tabActive === "css"} onClick={() => setTabActive("css")}><span>CSS</span></button></div>
                            <div className="tabs__option"><button title="JS (alt+shift+3)" data-active={tabActive === "js"} onClick={() => setTabActive("js")}><span>JS</span></button></div>
                        </div>
                        <div className="currentSnippet">{currentSnippet?.name && `Current snippet: ${currentSnippet?.name}`}</div>
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
                                                    <button className="mainCode__input__type__iconBtn" title="Open command palette" onClick={() => { showCommandPalette() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className="mainCode__input__type__iconBtn" title="Format code" onClick={() => { runFormatCode() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code" viewBox="0 0 16 16">
                                                            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className={`mainCode__input__type__iconBtn ${wordWrap === "on" && "active-on"}`} title="Toggle line wrap" onClick={() => { toggleWordWrap() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-text-wrap" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className={`mainCode__input__type__iconBtn ${lineHighlight === "all" && "active-on"}`} title="Toggle line highlight" onClick={() => { toggleLineHighlight() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-asterisk" viewBox="0 0 16 16">
                                                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className={`mainCode__input__type__iconBtn ${minimap && "active-on"}`} title="Toggle minimap" onClick={() => { toggleMinimap() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-fullscreen" viewBox="0 0 16 16">
                                                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    copyClipboard ?
                                                        <button className="mainCode__input__type__iconBtn" title="Copy to clipboard" onClick={() => { copyToClipboard() }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi clipboard-check-fill" viewBox="0 0 16 16">
                                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                                            </svg>
                                                        </button>
                                                        :
                                                        <button className="mainCode__input__type__iconBtn" title="Copy to clipboard" onClick={() => { copyToClipboard() }}>
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
                                        <div className={`mainCode__input__textWrapper ${tabActive !== "html" && "d-none"} ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <div ref={htmlWrapper} className="mainCode__input__textWrapper__inner">
                                                <Editor onMount={(e) => handleEditorMount(e, "html")} options={monacoOptions} defaultLanguage="html" value={html} onChange={e => setHtml(e)} theme={darkTheme ? "vs-dark" : "vs-light"} />
                                            </div>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <div ref={cssWrapper} className="mainCode__input__textWrapper__inner">
                                                <Editor onMount={(e) => handleEditorMount(e, "css")} options={monacoOptions} defaultLanguage="css" value={css} onChange={e => setCss(e)} theme={darkTheme ? "vs-dark" : "vs-light"} />
                                            </div>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <div ref={jsWrapper} className="mainCode__input__textWrapper__inner">
                                                <Editor onMount={(e) => handleEditorMount(e, "js")} options={monacoOptions} defaultLanguage="javascript" value={js} onChange={e => setJs(e)} theme={darkTheme ? "vs-dark" : "vs-light"} />
                                            </div>
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
                                                        <Link to={downloadUrl} target="_blank" download="sandbox-code-output" title="Download code output" onClick={() => setDownloadCode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-check-fill" viewBox="0 0 16 16">
                                                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                            </svg>
                                                        </Link>
                                                        :
                                                        <Link to={downloadUrl} target="_blank" download="sandbox-code-output" title="Download code output" onClick={() => setDownloadCode(true)}>
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
                                        <div ref={iframeWrapper} className={`mainCode__output__iframeWrapper ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <iframe src={codeOutput} allow="fullscreen; accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" ref={iframe} className="mainCode__output__iframe" title="Output" name="output">
                                            </iframe>
                                        </div>
                                    </div>
                                </>
                                :
                                <SplitPane ref={splitPane} split="vertical" minSize={300} defaultSize={"42%"} maxSize={-214} onDragStarted={() => { setPanelDrag(true) }} onDragFinished={() => { setPanelDrag(false); }}>
                                    <div className={`mainCode__input ${panelDrag && "pe-none"}`}>
                                        <div className="mainCode__input__type">
                                            <span className="mainCode__input__type__active">
                                                <span>INPUT-</span>
                                                <span>{tabActive.toUpperCase()}</span>
                                            </span>
                                            <span className="mainCode__input__type__btnWrapper">
                                                {
                                                    <button className="mainCode__input__type__iconBtn" title="Open command palette" onClick={() => { showCommandPalette() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className="mainCode__input__type__iconBtn" title="Format code" onClick={() => { runFormatCode() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-code" viewBox="0 0 16 16">
                                                            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className={`mainCode__input__type__iconBtn ${wordWrap === "on" && "active-on"}`} title="Toggle line wrap" onClick={() => { toggleWordWrap() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-text-wrap" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className={`mainCode__input__type__iconBtn ${lineHighlight === "all" && "active-on"}`} title="Toggle line highlight" onClick={() => { toggleLineHighlight() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-asterisk" viewBox="0 0 16 16">
                                                            <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    <button className={`mainCode__input__type__iconBtn ${minimap && "active-on"}`} title="Toggle minimap" onClick={() => { toggleMinimap() }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-fullscreen" viewBox="0 0 16 16">
                                                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                                                        </svg>
                                                    </button>
                                                }
                                                {
                                                    copyClipboard ?
                                                        <button className="mainCode__input__type__iconBtn" title="Copy to clipboard" onClick={() => { copyToClipboard() }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi clipboard-check-fill" viewBox="0 0 16 16">
                                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                                            </svg>
                                                        </button>
                                                        :
                                                        <button className="mainCode__input__type__iconBtn" title="Copy to clipboard" onClick={() => { copyToClipboard() }}>
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

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "html" && "d-none"} ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <div ref={htmlWrapper} className="mainCode__input__textWrapper__inner">
                                                <Editor onMount={(e) => handleEditorMount(e, "html")} options={monacoOptions} defaultLanguage="html" value={html} onChange={e => setHtml(e)} theme={darkTheme ? "vs-dark" : "vs-light"} />
                                            </div>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "css" && "d-none"} ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <div ref={cssWrapper} className="mainCode__input__textWrapper__inner">
                                                <Editor onMount={(e) => handleEditorMount(e, "css")} options={monacoOptions} defaultLanguage="css" value={css} onChange={e => setCss(e)} theme={darkTheme ? "vs-dark" : "vs-light"} />
                                            </div>
                                        </div>

                                        <div className={`mainCode__input__textWrapper ${tabActive !== "js" && "d-none"} ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <div ref={jsWrapper} className="mainCode__input__textWrapper__inner">
                                                <Editor onMount={(e) => handleEditorMount(e, "js")} options={monacoOptions} defaultLanguage="javascript" value={js} onChange={e => setJs(e)} theme={darkTheme ? "vs-dark" : "vs-light"} />
                                            </div>
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
                                                        <Link to={downloadUrl} target="_blank" download="sandbox-code-output" title="Download code output" onClick={() => setDownloadCode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-file-check-fill" viewBox="0 0 16 16">
                                                                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1.146 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                            </svg>
                                                        </Link>
                                                        :
                                                        <Link to={downloadUrl} target="_blank" download="sandbox-code-output" title="Download code output" onClick={() => setDownloadCode(true)}>
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
                                        <div ref={iframeWrapper} className={`mainCode__output__iframeWrapper ${html === "" && css === "" && js === "" && `dim`}`}>
                                            <iframe src={codeOutput} allow="fullscreen; accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share" ref={iframe} className="mainCode__output__iframe" title="Output" name="output">
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
