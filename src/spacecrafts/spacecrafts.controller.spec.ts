import { Test, TestingModule } from '@nestjs/testing';
import { SpacecraftsController } from './spacecrafts.controller';
import { SpacecraftsService } from './spacecrafts.service';
import { CreateSpacecraftDto } from './dto/create-spacecraft.dto';
import { SpacecraftStatus } from './constants';

describe('SpacecraftsController', () => {
  let controller: SpacecraftsController;
  let service: SpacecraftsService;

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
      controllers: [SpacecraftsController],
      providers: [{
        provide: SpacecraftsService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([
            mockSpacecraft1, mockSpacecraft2
          ]),
          findOne: jest.fn().mockResolvedValue(mockSpacecraft1),
          create: jest.fn().mockRejectedValue(mockSpacecraft1),
          update: jest.fn(),
          delete: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<SpacecraftsController>(SpacecraftsController);
    service = module.get<SpacecraftsService>(SpacecraftsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new spacecraft', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockSpacecraft1);

      await controller.create(createSpacecraftDto);
      expect(createSpy).toHaveBeenCalledWith(createSpacecraftDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of spacecrafts', async () => {
      expect(controller.findAll(0, 10)).resolves.toEqual([
        mockSpacecraft1, mockSpacecraft2
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a spacecraft', async () => {
      expect(controller.findOne('1')).resolves.toEqual(mockSpacecraft1);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should delete a spacecraft', async () => {
      const removeSpy = jest.spyOn(service, 'delete');
      await controller.remove('1');
      expect(service.delete).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a spacecraft', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await controller.update('1', createSpacecraftDto);
      expect(service.update).toHaveBeenCalled();
    });
  });

});
