import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const debug = false;

function debugging() {
  if (debug) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  } else {
    return Promise.resolve(false);
  }
}

export async function sound(text, role) {
  if (await debugging()) {
    return;
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "f6443d23629344a5b71c5a22475bb62a",
    "eastus"
  );

  speechConfig.speechSynthesisVoiceName =
    role === "student" ? "en-US-AnaNeural" : "en-US-JennyNeural";
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
  if (await debugging()) {
    return;
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "1974b8e0a8e142de9146db6e62ab052e",
    "westus"
  );
  speechConfig.speechRecognitionLanguage = "en-US";

  const recognizer = new sdk.SpeechRecognizer(speechConfig);

  await new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        switch (result.reason) {
          case sdk.ResultReason.RecognizedSpeech:
            console.log(`RECOGNIZED: Text=${result.text}`);
            break;
          case sdk.ResultReason.NoMatch:
            console.log("NOMATCH: Speech could not be recognized.");
            break;
          case sdk.ResultReason.Canceled:
            const cancellation = sdk.CancellationDetails.fromResult(result);
            console.log(`CANCELED: Reason=${cancellation.reason}`);

            if (cancellation.reason == sdk.CancellationReason.Error) {
              console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
              console.log(
                `CANCELED: ErrorDetails=${cancellation.errorDetails}`
              );
              console.log(
                "CANCELED: Did you set the speech resource key and region values?"
              );
            }
            break;
        }

        recognizer.close();

        resolve();
      },
      (error) => {
        reject(error);
      }
    );
  });
}
