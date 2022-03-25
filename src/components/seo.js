import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ description = '', lang = 'jp', meta = [], title, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription =
    description !== ''
      ? `${description} | ${site.siteMetadata.description}`
      : site.siteMetadata.description
  const defaultTitle = title || site.siteMetadata?.title

  console.log(String(image))

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defaultTitle={defaultTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `image`,
          content: image,
        },
        {
          name: `twitter:title`,
          content: defaultTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: defaultTitle,
        },
      ].concat(meta)}
    />
  )
}

export default Seo
