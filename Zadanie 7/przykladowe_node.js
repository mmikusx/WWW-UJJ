const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

// fs.readFile('./login.html', function (error, html) {
//     if (error)
//         throw error;
//
//     http.createServer(function (request, response) {
//         response.writeHeader(200, {'Content-Type': 'text/html'});
//         response.write(html);
//         response.end()
//     }).listen(port, hostname, () => {
//         console.log(`Server running at http://${hostname}:${port}/`)
//     })
// })

const server = http.createServer(
    async (req, res) => {
        res.statusCode = 200;

        if(req.url === "/login"){
            if(req.method ==='GET') {
                res.setHeader('Content-Type', 'text/html');

                const html_data = await fs.promises.readFile('login.html');

                res.end(html_data);
            } else if (req.method === 'POST') {
                data = '';

                req.addListener('data', (chunk) => {
                    data += chunk;
                });

                req.addListener('end', () => {
                   data = qs.parse(data);
                   console.log(data);
                   res.end(`Hello, ${data['name']}!`);
                });

                res.end();
            }
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello!')
        }
    }
)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});