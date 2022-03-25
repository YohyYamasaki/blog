require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
}

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: "yayoi's blog",
    auther: 'yayoi',
    description:
      'ドイツ移住、海外同性婚、フロントエンド開発、ロンドン大学のことなど',
    siteUrl: `https://yayo1.com/`,
  },
  pathPrefix: '/mypage/',
  plugins: [
    `gatsby-plugin-sitemap`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "yayoi's blog",
        short_name: "yayoi's blog",
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/img/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-awesome-pagination',
    `gatsby-plugin-material-ui`,
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noreferrer',
            },
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images-zoom`,
            options: { margin: 30, scrollOffset: 100 },
          },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
              zIndex: 4,
              background: '#9c9c9c',
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-social9-socialshare`,
      options: {
        content: `5f3f681280e94275a5f596be7208a16f`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID, // Google Analytics / GA
        ],
      },
    },
  ],
}
