/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://virtuesextractor.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
  },
};
