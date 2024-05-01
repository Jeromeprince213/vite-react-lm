import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Track the current theme
  const [userEmail, setUserEmail] = useState(null); // Store user email from JWT

  useEffect(() => {
    // Function to fetch courses
    const fetchData = async () => {
      try {
        const response = await fetch('https://p2wq55571b.execute-api.ap-southeast-2.amazonaws.com/CourseListBeta');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(JSON.parse(data.body)); // Parsing the body to convert it into an array of courses
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch courses
    fetchData();

    // Decode JWT to get user email
    const authToken = localStorage.getItem('token');
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUserEmail(decodedToken.email); // Set user email
    }
  }, []);

  const buyCourse = async (courseName) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch('https://6sxay3kakj.execute-api.ap-southeast-2.amazonaws.com/BuyCourseBeta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({
          body: JSON.stringify({
            email: userEmail, // Use user email from state
            courseName: courseName,
          }),
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Course bought successfully!');
      console.log(userEmail); // Log user email
    } catch (error) {
      console.error('Error buying course:', error);
    }
  };

  // Create a loading skeleton for a single course panel
  const CourseSkeleton = () => (
    <div className="bg-gray-100 p-4 mb-4 rounded-lg">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 mb-2"></div>
        <div className="h-4 bg-gray-200 w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">learnmusic.tech</div>
          <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Course List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            // Display loading skeletons while data is being fetched
            <>
              <CourseSkeleton />
              <CourseSkeleton />
              <CourseSkeleton />
            </>
          ) : (
            // Render the actual course panels once data is loaded
            <>
              {courses.map((course, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-2">{course.course_name}</h2>
                  <p>ID: {course._id}</p>
                  {/* Add rating stars */}
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">{ '★' }</span>
                    ))}
                    <span className="text-gray-600 ml-1">5.0 (100 ratings)</span>
                  </div>
                  {/* Buy button */}
                  <button
                    onClick={() => buyCourse(course.course_name)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 inline-block hover:bg-blue-600 transition duration-300"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
