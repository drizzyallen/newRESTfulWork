import { createBrowserRouter } from 'react-router'
import App from '../App.tsx'
import PageNotFound from '../pages/PageNotFound.tsx'
import View from '../pages/View.tsx'
import New from '../pages/New.tsx'
import Edit from '../pages/Edit.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App /> 
    },
    {
        path: '/view',
        element: <View />
    },
    {
        path: '/new',
        element: <New/>
    },
    {
        path: '/edit/:id',
        element: <Edit />
    },
    {
        path: '*',
        element: <PageNotFound/>
    }
])
