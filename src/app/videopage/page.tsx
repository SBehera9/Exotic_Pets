import FooterSection from '@/components/Home/FooterSection';
import Navbar from '@/components/Home/Navbar';
import VideoPage from '@/components/Page/VideoPage';
import React from 'react'

function page() {
  return (
    <div>
      <Navbar />
      <VideoPage />
      <FooterSection />
    </div>
  )
}

export default page;