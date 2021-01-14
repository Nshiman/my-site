import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import { Container, Row, Col } from 'react-awesome-styled-grid'
import siteConfig from '../../data/siteConfig'
import { withPrefix } from "gatsby"
import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/SEO'
import Wrapper from '../components/wrapper'

const Image = styled.img`
  max-height: 220px;
  max-width: 220px;
  object-fit: cover;
  object-position: center center;
  border-radius: 10px;
  box-shadow: 24px 47px 79px -21px rgba(0,0,0,0.51);
`

const PostCard = styled.a`
  text-decoration: none;
  color: inherit;
  ${({ href }) => href && css`
    &:hover ${Image}{
      transition: transform .5s;
      transform: translateY(-5px);
    }
  `}
`

const Blog = ({ data, className, location }) => {
  const title = "My Blog"
  const { keywords } = siteConfig
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
          <Row>
            {data.allNotionPageBlog.edges.map(edge => (
              <Col
                key={edge.node.title}
                align="center"
              >
                <PostCard
                  as={edge.node.slug ? "a" : "div"}
                  href={`/blog/${edge.node.slug}`}
                >
                  <h3>{edge.node.title}</h3>
                  <p>{edge.node.excerpt}</p>
                  <div className="post-date">
                    Created: {new Date(edge.node.createdAt).toLocaleString()}
                  </div>
                  <hr />
                </PostCard>
              </Col>
            ))}
          </Row>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default styled(Blog)`
  .page-content {
    max-width: 100%;
    margin-bottom: 40px;
  }
  .post-date {
    color: #bbb;
    font-size: 14px;
    text-align: right;
  }
  hr {
    margin-top: 16px;
  }
`
export const query = graphql`
  query {
    allNotionPageBlog(
      filter: { isDraft: { eq: false } }
      sort: { fields: [indexPage], order: ASC }
    ) {
      edges {
        node {
          title
          slug
          excerpt
          pageIcon
          createdAt
        }
      }
    }
  }
`
