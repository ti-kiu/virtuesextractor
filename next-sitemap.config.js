/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://virtuesextractor.com',
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false,
  outDir: 'out',
  transform: async (config, path) => {
    // Set changefreq and priority based on path
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/virtues/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/virtues') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/quiz') {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path === '/features') {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.startsWith('/quiz/')) {
      priority = 0.3;
      changefreq = 'monthly';
    } else if (path === '/faq') {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path === '/circle' || path === '/couple' || path === '/team') {
      priority = 0.7;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
