import "./Header.css"
import { Link as RouterLink } from 'react-router-dom';


export default function Header() {
    const userId = sessionStorage.getItem('userId');
    const isAdmin = userId ? getUserRole(userId) === 'admin' : false;

    function getUserRole(userId: any) {
        const adminUserIds = ["admin", "otherAdminUserId"];
        return adminUserIds.includes(userId) ? 'admin' : 'user';
    }

    return (
        <header>
            <div className="header-2">
                <nav className="bg-white py-2 md:py-4">
                    <div className="container px-4 mx-auto md:flex md:items-center">
                        <div className="hidden md:flex flex-col md:flex-row justify-around md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <RouterLink to="/home" className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 text-custom-blue hover:bg-hover-blue transition-colors duration-300">Home</RouterLink>
                            {isAdmin && (
                                <RouterLink to="/dashboard" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Users</RouterLink>
                            )}
                            <RouterLink to="/CreateBlog" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">New Blog</RouterLink> 
                            <RouterLink to="/" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-custom-blue hover:bg-hover-blue transition-colors duration-300">Logout</RouterLink>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );


}