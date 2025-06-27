
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
              src: "https://images.unsplash.com/photo-1560185007-c5ca9d2c015d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Empty living room and kitchen area before virtual staging"
            }}
            afterImage={{
              src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Modern, stylishly furnished living room after virtual staging"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
