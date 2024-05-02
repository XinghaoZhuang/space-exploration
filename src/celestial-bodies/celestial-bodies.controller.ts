import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CelestialBodiesService } from './celestial-bodies.service';
import { CreateCelestialBodyDto } from './dto/create-celestial-body.dto';
import { UpdateCelestialBodyDto } from './dto/update-celestial-body.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CelestialBody } from './schemas/celestial-body.schema';

@Controller('celestialBodies')
export class CelestialBodiesController {
  constructor(private readonly celestialBodiesService: CelestialBodiesService) {}

  @ApiOkResponse({
    type: CelestialBody
  })
  @Post()
  create(@Body(new ValidationPipe()) createCelestialBodyDto: CreateCelestialBodyDto) {
    return this.celestialBodiesService.create(createCelestialBodyDto);
  }

  @ApiOkResponse({
    type: CelestialBody,
    isArray: true
  })
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'name', required: false })
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    @Query('name') name?: string
  ): Promise<CelestialBody[]> {
    return this.celestialBodiesService.findAll(page, perPage, name);
  }

  @ApiOkResponse({
    type: CelestialBody
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.celestialBodiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateCelestialBodyDto: UpdateCelestialBodyDto) {
    return this.celestialBodiesService.update(id, updateCelestialBodyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.celestialBodiesService.delete(id);
  }
}
