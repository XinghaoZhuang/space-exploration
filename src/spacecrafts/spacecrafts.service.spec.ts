import { Test, TestingModule } from '@nestjs/testing';
import { SpacecraftsService } from './spacecrafts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spacecraft } from './schemas/spacecraft.schema';
import { SpacecraftStatus } from './constants';
import { CreateSpacecraftDto } from './dto/create-spacecraft.dto';

describe('SpacecraftsService', () => {
  let service: SpacecraftsService;
  let model: Model<Spacecraft>;

  const now = new Date();
  const createSpacecraftDto: CreateSpacecraftDto = {
    name: 'spacecraft 1',
    description: 'this is spacecraft 1.',
    status: SpacecraftStatus.Unknown
  };

  const mockSpacecraft1 = {
    _id: '1',
    name: 'spacecraft 1',
    description: 'this is spacecraft 1.',
    status: SpacecraftStatus.Unknown,
    deleted: false,
    createDate: now,
  };
  const mockSpacecraft2 = {
    _id: '2',
    name: 'spacecraft 2',
    description: 'this is spacecraft 2.',
    status: SpacecraftStatus.Failed,
    deleted: false,
    createDate: now,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpacecraftsService,
        {
          provide: getModelToken('Spacecraft'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockSpacecraft1),
            constructor: jest.fn().mockResolvedValue(mockSpacecraft1),
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

    service = module.get<SpacecraftsService>(SpacecraftsService);
    model = module.get<Model<Spacecraft>>(getModelToken('Spacecraft'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all spacecrafts', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce([mockSpacecraft1, mockSpacecraft2]),
            } as any)
          } as any)
        } as any)
      } as any);
      const spacecrafts = await service.findAll(0, 10);
      expect(spacecrafts).toEqual([mockSpacecraft1, mockSpacecraft2]);
    });

    it('should return all spacecrafts with filter', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce([mockSpacecraft1]),
            } as any)
          } as any)
        } as any)
      } as any);
      const spacecrafts = await service.findAll(0, 10, 'spacecraft 1');
      expect(spacecrafts).toEqual([mockSpacecraft1]);
    });
  });

  describe('create()', () => {
    it('should insert a new spacecraft', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve(mockSpacecraft1 as any),
      );
      const newSpacecraft = await service.create(createSpacecraftDto);
      expect(newSpacecraft).toEqual(mockSpacecraft1);
    });
  });

  describe('update()', () => {
    it('should not update a spacecraft with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any)
      } as any);
      await expect(service.update('3', createSpacecraftDto)).rejects.toThrow('spacecraft not found')
    });

    it('should update a spacecraft', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockSpacecraft1),
        } as any)
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      } as any);
      await expect(service.update('1', createSpacecraftDto)).resolves.not.toThrow();
    });
  });

  describe('delete()', () => {
    it('should not delete a spacecraft with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any)
      } as any);
      await expect(service.delete('3')).rejects.toThrow('spacecraft not found')
    });

    it('should delete a spacecraft', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockSpacecraft1),
        } as any)
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({}),
      } as any);
      await expect(service.delete('1')).resolves.not.toThrow();
    });
  });

  describe('findOne()', () => {
    it('should not find a spacecraft with a not-found error', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      await expect(service.findOne('3')).rejects.toThrow('spacecraft not found')
    });

    it('should find a spacecraft', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockSpacecraft1),
      } as any);
      await expect(service.findOne('1')).resolves.toBe(mockSpacecraft1);
    });
  });
});
