import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Mission } from './schemas/mission.schema';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @ApiOkResponse({
    type: Mission
  })
  @Post()
  create(@Body(new ValidationPipe()) createMissionDto: CreateMissionDto) {
    return this.missionsService.create(createMissionDto);
  }

  @ApiOkResponse({
    type: Mission,
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
  ): Promise<Mission[]> {
    return this.missionsService.findAll(page, perPage, name);
  }

  @ApiOkResponse({
    type: Mission
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateMissionDto: UpdateMissionDto) {
    return this.missionsService.update(id, updateMissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionsService.delete(id);
  }
}
