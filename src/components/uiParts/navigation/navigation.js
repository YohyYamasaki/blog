import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'

const Navigation = () => {
  return (
    <header className={styles.headerOuter}>
      <Link to="/" activeClassName={styles.active}>
        <h1 className={styles.title}>yayoi's blog</h1>

        <h2 className={styles.description}>
          ドイツ移住、海外同性婚、
          <br />
          フロントエンド開発、ロンドン大学のことなど
        </h2>
      </Link>

      <div className={styles.headerInner}>
        <Link to="/" activeClassName={styles.active}>
          <p className={styles.name}>yayoi's blog</p>
        </Link>
      </div>
    </header>
  )
}

export default Navigation
