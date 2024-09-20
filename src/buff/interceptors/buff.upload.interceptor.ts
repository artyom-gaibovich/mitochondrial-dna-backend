import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const file = request.file;
		if (!file) {
			throw new BadRequestException('Атрибут file не был установлен');
		}
		if (!file.originalname.includes('xlsx')) {
			throw new BadRequestException('Отсутсвует расширение .xlsx');
		}
		console.log('FileUploadInterceptor: файл загружен');
		return next.handle();
	}
}
