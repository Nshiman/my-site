import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Container } from 'react-awesome-styled-grid'
import siteConfig from '../../data/siteConfig'
import { withPrefix } from "gatsby"
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/SEO'
import Wrapper from '../components/wrapper'
import notionRendererFactory from 'gatsby-source-notionso/lib/renderer'
import NotionBlockRenderer from '../components/notionBlockRenderer'

const Post = ({ data, className, location }) => {
  console.log(data)
  const title = "My Blog"
  const { keywords } = siteConfig
  const notionRenderer = notionRendererFactory({
    notionPage: data.notionPageBlog,
  });
  return (
    <Layout location={location}>
      <SEO
        title={title}
        keywords={keywords}
      />

      <Hero
        heroImg={withPrefix('/images/pierre-chatel-innocenti-W5INoOK-5eI-unsplash.jpg')}
        title={title}
      />

      <Wrapper className={className}>
        <Container className="page-content" fluid>
          <NotionBlockRenderer
            data={data}
            renderer={notionRenderer}
            debug={false}
          />
        </Container>
      </Wrapper>
      
    </Layout>
  )
}

export default styled(Post)`
  .page-content {
    max-width: 100%;
    margin-bottom: 40px;
  }
`

export const query = graphql`
  query($pageId: String!) {
    notionPageBlog(pageId: { eq: $pageId }) {
      blocks {
        blockId
        blockIds
        type
        attributes {
          att
          value
        }
        properties {
          propName
          value {
            text
            atts {
              att
              value
            }
          }
        }
      }
      imageNodes {
        imageUrl
        localFile {
          publicURL
        }
      }
      pageId
      slug
      title
      isDraft
      id
      indexPage
      createdAt
    }
  }
`
