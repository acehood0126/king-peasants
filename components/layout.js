import {useState, useEffect, useRef} from "react"

export default function Layout({ children }) {
    return (
        <div className="root">
            <main className="main-container">{children}</main>
        </div>
    )
}