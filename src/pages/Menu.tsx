
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Типы данных
interface PizzaSize {
  id: string;
  name: string;
  price: number;
  diameter: number;
}

interface Pizza {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  sizes: PizzaSize[];
  isNew?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

const Menu = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<{ pizzaId: number; size: string; quantity: number }[]>([]);

  // Опции выбора размера пиццы
  const handleAddToCart = (pizza: Pizza, selectedSize: string) => {
    // Проверка, есть ли уже такая пицца в корзине
    const existingItemIndex = cartItems.findIndex(
      (item) => item.pizzaId === pizza.id && item.size === selectedSize
    );

    if (existingItemIndex !== -1) {
      // Если такая пицца есть, увеличиваем количество
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Если такой пиццы нет, добавляем новую
      setCartItems([...cartItems, { pizzaId: pizza.id, size: selectedSize, quantity: 1 }]);
    }

    // Показываем уведомление
    toast({
      title: "Добавлено в корзину",
      description: `${pizza.name} (${selectedSize}) добавлена в корзину`,
    });
  };

  // Фильтрация пицц по категории и поисковому запросу
  const filteredPizzas = pizzaData.filter((pizza) => {
    const matchesCategory = selectedCategory === "all" || pizza.category === selectedCategory;
    const matchesSearch = pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Подсчет количества товаров в корзине
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Навигационная панель */}
      <header className="border-b shadow-sm bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-rose-600">Pizza</span>
              <span className="text-xl font-bold text-amber-500">Express</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-800 hover:text-rose-600">Главная</Link>
            <Link to="/menu" className="text-sm font-medium text-rose-600 border-b-2 border-rose-600">Меню</Link>
            <Link to="/about" className="text-sm font-medium text-gray-800 hover:text-rose-600">О нас</Link>
            <Link to="/contacts" className="text-sm font-medium text-gray-800 hover:text-rose-600">Контакты</Link>
            <Link to="/promotions" className="text-sm font-medium text-gray-800 hover:text-rose-600">Акции</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Icon name="User" size={16} />
              <span>Войти</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-amber-500 border-amber-500 hover:bg-amber-50">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden md:inline">Корзина</span>
              {cartItemsCount > 0 && (
                <span className="bg-rose-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Меню пиццы</h1>
              <p className="text-gray-600">Выберите любимую пиццу из нашего меню</p>
            </div>

            <div className="w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Input
                  placeholder="Поиск пиццы..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-white border mb-6">
                <TabsTrigger value="all" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  Все пиццы
                </TabsTrigger>
                <TabsTrigger value="classic" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  Классические
                </TabsTrigger>
                <TabsTrigger value="meat" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  Мясные
                </TabsTrigger>
                <TabsTrigger value="vegetarian" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  Вегетарианские
                </TabsTrigger>
                <TabsTrigger value="seafood" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  С морепродуктами
                </TabsTrigger>
                <TabsTrigger value="spicy" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                  Острые
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="mt-0">
              {filteredPizzas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPizzas.map((pizza) => (
                    <PizzaCard 
                      key={pizza.id} 
                      pizza={pizza} 
                      onAddToCart={handleAddToCart} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Ничего не найдено</h3>
                  <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Pizza Express</h3>
              <p className="text-gray-400">Лучшая пицца в городе с доставкой на дом. Работаем с 2010 года.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Меню</h3>
              <ul className="space-y-2">
                <li><Link to="/menu" className="text-gray-400 hover:text-white">Пицца</Link></li>
                <li><Link to="/menu" className="text-gray-400 hover:text-white">Напитки</Link></li>
                <li><Link to="/menu" className="text-gray-400 hover:text-white">Десерты</Link></li>
                <li><Link to="/menu" className="text-gray-400 hover:text-white">Снеки</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Информация</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">О нас</Link></li>
                <li><Link to="/contacts" className="text-gray-400 hover:text-white">Контакты</Link></li>
                <li><Link to="/delivery" className="text-gray-400 hover:text-white">Доставка и оплата</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Условия использования</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@pizzaexpress.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Москва, ул. Пиццы, д. 1</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon name="Twitter" size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Pizza Express. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Компонент карточки пиццы
const PizzaCard = ({ pizza, onAddToCart }: { pizza: Pizza; onAddToCart: (pizza: Pizza, size: string) => void }) => {
  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0].id);

  const handleAddClick = () => {
    onAddToCart(pizza, selectedSize);
  };

  const selectedSizeData = pizza.sizes.find(size => size.id === selectedSize);
  const price = selectedSizeData ? selectedSizeData.price : pizza.sizes[0].price;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={pizza.image} 
          alt={pizza.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {pizza.isNew && <Badge className="bg-blue-500">Новинка</Badge>}
          {pizza.isPopular && <Badge className="bg-amber-500">Хит продаж</Badge>}
          {pizza.isVegetarian && <Badge className="bg-green-500">Вегетарианская</Badge>}
          {pizza.isSpicy && <Badge className="bg-red-500">Острая</Badge>}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{pizza.name}</CardTitle>
        <CardDescription>{pizza.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex-grow">
        <div className="mt-2">
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex gap-2">
            {pizza.sizes.map((size) => (
              <div key={size.id} className="flex items-center">
                <RadioGroupItem value={size.id} id={`size-${pizza.id}-${size.id}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${pizza.id}-${size.id}`}
                  className="flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 
                             peer-data-[state=checked]:bg-amber-50 peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:text-amber-700
                             hover:bg-gray-50 cursor-pointer"
                >
                  {size.name} ({size.diameter} см)
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t mt-auto">
        <div className="font-bold text-xl">{price} ₽</div>
        <Button onClick={handleAddClick} className="bg-rose-600 hover:bg-rose-700">
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

// Данные о пиццах
const pizzaData: Pizza[] = [
  {
    id: 1,
    name: "Маргарита",
    description: "Классическая пицца с томатным соусом, моцареллой и базиликом",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop",
    category: "classic",
    tags: ["томаты", "сыр", "базилик"],
    isVegetarian: true,
    isPopular: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 399, diameter: 25 },
      { id: "medium", name: "Средняя", price: 599, diameter: 30 },
      { id: "large", name: "Большая", price: 799, diameter: 35 }
    ]
  },
  {
    id: 2,
    name: "Пепперони",
    description: "Пицца с томатным соусом, моцареллой и пепперони",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2080&auto=format&fit=crop",
    category: "meat",
    tags: ["пепперони", "сыр", "острая"],
    isPopular: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 449, diameter: 25 },
      { id: "medium", name: "Средняя", price: 649, diameter: 30 },
      { id: "large", name: "Большая", price: 849, diameter: 35 }
    ]
  },
  {
    id: 3,
    name: "Четыре сыра",
    description: "Пицца с соусом из четырех видов сыра: моцарелла, горгонзола, пармезан, чеддер",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    category: "classic",
    tags: ["сыр", "моцарелла", "горгонзола", "пармезан", "чеддер"],
    isVegetarian: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 499, diameter: 25 },
      { id: "medium", name: "Средняя", price: 699, diameter: 30 },
      { id: "large", name: "Большая", price: 899, diameter: 35 }
    ]
  },
  {
    id: 4,
    name: "Гавайская",
    description: "Пицца с ветчиной, ананасами, моцареллой и томатным соусом",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    category: "meat",
    tags: ["ветчина", "ананас", "сыр"],
    sizes: [
      { id: "small", name: "Маленькая", price: 449, diameter: 25 },
      { id: "medium", name: "Средняя", price: 649, diameter: 30 },
      { id: "large", name: "Большая", price: 849, diameter: 35 }
    ]
  },
  {
    id: 5,
    name: "Дьябло",
    description: "Острая пицца с салями, перцем халапеньо, луком и томатным соусом",
    image: "https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=1844&auto=format&fit=crop",
    category: "spicy",
    tags: ["салями", "халапеньо", "острый", "сыр"],
    isSpicy: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 499, diameter: 25 },
      { id: "medium", name: "Средняя", price: 699, diameter: 30 },
      { id: "large", name: "Большая", price: 899, diameter: 35 }
    ]
  },
  {
    id: 6,
    name: "Вегетарианская",
    description: "Пицца с грибами, оливками, болгарским перцем, луком и моцареллой",
    image: "https://images.unsplash.com/photo-1662487762658-54d2be0075c2?q=80&w=2070&auto=format&fit=crop",
    category: "vegetarian",
    tags: ["грибы", "оливки", "перец", "лук", "сыр"],
    isVegetarian: true,
    isNew: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 449, diameter: 25 },
      { id: "medium", name: "Средняя", price: 649, diameter: 30 },
      { id: "large", name: "Большая", price: 849, diameter: 35 }
    ]
  },
  {
    id: 7,
    name: "Морская",
    description: "Пицца с креветками, мидиями, кальмарами, моцареллой и соусом песто",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?q=80&w=2028&auto=format&fit=crop",
    category: "seafood",
    tags: ["креветки", "мидии", "кальмары", "сыр", "песто"],
    isNew: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 599, diameter: 25 },
      { id: "medium", name: "Средняя", price: 799, diameter: 30 },
      { id: "large", name: "Большая", price: 999, diameter: 35 }
    ]
  },
  {
    id: 8,
    name: "Барбекю",
    description: "Пицца с курицей, беконом, луком и соусом барбекю",
    image: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=2127&auto=format&fit=crop",
    category: "meat",
    tags: ["курица", "бекон", "лук", "барбекю", "сыр"],
    isPopular: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 499, diameter: 25 },
      { id: "medium", name: "Средняя", price: 699, diameter: 30 },
      { id: "large", name: "Большая", price: 899, diameter: 35 }
    ]
  },
  {
    id: 9,
    name: "Грибная",
    description: "Пицца с шампиньонами, вешенками, белыми грибами и трюфельным маслом",
    image: "https://images.unsplash.com/photo-1589840700256-41c5d84af80d?q=80&w=1974&auto=format&fit=crop",
    category: "vegetarian",
    tags: ["грибы", "шампиньоны", "вешенки", "трюфель", "сыр"],
    isVegetarian: true,
    sizes: [
      { id: "small", name: "Маленькая", price: 549, diameter: 25 },
      { id: "medium", name: "Средняя", price: 749, diameter: 30 },
      { id: "large", name: "Большая", price: 949, diameter: 35 }
    ]
  }
];

export default Menu;
