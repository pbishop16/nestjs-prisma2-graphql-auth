import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../graphql.schema.generate';
import { ResGql } from '../shared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpInputDto } from './sign-up-input.dto';
import * as dotnev from 'dotenv';
import { isDevelopment } from '../shared/environment';

dotnev.config();

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation()
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @ResGql() res: Response,
  ) {
    const message = 'Email or password incorrect';
    const user = await this.prisma.client.user.findOne({ where: { email } });

    if (!user) {
      throw Error(message);
    }

    const valid = await bcryptjs.compare(password, user.password);

    if (!valid) {
      throw Error(message);
    }

    const jwt = this.jwt.sign({ id: user.id });
    
    res.cookie('token', jwt, { httpOnly: true, sameSite: 'strict', secure: !isDevelopment });

    return user;
  }

  @Mutation()
  async signup(
    @Args('signUpInput') signUpInputDto: SignUpInputDto,
    @ResGql() res: Response,
  ) {
    const emailExists = await this.prisma.client.user.findOne({
      where: { email: signUpInputDto.email }
    });

    if (emailExists) {
      throw Error('Email is already in use');
    }

    const password = await bcryptjs.hash(signUpInputDto.password, 10);
    const user = await this.prisma.client.user.create({ data: { ...signUpInputDto, password } });
    const jwt = this.jwt.sign({ id: user.id });

    res.cookie('token', jwt, { httpOnly: true, sameSite: 'strict', secure: !isDevelopment });

    return user;
  }
}
