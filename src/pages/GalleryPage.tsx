import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Card, CardContent } from '@/components/ui/card';

const galleryItems = [
  {
    beforeImage: { src: '/imageshero/living-room1.png', alt: 'Empty living room before virtual staging' },
    afterImage: { src: '/imageshero/living-room2.png', alt: 'Furnished living room after virtual staging' },
    title: 'Elegant Living Room Staging',
    description: 'An empty space is transformed into an elegant and inviting living room with virtual staging.'
  },
  {
    beforeImage: { src: '/gallery/dining room1.png', alt: 'Empty dining room before virtual staging' },
    afterImage: { src: '/gallery/diningroom2.png', alt: 'Furnished dining room after virtual staging' },
    title: 'Chic Dining Area',
    description: 'A bare dining area is converted into a chic and modern space, perfect for family dinners.'
  },
  {
    beforeImage: { src: '/gallery/livingroom2A.png', alt: 'Empty living room before virtual staging' },
    afterImage: { src: '/gallery/livingroom2.png', alt: 'Furnished living room after virtual staging' },
    title: 'Contemporary Living Space',
    description: 'A simple room is elevated to a contemporary living space with stylish furniture and decor.'
  },
  {
    beforeImage: { src: '/gallery/livingroom2A2.png', alt: 'Living room before virtual staging' },
    afterImage: { src: '/gallery/living room3A.png', alt: 'Living room after virtual staging' },
    title: 'Bright & Airy Living Room',
    description: 'We transformed this living room to be brighter and more inviting.'
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