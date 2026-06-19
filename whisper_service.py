import whisper
import os

os.environ["PATH"] += os.pathsep + r"C:\Users\Yojana\Downloads\ffmpeg-8.1.1-full_build\ffmpeg-8.1.1-full_build\bin"
print("Loading Whisper model...")

model = whisper.load_model("base")

print("Whisper loaded successfully.")

def transcribe_audio(audio_path):

    result = model.transcribe(audio_path)

    return result["text"]