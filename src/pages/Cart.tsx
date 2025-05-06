
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  size: string;
  diameter: number;
  quantity: number;
  price: number;
  image: string;
}

interface DeliveryAddress {
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  intercom: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // В реальном приложении эти данные должны приходить из хранилища состояния (Redux, Context)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Маргарита",
      size: "Средняя",
      diameter: 30,
      quantity: 1,
      price: 599,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Пепперони",
      size: "Большая",
      diameter: 35,
      quantity: 2,
      price: 849,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2080&auto=format&fit=crop"
    }
  ]);
  
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [comment, setComment] = useState("");
  
  const [address, setAddress] = useState<DeliveryAddress>({
    street: "",
    house: "",
    apartment: "",
    entrance: "",
    floor: "",
    intercom: ""
  });
  
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // Обработчик изменения количества товара
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Удаляем товар из корзины, если количество <= 0
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      // Иначе обновляем количество
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Обработчик оформления заказа
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка заполнения обязательных полей
    if (deliveryMethod === "delivery" && (!address.street || !address.house)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите адрес доставки",
        variant: "destructive"
      });
      return;
    }
    
    if (!contactInfo.name || !contactInfo.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите имя и телефон",
        variant: "destructive"
      });
      return;
    }
    
    // Успешное оформление заказа
    toast({
      title: "Заказ оформлен",
      description: "Ваш заказ успешно оформлен! Ожидайте звонка оператора.",
    });
    
    // Перенаправляем на главную страницу
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Расчет стоимости заказа
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryMethod === "delivery" ? (subtotal >= 1500 ? 0 : 200) : 0;
  const total = subtotal + deliveryCost;

  // Если корзина пуста, показываем сообщение
  if (cartItems.length === 0) {
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
              <Link to="/promotions" className="text-sm font-medium text-gray-800 hover:text-rose-600">Акции</Link>
            </nav>
            
            <Button variant="outline" size="icon" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <Icon name="ShoppingCart" size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте пиццу из нашего меню, чтобы сделать заказ</p>
            <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
              <Link to="/menu">Перейти в меню</Link>
            </Button>
          </div>
        </main>
        
        {/* Футер */}
        <footer className="bg-gray-800 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Pizza Express. Все права защищены.</p>
          </div>
        </footer>
      </div>
    );
  }

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
            <Link to="/promotions" className="text-sm font-medium text-gray-800 hover:text-rose-600">Акции</Link>
          </nav>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
          
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка - Товары в корзине */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
                  
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center py-4 border-b">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.size} ({item.diameter} см)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                      <div className="text-right ml-4 min-w-[80px]">
                        <div className="font-medium">{item.price * item.quantity} ₽</div>
                        <div className="text-sm text-gray-500">{item.price} ₽ / шт</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Link to="/menu" className="text-rose-600 flex items-center gap-1 hover:underline">
                      <Icon name="ChevronLeft" size={16} />
                      <span>Вернуться в меню</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Способ доставки */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Способ доставки</h2>
                  
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Доставка курьером</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Самовывоз</Label>
                    </div>
                  </RadioGroup>
                  
                  {deliveryMethod === "delivery" && (
                    <div className="space-y-4">
                      <Separator className="my-4" />
                      <h3 className="font-medium">Адрес доставки</h3>
                      
                      <div>
                        <Label htmlFor="street">Улица *</Label>
                        <Input 
                          id="street" 
                          placeholder="Введите название улицы" 
                          value={address.street}
                          onChange={(e) => setAddress({...address, street: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="house">Дом *</Label>
                          <Input 
                            id="house" 
                            placeholder="Номер дома" 
                            value={address.house}
                            onChange={(e) => setAddress({...address, house: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="apartment">Квартира</Label>
                          <Input 
                            id="apartment" 
                            placeholder="Номер квартиры" 
                            value={address.apartment}
                            onChange={(e) => setAddress({...address, apartment: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="entrance">Подъезд</Label>
                          <Input 
                            id="entrance" 
                            placeholder="Подъезд" 
                            value={address.entrance}
                            onChange={(e) => setAddress({...address, entrance: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="floor">Этаж</Label>
                          <Input 
                            id="floor" 
                            placeholder="Этаж" 
                            value={address.floor}
                            onChange={(e) => setAddress({...address, floor: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="intercom">Домофон</Label>
                          <Input 
                            id="intercom" 
                            placeholder="Код домофона" 
                            value={address.intercom}
                            onChange={(e) => setAddress({...address, intercom: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {deliveryMethod === "pickup" && (
                    <div className="border rounded-md p-4 bg-gray-50 mt-4">
                      <h3 className="font-medium mb-2">Адрес самовывоза</h3>
                      <p className="text-gray-600">г. Москва, ул. Пиццы, д. 1</p>
                      <p className="text-gray-600">Время работы: 10:00 - 22:00</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Время доставки */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Время доставки</h2>
                  
                  <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime} className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="asap" id="asap" />
                      <Label htmlFor="asap">Как можно скорее</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled">Запланировать время</Label>
                    </div>
                  </RadioGroup>
                  
                  {deliveryTime === "scheduled" && (
                    <div className="flex gap-4 mt-4">
                      <div className="w-1/2">
                        <Label htmlFor="delivery-date">Дата</Label>
                        <Input 
                          id="delivery-date" 
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="w-1/2">
                        <Label htmlFor="delivery-time">Время</Label>
                        <Input 
                          id="delivery-time" 
                          type="time" 
                          min="10:00" 
                          max="21:30"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Контактная информация */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Контактная информация</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input 
                        id="name" 
                        placeholder="Как к вам обращаться" 
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input 
                        id="phone" 
                        placeholder="+7 (___) ___-__-__" 
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Для отправки чека" 
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comment">Комментарий к заказу</Label>
                      <Textarea 
                        id="comment" 
                        placeholder="Особые пожелания к заказу или доставке" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Правая колонка - Способ оплаты и итог */}
            <div>
              <div className="sticky top-4">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer w-full">
                          <Icon name="CreditCard" size={20} />
                          <span>Картой онлайн</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                        <RadioGroupItem value="card-courier" id="card-courier" />
                        <Label htmlFor="card-courier" className="flex items-center gap-2 cursor-pointer w-full">
                          <Icon name="CreditCard" size={20} />
                          <span>Картой курьеру</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer w-full">
                          <Icon name="Wallet" size={20} />
                          <span>Наличными курьеру</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Итого</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Сумма заказа:</span>
                        <span>{subtotal} ₽</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Доставка:</span>
                        <span>
                          {deliveryCost === 0 ? (
                            <span className="text-green-600">Бесплатно</span>
                          ) : (
                            `${deliveryCost} ₽`
                          )}
                        </span>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span>{total} ₽</span>
                      </div>
                    </div>
                    
                    {deliveryMethod === "delivery" && deliveryCost > 0 && (
                      <div className="text-sm text-gray-600 mb-4">
                        <Icon name="Info" size={16} className="inline mr-1" />
                        <span>При заказе от 1500 ₽ доставка бесплатная</span>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                      {paymentMethod === "card" ? "Перейти к оплате" : "Оформить заказ"}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных и пользовательским соглашением
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      {/* Футер */}
      <footer className="bg-gray-800 text-white py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Pizza Express. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
