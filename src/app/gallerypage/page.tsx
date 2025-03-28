import FooterSection from '@/components/Home/FooterSection';
import Navbar from '@/components/Home/Navbar';
import GalleryPage from '@/components/Page/GalleryPage';
import React from 'react'

function page() {
  return (
    <div>
      <Navbar />
      <GalleryPage />
      <FooterSection />
    </div>
  )
}

export default page;