import { Controller, Post, Body, HttpCode, Headers, HttpStatus } from "@nestjs/common";
import { OauthService } from "./oauth.service";
import { Prisma } from "@prisma/client";

import { SignInProps } from "src/interfaces/system/oauth.interfaces";
import { TokenProps } from "src/interfaces/system/tokens.interfaces";

@Controller("oauth")
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Headers("origin") origin: string,
        @Body() dto: SignInProps,
    ) {
        return this.oauthService.signIn(dto, origin);
    }

    @Post("sign-in/regenerate-tokens")
    @HttpCode(HttpStatus.OK)
    async regenerateTokens(@Body() { refreshToken }: Pick<TokenProps, "refreshToken">) {
        return this.oauthService.regenerateTokens(refreshToken);
    }

    @Post("sign-up")
    @HttpCode(HttpStatus.OK)
    async signUp(@Body() dto: Prisma.UserCreateInput) {
        return this.oauthService.signUp(dto);
    }
}
