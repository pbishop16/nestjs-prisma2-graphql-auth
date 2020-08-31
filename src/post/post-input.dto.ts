import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostInput } from '../graphql.schema.generate';

export class PostInputDto extends PostInput {
  @IsString()
  @MinLength(10)
  @MaxLength(60)
  readonly title: string;
}

