import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-600">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What can you do?</h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Check the URL for typos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Go back to the previous page</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Visit our homepage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Contact us if you need help</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                <span className="mr-2">🏠</span>
                Go to Homepage
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.history.back()}
              className="px-8 py-4"
            >
              <span className="mr-2">←</span>
              Go Back
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 mb-4">Need help finding something?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-blue-600 hover:text-blue-800">About Us</Link>
              <Link to="/programs" className="text-blue-600 hover:text-blue-800">Programs</Link>
              <Link to="/events" className="text-blue-600 hover:text-blue-800">Events</Link>
              <Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;