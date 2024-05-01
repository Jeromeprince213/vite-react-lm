import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FaHome, FaBookOpen, FaChalkboardTeacher, FaCalendarAlt, FaBroadcastTower, FaHeadset, FaSearch } from 'react-icons/fa';

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100 ">
        <Navbar />
        <div className="p-8 ">
          <WelcomeSection data={data} />
          <DiscountPanel />
        
          <ProductList />
          
          <RelatedProducts/>
        </div>
        
      </div>
    </div>
  );
};






const Sidebar = () => {
  return (
    <div className="bg-white text-black w-64 flex-none flex flex-col rounded-r-3xl rounded-l-3xl overflow-hidden ml-5 mt-5 mr-5 mb-5">
      <div className="p-6 border-b mb-5">
        <span className="text-2xl font-semibold text-blue-500"><img width="48" height="48" src="https://img.icons8.com/fluency/48/accordion.png" alt="accordion"/>Study</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarLinkItem text="Home" icon={<FaHome />} isActive={true} />
        <SidebarLinkItem text="Browse Courses" icon={<FaBookOpen />} />
        <SidebarLinkItem text="Free Courses" icon={<FaChalkboardTeacher />} />
        <SidebarLinkItem text="Events" icon={<FaCalendarAlt />} />
        <SidebarLinkItem text="Live Sessions" icon={<FaBroadcastTower />} />
        <SidebarLinkItem text="Contact Support" icon={<FaHeadset />} />
        <SidebarLinkItem text="AI Course Finder" icon={<FaSearch />} />
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-white shadow border-b-2 border-gray-200 rounded-b-3xl rounded-t-3xl ml-5 mt-5 mr-5 mb-5">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-lg font-semibold">Dashboard</span>
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
      {/* SVG path goes here */}
    </svg>
  );
};

const NotificationIcon = () => {
  return (
    <div className="relative">
      {/* Notification icon SVG goes here */}
      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-xs">2</span>
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="https://via.placeholder.com/40"
        className="w-9 h-9 rounded-full bg-gray-300"
        alt="User"
      />
      <p className="font-semibold text-sm">User Name</p>
    </div>
  );
};

const SidebarLinkGroup = ({ title, children }) => {
  return (
    <div>
      <p className="font-semibold text-xs tracking-widest text-blue-700 uppercase">{title}</p>
      <div className="mt-4 space-y-1">{children}</div>
    </div>
  );
};
const SidebarLinkItem = ({ text, icon, isActive = false }) => {
  const linkClass = isActive ? "bg-blue-500 text-white" : "text-black";

  return (
    <a href="#" className={`group flex items-center justify-between px-4 py-2.5 rounded-2xl mr-5 ml-5 mb-1 transition-all duration-200 hover:bg-gray-200 cursor-pointer ${linkClass}`}>
      <div className="flex items-center flex-grow">
        {icon}
        <span className="text-lg ml-2">{text}</span>
      </div>
    </a>
  );
};
const WelcomeSection = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md rounded-r-3xl rounded-l-3xl">
      <h1 className="text-3xl font-bold mb-4">Welcome to Studdy! </h1>
      <p className="text-gray-700">Start your learning journey with us today.</p>
    </div>
  );
};

const DiscountPanel = () => {
  return (
    <div className="bg-orange-200 p-8 rounded-lg shadow-md mt-4 rounded-r-3xl rounded-l-3xl">
      <h2 className="text-xl font-semibold mb-4">Special Offers Today!</h2>
      <p className="text-gray-700 mb-4">Check out our exclusive discounts and combo offers on video courses. Don't miss out!</p>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
      </div>
    </div>
  );
};

const RecommendedCoursesPanel = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-4 rounded-r-3xl rounded-l-3xl">
      <h2 className="text-xl font-semibold mb-4">Recommended</h2>
      <p className="text-gray-700 mb-4">Check out our exclusive discounts and combo offers on video courses. Don't miss out!</p>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">Buy Now</button>
      </div>
    </div>
  );
};
const HeaderText = () => {
  return (
    <div className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-4 mb-2">
      My Courses
    </div>
  );
};
const ProductCard = ({ product }) => {
  return (
    <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4 rounded-r-3xl rounded-l-3xl">
      <a href={product.href}>
        <img className="p-8 rounded-t-lg" src={product.imageSrc} alt={product.imageAlt} />
      </a>
      <div className="px-5 pb-5">
        <a href={product.href}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            {/* More rating stars */}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
          <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
      </div>
    </div>
  );
}; 



const ProductList = () => {
  return (
    <div>
      <HeaderText />
      <div className="grid grid-cols-3 gap-4">
        {Products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


const Products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },{
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    
  },{
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    
  },
  // More products...
];

const RelatedProducts = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md rounded-r-3xl rounded-l-3xl mt-5">
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></div>
  );
};

export default Home;
