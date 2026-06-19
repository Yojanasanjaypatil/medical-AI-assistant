

from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_audio():

    audio_file = request.files["audio"]

    file_path = os.path.join(
        UPLOAD_FOLDER,
        "recorded_audio.wav"
    )

    audio_file.save(file_path)

    from whisper_service import transcribe_audio
    transcript = transcribe_audio(file_path)

    from llm_service import generate_clinical_summary
    summary = generate_clinical_summary(transcript)

    return jsonify({
        "transcript": transcript,
        "summary": summary
    })
if __name__ == "__main__":
    app.run(debug=True)