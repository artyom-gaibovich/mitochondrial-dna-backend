import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePopnameDto {
	@IsNotEmpty()
	@IsString()
	popname: string;
}
