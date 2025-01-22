import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "../../database/database.service";
import fileConfig from 'src/const/files';

@Injectable()
export class ArchivesService {
  constructor(
    private readonly DBService: DatabaseService,
    private readonly CfgService: ConfigService,
  ){}
}
