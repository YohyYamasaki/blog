import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
import { faTwitter } from '@fontawesome/free-brands-svg-icons'

import * as styles from './profile.module.css'
import { StaticImage } from 'gatsby-plugin-image'

const Profile = ({ data }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>About</h3>
      <StaticImage src="../../../img/icon.jpg" className={styles.icon} />
      <Link to="https://twitter.com/__yayo1__" target="_blank">
        <p className={styles.name}>
          yayoi
          <FontAwesomeIcon icon={faTwitter} className={styles.twitter} />
        </p>
      </Link>

      <div className={styles.description}>
        <p>元紅茶バイヤーのフロントエンドエンジニア見習い。L(G)BT(Q)。</p>
        <p>
          ヨーロッパ企画とツナ缶が好きです。
          <br />
          2022年4月からドイツのゲッティンゲンに住んでいます。
        </p>
      </div>
    </div>
  )
}

export default Profile
