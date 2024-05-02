import { Test, TestingModule } from '@nestjs/testing';
import { CelestialBodiesController } from './celestial-bodies.controller';
import { CelestialBodiesService } from './celestial-bodies.service';
import { CreateCelestialBodyDto } from './dto/create-celestial-body.dto';
import { DiscoveryStatus } from './constants';

describe('CelestialBodiesController', () => {
  let controller: CelestialBodiesController;
  let service: CelestialBodiesService;

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
      controllers: [CelestialBodiesController],
      providers: [{
        provide: CelestialBodiesService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([
            mockCelestialBody1, mockCelestialBody2
          ]),
          findOne: jest.fn().mockResolvedValue(mockCelestialBody1),
          create: jest.fn().mockRejectedValue(mockCelestialBody1),
          update: jest.fn(),
          delete: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<CelestialBodiesController>(CelestialBodiesController);
    service = module.get<CelestialBodiesService>(CelestialBodiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new celestialBody', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCelestialBody1);

      await controller.create(createCelestialBodyDto);
      expect(createSpy).toHaveBeenCalledWith(createCelestialBodyDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of celestial bodies', async () => {
      expect(controller.findAll(0, 10)).resolves.toEqual([
        mockCelestialBody1, mockCelestialBody2
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a celestialBody', async () => {
      expect(controller.findOne('1')).resolves.toEqual(mockCelestialBody1);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should delete a celestialBody', async () => {
      const removeSpy = jest.spyOn(service, 'delete');
      await controller.remove('1');
      expect(service.delete).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a celestialBody', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await controller.update('1', createCelestialBodyDto);
      expect(service.update).toHaveBeenCalled();
    });
  });

});
