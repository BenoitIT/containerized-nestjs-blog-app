import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      checkUserCreds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.checkUserCreds with correct payload', async () => {
    const loginPayload = { 
      email: 'test@example.com', 
      password: 'password123' 
    };

    const mockUser: Partial<User> = {
      id: 1,
      email: loginPayload.email,
      role: 'user'
    };

    // Mock the return value of checkUserCreds
    (mockAuthService.checkUserCreds as jest.Mock).mockResolvedValue({ 
      user: mockUser,
      accessToken: 'fake-token' 
    });

    const result = await controller.login(loginPayload);

    // Verify the service method was called with correct arguments
    expect(mockAuthService.checkUserCreds).toHaveBeenCalledWith(loginPayload);
    
    // Verify the result
    expect(result).toEqual({ 
      user: mockUser,
      accessToken: 'fake-token' 
    });
  });
});