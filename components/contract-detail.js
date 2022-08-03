import {useState, useEffect, useRef} from "react"

export default function ContractDetail({ accountAddress, wheatBalance, peasantsMinedWheat, stakedPeasants }) {
    return (
      <div className="info-panel mb-5">
        <div className="mb-3">Your Address: {accountAddress}</div>
        <div className="mb-3">$WHEAT Balance: {wheatBalance.toFixed(2)}</div>
        <div className="mb-3">Total $WHEAT mined by peasants: {peasantsMinedWheat.toFixed(2)}</div>
        <div className="mb-3">Total peasants staked: {stakedPeasants}</div>
      </div>
    )
}