import {useState, useEffect, useRef} from "react"
import HorizontalScroll from "react-scroll-horizontal"
import Card from "./card"
import NftInfo from "./nft-info"

// const ITEMS = [
//     {
//         id: 2679,
//         price: 0.03,
//         image: "/image/punk-01.jpg",
//         selected: false,
//     },
//     {
//         id: 2680,
//         price: 0.03,
//         image: "/image/punk-02.jpg",
//         selected: false,
//     },
//     {
//         id: 2712,
//         price: 0.03,
//         image: "/image/punk-03.jpg",
//         selected: false,
//     },
//     {
//         id: 2634,
//         price: 0.03,
//         image: "/image/punk-04.jpg",
//         selected: false,
//     },
//     {
//         id: 2656,
//         price: 0.03,
//         image: "/image/punk-05.jpg",
//         selected: false,
//     },
//     {
//         id: 2632,
//         price: 0.03,
//         image: "/image/punk-06.jpg",
//         selected: false,
//     },
//     {
//         id: 2621,
//         price: 0.03,
//         image: "/image/punk-07.jpg",
//         selected: false,
//     },
//     {
//         id: 2690,
//         price: 0.03,
//         image: "/image/punk-08.jpg",
//         selected: false,
//     }
// ]

export default function StakeCard({ unit, tokens }) {
    const [items, setItems] = useState([])
    const refScrollContainer = useRef(null)

    const updateChoose = (index) => {
        setItems(items.map((item, idx) => {
            if(index === idx ){
                return {
                    ...item,
                    selected: !item.selected
                }
            }
            return item;
        }))
    }

    const getSelectedItemsCount = () => {
        let selected = 0;
        items.forEach((item) => {
            if(item.selected) 
                selected++
        })

        return selected;
    }

    const onSelectAll = () => {
        setItems(items.map((item) => ({
            ...item,
            selected: true
        })))
    }

    const handleWheel = (evt) => {        
        evt.preventDefault();
        refScrollContainer.current.scrollLeft += evt.deltaY;
    }

    useEffect(() => {
        if( refScrollContainer.current ) {
            refScrollContainer.current.addEventListener("wheel", handleWheel);
        }

        return () => {
            if( refScrollContainer.current ) {
                refScrollContainer.current.removeEventListener("wheel", handleWheel);
            }
        }
    }, [])

    useEffect(() => {
      let _items = tokens.map(token => {
        return {
          id: token.tokenId,
          price: 0.03,
          svg: token.svg,
          selected: false,
        }
      })
      setItems(_items)
    }, [tokens])

    return (
        <Card>
            <div className="d-flex align-items-center flex-wrap mb-3">
                <span className="me-3">Minted {unit}: {items.length} / Selected: {getSelectedItemsCount()}</span>
                <div className="kp-button btn--small" onClick={onSelectAll}>Select All</div>
            </div>
            <div className="w-100" style={{height: '200px'}}>
                <div className="scroll-x-wrapper" ref={refScrollContainer}>
                    <div className="d-flex mb-3">
                        {items.length === 0 ? (
                            <div className="text-center py-4">No Minted {unit}</div>
                        ) : (
                            items.map((item, idx) => (
                            <NftInfo key={`nft-${unit}-${item.id}`} image={item.svg} name={unit} id={item.id} price={item.price} selected={item.selected} onClick={() => updateChoose(idx)}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}