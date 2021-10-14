import Sound from 'react-sound';
const PlaySound = ({url}) => {

    return (    
        <>
            <Sound
                url={url}
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
            />
        </>
    )
}

export default PlaySound
