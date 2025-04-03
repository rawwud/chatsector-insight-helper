
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6 inline-block">
          <div className="text-orange-500 font-bold text-9xl">404</div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-black hover:bg-black/90 text-white rounded-full px-6 py-5 inline-flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
