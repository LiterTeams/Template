import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>("roles", [context.getHandler(), context.getClass()]);
    if (!roles) return false;
    
    const request = context.switchToHttp().getRequest();
    const userRoles = request.headers?.role || "guest";
    return this.validateRoles(roles, userRoles);
  }

  validateRoles(roles: string[], userRoles: string) {
    return roles.some(role => userRoles.includes(role));
  }
}