
const Benefits = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "From empty rooms to stunning spaces in just 4 hours. No waiting weeks for results."
    },
    {
      icon: "🎨",
      title: "Consistent System",
      description: "Every staging follows our proven process for flawless, professional results every time."
    },
    {
      icon: "💰",
      title: "Flat Rate Pricing",
      description: "One simple price: $50 for up to 15 photos. No hidden fees or surprise charges."
    },
    {
      icon: "🔄",
      title: "Unlimited Revisions",
      description: "Not happy with the result? We'll revise until you love it, at no extra cost."
    },
    {
      icon: "📱",
      title: "Easy Process",
      description: "Just paste your listing link. We handle downloads, staging, and delivery automatically."
    },
    {
      icon: "🏆",
      title: "Proven Results",
      description: "Staged homes sell 73% faster and for 20% more money. See the difference for yourself."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-lora text-3xl md:text-4xl font-medium text-off-black mb-4">
            Why Choose Vellum?
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            We combine the speed of technology with consistent quality processes to deliver results that actually sell homes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="card-soft text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="font-inter font-semibold text-xl text-off-black mb-3">
                {benefit.title}
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
