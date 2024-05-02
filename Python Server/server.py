from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from DubVideoEnIn import process_En_video
from DubVideoUrIn import process_Ur_video
from DubAudioEnIn import process_En_audio
from DubAudioUrIn import process_Ur_audio
from TTS_urEn import text_to_speech
from VCStarGanv2 import voice_cloning
from TTS_urEn import voiceCloningEnglish
from TTS_urEn import process_filename
from Synchronization import combine_audio_video
import time
app = Flask(__name__)
app.config['uploads'] = 'E:/DubEase/Python Server/uploads'
app.config['output'] = 'E:/DubEase/Python Server/dubOutput'
CORS(app, origins='http://localhost:3000')

@app.route('/flask/generateDub', methods=['POST','GET'])


def Dub():
    if request.method == 'POST':
        if 'source' not in request.files:
            return jsonify({"message": "Data sent unsuccessfully", "status": "error"}), 400
        else:
            f = request.files['source']
            timestamp = str(time.time()).replace('.', '')
            filename = secure_filename(f.filename)
            filename_without_extension, file_extension = os.path.splitext(filename)
            filename_with_timestamp = f"{filename_without_extension}_{timestamp}{file_extension}"
            f.save(os.path.join(app.config['uploads'], filename_with_timestamp))
            filename = filename_with_timestamp
            ln = request.form['language']
            video_path = os.path.join(app.config['uploads'], filename)
            output_path = os.path.join(app.config['output'], f"{filename_without_extension}_dubbed{file_extension}")   
            try:
                if filename.lower().endswith('.mp4') or (filename.lower().startswith("camera_video") and filename.lower().endswith('.webm')):
                    if ln == 'urdu':
                        audioPath,text = process_Ur_video(filename)
                        filename_without_extension,clonedVoicePath = process_filename(filename,ln="UrIn")
                        # this code is written for Test to speach for speech English languag
                        voiceCloningEnglish(text,audioPath,clonedVoicePath)
                        combine_audio_video(video_path, clonedVoicePath, output_path)
                    elif(ln == 'english'):
                        
                        audioPath,text = process_En_video(filename)
                        filename_without_extension,clonedVoicePath = process_filename(filename,ln="EngIn")
                        # '''this code is written for Text to speech for speech Urdu language'''
                        speachPath = text_to_speech(filename_without_extension, text) 
                        # '''this code is written for Voice Conversion for any language'''
                        voice_cloning(speachPath,audioPath,clonedVoicePath)
                        combine_audio_video(video_path, clonedVoicePath, output_path)
                    
                
                else:
                    if ln == 'urdu':
                        audioPath,text = process_Ur_audio(filename)
                        filename_without_extension,clonedVoicePath = process_filename(filename,ln="UrIn")
                        # this code is written for Test to speach for speech English language
                        voiceCloningEnglish(text,audioPath,clonedVoicePath)
                        
                    elif(ln == 'english'):
                        audioPath,text = process_En_audio(filename)
                        filename_without_extension, clonedVoicePath = process_filename(filename,ln="EngIn")
                        # '''this code is written for Text to speech for speech Urdu language'''
                        speachPath = text_to_speech(filename_without_extension, text) 
                        # '''this code is written for Voice Conversion for any language'''
                        voice_cloning(speachPath,audioPath,clonedVoicePath)
                        
                   

                return jsonify({"message": "Data sent successfully", "status": "success"}), 200
            except Exception as e:
                return jsonify({"message": f"Error: {str(e)}", "status": "error"}), 500

if __name__ == '__main__':
    app.run(debug=True)