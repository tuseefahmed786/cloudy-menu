const fs = require('fs');
const path = require('path');
const { SitemapStream } = require('sitemap');
const { Readable } = require('stream');

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  // Add other URLs here
];

const sitemapStream = new SitemapStream({ hostname: 'https://cloudymenu.com' });

// Create a readable stream to pass URLs
const readable = Readable.from(urls.map(url => ({
  url: url.url,
  changefreq: url.changefreq,
  priority: url.priority
})));

// Pipe the URLs through the SitemapStream to create the XML
readable.pipe(sitemapStream)
  .on('error', (err) => {
    console.error(err);
  })
  .pipe(fs.createWriteStream(path.join(__dirname, 'build', 'sitemap.xml')))
  .on('finish', () => {
    console.log('Sitemap generated at build/sitemap.xml');
  });
