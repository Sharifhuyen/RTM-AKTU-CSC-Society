import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-50">

            {/* Hero Section */}
            <section className="text-center py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                    The CSC Society at RTM Al-Kabir Technical University
                </h1>
                <p className="text-lg sm:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
                    We are a community of passionate tech enthusiasts aiming to shape the future of technology.
                    Join us to enhance your skills, collaborate with like-minded individuals, and innovate for a better tomorrow.
                </p>
            </section>

            {/* 1. Introduction & Mission */}
            <section className="py-12 px-6 md:px-16 bg-white shadow-xl mb-16 rounded-lg max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    The CSC Society is a platform where students can foster their technical skills, collaborate
                    on innovative projects, and network with industry professionals. Our mission is to provide
                    students with opportunities to grow, learn, and prepare for a successful future in the tech
                    world. We do this by organizing workshops, hackathons, guest lectures, and much more.
                </p>
            </section>

            {/* 2. Core Values */}
            <section className="py-12 px-6 md:px-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 mb-16">
                <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Innovation</h3>
                        <p className="text-gray-600">
                            We encourage fresh ideas and new approaches to solving problems, enabling students to innovate
                            and push the boundaries of technology.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Collaboration</h3>
                        <p className="text-gray-600">
                            We believe in the power of teamwork. Our community thrives when individuals work together to
                            achieve common goals and solve complex challenges.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Learning</h3>
                        <p className="text-gray-600">
                            Continuous learning is at the heart of what we do. Our workshops and events are designed to
                            help you stay ahead of the curve in the ever-evolving world of technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Key Activities & Events */}
            <section className="py-12 px-6 md:px-16 bg-white shadow-xl mb-16 rounded-lg max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Key Activities & Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Hackathons</h3>
                        <p className="text-gray-600">
                            Our annual hackathons bring together tech enthusiasts to collaborate, build projects, and
                            showcase their skills. Whether you’re a beginner or an expert, it’s an opportunity to learn and
                            challenge yourself.
                        </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Workshops</h3>
                        <p className="text-gray-600">
                            We offer hands-on workshops on various topics such as web development, data science, AI, and
                            more. Our goal is to give students practical experience in cutting-edge technologies.
                        </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Guest Lectures</h3>
                        <p className="text-gray-600">
                            Industry professionals share their insights through guest lectures, providing students with
                            real-world knowledge and career guidance in technology fields.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. Our Impact */}
            <section className="py-12 px-6 md:px-16 bg-white shadow-xl mb-16 rounded-lg max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Our Impact</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                    Since its inception, the CSC Society has positively impacted the lives of countless students. Our
                    members have successfully transitioned into top tech companies, built impressive portfolios, and
                    have gone on to become industry leaders. We continue to empower our community, driving progress
                    in the tech ecosystem.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    With each event and initiative, we are helping to create a new generation of tech innovators and
                    problem-solvers who are ready to take on the challenges of tomorrow.
                </p>
            </section>

        </div>
    );
};

export default AboutUs;
