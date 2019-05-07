import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// declare const require;
// let locale = localStorage.getItem('language');
// console.log(locale);
// let providers = [];
//
// if (['pl'].includes(locale)) {
//   const translations = require(`raw-loader!./locale/messages.${locale}.xlf`);
//   providers = [
//     { provide: TRANSLATIONS, useValue: translations },
//     { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
//     { provide: LOCALE_ID, useValue: locale }
//   ];
// }
// platformBrowserDynamic().bootstrapModule(AppModule, {
//   providers,
//   missingTranslation: MissingTranslationStrategy.Ignore
// })
//   .catch(err => console.error(err));


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
