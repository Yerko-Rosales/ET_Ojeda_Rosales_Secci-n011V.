import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AutorizadoGuard } from './autorizado.guard';
import { ToastController } from '@ionic/angular';

describe('AutorizadoGuard', () => {
  let guard: AutorizadoGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['IsLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const toastControllerMock = jasmine.createSpyObj('ToastController', ['create']);

    TestBed.configureTestingModule({
      providers: [
        AutorizadoGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastController, useValue: toastControllerMock }
      ]
    });

    guard = TestBed.inject(AutorizadoGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is logged in', () => {
    authServiceSpy.IsLoggedIn.and.returnValue(true);
    const canActivate = guard.canActivate();
    expect(canActivate).toBeTrue();
  });

  it('should prevent activation and redirect to /inicio if user is not logged in', () => {
    authServiceSpy.IsLoggedIn.and.returnValue(false);
    const canActivate = guard.canActivate();
    expect(canActivate).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/inicio');
  });

  it('should show a toast message if user is not logged in', async () => {
    authServiceSpy.IsLoggedIn.and.returnValue(false);
    toastControllerSpy.create.and.returnValue(Promise.resolve({ present: () => {} } as any));
    await guard.canActivate();
    expect(toastControllerSpy.create).toHaveBeenCalledWith({
      message: 'Debe iniciar sesión.',
      duration: 3000
    });
  });
});
