import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ProjectsService } from '../project/projects.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ProjectsService],
})
export class FilesModule {}
