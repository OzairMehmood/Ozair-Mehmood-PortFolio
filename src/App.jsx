import React from 'react';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import './index.css';

function App() {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Profile />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <ContactForm />
    </div>
  );
}

export default App;
