import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import GlassSidebar from '@/components/GlassSidebar';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Смартфон Premium X1',
    price: 89990,
    category: 'Смартфоны',
    image: '/placeholder.svg',
    specs: [
      { label: 'Экран', value: '6.7" AMOLED, 120Hz' },
      { label: 'Процессор', value: 'Snapdragon 8 Gen 3' },
      { label: 'Память', value: '12/256 ГБ' },
      { label: 'Камера', value: '200 Мп основная' },
    ],
  },
  {
    id: 2,
    name: 'Ноутбук ProBook 15',
    price: 124990,
    category: 'Ноутбуки',
    image: '/placeholder.svg',
    specs: [
      { label: 'Процессор', value: 'Intel Core i7-13700H' },
      { label: 'Видеокарта', value: 'NVIDIA RTX 4060' },
      { label: 'ОЗУ', value: '16 ГБ DDR5' },
      { label: 'Накопитель', value: 'SSD 1 ТБ NVMe' },
    ],
  },
  {
    id: 3,
    name: 'Наушники AirWave Pro',
    price: 24990,
    category: 'Аудио',
    image: '/placeholder.svg',
    specs: [
      { label: 'Тип', value: 'TWS с ANC' },
      { label: 'Драйверы', value: '11 мм динамические' },
      { label: 'Автономность', value: 'До 30 часов' },
      { label: 'Защита', value: 'IPX5' },
    ],
  },
  {
    id: 4,
    name: 'Планшет TabMax 12',
    price: 64990,
    category: 'Планшеты',
    image: '/placeholder.svg',
    specs: [
      { label: 'Экран', value: '12.4" IPS, 2K' },
      { label: 'Процессор', value: 'Snapdragon 8+ Gen 1' },
      { label: 'Память', value: '8/256 ГБ' },
      { label: 'Аккумулятор', value: '10 000 мАч' },
    ],
  },
  {
    id: 5,
    name: 'Умные часы FitWatch Pro',
    price: 29990,
    category: 'Носимая электроника',
    image: '/placeholder.svg',
    specs: [
      { label: 'Экран', value: '1.43" AMOLED' },
      { label: 'Датчики', value: 'GPS, пульс, SpO2' },
      { label: 'Автономность', value: 'До 14 дней' },
      { label: 'Защита', value: '5 ATM' },
    ],
  },
  {
    id: 6,
    name: 'Игровая консоль GameStation',
    price: 54990,
    category: 'Игры',
    image: '/placeholder.svg',
    specs: [
      { label: 'Разрешение', value: 'До 4K 120 FPS' },
      { label: 'Накопитель', value: 'SSD 1 ТБ' },
      { label: 'Память', value: '16 ГБ GDDR6' },
      { label: 'Особенности', value: 'Ray Tracing, HDR' },
    ],
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
    { id: 'profile', label: 'Профиль', icon: 'User', badge: cart.length },
    { id: 'about', label: 'О магазине', icon: 'Info' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a2a72] via-[#1a4a7a] to-[#009ffd] flex items-center justify-center p-4">
      <div className="w-[90%] h-[85vh] bg-white/8 backdrop-blur-[30px] rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/18 overflow-hidden flex">
        <GlassSidebar
          menuItems={menuItems}
          activeItem={activeSection}
          onItemClick={setActiveSection}
          userName="TechStore Admin"
          userRole="Менеджер"
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex-shrink-0 border-b border-white/8 bg-white/5 backdrop-blur">
            <div className="px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Laptop" size={32} className="text-white" />
                <span className="text-2xl font-bold text-white">TechStore</span>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="ShoppingBag" size={24} />
                    Корзина
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                        {cart.map((item) => (
                          <Card key={item.id} className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="h-20 w-20 rounded object-cover" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-lg font-bold text-primary mt-1">
                                  {item.price.toLocaleString('ru-RU')} ₽
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 ml-auto text-destructive"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">
            {activeSection === 'home' && (
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Электроника и гаджеты
                </h1>
                <p className="text-lg text-white/80">
                  Профессиональный подход к выбору техники. Подробные характеристики и честные цены.
                </p>
              </div>
            )}

            {(activeSection === 'home' || activeSection === 'catalog') && (
              <section>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-white">Каталог товаров</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? 'bg-primary text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Товары не найдены</p>
                </div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all bg-white/10 backdrop-blur-[10px] border-white/10">
                    <div className="aspect-square bg-white/5 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-3 bg-primary text-white">
                        {product.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-3 text-white">{product.name}</h3>
                      <div className="space-y-2 mb-4 text-sm">
                        {product.specs.map((spec, index) => (
                          <div key={index} className="flex justify-between text-white/70">
                            <span className="font-medium">{spec.label}:</span>
                            <span>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <span className="text-2xl font-bold text-white">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <Button onClick={() => addToCart(product)} className="bg-primary hover:bg-primary/90">
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              )}
          </section>
        )}

        {activeSection === 'about' && (
          <section>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-white">О магазине</h2>
              <div className="space-y-4 text-white/80">
                <p className="text-lg">
                  TechStore — профессиональный интернет-магазин электроники и гаджетов. Мы специализируемся на
                  продаже качественной техники с предоставлением полных технических характеристик.
                </p>
                <p>
                  Наша миссия — помочь клиентам сделать осознанный выбор техники на основе детальной информации о
                  каждом устройстве. Мы работаем только с проверенными поставщиками и предоставляем гарантию на всю
                  продукцию.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Доставка</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Truck" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-white">Курьерская доставка</h3>
                      <p className="text-sm text-white/70">По Москве — 500 ₽, 1-2 дня</p>
                      <p className="text-sm text-white/70">По России — от 800 ₽, 3-7 дней</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Store" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-white">Самовывоз</h3>
                      <p className="text-sm text-white/70">Бесплатно из пунктов выдачи</p>
                      <p className="text-sm text-white/70">Готово к получению в день заказа</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Контакты</h2>
              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-white">Телефон</h3>
                      <p className="text-white/80">+7 (495) 123-45-67</p>
                      <p className="text-sm text-white/70 mt-1">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-white">Email</h3>
                      <p className="text-white/80">support@techstore.ru</p>
                      <p className="text-sm text-white/70 mt-1">Ответим в течение 24 часов</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-white">Адрес</h3>
                      <p className="text-white/80">г. Москва, ул. Примерная, д. 1</p>
                      <p className="text-sm text-white/70 mt-1">Пн-Пт: 10:00-19:00, Сб-Вс: 11:00-17:00</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'profile' && (
          <section>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-white">Профиль пользователя</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">TechStore Admin</h3>
                      <p className="text-white/70 text-sm mb-3">admin@techstore.ru</p>
                      <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Icon name="ShoppingBag" size={20} className="text-primary" />
                    Статистика покупок
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Всего заказов:</span>
                      <span className="font-bold text-white">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Потрачено:</span>
                      <span className="font-bold text-white">458 990 ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Бонусов:</span>
                      <span className="font-bold text-primary">4 589 ₽</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-white/10 backdrop-blur border-white/10 mb-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Icon name="Settings" size={20} className="text-primary" />
                  Настройки профиля
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Имя</label>
                    <input 
                      type="text" 
                      defaultValue="TechStore Admin"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Email</label>
                    <input 
                      type="email" 
                      defaultValue="admin@techstore.ru"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Телефон</label>
                    <input 
                      type="tel" 
                      defaultValue="+7 (495) 123-45-67"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur border-white/10">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Icon name="PackageCheck" size={20} className="text-primary" />
                  История заказов
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 1, date: '15.10.2024', items: 'Смартфон Premium X1, Наушники AirWave Pro', total: 114980, status: 'Доставлен' },
                    { id: 2, date: '10.10.2024', items: 'Ноутбук ProBook 15', total: 124990, status: 'Доставлен' },
                    { id: 3, date: '05.10.2024', items: 'Планшет TabMax 12, Умные часы FitWatch Pro', total: 94980, status: 'В пути' },
                  ].map((order) => (
                    <Card key={order.id} className="p-4 bg-white/5 border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white/70 text-sm">Заказ #{order.id} от {order.date}</p>
                          <p className="text-white text-sm mt-1">{order.items}</p>
                        </div>
                        <Badge className={order.status === 'Доставлен' ? 'bg-green-500' : 'bg-blue-500'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                        <span className="text-white font-bold">{order.total.toLocaleString('ru-RU')} ₽</span>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;