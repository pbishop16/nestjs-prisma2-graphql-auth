
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignUpInput {
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PostInput {
    title: string;
    body?: string;
}

export class User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    posts: Post[];
    password?: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
}

export class Post {
    id: string;
    title: string;
    body?: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}

export class AuthPayload {
    id: string;
    email: string;
}

export abstract class IQuery {
    abstract post(id: string): Post | Promise<Post>;

    abstract posts(): Post[] | Promise<Post[]>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract signup(signUpInput?: SignUpInput): AuthPayload | Promise<AuthPayload>;

    abstract login(loginInput?: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract createPost(postInput?: PostInput): Post | Promise<Post>;
}
