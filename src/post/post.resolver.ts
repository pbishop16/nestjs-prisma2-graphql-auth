import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../graphql.schema.generate';
import { GqlUser } from '../shared/decorators/decorators';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostInputDto } from './post-input.dto';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  async post(@Args('id') id: string) {
    return this.prisma.client.post.findOne({ where: { id } });
  }

  @Query()
  async posts() {
    return this.prisma.client.post.findMany();
  }

  @ResolveField()
  async author(@Parent() { id }: Post) {
    return this.prisma.client.post.findOne({ where: { id } }).author();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('postInput') { title, body }: PostInputDto,
    @GqlUser() user: User,
  ) {
    return this.prisma.client.post.create({
      data: {
        title,
        body,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    })
  }
}
