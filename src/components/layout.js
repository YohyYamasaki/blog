import React from 'react'

import './uiParts/variables.css'
import './global.css'
import Navigation from './uiParts/navigation/navigation'
import Footer from './uiParts/footer/footer'
import Seo from './seo'
import './prism.css'

const BlogLayout = (props) => {
  return (
    <>
      <Seo
        title={props.title}
        description={props.description}
        image={props.image}
      />

      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default BlogLayout
