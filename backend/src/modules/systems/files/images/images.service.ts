import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "../../database/database.service";
import { UploadService } from "../../upload/upload.service";
import returnImageObj from "./return.image.obj";

@Injectable()
export class ImagesService {
    constructor(
      private readonly DBService: DatabaseService,
      private readonly uploadService: UploadService,
    ){}

    async findImages(){
      return await this.DBService.fileStorage.findMany({where: {type: "image"}, select:returnImageObj});
    }

    async findById(id: number){
      const image = await this.DBService.fileStorage.findFirstOrThrow({where:{id}, select:returnImageObj});
      if (!image) throw new NotFoundException("Image Not Found!");
      return image;
    }

    // async update(id: number, DTO:Prisma.ImageUpdateInput){
    //   await this.findById(id);
    //   return await this.DBService.image.update({where:{id},data:DTO});
    // }

    async remove(id: number){
      const file = await this.findById(id);
      await this.uploadService.removeFiles(`${file.name}.${file.extension}`);
      return await this.DBService.fileStorage.delete({where:{id}})
    }
}
