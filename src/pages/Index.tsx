import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Laptop" size={28} className="text-primary" />
              <span className="text-xl font-bold text-foreground">TechStore</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
                { id: 'about', label: 'О магазине', icon: 'Info' },
                { id: 'delivery', label: 'Доставка', icon: 'Truck' },
                { id: 'contacts', label: 'Контакты', icon: 'Mail' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
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
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Электроника и гаджеты
                </h1>
                <p className="text-lg text-muted-foreground">
                  Профессиональный подход к выбору техники. Подробные характеристики и честные цены.
                </p>
              </div>
            </div>
          </section>
        )}

        {(activeSection === 'home' || activeSection === 'catalog') && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-foreground">Каталог товаров</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-3">
                        {product.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-3 text-foreground">{product.name}</h3>
                      <div className="space-y-2 mb-4 text-sm">
                        {product.specs.map((spec, index) => (
                          <div key={index} className="flex justify-between text-muted-foreground">
                            <span className="font-medium">{spec.label}:</span>
                            <span>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <span className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <Button onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-foreground">О магазине</h2>
              <div className="space-y-4 text-muted-foreground">
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
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Доставка</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Truck" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Курьерская доставка</h3>
                      <p className="text-sm text-muted-foreground">По Москве — 500 ₽, 1-2 дня</p>
                      <p className="text-sm text-muted-foreground">По России — от 800 ₽, 3-7 дней</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Store" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Самовывоз</h3>
                      <p className="text-sm text-muted-foreground">Бесплатно из пунктов выдачи</p>
                      <p className="text-sm text-muted-foreground">Готово к получению в день заказа</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Контакты</h2>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-sm text-muted-foreground mt-1">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">support@techstore.ru</p>
                      <p className="text-sm text-muted-foreground mt-1">Ответим в течение 24 часов</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Адрес</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                      <p className="text-sm text-muted-foreground mt-1">Пн-Пт: 10:00-19:00, Сб-Вс: 11:00-17:00</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-16 border-t bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Laptop" size={24} className="text-primary" />
              <span className="font-bold text-foreground">TechStore</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 TechStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
