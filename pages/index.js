import React, {useState, useEffect} from "react"
import useWeb3 from '../shared/hooks/useWeb3'
import Image from "next/image"
import { Row, Col, Button } from "react-bootstrap"
import Header from "../components/header"
import Card from "../components/card"
import ConnectWallet from "../components/connect-wallet"
import StakeCard from "../components/stake-card"
import ContractDetail from "../components/contract-detail"
import { formatNumber } from "../helpers"
import addresses from "../shared/addresses"

export default function Home(props) {

  const [mintCount, setMintCount] = useState(1)
  const [wheatBalance, setWheatBalance] = useState(0.00)
  const [peasantsMinedWheat, setPeasantsMinedWheat] = useState(2509913.89)
  const [stakedPeasants, setStakedPeasants] = useState(10730)

  const { 
    connected, walletAddress, totalMinted, maxMint, 
    mintingPrice, minting, mintedKings, mintedPeasants, 
    handleConnect, handleDisconnect, chainId, 
    switchNetwork, mint 
  } = useWeb3()

  const handleMintClick = (e) => {
    // if (mintCount <= 0 || mintCount > 10) {
    //   alert("Mint can be done")
    // }
    mint(mintCount)
  }

  return (
    <div className="container"> 
        <Header />
        {(!connected || chainId !== addresses.networkID ) &&
          <Card className="text-center card-connect">
            <div className="text-large mb-3">Join the Game</div>
            {(connected && chainId !== addresses.networkID) ? (
              <div className="kp-button kp-connect-wallet" onClick={() => switchNetwork(addresses.networkID)}>
                  Switch To Polygon
              </div>
            ) : (
              <ConnectWallet/>
            )}
          </Card>
        }
        {(connected && chainId === addresses.networkID) &&
        <>
          <ContractDetail
            accountAddress={walletAddress}
            wheatBalance={wheatBalance}
            peasantsMinedWheat={peasantsMinedWheat}
            stakedPeasants={stakedPeasants}
          />
          <Card className="text-center card-mint mb-5">
            <h3 className="mb-3">Minting</h3>
            <div className="text-large mb-3">Total minted: {formatNumber(totalMinted)} / {formatNumber(maxMint)}</div>
            <div className="text-large mb-3">Mint price: {mintingPrice} WETH</div>
            <div className="d-flex justify-content-center">
              <input type="number" className="textfield" value={mintCount} onChange={e => setMintCount(e.target.value)} max="10" min="1"/>
              <div className="kp-button mint-button" onClick={handleMintClick}>
                {!minting && 'Mint'}
                {minting && 'Minting'}
              </div>
            </div>
          </Card>
          <Row className="gy-3">
            <Col lg={6}>
              <StakeCard unit="King" tokens={mintedKings}/>
            </Col>
            <Col lg={6}>
              <StakeCard unit="Peasant" tokens={mintedPeasants}/>
            </Col>
          </Row>
        </>
        }
    </div>
  )
}
