const http = require('http');
const fs = require('fs');
//用于请求的选项
const options = {
    hostname: 'www.baidu.com',
};
//向服务器发送请求
const req = http.request(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        fs.writeFile('./text.html', body, 'utf8', function(err) {
            if (err) {
                console.log(err.stack);
                return;
            }
            console.log('写入成功');
        });
    });
});
req.on('error', function(err) {
    console.log(err.stack);
});
req.end();