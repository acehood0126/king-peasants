import {useState, useEffect, useRef} from "react"
import useWeb3 from '../shared/hooks/useWeb3'
import ModalMetamask from "./modal-metamask"

export default function ConnectWallet() {

    const { connected, walletAddress, handleConnect, handleDisconnect, chainId } = useWeb3()

    const [showMetamaskDialog, setShowMetamaskDialog] = useState(false)

    const listRef = useRef(null);

    const handleClickOutside = (event) => {
      if (listRef.current && event.target instanceof Node && !listRef.current.contains(event.target)) {
        setShowMetamaskDialog(false);
      }
    }

    const handleCloseMetamaskDialog = () => {
      setShowMetamaskDialog(false);
    }

    const handleClick = () => {
      if (!connected) {
        setShowMetamaskDialog(true);
      } else {
        setShowMetamaskDialog(!showMetamaskDialog)
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
          document.removeEventListener('click', handleClickOutside);
      };
    }, [])

    return (
      <>
        {showMetamaskDialog && <ModalMetamask onClose={handleCloseMetamaskDialog}/>}
        <div className="kp-button kp-connect-wallet" onClick={handleClick}>
            Connect Wallet
        </div>
      </>
    )
}