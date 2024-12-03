export default function VolumeSlider({ volume, adjustVolume }) {
    const passValue = (e) => {
        adjustVolume(e.target.value)
    };
  return (
    <>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={passValue}
      />
    </>
  );
}
