import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
export default Roles;