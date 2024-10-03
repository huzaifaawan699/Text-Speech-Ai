import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text) return alert("Please enter some text");

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/speak', { text }, { responseType: 'blob' });

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error generating speech", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg mx-auto transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800 transition-colors duration-300 hover:text-teal-600">
          Text to Speech Converter
        </h1>
        <textarea
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 hover:shadow-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
        />
        <button
          onClick={handleSpeak}
          className={`w-full mt-4 p-3 bg-teal-500 text-white rounded-lg font-bold 
                      hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition 
                      transform duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          disabled={loading}
        >
          {loading ? "Converting..." : "Convert to Speech"}
        </button>
      </div>
    </div>
  );
}

export default App;
