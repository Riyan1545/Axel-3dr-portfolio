import React from 'react'
import AboutComponent from '../../features/about/about.hero/about.jsx';
import Skills from '../../features/about/about.skills/about.skills.jsx';
import CommonFooter from '../../components/common/CommonFooter/common.footer.jsx';

const About = () => {
  return (
    <>
    <AboutComponent />
    <Skills />
    <CommonFooter />
    </>
  )
}

export default About
