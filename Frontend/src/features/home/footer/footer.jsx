import React from 'react'
import './footer.css'

const Footer = () => {
    const cardArray = [
        {
            icon: 'ri-camera-4-line',
            title: 'High Quality',
            caption: 'Production Ready Assets'
        },
        {
            icon: 'ri-edit-box-line',
            title: 'Detail Oriented',
            caption: 'Pixel Perfect Attention'
        },
        {
            icon: 'ri-building-2-line',
            title: 'Clean Topology',
            caption: 'Optimized For All Platforms'
        },
        {
            icon: 'ri-alarm-line',
            title: 'On Time',
            caption: 'Reliable And Professional'
        },
    ]
  return (
    <section className='footer'>
        <div className="footer-container">
            <div className="card-holder">
                {cardArray.map((card) => {
                    return (
                        <div className="offer-card">
                            <i className={card.icon}></i>
                            <h3>{card.title}</h3>
                            <p>{card.caption}</p>
                        </div>
                    )
                    
                })}
            </div>
        </div>
    </section>
  )
}

export default Footer
