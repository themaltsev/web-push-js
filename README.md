Легкий плагин для пуш уведомлений 

INSTALL npm i gsap

import { CustomPush } from "./push";

CustomPush.show({ 
  title: "Заголовок уведомления",
  text: "Тело уведомления",
  img: "Путь до иконки",
  sound: "Путь до звука"
})
