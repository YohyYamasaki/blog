import React from 'react'
import * as styles from './main-container.module.css'

const MainContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>
}
export default MainContainer
