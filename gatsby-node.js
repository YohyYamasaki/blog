const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const homePage = path.resolve(`./src/components/templates/homepage/index.js`)
  const tagPage = path.resolve(
    `./src/components/templates/tag-page/tag-page.js`
  )
  const blogPost = path.resolve(
    './src/components/templates/blog-post/blog-post.js'
  )

  const allBlogPosts = await graphql(
    `
      {
        allContentfulBlogPost(sort: { order: ASC, fields: publishDate }) {
          nodes {
            slug
            publishDate
            title
          }
        }
      }
    `
  )

  const allTags = await graphql(
    `
      {
        allContentfulTags {
          edges {
            node {
              title
            }
          }
        }
      }
    `
  )

  const posts = allBlogPosts.data.allContentfulBlogPost.nodes
  const tags = allTags.data.allContentfulTags.edges

  tags.forEach((tag) => {
    createPage({
      path: `tags/${tag.node.title}/`,
      component: tagPage,
      context: {
        tagName: tag.node.title,
      },
    })
  })

  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: 5, // How many items you want per page
    pathPrefix: '/', // Creates pages like `/blog`, `/blog/2`, etc
    component: homePage, // Just like `createPage()`
  })

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug
      const previousPostTitle = index === 0 ? null : posts[index - 1].title
      const nextPostTitle =
        index === posts.length - 1 ? null : posts[index + 1].title

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previous: previousPostSlug,
          next: nextPostSlug,
          previousTitle: previousPostTitle,
          nextTitle: nextPostTitle,
        },
      })
    })
  }

  if (allBlogPosts.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      allBlogPosts.errors
    )
    return
  }
}
