import { Test, TestingModule } from '@nestjs/testing';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { MissionStatus } from './constants';

describe('MissionsController', () => {
  let controller: MissionsController;
  let service: MissionsService;

  const now = new Date();
  const createMissionDto: CreateMissionDto = {
    name: 'mission 1',
    description: 'this is mission 1.',
    status: MissionStatus.Unknown
  };

  const mockMission1 = {
    _id: '1',
    name: 'mission 1',
    description: 'this is mission 1.',
    status: MissionStatus.Unknown,
    deleted: false,
    createDate: now,
  };
  const mockMission2 = {
    _id: '2',
    name: 'mission 2',
    description: 'this is mission 2.',
    status: MissionStatus.Failed,
    deleted: false,
    createDate: now,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionsController],
      providers: [{
        provide: MissionsService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([
            mockMission1, mockMission2
          ]),
          findOne: jest.fn().mockResolvedValue(mockMission1),
          create: jest.fn().mockRejectedValue(mockMission1),
          update: jest.fn(),
          delete: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<MissionsController>(MissionsController);
    service = module.get<MissionsService>(MissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new mission', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockMission1);

      await controller.create(createMissionDto);
      expect(createSpy).toHaveBeenCalledWith(createMissionDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of missions', async () => {
      expect(controller.findAll(0, 10)).resolves.toEqual([
        mockMission1, mockMission2
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a mission', async () => {
      expect(controller.findOne('1')).resolves.toEqual(mockMission1);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should delete a mission', async () => {
      const removeSpy = jest.spyOn(service, 'delete');
      await controller.remove('1');
      expect(service.delete).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a mission', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await controller.update('1', createMissionDto);
      expect(service.update).toHaveBeenCalled();
    });
  });

});
