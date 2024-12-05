import React from 'react'
import Navbar from '../../components/User/Navbar';
import Hero from '../../components/User/Hero';
import Categories from '../../components/User/Categories';
import NewArrivals from '../../components/User/NewArrivals';
import Services from '../../components/User/Services';
import Promotion from '../../components/User/Promotion';
import Newsletter from '../../components/User/Newletter';
import Footer from '../../components/User/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <NewArrivals />
        <Services />
        <Promotion />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard;