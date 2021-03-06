var lang = {
 serveer_disconnect: 'Связь с сервером прервалась',
 tiket_created: 'Тикет создан',
 route_set_in_subscribe: 'Маршрут добавлен в подписки',
 rate_seng_dispether: 'Заявка направлена оператору',
 enabled: 'Включена',
 disabled: 'Выключена',
 car_type: 'Tип кузова',
 tonnage: 'Грузоподъемность',
 body_volume: 'Объем кузова',
 length: 'Длина',
 width: 'Ширина',
 height: 'Высота',
 pts_number: 'Номер ПТС',
 change: 'ИЗМЕНИТЬ',
 deletes: 'УДАЛИТЬ',
 cargo_weight: 'Вес',
 cargo_volume: 'Объем',
 clearance: 'Габариты',
 route_length: 'Расстояние',
 carrier_rate: 'Cтавка',
 carrier_rate_notfull:'чтобы узнать ставку зарегистрируйтесь как перевозчик, или свяжитесь с нашим диспетчером',
 detail_info: 'ПОДРОБНАЯ ИНФОРМАЦИЯ',
 payment_type: 'Варианты оплаты',
 cargo_type: 'Тип груза',
 close_btn: 'Закрыть',
 no_internet: 'Нет подключения к интернету',
 month:["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
 monthNames:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август' , 'Сентябрь' , 'Октябрь', 'Ноябрь', 'Декабрь'],
 dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
 dayNamesShort: 	['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
 rub: 'руб',
 km: 'км',
 chooseTheme: 'Необходимо выбрать тему',
 good_activation:'Активация прошла успешно',
 bad_activation:'Активация не удалась',
 password_cange:'Пароль изменен',
 routes_not_found:'Маршрутов не обнаружено',
 routes_error:'Не удалось построить маршрут. Попробуйте позднее',
 usecars: 'Чтобы начать пользоваться сервисом, необходимо добавить  хотя бы один автомобиль.',
 adds: 'ДОБАВИТЬ',
 dispetcherTitle: 'Контакты диспетчера',
  dispetcherPhone: '8 800 500-46-97',
    dispetcherPhoneCall: '88005004697',
 rolies: {7:"Перевозчик", 8:"Менеджер"},
 car_types:{1:"пухтовоз", 2:"реф. с перегородкой",3:"реф. мультирежимный",4:"ломовоз",5:"скотовоз",6:"автобус",7:"трал",8:"газовоз",9:"низкорамный",10:"цельнометалл.",11:"все закр.+изотерм",12:"все открытые",13:"седельный тягач",14:"лесовоз",15:"цистерна",16:"автотранспортер",17:"кран",18:"конт.площадка",19:"самосвал",20:"микроавтобус",21:"фургон",22:"изотермический",23:"рефрижератор",24:"тентованный",25:"контейнер",26:"бортовой",27:"цементовоз",28:"муковоз",29:"автовоз",30:"трубовоз",31:"шаланда",32:"манипулятор",33:"панелевоз",34:"зерновоз",35:"стекловоз",36:"бетоновоз",37:"кормовоз",38:"автовышка",39:"открытый конт.",40:"щеповоз",41:"коневоз",42:"эвакуатор",43:"низкорам.платф.",44:"пикап",45:"бензовоз",46:"вездеход",47:"негабарит",48:"телескопический",49:"битумовоз",50:"реф.-тушевоз",51:"пирамида",52:"балковоз(негабарит)",53:"рулоновоз",54:"площадка без бортов",55:"реф.+изотерм"},
 cargo_types:{1:"Автошины",2:"Алкогольные напитки",3:"Безалкогольные напитки",4:"Бумага",5:"Бытовая техника",6:"Грибы",7:"Древесина",8:"Древесный уголь",9:"Зерно и семена (в упаковк",10:"Изделия из кожи",11:"Изделия из металла",12:"Казеин",13:"Канц. товары",14:"Ковры",15:"Компьютеры",16:"Консервы",17:"Контейнер 40фут",18:"Макулатура",19:"Мебель",20:"Медикаменты",21:"Металл",22:"Металлолом",23:"Молоко сухое",24:"Мороженое",25:"Мясо",26:"Нефтепродукты",27:"Оборудование и запчасти",28:"Обувь",29:"Овощи",30:"Одежда",31:"Парфюмерия и косметика",32:"Пиво",33:"Пластик",34:"Продукты питания",35:"Птица ",36:"Изделия из резины",37:"Рыба (неживая)",38:"Сантехника",39:"Сахар",40:"Сборный груз",41:"Стекло и фарфор",42:"Стройматериалы",43:"Табачные изделия",44:"Тара и упаковка",45:"Текстиль",46:"ТНП",47:"Торф",50:"Транспортные средства",51:"Удобрения",52:"Фрукты",53:"Хим. продукты опасные",54:"Хим. продукты неопасные",55:"Хозтовары",56:"Шкуры мокросоленые",57:"Электроника",58:"Ягоды",59:"Другой",60:"ДСП",61:"Утеплитель",62:"Кирпич",63:"Трубы",64:"ЛДСП",65:"Фанера",66:"Минвата",67:"Пенопласт",68:"Гофрокартон",70:"Стеклотара (бутылки и др.",71:"Мука",73:"Поддоны",74:"Чипсы",75:"Соки",76:"Цемент",77:"Кондитерские изделия",78:"Кабель",79:"Холодильное оборудование",80:"Доски",81:"Пиломатериалы",82:"Бытовая химия",83:"ДВП",84:"Контейнер 20фут",85:"Крупа",86:"Металлопрокат",87:"Вагонка",88:"Ферросплавы",89:"Кормовые/пищевые добавки",90:"Игрушки",91:"Оборудование медицинское",92:"Зерно и семена (насыпью)",93:"Цветы",94:"Шпалы",95:"ЖБИ",96:"Гипс",97:"Газосиликатные блоки",98:"Арматура",100:"Сэндвич-панели",101:"Двери",102:"Домашний переезд",103:"Огнеупорная продукция",105:"Инструмент",106:"Люди"},
 payment_types:{1:"100% по ОТТН безнал. с НДС",2:"100% по ОТТН безнал. без НДС",3:"100% по ФТТН",4:"100% по ФТТН без НДС",5:"100% по ФТТН + квиток",6:"50% по ФТТН, 50% по ОТТН безнал. с НДС",7:"50/50 по ФТТН без НДС",8:"Наличка на выгрузке",9:"Наличка на карту",10:"Наличка на погрузке",11:"Предоплата",12:"50/50 по ФТТН с НДС"},
 loading_types:{1:"верхняя",2:"боковая",4:"задняя",8:"с полной растентовкой",32:"со снятием поперечных пер",64:"со снятием стоек",128:"без ворот",256:"гидроборт",512:"аппарели",1024:"с обрешеткой",2048:"с бортами",4096:"боковая с 2-х сторон"},
};
