import { IsEmail, MinLength } from 'class-validator';
import { SignUpInput } from '../graphql.schema.generate';

export class SignUpInputDto extends SignUpInput {
  @IsEmail()
  readonly email: string;

  @MinLength(10)
  readonly password: string;
}
