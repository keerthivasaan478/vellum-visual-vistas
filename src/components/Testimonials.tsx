
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Real Estate Agent",
      company: "Coldwell Banker",
      quote: "Vellum transformed my listings completely. The consistent quality is incredible and my clients are amazed. Sold 3 properties in the first week after staging!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Property Investor",
      company: "Rodriguez Holdings",
      quote: "I've tried other virtual staging services, but none compare to Vellum. The systematic approach and speed of delivery is unmatched.",
      rating: 5
    },
    {
      name: "Jennifer Chen",
      role: "Realtor",
      company: "RE/MAX Premier",
      quote: "The difference between AI-generated and Vellum's professional system is night and day. The results look absolutely realistic and beautiful.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-lora text-3xl md:text-4xl font-medium text-off-black mb-4">
            Trusted by Top Agents
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of real estate professionals who trust Vellum to showcase their listings beautifully.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-soft">
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-warning-gold fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="font-inter text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <div className="font-inter font-semibold text-off-black">
                  {testimonial.name}
                </div>
                <div className="font-inter text-sm text-gray-500">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
