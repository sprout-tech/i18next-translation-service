const env = require("dotenv").config();
const exampleMessage = `
    No dotenv found in project root
    Example file:
  
    TRANSLATOR_BASE_LANGUAGE=en
    TRANSLATOR_TARGET_LANGUAGES_COMMA_SEPERATED="es,it"
    TRANSLATOR_LOCALES_PATH_ROOT_RELATIVE=public/locales
    TRANSLATOR_GOOGLE_TRANSLATE_API_KEY=xxxx
    TRANSLATOR_GOOGLE_TRANSLATE_PROJECT_ID=app-name
  `;

if (env.error) {
  console.log(exampleMessage);
  console.log("env.error", env.error);
  throw new Error("Configure .env file in project root");
}

const requiredEnvKeys = {
  baseLanguage: "TRANSLATOR_BASE_LANGUAGE",
  targetLanguagesCommaSeperated: "TRANSLATOR_TARGET_LANGUAGES_COMMA_SEPERATED",
  localesPath: "TRANSLATOR_LOCALES_PATH_ROOT_RELATIVE",
  googleTranslateApiKey: "TRANSLATOR_GOOGLE_TRANSLATE_API_KEY",
  googleTranslateProjectId: "TRANSLATOR_GOOGLE_TRANSLATE_PROJECT_ID",
};

const envVars = env.parsed;
for (let requireConfigKey of Object.keys(requiredEnvKeys)) {
  let envKey = requiredEnvKeys[requireConfigKey];
  if (!envVars[envKey]) {
    console.log(exampleMessage);
    throw new Error(`Missing env key ${envKey}`);
  }
}
let targetLanguages = envVars[requiredEnvKeys.targetLanguagesCommaSeperated];
if (targetLanguages && targetLanguages.split) {
  targetLanguages = targetLanguages.split(",");
} else {
  targetLanguages = [];
}

const config = {
  // The source language to translate from
  baseLanguage: envVars[requiredEnvKeys.baseLanguage], // "en",
  // Do not include the base language
  targetLanguages: targetLanguages, // ["es", "uk", "it", "hi", "ps"],
  localesPath: `../${envVars[requiredEnvKeys.localesPath]}`, // `../public/locales/`,
  googleTranslateApiKey: envVars[requiredEnvKeys.googleTranslateApiKey], //"AIzaSyB5CchjO6r6rBxXIIikebkr9JrBKUUL21c",
  googleTranslateProjectId: envVars[requiredEnvKeys.googleTranslateProjectId], // "village-paths-translate-api",
};

console.log("Config set from env");
console.log("Config base language", config.baseLanguage);
console.log("Config target languages", config.targetLanguages);
console.log("Config locales path", config.localesPath);

module.exports = config;
