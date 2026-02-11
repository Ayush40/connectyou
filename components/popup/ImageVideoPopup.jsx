import { useEffect, useRef } from 'react';

const ImageVideoPopup = ({ url, onClose }) => {

  const popUpRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-75 bg-gray-800">
      {/* Blurred background */}
      <div className="absolute inset-0 backdrop-filter backdrop-blur-xs"></div>

      {/* Popup box */}
      <div className="relative p-8 bg-[#202329] rounded-lg shadow-md w-[60%]
        flex flex-col justify-center items-center w-fit" ref={popUpRef}>
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-500"
          onClick={() => onClose(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {url.includes("image") ? (
          <img src={url} alt="Popup Image" className="w-full h-auto max-h-[80vh] max-w-[50vw]" />
        ) : (

          <video src={url} controls className="object-contain object-center " />
        )}
      </div>
    </div>
  );
};

export default ImageVideoPopup;
