const fs = require('fs');
const http = require('http');

// fs.readFile('input.txt', function (err, data) {
//   if (err) return console.error(err);
//   console.log(data.toString());
// });
// console.log(fs.readFileSync('./txt/input.txt', 'utf-8'));
// fs.writeFileSync('./txt/nn.txt', "bbbbbbbbbbbbbbbbh");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('<h1>Overview page</h1>');
    } else if (pathName === '/product') {
        res.end('<h1>Product page</h1>');
    } else if (pathName === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end('<h1>No path</h1>');
    }
});
server.listen(8000, () => { console.log('listening request on port 8000'); })