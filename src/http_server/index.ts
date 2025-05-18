import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer(async function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);

    // await fs.readFile(file_path, function (err, data) {
    //     if (err) {
    //         res.writeHead(404);
    //         res.end(JSON.stringify(err));
    //         return;
    //     }
    //     res.writeHead(200);
    //     res.end(data);
    // });

    try{
        let data = await fs.promises.readFile(file_path)
        res.writeHead(200);
        res.end(data);
    } catch(err){
        res.writeHead(404);
        res.end(JSON.stringify(err));
    }
});
