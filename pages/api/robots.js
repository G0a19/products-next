export default function handler(req, res) {
  const robotsContent = `
  User-agent: *
  Allow: /
  Disallow: /private/
  
  Sitemap: ${process.env.frontUrl}/sitemap.xml
  `;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsContent);
  res.end();
}
