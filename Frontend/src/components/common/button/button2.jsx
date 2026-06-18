import React from 'react'
import './button.css'

const button2 = (props) => {
  return (
    <div>
      <button className='btn2'>{props.content} <i className={props.icon}></i></button>
    </div>
  )
}

export default button2