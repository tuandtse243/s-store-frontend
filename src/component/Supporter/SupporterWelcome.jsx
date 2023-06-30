'use client'
import React, { useState } from 'react'
import styles from './SupporterWelcome.module.scss'

const SupporterWelcome = () => {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.birdsContainer}>
        <image src="https://clipart-library.com/img1/1663317.gif" height="100px" draggable="false"/>
      </div>
      <div className={styles.welcome}>Welcome Admin!</div>
    </div>
  )
}

export default SupporterWelcome