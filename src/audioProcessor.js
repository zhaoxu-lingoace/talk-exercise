import * as sdk from "microsoft-cognitiveservices-speech-sdk";

async function callAzureTextToSpeech(
  text,
  { speechSynthesisVoiceName, speechSynthesisLanguage }
) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "f6443d23629344a5b71c5a22475bb62a",
    "eastus"
  );

  speechConfig.speechSynthesisVoiceName = speechSynthesisVoiceName;
  speechConfig.speechSynthesisLanguage = speechSynthesisLanguage;
  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  const result = await new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        setTimeout(() => {
          resolve(result);
        }, result.audioDuration / 10000.0 - 500);
      },
      (error) => {
        reject(error);
      }
    );
  });

  synthesizer.close();
  return result.audioData;
}

export async function sound(text) {
  await callAzureTextToSpeech(text, {
    speechSynthesisVoiceName: "en-US-JennyNeural",
    speechSynthesisLanguage: "en-US",
  });
}

export async function heard(text) {
  console.debug(text);
}
