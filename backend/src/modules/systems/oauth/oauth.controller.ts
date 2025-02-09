import { Controller, Post, Body, HttpCode, Headers, HttpStatus, Req, Res, Get } from "@nestjs/common";
import { Request, Response } from "express";

import { OauthService } from "./oauth.service";
import { Prisma } from "@prisma/client";

import { SignInProps } from "src/types/system/oauth.interfaces";

@Controller("oauth")
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Headers("origin") origin: string,
        @Body() dto: SignInProps,
        @Res() res: Response,
    ) {
        return this.oauthService.signIn(dto, origin, res);
    }

    @Post("uak")
    @HttpCode(HttpStatus.OK)
    async signInUAK(
        @Headers("origin") origin: string,
        @Body() UAK: string,
        @Res() res: Response,
    ) {
        return this.oauthService.signInUAK(UAK, origin, res);
    }

    @Post("sign-up")
    @HttpCode(HttpStatus.OK)
    async signUp(
        @Body() dto: Prisma.UserCreateInput,
        @Res() res: Response,
    ) {
        return this.oauthService.signUp(dto, res);
    }

    @Post("refresh-access-token")
    async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
        return this.oauthService.refreshAccessToken(req, res);
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response)
    {
        return this.oauthService.logout(req, res);
    }
}
