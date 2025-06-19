import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ContactPopup from './ContactPopup';
import QuotePopup from './QuotePopup'; // ✅ Add this import

const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false); // ✅ New state

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?...',
      title: 'Protect Your Home',
      description: 'Comprehensive coverage for your most valuable asset',
      path: '/policies',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...',
      title: 'Peace of Mind',
      description: '24/7 protection and support when you need it most',
      path: '/quote/renters',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?...',
      title: 'Customized Coverage',
      description: 'Tailored insurance solutions for your unique needs',
      path: '/quote/auto',
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?...',
      title: 'Fast Claims Process',
      description: 'Quick and efficient claims handling for your convenience',
      path: '/raise-claim',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const styles = {
    hero: {
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      marginTop: '80px',
      overflow: 'hidden',
    },
    slider: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    },
    slide: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      transition: 'all 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slideImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'brightness(0.7)',
    },
    slideContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: theme.palette.common.white,
      zIndex: 1,
      maxWidth: '800px',
      padding: '0 20px',
      width: '100%',
    },
    slideTitle: {
      fontSize: '3rem',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    slideDescription: {
      fontSize: '1.5rem',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      marginBottom: '2rem',
    },
    slideButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    dots: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 2,
    },
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    content: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '4rem 20px',
      textAlign: 'center',
    },
    title: {
      fontSize: '3.5rem',
      color: theme.palette.text.primary,
      marginBottom: '1.5rem',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: theme.palette.text.secondary,
      marginBottom: '2rem',
      lineHeight: '1.6',
    },
    buttons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
    },
    primaryButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    secondaryButton: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    stats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '4rem',
      padding: '2rem',
      backgroundColor: theme.palette.background.paper,
      flexWrap: 'wrap',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '2.5rem',
      color: theme.palette.primary.main,
      margin: 0,
      fontWeight: 'bold',
    },
    statLabel: {
      color: theme.palette.text.secondary,
      margin: 0,
      fontSize: '1.1rem',
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.slider}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              opacity: currentSlide === index ? 1 : 0,
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <img src={slide.image} alt={slide.title} style={styles.slideImage} />
            <div style={styles.slideContent}>
              <h2 style={styles.slideTitle}>{slide.title}</h2>
              <p style={styles.slideDescription}>{slide.description}</p>
              {slide.title === 'Peace of Mind' ? (
                <button
                  style={styles.slideButton}
                  onClick={() => setIsContactPopupOpen(true)}
                >
                  Learn More
                </button>
              ) : (
                <button
                  style={styles.slideButton}
                  onClick={() => navigate(slide.path)}
                >
                  Learn More
                </button>
              )}
            </div>
          </div>
        ))}
        <div style={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                backgroundColor:
                  currentSlide === index
                    ? theme.palette.primary.main
                    : theme.palette.grey[400],
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* ✅ Popup Components */}
      <ContactPopup open={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      <QuotePopup open={isQuotePopupOpen} onClose={() => setIsQuotePopupOpen(false)} />

      <div style={styles.content}>
        <h1 style={styles.title}>Protect What Matters Most</h1>
        <p style={styles.subtitle}>
          Get comprehensive insurance coverage for your home, belongings, and family.
          Fast, reliable, and affordable protection you can trust.
        </p>
        <div style={styles.buttons}>
          <button style={styles.primaryButton} onClick={() => setIsQuotePopupOpen(true)}>
            Get a Quote
          </button>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate('/raise-claim')}
          >
            File a Claim
          </button>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <h3 style={styles.statNumber}>98%</h3>
          <p style={styles.statLabel}>Customer Satisfaction</p>
        </div>
        <div style={styles.statItem}>
          <h3 style={styles.statNumber}>1M+</h3>
          <p style={styles.statLabel}>Claims Processed</p>
        </div>
        <div style={styles.statItem}>
          <h3 style={styles.statNumber}>24/7</h3>
          <p style={styles.statLabel}>Support Available</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
