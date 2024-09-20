import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest();
		const file = request.file;
		let dataHeaderLine = request.body.dataHeaderLine;
		if (!file) {
			throw new BadRequestException('No set field file');
		}

		return next.handle();
	}
}
