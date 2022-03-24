import React from 'react'
import { Link, graphql } from 'gatsby'

import * as styles from './neighbor-post.module.css'

const NeighborPost = ({ url, title, navText }) => {
  return (
    <Link to={url}>
      <div className={styles.container}>
        <p className={styles.navText}>{navText}</p>
        <p className={styles.title}>{title}</p>
      </div>
    </Link>
  )
}

export default NeighborPost
