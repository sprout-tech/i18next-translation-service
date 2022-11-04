const {
  readFilesSync,
  makeRelativePath,
  readJSONFile,
  writeFile,
} = require("./utils");
const { Translate } = require("@google-cloud/translate").v2;
const config = require("./config");

async function translate() {
  const translate = new Translate({
    key: config.googleTranslateApiKey,
    projectId: config.googleTranslateProjectId,
  });

  const baseTranslationsFiles = readFilesSync(
    makeRelativePath(`${config.localesPath}/${config.baseLanguage}`)
  );

  for (let targetLanguage of config.targetLanguages) {
    for (let baseTranslationFile of baseTranslationsFiles) {
      let baseTranslation = readJSONFile(baseTranslationFile.filepath);
      let targetLanguageFilePath = makeRelativePath(
        `${config.localesPath}/${targetLanguage}/${baseTranslationFile.name}${baseTranslationFile.ext}`
      );
      let targetLanguageTranslation = readJSONFile(targetLanguageFilePath);
      if (targetLanguageTranslation === null) {
        // Do translations for lang and write file
        let translatedFileData = {};
        for (let translateKey of Object.keys(baseTranslation)) {
          let textToTranslate = translateKey;
          if (baseTranslation[translateKey] !== "") {
            textToTranslate = baseTranslation[translateKey];
          }
          console.log("Text to translate", textToTranslate);
          let [translation] = await translate.translate(
            textToTranslate,
            targetLanguage
          );
          console.log("Translation success", translation);
          if (translation) {
            translatedFileData[translateKey] = translation;
          } else {
            translatedFileData[translateKey] = "";
          }
        }
        writeFile(targetLanguageFilePath, translatedFileData);
        console.log(
          "Success wrote the translated file",
          targetLanguageFilePath
        );
      } else {
        console.log(
          `Skipping create of language ${targetLanguage} ${baseTranslationFile.name}`
        );
      }
    }
    console.log(
      `Finished creating translations for language ${targetLanguage}`
    );
  }
  console.log(`Finished all translations`);
}

module.exports = translate;
