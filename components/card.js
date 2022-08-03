import {useState, useEffect, useRef} from "react"

export default function Card({ className, children }) {
    return (
        <div className={`kp-card ${className}`}>
            {children}
        </div>
    )
}