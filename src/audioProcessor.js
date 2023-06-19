import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export async function sound(text) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "f6443d23629344a5b71c5a22475bb62a",
    "eastus"
  );

  speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
  speechConfig.speechSynthesisLanguage = "en-US";
  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  await new Promise((resolve, reject) => {
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
}

export async function heard(text) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "1974b8e0a8e142de9146db6e62ab052e",
    "westus"
  );
  speechConfig.speechRecognitionLanguage = "en-US";

  const recognizer = new sdk.SpeechRecognizer(speechConfig);

  await new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });

  recognizer.close();
}
