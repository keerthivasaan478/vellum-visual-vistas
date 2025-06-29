import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Card, CardContent } from '@/components/ui/card';

const galleryItems = [
  {
    before: '/gallery-example-1-before.jpg', // Assuming you split the image
    after: '/gallery-example-1-after.jpg',
    title: 'Modern Living Room Transformation',
    description: 'From a dated, wood-paneled room to a bright and modern living space with a new color palette and contemporary furniture.'
  },
  {
    before: '/gallery-example-1-before.jpg',
    after: '/gallery-example-1-after.jpg',
    title: 'Cozy Bedroom Makeover',
    description: 'This bedroom was transformed into a cozy retreat with a new layout, lighting, and textiles.'
  },
  {
    before: '/gallery-example-1-before.jpg',
    after: '/gallery-example-1-after.jpg',
    title: 'Open Concept Kitchen',
    description: 'We opened up the space to create a modern, open-concept kitchen perfect for entertaining.'
  },
    {
    before: '/gallery-example-1-before.jpg',
    after: '/gallery-example-1-after.jpg',
    title: 'Luxury Bathroom Upgrade',
    description: 'A complete overhaul of the master bathroom, featuring a new vanity, shower, and high-end fixtures.'
  },
];

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-off-black mb-4">Our Work</h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Explore a selection of our recent virtual staging projects. See how we transform empty spaces into beautifully furnished homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <BeforeAfterSlider before={item.before} after={item.after} />
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