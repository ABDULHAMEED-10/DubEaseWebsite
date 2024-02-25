from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from DubVideo import process_video
from DubAudio import process_audio
from model import emotionFaceDetectorModel

app = Flask(__name__)
app.config['uploads'] = 'E:/DubEase/Python Server/uploads'
CORS(app, origins='http://localhost:3000')

@app.route('/flask/generateDub', methods=['POST','GET'])
def Dub():
    if request.method == 'POST':
        if 'source' not in request.files:
            return jsonify({"message": "Data sent unsuccessfully", "status": "error"}), 400
        else:
            f = request.files['source']
            f.save(os.path.join(app.config['uploads'], secure_filename(f.filename)))
            filename = secure_filename(f.filename)

            try:
                if filename.lower().endswith('.mp4') or (filename.lower().startswith("camera_video") and filename.lower().endswith('.webm')):
                    
                    process_video(filename)
                    print("Translation has been done")
                    # emotionFaceDetectorModel(filename)
                    # print("Emotion detection has been done")
                
                else:
                    process_audio(filename)
                   

                return jsonify({"message": "Data sent successfully", "status": "success"}), 200
            except Exception as e:
                return jsonify({"message": f"Error: {str(e)}", "status": "error"}), 500

if __name__ == '__main__':
    app.run(debug=True)