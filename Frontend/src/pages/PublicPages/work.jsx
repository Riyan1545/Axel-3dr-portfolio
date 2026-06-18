import React from 'react'
import WorkHero from '../../features/work/work.hero/work.hero.jsx';
import { useState } from 'react';
import WorkProjects from './WorkProjects.jsx';

const Work = () => {

  const [category, setCategory] = useState('ALL');

  return (
    <>
      <WorkHero
        activeCategory={category}
        setActiveCategory={setCategory} />

      <WorkProjects
        category={category}
      />
    </>
  )
}

export default Work
