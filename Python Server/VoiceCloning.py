from TTS.api import TTS

def voice_cloning(source_wav, target_wav, output_wav):
    tts = TTS(model_name="voice_conversion_models/multilingual/vctk/freevc24", progress_bar=False).to("cpu")
    tts.voice_conversion_to_file(source_wav=source_wav, target_wav=target_wav, file_path=output_wav)

















# def voice_cloning(source, target_wav, output_wav):
#     api = TTS("tts_models/urd-script_arabic/fairseq/vits")
#     api.tts_with_vc_to_file(
#     source,
#     speaker_wav=target_wav,
#     file_path=output_wav
# )




















# import torch
# import TTS.api as TTS

# def voice_cloning(source_wav, target_wav, output_wav):
#     device = "cuda" if torch.cuda.is_available() else "cpu"
#     tts = TTS(model_name="voice_conversion_models/multilingual/vctk/freevc24", progress_bar=False).to(device)
#     tts.voice_conversion_to_file(source_wav=source_wav, target_wav=target_wav, file_path=output_wav)


# voice_cloning(source_wav="E:/DubEase/Python Server/source.wav", target_wav="E:/DubEase/Python Server/refrence.wav", output_wav="E:/DubEase/Python Server/output.wav")