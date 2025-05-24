import React from 'react';
import HomeFirstSection from './HomeFristSection';
import HomeSecondSection from './HomeSecondSection';
import HomeThirdSection from './HomeThirdSection';
import JoinUs from '../pages/JoinUs';

const Home = () => {
    return (
        <div>
            <HomeFirstSection />
            <HomeSecondSection />
            <HomeThirdSection />
            <JoinUs />

        </div>
    );
};

export default Home;