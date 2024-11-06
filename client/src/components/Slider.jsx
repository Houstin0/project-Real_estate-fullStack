import { useState } from "react";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
    } else {
      setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
    }
  };

  return (
    <div className="w-full h-full flex gap-5">
      {/* Full Screen Slider */}
      {imageIndex !== null && (
        <div className="fixed inset-0 bg-black z-50 flex justify-between items-center">
          <div
            className="flex-1 flex justify-center items-center"
            onClick={() => changeSlide("left")}
          >
            <img
              src="/arrow.png"
              alt="left-arrow"
              className="w-12 md:w-8 sm:w-6"
            />
          </div>
          <div className="flex-[10] flex justify-center items-center">
            <img
              src={images[imageIndex]}
              alt="current-slide"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="flex-1 flex justify-center items-center"
            onClick={() => changeSlide("right")}
          >
            <img
              src="/arrow.png"
              alt="right-arrow"
              className="w-12 md:w-8 sm:w-6 transform rotate-180"
            />
          </div>
          <div
            className="absolute top-0 right-0 text-white text-4xl font-bold p-12 cursor-pointer"
            onClick={() => setImageIndex(null)}
          >
            X
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {/* Main Image */}
        <div>
          <img
            className="h-auto max-w-full object-cover rounded-lg cursor-pointer"
            src={images[0]}
            alt=""
            onClick={() => setImageIndex(0)}
          />
        </div>
        {/* Thumbnail Images */}
        <div className="grid grid-cols-5 gap-4">
          {images.slice(1).map((image, index) => (
            <img
              src={image}
              alt={`thumbnail-${index}`}
              key={index}
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              onClick={() => setImageIndex(index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
