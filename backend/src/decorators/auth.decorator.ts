import { applyDecorators, UseGuards } from "@nestjs/common";
import { UserRole } from "@prisma/client"
import Roles from "./roles.decorator";
import AuthGuard from "src/guards/auth.guard";
import RolesGuard from "src/guards/roles.guard";

const Auth = (...roles: UserRole[]) => {
    if (roles.length > 0){
        return applyDecorators(
            Roles(...roles),
            UseGuards(AuthGuard, RolesGuard))
    }

    return applyDecorators(UseGuards(AuthGuard));
}

export default Auth;