import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app';
import { routes } from './app/app-routing-module';

// Servislerinizi import edin
import { Api } from './app/services/api';
import { Auth } from './app/services/auth';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideHttpClient(),

    Api,
    Auth
  ]
}).catch(err => console.error(err));