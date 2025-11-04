import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  scent: string;
  color: string;
  description: string;
}

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Ванильный уют',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/29493b9c-553b-4164-8d16-a09925a1f744/files/82bdee71-b0f4-4e92-a5a4-17bdeb11d6c4.jpg',
    scent: 'vanilla',
    color: 'beige',
    description: 'Нежный аромат ванили создает атмосферу домашнего уюта'
  },
  {
    id: 2,
    name: 'Лавандовый сон',
    price: 950,
    image: 'https://cdn.poehali.dev/projects/29493b9c-553b-4164-8d16-a09925a1f744/files/4ec33962-7028-401a-841c-2450a8c6ca54.jpg',
    scent: 'lavender',
    color: 'purple',
    description: 'Успокаивающий аромат лаванды для расслабления'
  },
  {
    id: 3,
    name: 'Цитрусовая свежесть',
    price: 920,
    image: 'https://cdn.poehali.dev/projects/29493b9c-553b-4164-8d16-a09925a1f744/files/5b41fc43-0de1-400c-98aa-1a0ad668589e.jpg',
    scent: 'citrus',
    color: 'orange',
    description: 'Бодрящий аромат цитрусов для энергии'
  },
  {
    id: 4,
    name: 'Розовый сад',
    price: 990,
    image: 'https://cdn.poehali.dev/projects/29493b9c-553b-4164-8d16-a09925a1f744/files/4ec33962-7028-401a-841c-2450a8c6ca54.jpg',
    scent: 'rose',
    color: 'pink',
    description: 'Нежный аромат роз для романтического настроения'
  },
  {
    id: 5,
    name: 'Морской бриз',
    price: 870,
    image: 'https://cdn.poehali.dev/projects/29493b9c-553b-4164-8d16-a09925a1f744/files/82bdee71-b0f4-4e92-a5a4-17bdeb11d6c4.jpg',
    scent: 'ocean',
    color: 'blue',
    description: 'Свежий аромат морского бриза'
  },
  {
    id: 6,
    name: 'Лесная прогулка',
    price: 930,
    image: 'https://cdn.poehali.dev/projects/29493b9c-553b-4164-8d16-a09925a1f744/files/5b41fc43-0de1-400c-98aa-1a0ad668589e.jpg',
    scent: 'forest',
    color: 'green',
    description: 'Аромат хвои и древесных нот'
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'Анна',
    text: 'Замечательные свечи! Аромат держится долго, воск натуральный. Буду заказывать ещё!',
    rating: 5
  },
  {
    id: 2,
    author: 'Мария',
    text: 'Очень довольна покупкой. Свечи горят равномерно, упаковка красивая.',
    rating: 5
  },
  {
    id: 3,
    author: 'Екатерина',
    text: 'Лавандовая свеча помогает расслабиться перед сном. Качество на высоте!',
    rating: 5
  }
];

const Index = () => {
  const [selectedScent, setSelectedScent] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = products.filter(product => {
    const scentMatch = selectedScent === 'all' || product.scent === selectedScent;
    const colorMatch = selectedColor === 'all' || product.color === selectedColor;
    return scentMatch && colorMatch;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">🕯️ Свечная мастерская</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(index)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative py-20 bg-gradient-to-b from-secondary to-background overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Ручная работа с душой
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Создаём уютную атмосферу в вашем доме с помощью натуральных свечей ручной работы
          </p>
          <Button size="lg" className="animate-scale-in">
            <Icon name="ArrowDown" size={20} className="mr-2" />
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Наши свечи</h3>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div>
              <p className="text-sm font-medium mb-2">Аромат:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedScent === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedScent('all')}
                  size="sm"
                >
                  Все
                </Button>
                <Button
                  variant={selectedScent === 'vanilla' ? 'default' : 'outline'}
                  onClick={() => setSelectedScent('vanilla')}
                  size="sm"
                >
                  Ваниль
                </Button>
                <Button
                  variant={selectedScent === 'lavender' ? 'default' : 'outline'}
                  onClick={() => setSelectedScent('lavender')}
                  size="sm"
                >
                  Лаванда
                </Button>
                <Button
                  variant={selectedScent === 'citrus' ? 'default' : 'outline'}
                  onClick={() => setSelectedScent('citrus')}
                  size="sm"
                >
                  Цитрус
                </Button>
                <Button
                  variant={selectedScent === 'rose' ? 'default' : 'outline'}
                  onClick={() => setSelectedScent('rose')}
                  size="sm"
                >
                  Роза
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Цвет:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedColor === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedColor('all')}
                  size="sm"
                >
                  Все
                </Button>
                <Button
                  variant={selectedColor === 'beige' ? 'default' : 'outline'}
                  onClick={() => setSelectedColor('beige')}
                  size="sm"
                >
                  Бежевый
                </Button>
                <Button
                  variant={selectedColor === 'purple' ? 'default' : 'outline'}
                  onClick={() => setSelectedColor('purple')}
                  size="sm"
                >
                  Фиолетовый
                </Button>
                <Button
                  variant={selectedColor === 'pink' ? 'default' : 'outline'}
                  onClick={() => setSelectedColor('pink')}
                  size="sm"
                >
                  Розовый
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-2xl font-bold mb-2">{product.name}</h4>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Отзывы наших клиентов</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-medium">— {review.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">О нас</h3>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Мы — небольшая семейная мастерская, которая создает уникальные свечи ручной работы. 
              Каждая свеча изготавливается с любовью и вниманием к деталям.
            </p>
            <p>
              Мы используем только натуральные материалы: соевый воск, хлопковые фитили и 
              эфирные масла высшего качества. Наши свечи не содержат парафина и искусственных добавок.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  candles@example.com
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, ул. Примерная, 123
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Информация</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Доставка и оплата</li>
                <li>Возврат и обмен</li>
                <li>Оптовым покупателям</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-muted-foreground">
            © 2024 Свечная мастерская. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
