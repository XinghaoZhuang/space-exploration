import { Test, TestingModule } from '@nestjs/testing';
import { MissionsService } from './missions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mission } from './schemas/mission.schema';
import { MissionStatus } from './constants';
import { CreateMissionDto } from './dto/create-mission.dto';

describe('MissionsService', () => {
  let service: MissionsService;
  let model: Model<Mission>;

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
      providers: [
        MissionsService,
        {
          provide: getModelToken('Mission'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockMission1),
            constructor: jest.fn().mockResolvedValue(mockMission1),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            skip: jest.fn(),
            limit: jest.fn(),
            sort: jest.fn(),
            exec: jest.fn(),
            select: jest.fn(),
            updateOne: jest.fn(),
            delete: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<MissionsService>(MissionsService);
    model = module.get<Model<Mission>>(getModelToken('Mission'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all missions', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce([mockMission1, mockMission2]),
            } as any)
          } as any)
        } as any)
      } as any);
      const missions = await service.findAll(0, 10);
      expect(missions).toEqual([mockMission1, mockMission2]);
    });

    it('should return all missions with filter', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce([mockMission1]),
            } as any)
          } as any)
        } as any)
      } as any);
      const missions = await service.findAll(0, 10, 'mission 1');
      expect(missions).toEqual([mockMission1]);
    });
  });

  describe('create()', () => {
    it('should insert a new mission', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve(mockMission1 as any),
      );
      const newMission = await service.create(createMissionDto);
      expect(newMission).toEqual(mockMission1);
    });
  });

  describe('update()', () => {
    it('should not update a mission with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any)
      } as any);
      await expect(service.update('3', createMissionDto)).rejects.toThrow('mission not found')
    });

    it('should update a mission', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockMission1),
        } as any)
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      } as any);
      await expect(service.update('1', createMissionDto)).resolves.not.toThrow();
    });
  });

  describe('delete()', () => {
    it('should not delete a mission with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any)
      } as any);
      await expect(service.delete('3')).rejects.toThrow('mission not found')
    });

    it('should delete a mission', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockMission1),
        } as any)
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      } as any);
      await expect(service.delete('1')).resolves.not.toThrow();
    });
  });

  describe('findOne()', () => {
    it('should not find a mission with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      await expect(service.findOne('3')).rejects.toThrow('mission not found')
    });

    it('should find a mission', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockMission1),
      } as any);
      await expect(service.findOne('1')).resolves.toBe(mockMission1);
    });
  });
});
