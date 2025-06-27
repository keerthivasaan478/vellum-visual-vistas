
const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Paste Your Link",
      description: "Simply paste your Zillow, MLS, or listing URL. We'll automatically download all the photos."
    },
    {
      number: "02", 
      title: "System Processing",
      description: "Our proven staging system transforms each room with premium furniture and decor using consistent quality standards."
    },
    {
      number: "03",
      title: "Receive Your Images",
      description: "Get your stunning staged photos delivered to your inbox in just 4 hours, ready to upload anywhere."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-lora text-3xl md:text-4xl font-medium text-off-black mb-4">
            From Empty to Extraordinary
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes virtual staging effortless while maintaining the highest quality standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="card-soft text-center lg:text-left">
                <div className="text-burnt-gold font-playfair text-4xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="font-inter font-semibold text-xl text-off-black mb-3">
                  {step.title}
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Arrow for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-burnt-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
