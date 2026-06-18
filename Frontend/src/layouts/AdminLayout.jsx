import React from 'react'
import SideBar from '../components/Admin/sidebar/sidebar.jsx';
import { Outlet } from 'react-router-dom';
import '../styles/admin.css'

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <SideBar />

      <main className='admin-content'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
