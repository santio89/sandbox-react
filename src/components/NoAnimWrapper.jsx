import React, { useEffect, useRef } from 'react'

export default function AnimWrapper({ children }) {

    return (
        <div className="animWrapper">
            {children}
        </div>
    )
}
