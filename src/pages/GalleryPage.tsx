import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Card, CardContent } from '@/components/ui/card';

const galleryItems = [
  {
    beforeImage: { src: '/gallery-example-1-before.jpg', alt: 'Dated living room with wood paneling and a hot tub' },
    afterImage: { src: '/gallery-example-1-after.jpg', alt: 'Modern, bright living room with stylish furniture' },
    title: 'Modern Living Room Transformation',
    description: 'From a dated, wood-paneled room to a bright and modern living space with a new color palette and contemporary furniture.'
  },
  {
    beforeImage: { src: '/gallery-example-1-before.jpg', alt: 'Dated living room with wood paneling and a hot tub' },
    afterImage: { src: '/gallery-example-1-after.jpg', alt: 'Modern, bright living room with stylish furniture' },
    title: 'Cozy Bedroom Makeover',
    description: 'This bedroom was transformed into a cozy retreat with a new layout, lighting, and textiles.'
  },
  {
    beforeImage: { src: '/gallery-example-1-before.jpg', alt: 'Dated living room with wood paneling and a hot tub' },
    afterImage: { src: '/gallery-example-1-after.jpg', alt: 'Modern, bright living room with stylish furniture' },
    title: 'Open Concept Kitchen',
    description: 'We opened up the space to create a modern, open-concept kitchen perfect for entertaining.'
  },
    {
    beforeImage: { src: '/gallery-example-1-before.jpg', alt: 'Dated living room with wood paneling and a hot tub' },
    afterImage: { src: '/gallery-example-1-after.jpg', alt: 'Modern, bright living room with stylish furniture' },
    title: 'Luxury Bathroom Upgrade',
    description: 'A complete overhaul of the master bathroom, featuring a new vanity, shower, and high-end fixtures.'
  },
];

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas-white">
      <Header />
      <main className="container mx-auto px-6 sm:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-off-black mb-4">Our Work</h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Check out some of our recent projects and transformations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <BeforeAfterSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-2">{item.title}</h3>
                <p className="font-inter text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage; 