import "../styles/VolumeSlider.css"

export default function VolumeSlider({ volume, adjustVolume }) {
  const passValue = (e) => {
    adjustVolume(e.target.value);
  };
  return (
    <div className="volume-slider">
      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={passValue}
        />
      </label>
    </div>
  );
}
