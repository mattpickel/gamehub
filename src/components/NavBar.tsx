import React from 'react';
import { Link } from 'react-router-dom';
import { SignedOut, useAuth, useUser } from '@clerk/clerk-react';
import LoginModal from './Modals/LoginModal';
import SignUpModal from './Modals/SignUpModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetUserScore from '../hooks/useGetUserScore';

const NavBar: React.FC = () => {

    // Login/Authorization for the app is contained in the NavBar component that is rendered on every page
    const { isSignedIn, signOut } = useAuth();
    const { user } = useUser();

    const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = React.useState(false);

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };

    const handleRegisterClick = () => {
        setSignUpModalOpen(true);
    }

    const handleLogoutClick = async () => {
        await signOut();
    };

    useGetUserScore(user?.id ??  '');

    return (
        <nav className="bg-gray-800 p-3">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white font-semibold">
                    <Link to="/" className="text-white px-3 py-2 rounded-md text-lg font-medium">GameHub</Link>
                </div>
                <div className='space-x-4'>
                    {isSignedIn ? (
                        <>
                            <Link to='/' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{user?.username || 'User' }</Link>
                            <button onClick={handleLogoutClick} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleLoginClick} className="text-white bg-blue-500 w-24 px-3 py-2 rounded-md text-sm font-medium">Login</button>
                            <button onClick={handleRegisterClick} className="text-white bg-green-600 w-24 px-3 py-2 rounded-md text-sm font-medium">Sign Up</button>
                            
                        </>
                    )}
                </div>
            </div>
            <ToastContainer limit={1} />
            <SignedOut>
                <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
                <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setSignUpModalOpen(false)} />
            </SignedOut>
        </nav>
    );
};

export default NavBar;