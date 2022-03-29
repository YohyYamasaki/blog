import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../layout'
import PostPreview from '../../organisms/post-preview/post-preview'
import * as styles from './index.module.css'
import PagenationIndex from '../../pagenation/pagenation'
import Category from '../../organisms/category/category'
import MainContainer from '../../uiParts/main-container/main-container'
import SubContainer from '../../uiParts/sub-container/sub-container'
import Seo from '../../seo'
import Profile from '../../organisms/profile/profile'

const Index = ({ data, pageContext }) => {
  const posts = data.allContentfulBlogPost.nodes

  return (
    <Layout>
      <Seo />
      <div className={styles.container}>
        <MainContainer className={styles.main}>
          <h1 className={styles.categoryName}>すべての記事</h1>
          <div className={styles.articleSpace}>
            <PostPreview posts={posts} />
            <PagenationIndex pageContext={pageContext} />
          </div>
        </MainContainer>
        <div className={styles.space}></div>
        <SubContainer className={styles.category}>
          <div className={styles.profile}>
            <Profile />
          </div>
          <Category />
        </SubContainer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { order: DESC, fields: publishDate }
      skip: $skip
      limit: $limit
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
export default Index
