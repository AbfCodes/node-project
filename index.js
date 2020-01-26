const fs = require('fs');
const http = require('http');
const url = require('url');

const templateFill = require('./modules/templateFill');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const template_card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const template_overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const template_product = fs.readFileSync(
  `${__dirname}/templates/Template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const cardItem = productData
      .map(ele => templateFill(template_card, ele))
      .join('');

    const output = template_overview.replace('{%card_Product%}', cardItem);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const output = templateFill(template_product, productData[query.id]);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'content-type': 'text/html'
    });
    res.end('<h1>No path</h1>');
  }
});
server.listen(8000, () => {
  console.log('listening request on port 8000');
});
