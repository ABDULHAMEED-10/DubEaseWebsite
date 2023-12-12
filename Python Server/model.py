import cv2
import numpy as np
from keras.models import model_from_json


def emotionFaceDetectorModel (filename):

    emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
   
    # load json and create model
    json_file = open('E:/DubEase/Python Server/emotion_model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    emotion_model = model_from_json(loaded_model_json)


    # load weights into new model
    emotion_model.load_weights("E:/DubEase/Python Server/emotion_model.h5")
    

    # Open the input video
    folder_path = "E:/DubEase/Python Server/uploads/"
    input_path = f"{folder_path}{filename}"
    cap = cv2.VideoCapture(input_path)
    

    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    

    # Define the codec and create VideoWriter object to save the output video
    folder_path = "E:/DubEase/Python Server/Predicted_Emotion_Video/"
    
    

    output_path = f"{folder_path}{filename}"
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    # Haar cascade for face detection
    face_detector = cv2.CascadeClassifier('E:/DubEase/Python Server/haarcascades/haarcascade_frontalface_default.xml')

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        frame = cv2.resize(frame, (1280, 720))
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces
        num_faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

        # Process each detected face
        for (x, y, w, h) in num_faces:
            cv2.rectangle(frame, (x, y - 50), (x + w, y + h + 10), (0, 255, 0), 4)
            roi_gray_frame = gray_frame[y:y + h, x:x + w]
            cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)

            # Predict emotions
            emotion_prediction = emotion_model.predict(cropped_img)
            maxindex = int(np.argmax(emotion_prediction))
            cv2.putText(frame, emotion_dict[maxindex], (x + 5, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        # Write the frame with annotations to the output video
        out.write(frame)


        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the video capture and writer objects
    cap.release()
    out.release()

    # Destroy any OpenCV windows
    cv2.destroyAllWindows()