import React from 'react'
import './styles.css'

import {SidebarData} from './SidebarData' 

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
              <li 
                className="row"
                key={key} 
                onClick={() => { 
                  window.location.pathname = val.link 
                }}>
              <div>{val.icon}</div>
              <div></div> 
              </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
