import Sound from 'react-sound';
const PlaySound = ({handleSongFinishedPlaying, url, playSound}) => {

    return (
        <>
            <Sound
                url={url}
                playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED}
                onFinishedPlaying={handleSongFinishedPlaying}
            />
        </>
    )
}

export default PlaySound
