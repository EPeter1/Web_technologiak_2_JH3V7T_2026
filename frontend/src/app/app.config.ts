import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        DatePipe,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes)
    ]
};
