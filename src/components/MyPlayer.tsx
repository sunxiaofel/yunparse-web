import { useEffect, useRef } from 'react'
// @ts-ignore
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'

const MyAPlayer = ({ data }: any) => {
  const playerRef = useRef<HTMLDivElement>(null)
  const aplayerInstance = useRef<APlayer | null>(null)

  useEffect(() => {
    if (playerRef.current && !aplayerInstance.current) {
      aplayerInstance.current = new APlayer({
        container: playerRef.current,
        fixed: false,
        autoplay: true,
        lrcType: 1,
        audio: [
          {
            name: data.name,
            artist: data.ar_name,
            url: data.url,
            cover: data.pic,
            lrc: data.lyric,
          },
        ],
      })
    }

    return () => {
      // 卸载播放器实例，防止内存泄漏
      if (aplayerInstance.current) {
        aplayerInstance.current.destroy()
        aplayerInstance.current = null
      }
    }
  }, [])

  return <div ref={playerRef} />
}

export default MyAPlayer
