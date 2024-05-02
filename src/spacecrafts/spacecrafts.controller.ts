import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SpacecraftsService } from './spacecrafts.service';
import { CreateSpacecraftDto } from './dto/create-spacecraft.dto';
import { UpdateSpacecraftDto } from './dto/update-spacecraft.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Spacecraft } from './schemas/spacecraft.schema';

@Controller('spacecrafts')
export class SpacecraftsController {
  constructor(private readonly spacecraftsService: SpacecraftsService) {}

  @ApiOkResponse({
    type: Spacecraft
  })
  @Post()
  create(@Body(new ValidationPipe()) createSpacecraftDto: CreateSpacecraftDto) {
    return this.spacecraftsService.create(createSpacecraftDto);
  }

  @ApiOkResponse({
    type: Spacecraft,
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
  ): Promise<Spacecraft[]> {
    return this.spacecraftsService.findAll(page, perPage, name);
  }

  @ApiOkResponse({
    type: Spacecraft
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacecraftsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateSpacecraftDto: UpdateSpacecraftDto) {
    return this.spacecraftsService.update(id, updateSpacecraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacecraftsService.delete(id);
  }
}
