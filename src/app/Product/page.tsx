import FooterSection from '@/components/Home/FooterSection'
import Navbar from '@/components/Home/Navbar'
import ProductPage from '@/components/Page/Product'
import React from 'react'

function page() {
  return (
        <div>
            <Navbar/>
            <ProductPage />
            <FooterSection />
        </div>
  )
}

export default page