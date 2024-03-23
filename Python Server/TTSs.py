from transformers import VitsModel, AutoTokenizer
import torch
import scipy

def text_to_speech(filename,text):
    model = VitsModel.from_pretrained("facebook/mms-tts-urd-script_arabic")
    tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-urd-script_arabic")


    inputs = tokenizer(text, return_tensors="pt")

    with torch.no_grad():
        output = model(**inputs).waveform

    output_path = f"E:/DubEase/Python Server/output/textToSpeach/{filename}.wav"  
    scipy.io.wavfile.write(output_path, rate=model.config.sampling_rate, data=output.squeeze().numpy())
    
    return output_path
