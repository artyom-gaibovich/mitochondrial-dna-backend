import {
	Body,
	Controller,
	Delete,
	Inject,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'node:path';
import { ExcelFile } from '../entities/excel-file';
import { BufferService } from './buffer.service';
import { FileUploadInterceptor } from './interceptors/buff.upload.interceptor';
import { FileValidationInterceptor } from './interceptors/buff.validation.inteceptor';
import { BuffDataService } from './buff-data.service';
import { BuffTable } from './components/db/buff-table';
import { PrismaService } from '../prisma/prisma.service';
import { DIConstants } from '../DIConstants';
import { UpdatePopnameDto } from './dto/update-popname.dto';

@Controller('buff')
export class BuffController {
	constructor(
		@Inject(DIConstants.PrismaService) private prismaService: PrismaService,
		private bufferService: BufferService,
	) {}

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
		/*return await this.bufferService.upload(
      new ExcelFile(path.join(__dirname, '..', '..', 'uploads', file.filename)),
    );
*/
		return await this.bufferService.newUpload(
			new ExcelFile(path.join(__dirname, '..', '..', 'uploads', file.filename)),
		);
	}

	@Post('recreate')
	public async clearBuff(): Promise<{ message: string }> {
		return new BuffTable(this.prismaService).recreate();
	}

	@Post('process')
	public async processBuff(): Promise<{
		ref_inserted_count: number;
		pop_inserted_count: number;
		individuals_inserted_count: number;
		var_inserted_count: number;
		errors?: any;
	}> {
		return await this.bufferService.processBuffer();
	}

	@UsePipes(new ValidationPipe())
	@Patch('popname')
	public async updatePopname(@Body() dto: UpdatePopnameDto): Promise<{ message: string }> {
		return await this.bufferService.updatePopname(dto.popname);
	}
}
