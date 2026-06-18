import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

import AdminRoute from './AdminRoutes.jsx';

import Home from '../pages/PublicPages/home.jsx';
import About from '../pages/PublicPages/about.jsx';
import Work from '../pages/PublicPages/work.jsx';

import Register from '../pages/AuthPages/register.jsx';
import Login from '../pages/AuthPages/login.jsx';
import GuestRoute from '../pages/PublicPages/guest.jsx';
import Loading from '../components/common/loading/loading.jsx';

import Terms from '../pages/PublicPages/terms.jsx';
import Privacy from '../pages/PublicPages/privacy.jsx';

import Error from '../pages/Error/error.jsx';

import Dashboard from '../pages/AdminPages/Dashboard/dashboard.jsx';
import CreateProject from '../pages/AdminPages/CreateProject/create.project.jsx';
import ManageProjects from '../pages/AdminPages/ManageProject/manage.project.jsx';
import EditProject from '../pages/AdminPages/EditProject/edit.project.jsx'
import ProjectDetails from '../pages/PublicPages/projectDetails.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            {/* public routes */}
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/work' element={<Work />} />
            </Route>

            <Route path="/project/:slug" element={<ProjectDetails />}/>

            {/* terms routes */}

            <Route path='/terms-conditions' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />

            {/* auth routes */}

            <Route path='/register' element={
                <GuestRoute>
                    <Register />
                </GuestRoute>
            } />
            <Route path='/login' element={
                <GuestRoute>
                    <Login />
                </GuestRoute>
            } />

            {/* Load route */}

            <Route path="/loading" replace element={<Loading />} />

            {/* Error Route */}

            <Route path="/error" element={<Error />} />

            {/* Admin Routes */}

            <Route element={<AdminRoute />}>

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >
                    <Route
                        path='/admin/dashboard'
                        element={<Dashboard />}
                    />

                    <Route
                        path="create-project"
                        element={<CreateProject />}
                    />

                    <Route
                        path="manage-projects"
                        element={<ManageProjects />}
                    />

                    <Route
                        path="/admin/edit-project/:id"
                        element={<EditProject />}
                    />

                </Route>

            </Route>
        </Routes>
    )
}
