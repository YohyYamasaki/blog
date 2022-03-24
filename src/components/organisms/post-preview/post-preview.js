import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Tags from '../../uiParts/tags/tags'
import * as styles from './post-preview.module.css'

const PostPreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null
  return (
    <div>
      <ul className={styles.articleList}>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className={styles.link}>
                <div className={styles.card}>
                  <GatsbyImage
                    className={styles.image}
                    image={post.heroImage?.gatsbyImageData}
                  />
                  <div className={styles.article}>
                    <h4 className={styles.title}>{post.title}</h4>
                    <div>
                      <p className={styles.text}>
                        {post.body?.childMarkdownRemark?.html
                          .replace(/(<([^>]+)>)/gi, '')
                          .substr(0, 100) + '...'}
                      </p>
                    </div>
                    <div className={styles.meta}>
                      <small className="meta">
                        {post.publishDate.substr(0, 10)}
                      </small>
                      <Tags tags={post.tags} />
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PostPreview
