import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { UploadService } from "../../upload/upload.service";
import returnFileStorageObj from "../return.file.storage.obj";

@Injectable()
export class NotesService {
    constructor(
      private readonly DBService: DatabaseService,
      private readonly uploadService: UploadService,
    ){}

    async findAll(){
        const data = await this.DBService.fileStorage.findMany({where: {type: "note"}, select:returnFileStorageObj});
        const meta = {};
        return { data, meta }
    }
  
    async findById(id: number){
        const file = await this.DBService.fileStorage.findFirstOrThrow({where:{id, type: "note"}, select:returnFileStorageObj});
        if (!file) throw new NotFoundException("File Not Found!");
        return file;
    }
  
    async remove(id: number){
        const file = await this.findById(id);
        await this.uploadService.removeFiles(`${file.name}.${file.extension}`);
        return await this.DBService.fileStorage.delete({where:{id}})
    }
}
