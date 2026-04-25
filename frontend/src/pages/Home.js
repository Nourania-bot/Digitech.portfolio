import React, { useState } from 'react';
import Navbar    from '../components/Navbar/Navbar';
import Hero      from '../components/Hero/Hero';
import About     from '../components/About/About';
import Services  from '../components/Services/Services';
import Portfolio from '../components/Portfolio/Portfolio';
import Contact   from '../components/Contact/Contact';
import Footer    from '../components/Footer/Footer';
import Admin     from '../components/Admin/Admin';

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);
  return (
    <>
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      {showAdmin && <Admin onClose={() => setShowAdmin(false)} />}
      <ScrollTop />
    </>
  );
}

function ScrollTop() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position:'fixed', bottom:32, right:32, zIndex:800,
        width:44, height:44, borderRadius:'50%',
        background:'var(--blue-primary)', color:'white',
        border:'none', cursor:'pointer', fontSize:20,
        boxShadow:'0 4px 16px rgba(27,108,168,.4)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}
      title="Retour en haut"
    >↑</button>
  );
}
