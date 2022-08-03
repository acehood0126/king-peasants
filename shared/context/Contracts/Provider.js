import React, { useCallback, useMemo, useEffect, useState } from 'react'
import abis from '../../abis'
import useWeb3 from '../../hooks/useWeb3'
import { Contract, BigNumber, utils } from 'ethers'

import Context from './Context'
import addresses from '../../addresses'

const Provider = ({ children }) => {
  
  const [king, setKing] = useState(
    new Contract(addresses.King, abis.King)
  )  

  const DECIMALS = 18;

  const { wallet, walletAddress, chainId, connected } = useWeb3()  

  //return an array of objects according to key, value, or key and value matching
  function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
    }
    return objects;
  }

  useEffect(() => {
    if (!!wallet && !king.signer) {
      setKing(king.connect(wallet))
    }
  }, [wallet])

  const getBalance = useCallback(async (contract, userAddress) => {      
    const address = userAddress || walletAddress
    if (!address || !contract?.signer) return null
    try {
      let balance = await contract.balanceOf(address)     
      const decimals = await contract.decimals()    
      return parseFloat(utils.formatUnits(balance, decimals))
    } catch (e) {}
    return null
  }, [walletAddress] )
  return (
    <Context.Provider
      value={{
        getBalance,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
