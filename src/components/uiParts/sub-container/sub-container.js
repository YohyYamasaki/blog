import React from 'react'
import * as styles from './sub-container.module.css'

const SubContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>
}
export default SubContainer
