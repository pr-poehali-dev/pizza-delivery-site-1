
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Навигационная панель */}
      <header className="border-b shadow-sm bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">Pizza</span>
            <span className="text-xl font-bold text-amber-500">Express</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-800 hover:text-rose-600">Главная</Link>
            <Link to="/menu" className="text-sm font-medium text-gray-800 hover:text-rose-600">Меню</Link>
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
              <span className="bg-rose-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Героический блок */}
        <section className="relative bg-gradient-to-r from-amber-50 to-rose-50 py-16 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Доставка пиццы на дом — <span className="text-rose-600">Быстро</span> и <span className="text-amber-500">вкусно</span>!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Готовим из свежих ингредиентов и доставляем по всему городу за 30 минут
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link to="/menu" className="flex items-center gap-2">
                    <Icon name="Pizza" size={20} />
                    <span>Заказать пиццу</span>
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/menu" className="flex items-center gap-2">
                    <Icon name="Info" size={20} />
                    <span>Узнать меню</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
                alt="Аппетитная пицца" 
                className="rounded-lg shadow-xl transform md:scale-110 mx-auto"
              />
              <div className="absolute -bottom-3 -right-3 bg-amber-100 px-4 py-2 rounded-lg shadow-md text-amber-800 font-bold">
                <Icon name="Clock" size={16} className="inline mr-1" /> Доставка от 30 минут
              </div>
            </div>
          </div>
        </section>

        {/* Специальные предложения */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Специальные предложения</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=1844&auto=format&fit=crop" 
                    alt="Акция на пиццу" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">Пицца недели</CardTitle>
                    <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded">-25%</span>
                  </div>
                  <CardDescription className="mb-4">Пицца "4 сыра" со скидкой весь май! Успейте попробовать!</CardDescription>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1593246049226-ded77bf90326?q=80&w=2070&auto=format&fit=crop" 
                    alt="Комбо предложение" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">Комбо набор</CardTitle>
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded">Выгодно</span>
                  </div>
                  <CardDescription className="mb-4">2 пиццы, картошка фри и напиток по специальной цене</CardDescription>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">Заказать</Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop" 
                    alt="Бесплатная доставка" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">Бесплатная доставка</CardTitle>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">Акция</span>
                  </div>
                  <CardDescription className="mb-4">При заказе от 1500₽ доставка бесплатно в любой район города</CardDescription>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">Узнать больше</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Отзывы наших клиентов</h2>
            
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-1 text-amber-400 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Icon key={i} name={i < testimonial.rating ? "Star" : "StarOff"} size={16} />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4 flex-grow">"{testimonial.text}"</p>
                        <div className="flex items-center mt-auto">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-sm font-bold">{testimonial.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{testimonial.name}</p>
                            <p className="text-xs text-gray-500">{testimonial.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-2">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Информация о доставке */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={24} className="text-rose-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
                <p className="text-gray-600">Доставляем за 30 минут или пицца бесплатно</p>
              </div>
              
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Utensils" size={24} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Свежие ингредиенты</h3>
                <p className="text-gray-600">Используем только свежие и качественные продукты</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={24} className="text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Удобная оплата</h3>
                <p className="text-gray-600">Принимаем наличные и банковские карты</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Поддержка 24/7</h3>
                <p className="text-gray-600">Всегда готовы ответить на ваши вопросы</p>
              </div>
            </div>
          </div>
        </section>
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

// Данные для отзывов
const testimonials = [
  {
    name: "Алексей П.",
    text: "Очень вкусная пицца! Быстрая доставка, всегда горячая. Рекомендую 'Четыре сыра' - это просто шедевр!",
    rating: 5,
    date: "15 мая 2023"
  },
  {
    name: "Мария К.",
    text: "Заказываю не первый раз, всегда всё вкусно и свежо. Особенно нравится их фирменное тесто - тонкое и хрустящее!",
    rating: 5,
    date: "3 апреля 2023"
  },
  {
    name: "Дмитрий С.",
    text: "Очень удобное приложение для заказа, быстрая доставка. Пицца всегда приезжает вовремя и очень вкусная.",
    rating: 4,
    date: "28 марта 2023"
  },
  {
    name: "Елена В.",
    text: "Большой выбор пицц, есть также и веганские варианты, что для меня очень важно. Доставка всегда вовремя.",
    rating: 5,
    date: "12 февраля 2023"
  },
  {
    name: "Игорь М.",
    text: "Порадовала акция 'вторая пицца в подарок'. Качество на высоте, ингредиентов не жалеют. Буду заказывать еще!",
    rating: 5,
    date: "5 января 2023"
  }
];

export default Index;
