import React from 'react'
import { navigate } from 'gatsby'
// import Pagination from '@mui/material/Pagination'

import * as styles from './pagenation.module.css'

const PagenationIndex = ({ pageContext }) => {
  const { numberOfPages, humanPageNumber } = pageContext

  const handleChange = (event, value) => {
    value === 1 ? navigate(`/`) : navigate(`/${value}`)
  }
  return (
    <div className={styles.pagenation}>
      {/* <Pagination
        defaultPage={humanPageNumber}
        count={numberOfPages}
        onChange={handleChange}
      /> */}
    </div>
  )
}
export default PagenationIndex
