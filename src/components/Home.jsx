import { useEffect, useRef, useState } from "react"

export default function Home() {
    const [tabActive, setTabActive] = useState("html")
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [js, setJs] = useState("")
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

        window.onbeforeunload = () => {
            if (html === "" && css === "" && js === "") {
                return null
            } else {
                return true;
            }
        };

        if (textCursor) {
            /* const selection = (textarea.current.selectionEnd - textarea.current.selectionStart)
            const newLength = textarea.current.length - selection + 2 */

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
                        <span>INPUT-</span>
                        <span>{tabActive.toUpperCase()}</span>
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
