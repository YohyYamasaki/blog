import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../../seo'
import Layout from '../../layout'
import Hero from '../../uiParts/hero/hero'
import Tags from '../../uiParts/tags/tags'
import MainContainer from '../../uiParts/main-container/main-container'
import SubContainer from '../../uiParts/sub-container/sub-container'
import Profile from '../../organisms/profile/profile'

import * as styles from './blog-post.module.css'
import NeighborPost from '../../organisms/neighbor-post/neighbor-post'

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.contentfulBlogPost
  const previousUrl = '/blog/' + pageContext.previous
  const nextUrl = '/blog/' + pageContext.next
  const previousTitle = pageContext.previousTitle
  const nextTitle = pageContext.nextTitle

  return (
    <Layout>
      <Seo
        title={post.title}
        description={
          post.body?.childMarkdownRemark?.html
            .replace(/(<([^>]+)>)/gi, '')
            .substr(0, 100) + '...'
        }
        image={post.heroImage?.resize.src}
      />
      <div className={styles.layout}>
        <MainContainer className={styles.mainContainer}>
          <Hero image={post.heroImage?.gatsbyImageData} title={post.title} />
          <div className={styles.article}>
            <time dateTime={post.rawDate}>
              {post.publishDate.substr(0, 10)}
            </time>
            <div className={styles.buttons}>
              <div>
                <Tags tags={post.tags} />
              </div>
              <div className="s9-widget-wrapper"></div>
            </div>

            <div
              className={styles.body}
              dangerouslySetInnerHTML={{
                __html: post.body?.childMarkdownRemark?.html,
              }}
            />
          </div>
          <div className={styles.neighborPost}>
            <div>
              {nextTitle !== null && (
                <NeighborPost
                  navText="⇠ 新しい記事へ"
                  url={nextUrl}
                  title={nextTitle}
                />
              )}
            </div>

            <div>
              {previousTitle !== null && (
                <NeighborPost
                  navText="以前の記事へ ⇢"
                  url={previousUrl}
                  title={previousTitle}
                />
              )}
            </div>
          </div>
        </MainContainer>
        <SubContainer className={styles.subContainer}>
          <Profile />
        </SubContainer>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
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
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1200)
        resize(height: 1000, width: 1200) {
          src
        }
      }
    }
  }
`
