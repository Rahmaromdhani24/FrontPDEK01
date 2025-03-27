import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base'; // Import Syncfusion

// Enregistrez votre licence AVANT le bootstrap
registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCekx0WmFZfVtgcl9GaVZQQGYuP1ZhSXxWdkZhX39YcH1UQmhcUEV9XUs='); 

// Puis lancez l'application
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));