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
    description: 'ドイツ移住、フロントエンド開発、ロンドン大学のことなど',
    siteUrl: `https://yayo1.com/`,
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          `Zen Kaku Gothic New\:300,400,500,700`,
          `Zen Maru Gothic\:300,400,500,70`,
        ],
        display: 'swap',
      },
    },

    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
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
    // 'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-link-beautify`,

          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // <pre>タグのclass名のプレフィックス名を設定
              // 例 : <pre class="language-js">
              classPrefix: 'language-',
              // セパレーターを使用して、
              // シングルバックティックなどのインラインコードに言語を設定できる
              inlineCodeMarker: null,
              // 言語の別名を設定できる
              // 例 : { sh: "bash" }
              aliases: {},
              // 行番号の表示・非表示
              showLineNumbers: false,
              // true にするとインラインコードをハイライトしない
              noInlineHighlight: false,
            },
          },
          {
            resolve: 'gatsby-remark-images-zoom',
            options: { scrollOffset: 100 },
          },
          {
            resolve: 'gatsby-remark-images-contentful',
            options: {
              wrapperStyle:
                'width: 80%; height: auto; margin: 0 auto; padding: 10px',
              maxWidth: 1280,
              linkImagesToOriginal: false,
              zIndex: 4,
              background: '#9c9c9c',
              withWebp: true,
              loading: 'eager',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID, // Google Analytics / GA
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-css-modules',
  ],
}
