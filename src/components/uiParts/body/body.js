import React from 'react'

import * as styles from './body.module.css'

const Body = (props) => <div className={styles.body}>{props.children}</div>

export default Body
