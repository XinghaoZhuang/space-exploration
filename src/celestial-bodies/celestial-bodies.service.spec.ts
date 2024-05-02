import { Test, TestingModule } from '@nestjs/testing';
import { CelestialBodiesService } from './celestial-bodies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CelestialBody } from './schemas/celestial-body.schema';
import { DiscoveryStatus } from './constants';
import { CreateCelestialBodyDto } from './dto/create-celestial-body.dto';

describe('CelestialBodiesService', () => {
  let service: CelestialBodiesService;
  let model: Model<CelestialBody>;

  const now = new Date();
  const createCelestialBodyDto: CreateCelestialBodyDto = {
    name: 'celestialBody 1',
    description: 'this is celestialBody 1.',
    status: DiscoveryStatus.Unknown
  };

  const mockCelestialBody1 = {
    _id: '1',
    name: 'celestialBody 1',
    description: 'this is celestialBody 1.',
    status: DiscoveryStatus.Unknown,
    deleted: false,
    createDate: now,
  };
  const mockCelestialBody2 = {
    _id: '2',
    name: 'celestialBody 2',
    description: 'this is celestialBody 2.',
    status: DiscoveryStatus.Founded,
    deleted: false,
    createDate: now,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CelestialBodiesService,
        {
          provide: getModelToken('CelestialBody'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCelestialBody1),
            constructor: jest.fn().mockResolvedValue(mockCelestialBody1),
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

    service = module.get<CelestialBodiesService>(CelestialBodiesService);
    model = module.get<Model<CelestialBody>>(getModelToken('CelestialBody'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all celestialBodies', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce([mockCelestialBody1, mockCelestialBody2]),
            } as any)
          } as any)
        } as any)
      } as any);
      const celestialBodies = await service.findAll(0, 10);
      expect(celestialBodies).toEqual([mockCelestialBody1, mockCelestialBody2]);
    });

    it('should return all celestialBodies with filter', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce([mockCelestialBody1]),
            } as any)
          } as any)
        } as any)
      } as any);
      const celestialBodies = await service.findAll(0, 10, 'celestialBody 1');
      expect(celestialBodies).toEqual([mockCelestialBody1]);
    });
  });

  describe('create()', () => {
    it('should insert a new celestialBody', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve(mockCelestialBody1 as any),
      );
      const newCelestialBody = await service.create(createCelestialBodyDto);
      expect(newCelestialBody).toEqual(mockCelestialBody1);
    });
  });

  describe('update()', () => {
    it('should not update a celestialBody with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any)
      } as any);
      await expect(service.update('3', createCelestialBodyDto)).rejects.toThrow('celestialBody not found')
    });

    it('should update a celestialBody', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockCelestialBody1),
        } as any)
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      } as any);
      await expect(service.update('1', createCelestialBodyDto)).resolves.not.toThrow();
    });
  });

  describe('delete()', () => {
    it('should not delete a celestialBody with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any)
      } as any);
      await expect(service.delete('3')).rejects.toThrow('celestialBody not found')
    });

    it('should delete a celestialBody', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockCelestialBody1),
        } as any)
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      } as any);
      await expect(service.delete('1')).resolves.not.toThrow();
    });
  });

  describe('findOne()', () => {
    it('should not find a celestialBody with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      await expect(service.findOne('3')).rejects.toThrow('celestialBody not found')
    });

    it('should find a celestialBody', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockCelestialBody1),
      } as any);
      await expect(service.findOne('1')).resolves.toBe(mockCelestialBody1);
    });
  });
});
