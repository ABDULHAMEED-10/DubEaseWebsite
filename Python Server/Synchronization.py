from moviepy.editor import VideoFileClip, AudioFileClip, vfx

def combine_audio_video(video_path, audio_path, output_path,ln):
    if(ln == "EngIn"):
        video_clip = VideoFileClip(video_path)
        audio_clip = AudioFileClip(audio_path)
        video_clip = video_clip.without_audio()
        audio_clip = audio_clip.fx(vfx.speedx, 1.3)
        video_clip = video_clip.set_audio(audio_clip)
        video_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")
        video_clip.close()
        audio_clip.close()
    elif(ln == "UrIn"):
        video_clip = VideoFileClip(video_path)
        audio_clip = AudioFileClip(audio_path)
        video_clip = video_clip.without_audio()
        video_clip = video_clip.set_audio(audio_clip)
        video_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")
        video_clip.close()
        audio_clip.close()
    



