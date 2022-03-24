import React from 'react'
import { Link } from 'gatsby'

import * as styles from './category.module.css'

const Category = ({ data }) => {
  const categoryList = ['ドイツ', 'WEB', 'UoL', '雑記']

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>カテゴリー</h3>
      <ul className={styles.category}>
        {categoryList.map((cat) => (
          <Link to={`/tags/${cat}`} className={styles.link}>
            <li className={styles.items}>
              <div>{cat}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Category
