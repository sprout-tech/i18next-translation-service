# Translator Service 

This service was designed to work with translating files that were pared from the `i18next-parse`

## Configure the service

#### Add these to the .env file of the project

```yaml
TRANSLATOR_BASE_LANGUAGE=en
TRANSLATOR_TARGET_LANGUAGES_COMMA_SEPERATED="es,it"
TRANSLATOR_LOCALES_PATH_ROOT_RELATIVE=public/locales
TRANSLATOR_GOOGLE_TRANSLATE_API_KEY=xxxx
TRANSLATOR_GOOGLE_TRANSLATE_PROJECT_ID=app-name
```


### Run by using the installed command in the ./node_modules/.bin

```bash
translator
```
