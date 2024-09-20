import { Controller, Delete, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'node:path';
import { ExcelFile } from '../entities/excel-file';
import { BufferService } from './buffer.service';
import { FileUploadInterceptor } from './interceptors/buff.upload.interceptor';
import { FileValidationInterceptor } from './interceptors/buff.validation.inteceptor';
import { BuffDataService } from './buff-data.service';

@Controller('buff')
export class BuffController {
	constructor(private bufferService: BufferService) {}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
				},
			}),
		}),
		FileUploadInterceptor,
		FileValidationInterceptor,
	)
	public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
		return await this.bufferService.upload(
			new ExcelFile(path.join(__dirname, '..', '..', 'uploads', file.filename)),
		);
	}

	@Delete('clear-buff')
	public async clearBuff(): Promise<{ count: number }> {
		//return await this.buffDataService.clear();
		return undefined;
	}
}
