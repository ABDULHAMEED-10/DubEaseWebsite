from moviepy.video.io.VideoFileClip import VideoFileClip
import moviepy.editor as mp
import speech_recognition as sr
from googletrans import Translator
import os

from moviepy.editor import VideoFileClip
import os

def extract_audio(video_path, audio_output_path):
  
    video_clip = VideoFileClip(video_path)
    os.makedirs(os.path.dirname(audio_output_path), exist_ok=True)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(audio_output_path)
    video_clip.close()


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

def translate_text(text, target_language='urdu'):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

def save_text_to_file(text, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)

def process_video(filename):
    video_path = os.path.join('E:/DubEase/Python Server/uploads/', filename)
    pathOfAudioFile = 'output/'
    audioFileExtension = 'myaudio.wav'
    words_to_remove = [".mp4", ".webm" , ".mp3"]
    for word in words_to_remove:
        filename = filename.replace(word, "")
    audio_output_path = f'{pathOfAudioFile}{filename}{audioFileExtension}'
    pathOfTextFile = 'output/'
    textFileExtension = 'translated_text.txt'
    text_output_path = f'{pathOfTextFile}{filename}{textFileExtension}'
    # Extract audio from the video
    
    extract_audio(video_path, audio_output_path)
  
    # Convert audio to text
    audio_text = convert_audio_to_text(audio_output_path)

    # Translate the text
    translated_text = translate_text(audio_text)

    # Save translated text to a file
    save_text_to_file(translated_text, text_output_path)