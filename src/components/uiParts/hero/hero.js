import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import * as styles from './hero.module.css'

const Hero = ({ image, title, content }) => (
  <div className={styles.hero}>
    <h1 className={styles.title}>
      <span className={styles.title_span}>{title}</span>
    </h1>

    {image && (
      <GatsbyImage className={styles.image} alt={title} image={image} />
    )}
    <div className={styles.details}></div>
  </div>
)

export default Hero
