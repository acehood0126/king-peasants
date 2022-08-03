import {useState, useEffect, useRef} from "react"
import ModalWhitePaper from "./modal-whitepaper"

export default function Header() {
    const [modalWhitePaper, setModalWhitePaper] = useState(false)

    return (
        <>
            {modalWhitePaper &&
                <ModalWhitePaper onClose={() => setModalWhitePaper(false)} />
            }
            <div className="title-container d-flex">
                <div className="me-3">
                    <h1> 
                        King and Peasant
                        <div className="title-sub">Runs on Polygon</div>
                    </h1>
                </div>
                <div className="navbar d-flex justify-content-center flex-wrap">
                    <div className="navbar-link" onClick={() => setModalWhitePaper(true)}>White Paper</div>
                    <div className="navbar-link">
                        <a href="#" target="_blank">Discord</a>
                    </div>
                    <div className="navbar-link">
                        <a href="#" target="_blank">Twitter</a>
                    </div>
                </div>
            </div>
        </> 
    )
}