import { CustomError } from '@domain/errors/custom.error';
import { FileUploadService } from '@presentation/services/upload-upload.service';
import busboy from 'busboy';
import { Response, Request } from 'express'
// import {Busboy} from 'busboy'
export class FileUploadController {
    constructor(
        private readonly fileUploadServicefile: FileUploadService
    ) { }


    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        return res.status(500).json(`${error}`)
    }

    uploadFile = async (req: Request, res: Response) => {
        const bb = busboy({ headers: req.headers })
        bb.on('file', (name, file, info) => {
            const { filename, mimeType } = info;
            console.log(
                `File [${name}]: filename: %j, , mimeType: %j`,
                filename,
                mimeType
            );

            file.on('data', (data) => {
                // console.log(`File [${name}] got ${data.length} bytes`);
                // if (data)
                console.log("Data", data)
            }).on('close', () => {
                // console.log(`File [${name}] done`);
            });
        });

        bb.on('close', () => {
            console.log('Done parsing form!');
            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end();
        });
        req.pipe(bb);
        // var busboy = new Busboy({ headers: req.headers });
        // const files = req.file;
        // console.log({ file: files })
        // if (!files || Object.keys(files).length === 0) {
        //     return res.status(400).json({ error: "No file were selected" })
        // }

        // const file = req.files.file

        // this.fileUploadServicefile.uploadMultiple(file)
        //     .then(upload => res.status(200).json(upload))
        //     .catch(error => this.handlerError(error, res))


    }

    uploadMultipleFile = async (req: Request, res: Response) => {


    }
}