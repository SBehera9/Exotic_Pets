import FooterSection from '@/components/Home/FooterSection'
import Navbar from '@/components/Home/Navbar'
import ContactusPage from '@/components/Page/ContactusPage'
import React from 'react'

function page() {
  return (
    <div>
        <Navbar />
        <ContactusPage />
        <FooterSection />
    </div>
  )
}

export default page