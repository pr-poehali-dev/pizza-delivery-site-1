
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface Promotion {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  expiryDate: string;
  type: string;
  discount?: string;
  code?: string;
  isNew?: boolean;
}

const Promotions = () => {
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
            <Link to="/menu" className="text-sm font-medium text-gray-800 hover:text-rose-600">Меню</Link>
            <Link to="/about" className="text-sm font-medium text-gray-800 hover:text-rose-600">О нас</Link>
            <Link to="/contacts" className="text-sm font-medium text-gray-800 hover:text-rose-600">Контакты</Link>
            <Link to="/promotions" className="text-sm font-medium text-rose-600 border-b-2 border-rose-600">Акции</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <Icon name="User" size={16} />
              <span>Войти</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-amber-500 border-amber-500 hover:bg-amber-50">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden md:inline">Корзина</span>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Акции и специальные предложения</h1>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-white border mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                Все акции
              </TabsTrigger>
              <TabsTrigger value="discounts" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                Скидки
              </TabsTrigger>
              <TabsTrigger value="combo" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                Комбо-наборы
              </TabsTrigger>
              <TabsTrigger value="promo" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
                Промокоды
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.map((promo) => (
                  <PromotionCard key={promo.id} promotion={promo} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discounts" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions
                  .filter((promo) => promo.type === "discount")
                  .map((promo) => (
                    <PromotionCard key={promo.id} promotion={promo} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="combo" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions
                  .filter((promo) => promo.type === "combo")
                  .map((promo) => (
                    <PromotionCard key={promo.id} promotion={promo} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="promo" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions
                  .filter((promo) => promo.type === "promo")
                  .map((promo) => (
                    <PromotionCard key={promo.id} promotion={promo} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-lg p-6 mt-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-3">Подпишитесь на рассылку</h2>
                <p className="text-gray-700 mb-4">
                  Будьте в курсе всех новых акций и специальных предложений. 
                  Подписчики получают эксклюзивные промокоды раз в месяц!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Введите ваш email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                  <Button className="bg-rose-600 hover:bg-rose-700">Подписаться</Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Icon name="Mail" size={100} className="text-amber-200" />
              </div>
            </div>
          </div>
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

const PromotionCard = ({ promotion }: { promotion: Promotion }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={promotion.image} 
          alt={promotion.title}
          className="w-full h-full object-cover"
        />
        {promotion.isNew && (
          <Badge className="absolute top-2 left-2 bg-blue-500">Новая акция</Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{promotion.title}</CardTitle>
          {promotion.discount && (
            <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded">
              {promotion.discount}
            </span>
          )}
        </div>
        <CardDescription>{promotion.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-2">Действует до: {promotion.expiryDate}</p>
        
        {promotion.code && (
          <div className="bg-gray-100 p-2 rounded flex justify-between items-center mb-2">
            <span className="font-mono text-sm font-semibold">{promotion.code}</span>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Icon name="Copy" size={14} className="mr-1" />
              <span>Копировать</span>
            </Button>
          </div>
        )}
        
        <div className="text-sm mt-2">{promotion.fullDescription}</div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full bg-amber-500 hover:bg-amber-600">
          <Link to="/menu">Заказать</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Данные об акциях
const promotions: Promotion[] = [
  {
    id: 1,
    title: "Пицца недели",
    description: "Пицца '4 сыра' со скидкой весь май!",
    fullDescription: "Каждую неделю мы выбираем одну пиццу и делаем на неё специальную скидку. Успейте попробовать!",
    image: "https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=1844&auto=format&fit=crop",
    expiryDate: "31 мая 2025",
    type: "discount",
    discount: "-25%"
  },
  {
    id: 2,
    title: "Комбо набор №1",
    description: "2 пиццы, картошка фри и напиток",
    fullDescription: "Идеальный набор для компании из 2-3 человек. В набор входят две средние пиццы на выбор, большая порция картошки фри и 1 литр газированного напитка.",
    image: "https://images.unsplash.com/photo-1593246049226-ded77bf90326?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "Бессрочно",
    type: "combo",
    discount: "Выгодно"
  },
  {
    id: 3,
    title: "Бесплатная доставка",
    description: "При заказе от 1500₽ доставка бесплатно",
    fullDescription: "Сделайте заказ на сумму от 1500 рублей, и мы доставим его бесплатно в любой район города в пределах МКАД.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "Бессрочно",
    type: "discount"
  },
  {
    id: 4,
    title: "Промокод для новых клиентов",
    description: "Скидка 20% на первый заказ",
    fullDescription: "Введите промокод при первом заказе через наш сайт или приложение и получите скидку 20%. Промокод действует только для новых пользователей.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    expiryDate: "Бессрочно",
    type: "promo",
    code: "WELCOME20",
    discount: "-20%",
    isNew: true
  },
  {
    id: 5,
    title: "День рождения",
    description: "Скидка 30% в ваш день рождения!",
    fullDescription: "Отмечайте день рождения вместе с нами! Сделайте заказ в день рождения или за 3 дня до/после и получите скидку 30%. Требуется подтверждение даты рождения.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=2080&auto=format&fit=crop",
    expiryDate: "Бессрочно",
    type: "discount",
    discount: "-30%"
  },
  {
    id: 6,
    title: "Семейный комбо",
    description: "3 большие пиццы по цене 2",
    fullDescription: "Идеальное предложение для большой компании или семьи. При заказе трех больших пицц вы платите только за две! Выбирайте любые пиццы из нашего меню.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop",
    expiryDate: "30 июня 2025",
    type: "combo",
    discount: "3 по цене 2"
  },
  {
    id: 7,
    title: "Счастливые часы",
    description: "Скидка 15% с 14:00 до 17:00 в будние дни",
    fullDescription: "Делайте заказ в период с 14:00 до 17:00 с понедельника по пятницу и получайте скидку 15% на весь заказ. Отличная возможность сэкономить в обеденное время!",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "Бессрочно",
    type: "discount",
    discount: "-15%"
  },
  {
    id: 8,
    title: "Промокод для подписчиков",
    description: "Скидка 10% для подписчиков рассылки",
    fullDescription: "Подпишитесь на нашу email-рассылку и получите промокод на скидку 10% на следующий заказ. Промокод можно использовать многократно в течение срока действия.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "31 декабря 2025",
    type: "promo",
    code: "NEWSUB10",
    discount: "-10%"
  },
  {
    id: 9,
    title: "Студенческий комбо",
    description: "Средняя пицца и напиток по специальной цене",
    fullDescription: "Специальное предложение для студентов! Средняя пицца на выбор и любой напиток 0.5л по специальной цене. Требуется студенческий билет при доставке.",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?q=80&w=2028&auto=format&fit=crop",
    expiryDate: "Бессрочно",
    type: "combo",
    discount: "-25%",
    isNew: true
  }
];

export default Promotions;
