import librosa

audio_path = 'E:/DubEase/Python Server/output/audio/American_Accent_short_myaudio.wav'
x, sr = librosa.load(audio_path)


mfcc = librosa.feature.mfcc(y=x, sr=sr)
spectral_contrast = librosa.feature.spectral_contrast(y=x, sr=sr)
chroma = librosa.feature.chroma_stft(y=x, sr=sr)
pitch = librosa.yin(y=x, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))
tone = librosa.effects.harmonic(y=x)
prosody = librosa.feature.rms(y=x)
speech_patterns = librosa.feature.tempogram(y=x, sr=sr)
vocal_characteristics = librosa.effects.split(y=x)

# Print the shape of each feature
print("MFCC shape:", mfcc.shape)
print("Spectral contrast shape:", spectral_contrast.shape)
print("Chroma shape:", chroma.shape)
print("Pitch shape:", pitch.shape)
print("Tone shape:", tone.shape)
print("Prosody shape:", prosody.shape)
print("Speech patterns shape:", speech_patterns.shape)
print("Vocal characteristics shape:", vocal_characteristics.shape)
