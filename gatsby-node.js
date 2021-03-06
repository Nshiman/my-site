/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions, reporter }, options) => {
  const { createPage } = actions;
  const { createTypes } = actions
  const pageTemplate = require.resolve('./src/templates/post.js');

  const result = await graphql(
    `
      query {
        allNotionPageBlog {
          edges {
            node {
              pageId
              slug
            }
          }
        }
      }
    `,
  );
  if (result.errors) {
    reporter.panic('error loading events', result.errors);
    return;
  }

  result.data.allNotionPageBlog.edges.forEach(({ node }) => {
    const path = `/content/blog/${node.slug}`;
    createPage({
      path,
      component: pageTemplate,
      context: {
        pathSlug: path,
        pageId: node.pageId,
      },
    });
  });
};
