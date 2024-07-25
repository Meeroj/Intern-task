import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const MainLayout = ( {children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Your header and other components */}
        <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout