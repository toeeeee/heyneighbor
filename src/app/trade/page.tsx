"use client"

import React, { useState } from 'react'
import styles from './page.module.css'
import ai_villager from '../../img/ai_villager.png'
import ai_steve from '../../img/ai_steve.png'
import Image from 'next/image'

export default function App() {
    const [item, setItem] = useState("");
    const [count, setCount] = useState(0);
    const [vote, setVote] = useState("");
  
    const handleUpvote = () => {
      if (vote === "") {
        setCount(count + 1);
        setVote("upvote");
      } else if (vote === "downvote") {
        setCount(count + 2); 
        setVote("upvote");
      }
    };
  
    const handleDownvote = () => {
      if (vote === "") {
        setCount(count - 1);
        setVote("downvote");
      } else if (vote === "upvote") {
        setCount(count - 2);
        setVote("downvote");
      }
    }

    const handleReset = () => {
        setCount(0);
        setVote("");
    }
    return (
    <>
        <form className='new-item-form'>
            <div className={styles.title_div}>
            <img src="https://i.imgur.com/SuaiIKE.png" alt="Minecraft Logo" className="minecraft-logo" />

                <div className="search-section">
                    <input
                        className={styles.search_bar}
                        value={item}
                        onChange={e => setItem(e.target.value)} 
                        type="text" id="search bar" 
                    />
                    <button className={styles.search_button}>search</button>
                </div>
            </div>
        
        </form>
        <div>
            Counter: {count}
        </div>
        <div className = "counter-buttons">
            <button className={styles.vote_button} onClick={handleUpvote}>+1</button>
            <button className={styles.vote_button} onClick={handleDownvote}>-1</button>
            <button className={styles.vote_button} onClick={handleReset}>reset</button>
        </div>
        <div className = {styles.trade_div}>
            <div className={styles.trade_box}>
                <div className = {styles.head_box}>
                    <Image src = {ai_villager} alt = "Merchant" className="merchant-logo img-responsive"></Image> 
                    <div>
                    <p className={styles.name}>Merchant Inventory
                    </p>
                    </div>
                    
                </div>
            </div>
            <div className={styles.trade_box}>
                <div className = {styles.head_box}>
                    <Image src = {ai_steve} alt = "steve" className="steve-logo img-responsive"></Image> 

                        <p className={styles.name}>Your
                            Inventory
                        </p>
                        
                    </div>
            </div>
        </div>
    </> 
    )
}