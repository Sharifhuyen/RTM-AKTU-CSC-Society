import React, { useEffect, useState } from 'react';
import MemberCard from './MemberCard';

const AllMembers = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            setMembers(data);
        };

        fetchMembers();
    }, []);

    return (
        <div className="px-8 py-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Meet Our CSC Society Members</h2>
            <p className="text-lg text-center text-gray-600 mb-12">We are proud to introduce the talented members of the CSC Society at RTM Al-Kabir Technical University. Our members come from diverse fields and are passionate about technology and innovation.</p>

            {/* Grid for members */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {members.map((member) => (
                    <MemberCard
                        key={member.email}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        batchNumber={member.batchNumber}
                        departmentName={member.departmentName}
                        imageUrl={member.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllMembers;
