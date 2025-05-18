import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './componenets/Header';
import EventDetails from './componenets/home/EventDetails';
import HomeFirstSection from './componenets/home/HomeFristSection';
import HomeSecondSection from './componenets/home/HomeSecondSection';
import HomeThirdSection from './componenets/home/HomeThirdSection';
import EventsDisplay from './componenets/home/EventsDisplay';
import JoinUs from './componenets/pages/JoinUs';
import AboutUs from './componenets/pages/About';
import AllMembers from './componenets/pages/AllMembers';
import ImageGallery from './componenets/pages/ImageGallary';
import ContactUs from './componenets/pages/ContactUs';
import CreateBlog from './componenets/pages/CreateBlog';
import BlogDetails from './componenets/pages/BlogDetails';
import AllBlogs from './componenets/pages/AllBlogs';
import Login from './componenets/pages/Login';
import Footer from './componenets/Footer';
import CreateEvent from './componenets/pages/CreateEvent';
import CreateGalleryItem from './componenets/pages/CreateGalleryItem';

function App() {
  return (
    <Router>
      <div className="bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HomeFirstSection />
              <HomeSecondSection />
              <HomeThirdSection />
              <JoinUs />
            </>
          } />
          <Route path="/event/:eventName" element={<EventDetails />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/events" element={<EventsDisplay />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/members" element={<AllMembers />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/createGallery" element={<CreateGalleryItem />} />
        </Routes>
      </div>
      <Footer />

    </Router>
  );
}

export default App;
