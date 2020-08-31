import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../graphql.schema.generate';

@Resolver('User')
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField()
  async posts(@Parent() { id }: User) {
    return this.prisma.client.user.findOne({ where: { id } }).posts();
  }
}
