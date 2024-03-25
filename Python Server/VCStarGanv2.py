import random
import yaml
import numpy as np
import torch
from torch import nn
import torch.nn.functional as F
from TTS.api import TTS
import torchaudio
import librosa



speakers = [225,228,229,230,231,233,236,239,240,244,226,227,232,243,254,256,258,259,270,273]

# to_mel = torchaudio.transforms.MelSpectrogram(
#     n_mels=80, n_fft=2048, win_length=1200, hop_length=300)
# mean, std = -4, 4

# def preprocess(wave):
#     wave_tensor = torch.from_numpy(wave).float()
#     mel_tensor = to_mel(wave_tensor)
#     mel_tensor = (torch.log(1e-5 + mel_tensor.unsqueeze(0)) - mean) / std
#     return mel_tensor

# def build_model(model_params={}):
#     args = Munch(model_params)
#     generator = Generator(args.dim_in, args.style_dim, args.max_conv_dim, w_hpf=args.w_hpf, F0_channel=args.F0_channel)
#     mapping_network = MappingNetwork(args.latent_dim, args.style_dim, args.num_domains, hidden_dim=args.max_conv_dim)
#     style_encoder = StyleEncoder(args.dim_in, args.style_dim, args.num_domains, args.max_conv_dim)

#     nets_ema = Munch(generator=generator,
#                      mapping_network=mapping_network,
#                      style_encoder=style_encoder)

#     return nets_ema

# def compute_style(speaker_dicts):
#     reference_embeddings = {}
#     for key, (path, speaker) in speaker_dicts.items():
#         if path == "":
#             label = torch.LongTensor([speaker]).to('cuda')
#             latent_dim = starganv2.mapping_network.shared[0].in_features
#             ref = starganv2.mapping_network(torch.randn(1, latent_dim).to('cuda'), label)
#         else:
#             wave, sr = librosa.load(path, sr=24000)
#             audio, index = librosa.effects.trim(wave, top_db=30)
#             if sr != 24000:
#                 wave = librosa.resample(wave, sr, 24000)
#             mel_tensor = preprocess(wave).to('cuda')

#             with torch.no_grad():
#                 label = torch.LongTensor([speaker])
#                 ref = starganv2.style_encoder(mel_tensor.unsqueeze(1), label)
#         reference_embeddings[key] = (ref, label)

#     return reference_embeddings


# F0_model = JDCNet(num_class=1, seq_len=192)
# params = torch.load("/Utils/JDC")['net']
# F0_model.load_state_dict(params)
# _ = F0_model.eval()
# F0_model = F0_model.to('cuda')
# load vocoder
# from parallel_wavegan.utils import load_model
# vocoder = load_model("/Vocoder/checkpoint-400000steps.pkl").to('cuda').eval()
# vocoder.remove_weight_norm()
# _ = vocoder.eval()

# load starganv2

# model_path = ''

# with open('') as f:
#     starganv2_config = yaml.safe_load(f)
# starganv2 =""
# params = torch.load(model_path, map_location='cuda')
# params = params['model_ema']
# _ = [starganv2[key].load_state_dict(params[key]) for key in starganv2]
# _ = [starganv2[key].eval() for key in starganv2]
# starganv2.style_encoder = starganv2.style_encoder.to('cuda')
# starganv2.mapping_network = starganv2.mapping_network.to('cuda')
# starganv2.generator = starganv2.generator.to('cuda')

# -------------------------------------------------
def voice_cloning(source_wav, target_wav, output_wav):
    tts = TTS(model_name="voice_conversion_models/multilingual/vctk/freevc24", progress_bar=False).to("cpu")
    tts.voice_conversion_to_file(source_wav=source_wav, target_wav=target_wav, file_path=output_wav)

# # load input wave
# selected_speakers = [273, 259, 258, 243, 254, 244, 236, 233, 230, 228]
# k = random.choice(selected_speakers)
# wav_path = 'source.wav'
# audio, source_sr = librosa.load(wav_path, sr=24000)
# audio = audio / np.max(np.abs(audio))
# audio.dtype = np.float32

# # with reference, using style encoder
# speaker_dicts = {}
# for s in selected_speakers:
#     k = s
#     speaker_dicts['p' + str(s)] = ('refrence.wav', speakers.index(s))

# reference_embeddings = compute_style(speaker_dicts)

# # conversion
# import time
# start = time.time()

# source = preprocess(audio).to('cuda')
# keys = []
# converted_samples = {}
# reconstructed_samples = {}
# converted_mels = {}

# for key, (ref, _) in reference_embeddings.items():
#     with torch.no_grad():
#         f0_feat = F0_model.get_feature_GAN(source.unsqueeze(1))
#         out = starganv2.generator(source.unsqueeze(1), ref, F0=f0_feat)

#         c = out.transpose(-1, -2).squeeze().to('cuda')
#         # y_out = vocoder.inference(c)
#         # y_out = y_out.view(-1).cpu()

#         if key not in speaker_dicts or speaker_dicts[key][0] == "":
#             recon = None
#         else:
#             wave, sr = librosa.load(speaker_dicts[key][0], sr=24000)
#             mel = preprocess(wave)
#             c = mel.transpose(-1, -2).squeeze().to('cuda')
#             # recon = vocoder.inference(c)
#             recon = recon.view(-1).cpu().numpy()

#     # converted_samples[key] = y_out.numpy()
#     reconstructed_samples[key] = recon

#     converted_mels[key] = out

#     keys.append(key)
# end = time.time()
# print('total processing time: %.3f sec' % (end - start) )

# # import IPython.display as ipd
# for key, wave in converted_samples.items():
#     print('Converted: %s' % key)
#     # display(ipd.Audio(wave, rate=24000))
#     # print('Reference (vocoder): %s' % key)
#     # if reconstructed_samples[key] is not None:
#     #     display(ipd.Audio(reconstructed_samples[key], rate=24000))

# print('Original (vocoder):')
# wave, sr = librosa.load(wav_path, sr=24000)
# mel = preprocess(wave)
# c = mel.transpose(-1, -2).squeeze().to('cuda')
# # with torch.no_grad():
#     # recon = vocoder.inference(c)
#     # recon = recon.view(-1).cpu().numpy()

# # no reference, using mapping network
# # speaker_dicts = {}
# # selected_speakers = [273, 259, 258, 243, 254, 244, 236, 233, 230, 228]
# # for s in selected_speakers:
# #     k = s
# #     speaker_dicts['p' + str(s)] = ('', speakers.index(s))

# # reference_embeddings = compute_style(speaker_dicts)















# # def voice_cloning(source, target_wav, output_wav):
# #     api = TTS("tts_models/urd-script_arabic/fairseq/vits")
# #     api.tts_with_vc_to_file(
# #     source,
# #     speaker_wav=target_wav,
# #     file_path=output_wav
# # )




















# import torch
# import TTS.api as TTS

# def voice_cloning(source_wav, target_wav, output_wav):
#     device = "cuda" if torch.cuda.is_available() else "cpu"
#     tts = TTS(model_name="voice_conversion_models/multilingual/vctk/freevc24", progress_bar=False).to(device)
#     tts.voice_conversion_to_file(source_wav=source_wav, target_wav=target_wav, file_path=output_wav)


# voice_cloning(source_wav="E:/DubEase/Python Server/source.wav", target_wav="E:/DubEase/Python Server/refrence.wav", output_wav="E:/DubEase/Python Server/output.wav")
