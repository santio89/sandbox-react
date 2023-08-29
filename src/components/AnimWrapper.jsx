import React, { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'

export default function AnimWrapper({ children }) {

    const parentAnim = useRef(null)

    useEffect(() => {
        parentAnim.current && autoAnimate(parentAnim.current)
    }, [parentAnim])

    return (
        <div ref={parentAnim} style={{ width: "100%", display: "flex", justifyContent: "center", alignItens: "center", gap: "1rem", flexFlow: "row wrap" }}>
            {children}
        </div>
    )
}
