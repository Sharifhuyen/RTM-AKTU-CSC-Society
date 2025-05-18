import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaGithub,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-white py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">RTM-AKTU CSC Society</h2>
                    <p className="text-sm text-gray-300">
                        Promoting technical excellence, leadership, and innovation in computer science and engineering through community, collaboration, and creativity.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/events" className="hover:text-white">Events</Link></li>
                        <li><Link to="/members" className="hover:text-white">Members</Link></li>
                        <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaYoutube size={20} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaGithub size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-6">
                © {new Date().getFullYear()} RTM-AKTU CSC Society. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
