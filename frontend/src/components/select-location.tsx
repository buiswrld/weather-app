import React from 'react';

interface SelectLocationProps {
  lat: string;
  lon: string;
  setLat: (lat: string) => void;
  setLon: (lon: string) => void;
  handleFetchWeather: () => void;
}

const SelectLocation: React.FC<SelectLocationProps> = ({ lat, lon, setLat, setLon, handleFetchWeather }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Enter latitude"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        placeholder="Enter longitude"
        className="border p-2"
      />
      <button
        onClick={handleFetchWeather}
        className="bg-blue-500 text-white p-2 ml-2"
      >
        Get Weather
      </button>
    </div>
  );
};

export default SelectLocation;