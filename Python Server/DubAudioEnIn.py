import speech_recognition as sr
from googletrans import Translator
from pydub import AudioSegment
import os

def convert_audio_to_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        try:
            audio_data = recognizer.record(source)
            audio_text = recognizer.recognize_google(audio_data)
        except sr.UnknownValueError:
            raise Exception("Audio is inaudible. Please choose a different audio.")
        except sr.RequestError as e:
            raise Exception(f"Could not request results from Google Speech Recognition service; {e}")
        
    return audio_text

def translate_text(text, target_language='urdu'):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

def save_text_to_file(text, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)

def process_En_audio(filename):
    input_folder = 'E:/DubEase/Python Server/uploads/EngAudioIn/'
    output_folder = 'E:/DubEase/Python Server/output/audio/EngIn/'
    pathOfTextFile = 'output/text/EngIn/'
    textFileExtension = 'translated_text.txt'
    text_output_path = os.path.join(pathOfTextFile, f"{os.path.splitext(filename)[0]}_{textFileExtension}")

    try:
        audio_path = os.path.join(input_folder, filename)
        audio_output_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}.wav")
        
        if audio_path.lower().endswith('.wav'):
            # No conversion needed
            audio_output_path = audio_path
        elif audio_path.lower().endswith(('.mp3', '.mpeg', '.ogg','.webm')):
            # Convert audio to WAV
            audio = AudioSegment.from_file(audio_path)
            audio.export(audio_output_path, format="wav")
        
        # Convert audio to text
        audio_text = convert_audio_to_text(audio_output_path)
        # Translate the text
        translated_text = translate_text(audio_text)

        
        # Save translated text to a file
        save_text_to_file(translated_text, text_output_path)
    except Exception as e:
        print(f"Error occurred during processing: {e}")





