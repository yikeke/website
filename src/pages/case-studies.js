import '../styles/pages/caseStudies.scss'
import '../lib/graphql/image'

import { Link, graphql, useStaticQuery } from 'gatsby'
import React, { useEffect } from 'react'

import Img from 'gatsby-image'
import Layout from '../components/layout'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
import SEO from '../components/seo'
import Swiper from 'swiper'

const CaseStudies = () => {
  const {
    BannerSVG,
    quoteMarkSVG,
    placeholderSVG,
    caseStudies,
  } = useStaticQuery(
    graphql`
      query {
        BannerSVG: file(relativePath: { eq: "case-studies/banner.png" }) {
          ...FluidUncompressed
        }
        quoteMarkSVG: file(
          relativePath: { eq: "case-studies/quote-mark.svg" }
        ) {
          publicURL
        }
        placeholderSVG: file(
          relativePath: { eq: "case-studies/placeholder.svg" }
        ) {
          publicURL
        }
        caseStudies: allMarkdownRemark(
          filter: {
            fields: { collection: { eq: "markdown-pages/blogs" } }
            frontmatter: { customer: { ne: null } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                title
                customer
                summary
              }
            }
          }
        }
      }
    `
  )

  useEffect(() => {
    new Swiper('.swiper-container', {
      // autoplay: {
      //   delay: 6000,
      // },
      loop: true,
      pagination: {
        el: '.swiper-custom-pagination',
        clickable: true,
        bulletClass: 'bullet',
        bulletActiveClass: 'active',
        renderBullet: () => `<span class="bullet"></span>`,
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
    })
  }, [])

  return (
    <Layout>
      <SEO title="Case Studies" />
      <article className="PingCAP-CaseStudies">
        <div className="top-banner-wrapper">
          <Img
            fluid={BannerSVG.childImageSharp.fluid}
            className="banner"
            alt="banner"
          />
          <div className="titles">
            <h2 className="title is-2">Trusted and verified by</h2>
            <h2 className="title is-2">web-scale application leaders</h2>
          </div>
        </div>
        <div className="container section">
          <div className="title is-5 title-under-banner">
            TiDB delivers the value to the innovators in data industry
          </div>
          <div className="card swiper-container">
            <div className="swiper-wrapper top">
              {caseStudies.edges
                .slice(0, 3)
                .map(({ node }) => node.frontmatter)
                .map(study => (
                  <div key={study.customer} className="swiper-slide">
                    <div className="intro">
                      <img
                        className="quote-mark"
                        src={quoteMarkSVG.publicURL}
                        alt="quote-mark"
                      />
                      <div className="title is-6 is-spaced">
                        <span className="underline"></span>
                        Featured Testimonials
                      </div>
                      <div className="subtitle is-7">{study.customer}</div>
                      <div className="summary">{study.summary}</div>
                      <Link
                        to={`/case-studies/${study.title
                          .replace(/[?%]/g, '')
                          .split(' ')
                          .join('-')}`}
                        className="see-case-study"
                      >
                        See case study
                      </Link>
                    </div>
                    <div className="placeholder">
                      <img src={placeholderSVG.publicURL} alt="placeholder" />
                    </div>
                  </div>
                ))}
            </div>
            <div className="bottom">
              <NavigateBefore className="swiper-prev" />
              <div className="swiper-custom-pagination" />
              <NavigateNext className="swiper-next" />
            </div>
          </div>
          <div className="title is-5 title-under-swiper">
            15+ Pegabytes in 300+ Companies
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default CaseStudies
