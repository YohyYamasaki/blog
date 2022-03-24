import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../layout'
import PostPreview from '../../organisms/post-preview/post-preview'
import * as styles from '../homepage/index.module.css'
import MainContainer from '../../uiParts/main-container/main-container'
import SubContainer from '../../uiParts/sub-container/sub-container'
import Category from '../../organisms/category/category'

const TagPage = ({ data, pageContext }) => {
  const posts = data.allContentfulBlogPost.nodes
  const tagName = pageContext.tagName

  return (
    <Layout>
      <div className={styles.container}>
        <MainContainer className={styles.body}>
          <h1 className={styles.categoryName}>{tagName} </h1>
          <p className={styles.number}>{posts.length}件の記事があります</p>
          <div className={styles.articleSpace}>
            <PostPreview posts={posts} />
          </div>
        </MainContainer>
        <SubContainer className={styles.category}>
          <Category />
        </SubContainer>
      </div>
    </Layout>
  )
}

export default TagPage

export const query = graphql`
  query TagPageByTagName($tagName: String!) {
    allContentfulBlogPost(
      sort: { order: ASC, fields: contentful_id }
      filter: { tags: { elemMatch: { title: { eq: $tagName } } } }
    ) {
      nodes {
        publishDate
        updatedAt
        title
        slug
        tags {
          title
        }
        id
        body {
          childMarkdownRemark {
            html
          }
        }
        heroImage {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1000)
          resize(height: 1000, width: 1000) {
            src
          }
        }
      }
    }
  }
`
