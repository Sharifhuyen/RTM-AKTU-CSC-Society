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
          <Route path="/events" element={<EventsDisplay />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/members" element={<AllMembers />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
