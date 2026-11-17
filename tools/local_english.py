"""Optional, network-free English clip authoring using the installed Flite SLT voice.

This module is never imported by the app, its packager or normal content loader.
It requires libflite1 (including cmu_us_slt) and ffmpeg on the authoring machine.
"""
import ctypes as c
from ctypes.util import find_library
from pathlib import Path
import subprocess
import tempfile

class EnglishVoice:
    def __init__(self):
        library=find_library('flite')
        voice_library=find_library('flite_cmu_us_slt')
        if not library or not voice_library:
            raise RuntimeError('Install libflite1 with the cmu_us_slt voice to author English audio locally')
        self.engine=c.CDLL(library,mode=c.RTLD_GLOBAL)
        self.engine.flite_init()
        self.library=c.CDLL(voice_library)
        self.library.register_cmu_us_slt.argtypes=[c.c_char_p]
        self.library.register_cmu_us_slt.restype=c.c_void_p
        self.voice=self.library.register_cmu_us_slt(None)
        if not self.voice:raise RuntimeError('Cannot initialize English SLT voice')
        self.engine.flite_text_to_wave.argtypes=[c.c_char_p,c.c_void_p]
        self.engine.flite_text_to_wave.restype=c.c_void_p
        self.engine.cst_wave_save_riff.argtypes=[c.c_void_p,c.c_char_p]
        self.engine.cst_wave_save_riff.restype=c.c_int
        self.engine.delete_wave.argtypes=[c.c_void_p]

    def render(self, text: str, destination: Path):
        if not isinstance(text,str) or not text.strip() or '\0' in text:
            raise ValueError('Nonempty English text without null characters is required')
        destination=Path(destination)
        destination.parent.mkdir(parents=True,exist_ok=True)
        with tempfile.TemporaryDirectory() as tmp:
            wav=Path(tmp)/'clip.wav'
            mp3=Path(tmp)/'clip.mp3'
            wave=self.engine.flite_text_to_wave(text.encode('utf-8'),self.voice)
            if not wave:raise RuntimeError('English synthesis failed')
            try:
                if self.engine.cst_wave_save_riff(wave,str(wav).encode()) != 0:
                    raise RuntimeError('Cannot save English wave data')
            finally:self.engine.delete_wave(wave)
            subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','48k','-map_metadata','-1',str(mp3)],check=True,capture_output=True)
            data=mp3.read_bytes()
            if len(data)<100:raise RuntimeError('Empty English audio')
            destination.write_bytes(data)
        return destination
