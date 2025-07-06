import BeforeAfterSlider from './BeforeAfterSlider';

const BeforeAfterSection = () => {
  return (
    <section className="py-16 bg-canvas-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-lora text-3xl md:text-4xl font-medium text-off-black mb-4">
            Before and After
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Take a look at what we can do. Slide the handle to see the transformation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage={{
              src: "/gallery/livingroom4.png",
              alt: "Empty living room before virtual staging"
            }}
            afterImage={{
              src: "/gallery/livingroomA.png",
              alt: "Furnished living room after virtual staging"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
