import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VideosService } from "./videos.service";

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
}
