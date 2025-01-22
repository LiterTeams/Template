import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "../../database/database.service";
import { UploadService } from "../../upload/upload.service";
import returnObj from "./return.obj";

@Injectable()
export class ImagesService {
    constructor(
      private readonly DBService: DatabaseService,
      private readonly uploadService: UploadService,
    ){}

    async findAll(){
      return await this.DBService.image.findMany({select:returnObj});
    }

    async findById(id: number){
      const image = await this.DBService.image.findFirstOrThrow({where:{id}, select:returnObj});
      if (!image) throw new NotFoundException("Image Not Found!");
      return image;
    }

    async update(id: number, DTO:Prisma.ImageUpdateInput){
      await this.findById(id);
      return await this.DBService.image.update({where:{id},data:DTO});
    }

    async remove(id: number){
      await this.findById(id);
      return await this.DBService.image.delete({where:{id}})
    }
}
