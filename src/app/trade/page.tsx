"use client"

import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import ai_villager from '../../img/ai_villager.png'
import ai_steve from '../../img/ai_steve.png'
import Image from 'next/image'
import { UserModel, ItemModel, TradeModel } from '../../models/models'


export default function App() {

    return (
    <>
        <form className='new-item-form'>
            <div className={styles.title_div}>
                <img src="https://i.imgur.com/SuaiIKE.png" alt="Minecraft Logo" className="minecraft-logo img-fluid" />
            </div>
        
        </form>

        <div className = {styles.trade_div}>
            <div className={styles.trade_box}>
                <div className = {styles.head_box}>
                    <Image src = {ai_villager} alt = "Merchant" className="img-fluid"></Image> 
                    <div>
                    <p className={styles.name}>Merchant Inventory
                    </p>
                    </div>
                    
                </div>
            </div>
            <div className={styles.trade_box}>
                <div className = {styles.head_box}>
                    <Image src = {ai_steve} alt = "steve" className="img-fluid"></Image> 

                        <p className={styles.name}>Your
                            Inventory
                        </p>
                        
                    </div>
            </div>
        </div>
    </> 
    )
}