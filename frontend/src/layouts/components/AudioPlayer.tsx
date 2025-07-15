import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef } from "react"


const AudioPlayer = () => {
  const audioRef=useRef<HTMLAudioElement>(null)
  const prevSongRef=useRef<string|null>(null)
  
  const {isPlaying,currentSong,playNextSong}=usePlayerStore()


  useEffect(()=>{
    if(isPlaying)audioRef.current?.play()
      else audioRef.current?.pause()
  },[isPlaying])


  useEffect(()=>{
    const audio=audioRef.current
    const handleEnded=()=>{
      playNextSong()
    }
    audio?.addEventListener('ended',handleEnded)

    return ()=>audio?.removeEventListener('ended',handleEnded)
  },[playNextSong])
  

  useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		const audio = audioRef.current;
		const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
		if (isSongChange) {
		
			audio.currentTime = 0;

			prevSongRef.current = currentSong?.audioUrl;

			if (isPlaying) audio.play();
		}
	}, [currentSong, isPlaying]);
  return (
    <audio ref={audioRef} src={currentSong?.audioUrl}/>
  )
  }
export default AudioPlayer