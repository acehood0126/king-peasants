import {useState, useEffect, useRef} from "react"
import Modal from "./modal"

export default function ModalWhitePaper({ onClose, children }) {
    return (
        <Modal onClose={onClose}>
            <div className="whitepaper">
                <h2 className="whitepaper-title text-center mb-5">Whitepaper</h2>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">Introduction</h3>
                    <p>
                      Kings and Peasants is a medieval themed NFT game on the Polygon blockchain inspired by the wolf game.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">LORE</h3>
                    <p>
                      In the highlands of a distant kingdom peasants try to feed their families and loved ones by harvesting $WHEAT all year round.
                      <br/><br/>
                      But the king demands his share of any harvest made by the peasants. If the peasants want to be able to spend the winter they will have to hide part of their harvest, but if the king learns that they hide part of the harvest, he will then take the entire harvest of $WHEAT.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">When can I mint ?</h3>
                    <p>
                      TBA
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">Whitelist</h3>
                    <p>
                      There will be a total of 350 whitelist spot. Those who are whitelisted can mint before the public release.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">How many NFT can I mint ?</h3>
                    <p>
                      Each wallet can mint up to 50 NFT with a limit of 10 NFT per transaction.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">Where can I mint ?</h3>
                    <p>
                      Minting will be done through the mint button on the official website
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">What can the King do ?</h3>
                    <p>
                      a. Staking : kings will earn 20% of all the $WHEAT farmed by peasants
                    </p>
                    <p>
                      b. Kings have a 50% chance to steal all the $WHEAT from a Peasant that is being unstaked (30% for Gen0)
                    </p>
                    <p>
                      c. Staked Kings have 10% chance to steal a newly minted King or Peasant
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">What can the Peasant do ?</h3>
                    <p>
                      a. Staking : Peasant will farm 10,000 $WHEAT a day
                    </p>
                    <p>
                      b. Claim : You receive 80% of the $WHEAT you farmed
                    </p>
                    <p>
                      c. Unstake : You try to hide the $WHEAT from the Kings, you can only do that if you have 20,000 $WHEAT
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">What is $WHEAT ?</h3>
                    <p>
                      $WHEAT is the daily rewards for staked Kings and Peasants.
                      <br/><br/>
                      $WHEAT can be used to mint new Kings or Peasants after the initial 10,000 mints are sold out.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">Dark Merchant</h3>
                    <p>
                      Dark merchants are a token that opens up an alternative way of staking for you. Each merchant allows you to farm 20,000 $WHEAT per day with 5 staked Peasants.
                    </p>
                </div>

                {/* <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">MINTING</h3>
                    <div className="scroll-x-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <td>Generation</td>
                                    <td>Token ID</td>
                                    <td>Minting Cost</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="mb-5">
                    <h3 className="whitepaper-title text-center mb-4">Kings</h3>
                    <div className="scroll-x-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <td>Generation</td>
                                    <td>Token ID</td>
                                    <td>Minting Cost</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="">
                    <h3 className="whitepaper-title text-center mb-4">Peasants</h3>
                    <div className="scroll-x-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <td>Generation</td>
                                    <td>Token ID</td>
                                    <td>Minting Cost</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                                <tr><td>0</td><td>1 - 5,000</td><td>0,01/0,03 WETH*</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}

            </div>
        </Modal>
    )
}