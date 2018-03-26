const http = require('http');
const fs = require('fs');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

function start(route) {
    http.createServer(function(req, res) {
        var _url = req.url;
        if (_url === '/favicon.ico') return;
        if (req.method.toUpperCase() === 'GET') {
            if (_url.indexOf('/querysite') !== -1) {
                _url = url.parse(_url, true);
                console.log('url---->', _url);
                var pathname = _url.pathname;
                route(pathname);
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.write('网站名称：' + _url.query.name);
                res.write('\n');
                res.write('网站URL：' + _url.query.url);
                res.end();
            } else if (_url.indexOf('/submit') !== -1) {
                fs.readFile('./text.html', 'utf8', function(err, data) {
                    if (err) {
                        console.log(err.stack);
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data.toString());
                    res.end();
                });
            } else if (_url.indexOf('/showinfo') !== -1) {
                var _query = url.parse(_url, true).query;
                var sitename = _query.sitename;
                var siteurl = _query.siteurl;
                fs.readFile('./showinfo.html', 'utf8', function(err, data) {
                    if (err) {
                        console.log(err.stack);
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    data = data.replace('<%=sitename%>', sitename);
                    data = data.replace('<%=siteurl%>', siteurl);
                    res.write(data.toString());
                    res.end();
                });
            }else{
                res.write('hello');
                res.end();
            }
        } else if (req.method.toUpperCase() === 'POST') {
            console.log('req.url---->', req.url);
            var body = '';
            req.on('error', function(err) {
                console.log(err.stack);
            });
            req.on('data', function(chunk) {
                body += chunk;
            });
            req.on('end', function() {
                //解析参数
                body = querystring.parse(body);
                console.log('body---->', body);
                if (_url.indexOf('/reset') !== -1) {
                    res.writeHead(301, { 'Location': 'http://127.0.0.1:8080/submit' });
                } else if (_url.indexOf('/submitinfo') !== -1) {
                    res.writeHead(301, { 'Location': 'http://127.0.0.1:8080/showinfo?sitename=' + encodeURIComponent(body.sitename) + '&siteurl=' + body.siteurl });
                }
                //设置响应头信息及参数
                res.end();
            });
        }

    }).listen(8080);
    console.log('Server has started...');
}
exports.start = start;