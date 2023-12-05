from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from moviepy.video.io.VideoFileClip import VideoFileClip
import moviepy.editor as mp
import speech_recognition as sr
from googletrans import Translator
import os 

app = Flask(__name__)
app.config['uploads'] = 'E:/DubEase/Python Server/uploads'
CORS(app, origins='http://localhost:3000')

global filename  # Declare filename as global

@app.route('/flask/generateDub', methods=['POST','GET'])
def uploadFileExtractText():
    global filename  # Access global filename variable
    if request.method == 'POST':
        if 'source' not in request.files:
            return jsonify({"message": "Data sent unsuccessfully", "status": "error"}), 400
        else:
            f = request.files['source']
            print(f)
            f.save(os.path.join(app.config['uploads'], secure_filename(f.filename)))
            filename = secure_filename(f.filename) 
            print(filename)

        return jsonify({"message": "Data sent successfully", "status": "success"}), 200

# Function for extracting audio
def extract_audio(video_path, audio_output_path):
    video_clip = VideoFileClip(video_path)
    os.makedirs(os.path.dirname(audio_output_path), exist_ok=True)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(audio_output_path)
    video_clip.close()

# Function for converting audio to text
def convert_audio_to_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        try:
            audio_data = recognizer.record(source)
            audio_text = recognizer.recognize_google(audio_data)
        except sr.UnknownValueError:
            raise Exception("Audio is inaudible. Please choose a different video.")
        except sr.RequestError as e:
            raise Exception(f"Could not request results from Google Speech Recognition service; {e}")
    return audio_text

# Function for translating text
def translate_text(text, target_language='urdu'):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

# Function for saving text to a file
def save_text_to_file(text, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)

try:
    # Define paths
    video_path = os.path.join('E:/DubEase/Python Server/uploads/' ,"Small_Talk_-_Everyday_English.mp4")
    audio_output_path = 'output/myaudio.wav'
    text_output_path = 'output/translated_text.txt'

    # Extract audio from the video
    extract_audio(video_path, audio_output_path)
    
    # Convert audio to text
    audio_text = convert_audio_to_text(audio_output_path)
    
    # Translate the text
    translated_text = translate_text(audio_text)
    
    # Save translated text to a file
    save_text_to_file(translated_text, text_output_path)
    
    print("Translation completed successfully.")
except Exception as e:
    print(f"Error: {str(e)}")
    print("Please change the input video and try again.")

if __name__ == '__main__':
    app.run(debug=True)
