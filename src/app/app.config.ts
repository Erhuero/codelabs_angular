import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './interceptor/logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideClientHydration(), 
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([loggerInterceptor])
      ),
      provideRouter(routes),
  ],
};