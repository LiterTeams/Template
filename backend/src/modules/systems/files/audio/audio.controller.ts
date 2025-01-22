import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AudioService } from "./audio.service";

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}
}
