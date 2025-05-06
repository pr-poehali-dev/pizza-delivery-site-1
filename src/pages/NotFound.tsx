
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-amber-500">
          <Icon name="Pizza" size={64} className="mx-auto" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Упс! Эта страница находится в разработке
        </p>
        <p className="text-gray-500 mb-8">
          Извините, страница, которую вы ищете, сейчас находится в разработке. 
          Скоро она будет доступна для заказа пиццы!
        </p>
        <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Home" size={20} />
            <span>Вернуться на главную</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
