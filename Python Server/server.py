from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os 
import json

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route('/flask/generateDub', methods=['POST','GET'])
def uploadFileExtractText():
    if request.method == 'POST':
       
        if 'source' not in request.form:
            return  jsonify({"message": "Data sent unsuccessfully","status": "error"}), 400
        
        else:
            print(request.files)
            # f = request.files['source']
            # f.save(secure_filename(f.filename))
            # filename = secure_filename(f.filename)
            # f.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))

        return jsonify({"message": "Data sent successfully","status": "success"}), 200
if __name__ == '__main__':
    app.run(debug=True)