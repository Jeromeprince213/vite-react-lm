import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get('https://h2y6cy6tyb.execute-api.ap-southeast-2.amazonaws.com/beta', {
          headers: {
            'auth-token': authToken
          }
        });
        setData(response.data.message);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <WelcomeSection data={data} />
        
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-white border-b-2 border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/fluency/48/accordion.png"
          alt="accordion"
        />
        <div className="flex items-center space-x-4">
          <SearchInput />
          <NotificationIcon />
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Type to search"
        className="border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm rounded-lg pt-2 pb-2 pl-10 px-3 py-2"
      />
      <SearchIcon />
    </div>
  );
};

const SearchIcon = () => {
  return (
    <svg
      className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 transform -translate-y-1/2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

const NotificationIcon = () => {
  return (
    <div className="relative">
      <svg
        className="w-6 h-6 text-gray-700 hover:text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-xs">
        2
      </span>
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="https://static01.nyt.com/images/2019/11/08/world/08quebec/08quebec-superJmbo.jpg"
        className="w-9 h-9 rounded-full bg-gray-300"
        alt="User"
      />
      <p className="font-semibold text-sm">User Name</p>
    </div>
  );
};
const Sidebar = () => {
  return (
    <div className="w-full md:w-64 bg-white shadow-md overflow-x-auto">
      <div className="container mx-auto px-4 py-4">
        <SidebarLinkGroup title="Menu">
          <SidebarLinkItem text="Dashboard" />
          <SidebarLinkItem text="About" />
          <SidebarLinkItem text="Hero" />
        </SidebarLinkGroup>
        <SidebarLinkGroup title="Data">
          <SidebarLinkItem text="Folders" />
          <SidebarLinkItem text="Alerts" />
          <SidebarLinkItem text="Statistics" isNew={true} />
        </SidebarLinkGroup>
        <SidebarLinkGroup title="Contact">
          <SidebarLinkItem text="Forms" notificationCount={15} />
          <SidebarLinkItem text="Agents" />
          <SidebarLinkItem text="Customers" />
        </SidebarLinkGroup>
        <SidebarLinkGroup title="Settings">
          <SidebarLinkItem text="Settings" />
          <SidebarLinkItem text="Logout" />
        </SidebarLinkGroup>
      </div>
    </div>
  );
};


const SidebarLinkGroup = ({ title, children }) => {
  return (
    <div>
      <p className="font-semibold text-xs tracking-widest text-blue-700 uppercase">
        {title}
      </p>
      <div className="mt-4 space-y-1">{children}</div>
    </div>
  );
};

const SidebarLinkItem = ({ text, isNew = false, notificationCount = 0 }) => {
  return (
    <a
      href="#"
      className="group flex items-center px-4 py-2.5 rounded-lg text-gray-900 transition-all duration-200 hover:bg-gray-200 cursor-pointer"
    >
      <span>{text}</span>
      {isNew && (
        <span className="px-2 py-0.5 font-semibold text-xs ml-auto bg-indigo-50 text-indigo-600 rounded-full uppercase border border-indigo-300">
          New
        </span>
      )}
      {notificationCount > 0 && (
        <span className="px-2 py-0.5 font-semibold text-xs ml-auto bg-gray-500 text-white rounded-full uppercase border border-transparent">
          {notificationCount}
        </span>
      )}
    </a>
  );
};

const WelcomeSection = ({ data }) => {
  return (
    <div className="container mx-auto liquid-effect">
      <div className="content bg-blue-100 px-4 py-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{data} !</h1>
        <p className="text-gray-700">Start your learning journey with us today.</p>
      </div>
    </div>
  );
};


const DiscountPanel = () => {
  return (
    <div className="container mx-auto bg-gray-200 px-4 py-8 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Special Offers Today!</h2>
      <p className="text-gray-700 mb-4">
        Check out our exclusive discounts and combo offers on video courses. Don't miss out!
      </p>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Home;
