import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './componenets/Header';
import EventDetails from './componenets/home/EventDetails';
import EventsDisplay from './componenets/home/EventsDisplay';
import JoinUs from './componenets/pages/JoinUs';
import AboutUs from './componenets/pages/About';
import AllMembers from './componenets/pages/AllMembers';
import ImageGallery from './componenets/pages/ImageGallary';
import ContactUs from './componenets/pages/ContactUs';
import BlogDetails from './componenets/pages/BlogDetails';
import AllBlogs from './componenets/pages/AllBlogs';
import Login from './componenets/pages/Login';
import Footer from './componenets/Footer';
import Dashboard from './componenets/Dashboard/Dashboard';
import Home from './componenets/home/Home';
import ProtectedRoute from './componenets/Dashboard/ProtectedRoute';
import NotFound from './componenets/Dashboard/NotFound';
import { AuthProvider } from './componenets/Firebase/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/events" element={<EventsDisplay />} />
            <Route path="/joinus" element={<JoinUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/members" element={<AllMembers />} />
            <Route path="/gallery" element={<ImageGallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/allBlogs" element={<AllBlogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />

          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router >
  );
}

export default App;
