from whisper_service import transcribe_audio

text = transcribe_audio(
    "uploads/recorded_audio.wav"
)

print("\nTRANSCRIPT:\n")
print(text)