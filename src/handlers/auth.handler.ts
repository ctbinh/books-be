import { envs } from "@configs";
import { DUPLICATED_EMAIL, LOGIN_FAIL, USER_NOT_FOUND } from "@constants";
import { AuthInputDto } from "@dtos/in";
import { AuthResultDto } from "@dtos/out";
import { RawHandler } from "@interfaces";
import { User } from "@prisma/client";
import { prisma } from "@repositories";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';

const login: RawHandler<AuthResultDto, { Body: AuthInputDto }> = async (req, res) => {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            password: true
        },
        where: { email: req.body.email }
    });
    if (!user) return res.badRequest(USER_NOT_FOUND);

    const correctPassword = await compare(req.body.password, user.password);
    if (!correctPassword) return res.badRequest(LOGIN_FAIL);

    const userToken = jwt.sign({ userId: user.id }, envs.JWT_SECRET);
    res.setCookie('token', userToken, {signed: false, secure: true, httpOnly: true});

    return {
        id: user.id,
        email: user.email
    };
};

const signup: RawHandler<AuthResultDto, { Body: AuthInputDto }> = async (req, reply) => {
    const hashPassword = await hash(req.body.password, 10);
    let user: User;
    try {
        user = await prisma.user.create({
            data: {
                username: req.body.email.split(',')[0],
                email: req.body.email,
                password: hashPassword
            }
        });
    } catch (err) {
        return reply.badRequest(DUPLICATED_EMAIL);
    }

    const userToken = jwt.sign({ userId: user.id }, envs.JWT_SECRET);
    reply.setCookie('token', userToken, {signed: false, secure: true, httpOnly: true});

    return {
        id: user.id,
        email: user.email
    };
};

const logout: RawHandler = async (_req, res) => {
    res.clearCookie('token');
    return null;
};

export const authHandler = {
    login,
    signup,
    logout
};