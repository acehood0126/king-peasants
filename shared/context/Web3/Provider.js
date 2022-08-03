import React, { useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Context from './Context'
import addresses from '../../addresses'
import abis from '../../abis'
import { decodeBase64 } from '../../../helpers'

const Provider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(undefined)
  const [installed, setInstalled] = useState(false)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [wallet, setWallet] = useState(undefined)
  const [walletBalance, setWalletBalance] = useState(undefined)
  const [chainId, setChainId] = useState(undefined)
  const [currentProvider, setCurrentProvider] = useState(undefined)

  const [totalMinted, setTotalMinted] = useState(undefined)
  const [maxMint, setMaxMint] = useState(undefined)
  const [mintingPrice, setMintingPrice] = useState(undefined)
  const [wheatAddress, setWheatAddress] = useState(undefined)
  const [wethAddress, setWethAddress] = useState(undefined)

  const [mintedKings, setMintedKings] = useState([])
  const [mintedPeasants, setMintedPeasants] = useState([])

  const [minting, setMinting] = useState(false)

  const [gameInfoInterval, setGameInfoInterval] = useState(2000)
  const [nftInfoInterval, setNftInfoInterval] = useState(4000)

  const handleConnect = async () => {

    setConnecting(true)

    let provider = null
    try {
      provider = await web3Modal?.connect();
    } catch(e) {

    }
    
    try {
      if (provider) {
        const newWeb3 = new ethers.providers.Web3Provider(provider)
        const accounts = await newWeb3.listAccounts()
        const balance = await newWeb3.getBalance(accounts[0])
        
        setWalletBalance(ethers.utils.formatEther(balance))
        setWalletAddress(accounts[0])
        setWallet(newWeb3.getSigner())
        setConnected(true)
        if(newWeb3.provider.chainId === 137)
          setChainId("0x89")
        else
          setChainId(newWeb3.provider.chainId)
  
        setCurrentProvider(provider)
  
        if(window.localStorage)
          window.localStorage.setItem("wallet_connect", true);
  
        provider.on('accountsChanged', (newAccounts) => {
          if (Array.isArray(newAccounts) && newAccounts.length) {
            setWalletAddress(newAccounts[0])
          } else if(newAccounts?.length === 0) {
            handleDisconnect()
          }
        }) 
        
        provider.on('chainChanged', (chainId, oldChainId) => {
          setChainId(chainId)
        })
  
      } else {
        await handleDisconnect()
      }
    }
    catch (error) {
      console.log(error)
    }

    setConnecting(false)
  }

  const switchNetwork = async (newChainId) => {  
    if(currentProvider) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: newChainId }],
        });
      } catch (switchError) {
        console.log("switchError:", switchError)
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                { 
                  chainId: newChainId,
                  chainName: addresses.networkName,
                  rpcUrls: [addresses.rpcURL],
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
            console.log("addError:", addError)
          }
        }
        // handle other "switch" errors
      }
    }
  }

  const handleDisconnect = async () => {
    setConnected(false)
    setWalletAddress(undefined)
    setWallet(undefined)
    if(web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    if(window.localStorage)
      window.localStorage.setItem("wallet_connect", false);
  }

  const mint = async (count) => {
    
    if (count <= 0 || count > 10) {
      return
    }

    if(!currentProvider || !wallet) {
      return
    }

    setMinting(true)

    try {
      const newWeb3 = new ethers.providers.Web3Provider(currentProvider)

      const kingContract = new ethers.Contract(addresses.King, abis.King, newWeb3)

      const kingContractWithSigner = kingContract.connect(wallet)

      const tx = await kingContractWithSigner.mint(count)

      //await waitForTransaction(tx, 1000)
    }
    catch (error) {
      console.log("mint error:", error)
    }
    setMinting(false)
  }

  const getGameInfo = async () => {

    if (!currentProvider) {
      setTimeout(getGameInfo, gameInfoInterval)
      return
    }

    try {
      const newWeb3 = new ethers.providers.Web3Provider(currentProvider)
      const accounts = await newWeb3.listAccounts()

      if (accounts.length === 0) {
        setTimeout(getGameInfo, gameInfoInterval)
        return
      }

      //const theAccount = accounts[0]
      const kingContract = new ethers.Contract(addresses.King, abis.King, newWeb3)

      // get $wheat balance of account
      // get total $wheat mined by peasants
      // get total peasants staked
      // total minted
      const minted = await kingContract.minted()
      setTotalMinted(minted)

      // max mint
      const maxMint = await kingContract.MAX_TOKENS()
      setMaxMint(maxMint)

      // minting price
      let mintingPrice = await kingContract.MINT_PRICE()
      mintingPrice = ethers.utils.formatUnits(mintingPrice, 18)
      setMintingPrice(mintingPrice)

      // weth address
      let wethAddress = await kingContract.weth()
      setWethAddress(wethAddress)

      // wheat address
      let wheatAddress = await kingContract.wheat()
      setWheatAddress(wheatAddress)

      setTimeout(getGameInfo, gameInfoInterval)
      return
    }
    catch (error) {
      console.log("getting game info error: " + error)
      setTimeout(getGameInfo, gameInfoInterval)
      return
    }
  }

  const getNFTInfo = async () => {

    if (!currentProvider) {
      setTimeout(getNFTInfo, nftInfoInterval)
      return
    }

    try {
      const newWeb3 = new ethers.providers.Web3Provider(currentProvider)
      const accounts = await newWeb3.listAccounts()

      if (accounts.length === 0) {
        setTimeout(getNFTInfo, nftInfoInterval)
        return
      }

      const kingContract = new ethers.Contract(addresses.King, abis.King, newWeb3)

      let mintedTokenIds = await kingContract.getTokenIds(walletAddress)

      let peasants = []
      let kings = []
      for (let i = 0; i < mintedTokenIds.length; i++) {

        // tokenId
        let tokenId = mintedTokenIds[i]

        // traits
        let traits = await kingContract.getTokenTraits(tokenId)

        let token = {}

        token.tokenId = tokenId.toNumber()

        // token metadata
        let tokenURI = await kingContract.tokenURI(tokenId)

        let traitsString = decodeBase64(tokenURI, 29)
        if (traitsString) {
          let traitsJSON = JSON.parse(traitsString)
          if (traitsJSON) {
            // load and set attributes
            let attributes = traitsJSON.attributes
            console.log("attributes", attributes)
            for (const attribute of attributes) {
              token[attribute.trait_type] = attribute.value
            }

            // load image string
            let imageData = traitsJSON.image
            if (imageData) {
              let svgString = decodeBase64(imageData, 26)
              token.svg = svgString
            }
          }
        }

        if (traits.isPeasant) {
          peasants.push(token)
        }
        else {
          kings.push(token)
        }
      }

      // get images

      // minted kings
      setMintedKings(kings)

      // minted peasants
      setMintedPeasants(peasants)

      setTimeout(getNFTInfo, nftInfoInterval)
    }
    catch (error) {
      console.log("getting nft info error: " + error)
      setTimeout(getNFTInfo, nftInfoInterval)
      return
    }
  }

  const checkTransaction = async (hash) => {
    if(currentProvider) {       
      
      const newWeb3 = new ethers.providers.Web3Provider(currentProvider, "any")
      return await newWeb3.perform('getTransactionReceipt', {transactionHash: hash})
    }
    return null
  }

  const waitForTransaction = (hash, timeOut = 1000) => {
    return new Promise((resolve, reject) => {
      if(hash === null || hash === undefined) { 
        reject()
        return
      }
      const interval = setInterval(async () => {
          const result = await checkTransaction(hash)
          if(result) {   
              if(result.status === '0x1' || result.status === 1) {
                resolve();
              } else {
                reject();
              }
              
              clearInterval(interval)
          }
      }, timeOut)
    })
  }

  const initWeb3Modal = async () => {
    try {
        if (!web3Modal) {
            const providerOptions = {
                metamask: {
                    id: "injected",
                    name: "MetaMask",
                    type: "injected",
                    check: "isMetaMask",
                }
            };

            const web3Modal = new Web3Modal({
                network: "polygon",
                cacheProvider: true,
                providerOptions,
                theme: 'light',
            })

            setWeb3Modal(web3Modal)
        }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setInstalled(true)
      if (web3Modal && web3Modal.connected)
        handleConnect()

      if (connected){
        handleConnect()
      }
    }
    else {
      setInstalled(false)
    }
  }, [setWeb3Modal, web3Modal])

  useEffect(() => {    
    if(window.localStorage)
      setConnected(JSON.parse(localStorage.getItem('wallet_connect')))
    initWeb3Modal()
  }, [])

  useEffect(() => {
    if (currentProvider) {
      getGameInfo()
      getNFTInfo()
    }
  }, [currentProvider])

  return (
    <Context.Provider
      value={{
        handleConnect,
        handleDisconnect,
        switchNetwork,
        mint,
        installed,
        connected,
        connecting,
        minting,
        walletAddress,
        walletBalance,
        wallet,
        chainId,
        totalMinted,
        maxMint,
        mintingPrice,
        mintedKings,
        mintedPeasants,
        checkTransaction,
        waitForTransaction
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
