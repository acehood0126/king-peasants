import {useState, useEffect, useRef} from "react"
import Link from 'next/link'
import Image from 'next/image'
import Modal from "./modal"
import useWeb3 from '../shared/hooks/useWeb3'
import MetamaskLogo from '/assets/image/metamask-fox.svg'

export default function ModalMetamask({ onClose, children }) {

  const { installed, connected, connecting, handleConnect, handleDisconnect, chainId } = useWeb3()
  
  const handleConnectClick = () => {
    handleConnect()
  }

  return (
    <Modal onClose={onClose}>
        <div className="connect-wallet text-center">
            <h5 className="connect-wallet-text mb-3">Please connect your Wallet.</h5>
            
            <Image src={MetamaskLogo} width={87.5} height={82.5}/>

            <h5 className="connect-wallet-text mb-0">New to Ethereum?</h5>

            <div className="mb-4">
              <Link href="https://metamask.io/faqs.html" className="connect-wallet-link">
                <a target="_blank" rel="noreferrer">
                  Learn more about Metamask wallet
                </a>
              </Link>
            </div>

            {!installed &&
              <Link href="https://metamask.io/" className="connect-wallet-link">
                <a target="_blank" rel="noreferrer">
                  <div className="kp-button kp-connect-wallet">
                    INSTALL METAMASK
                  </div>
                </a>
              </Link>
            } 

            {(installed && !connecting) &&
              <div className="kp-button kp-connect-wallet" onClick={handleConnectClick}>
                CONNECT
              </div>
            }  

            {(installed && connecting) &&
              <div className="kp-button kp-connect-wallet">
                CONNECTING
              </div>
            }
        </div>
    </Modal>
  )
}