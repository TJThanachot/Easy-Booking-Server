import { PartialType } from '@nestjs/mapped-types';
import { CreateTransectionDto } from './create-transection.dto';

export class UpdateTransectionDto extends PartialType(CreateTransectionDto) {}
