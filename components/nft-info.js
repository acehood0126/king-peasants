import {useState, useEffect, useRef} from "react"

export default function NftInfo({ className, image, price, name, id, selected, onClick }) {

    return (
        <div className={`kp-nft ${className} ${selected ? "selected" : ""}`}>
            <div className="mb-2">$B: {price}</div>
            <div dangerouslySetInnerHTML={{ __html: image }} className="kp-nft-image" onClick={onClick}/>
            {/* <object data={image} className="kp-nft-image" onClick={onClick}/> */}
            <div className="mt-2">
                {name} <br/>
                #{id}
            </div>
        </div>
    )
}