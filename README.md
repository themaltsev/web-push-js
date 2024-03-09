Легкий плагин для пуш уведомлений из новой версии моей CRM
Работает так: Если разрешены уведомления нативные то работают они, если отключены то работают кастомные

A lightweight plugin for push notifications from the new version of my CRM
It works like this: If native notifications are allowed, then they work, if disabled, then custom ones work

INSTALL npm i gsap

import { CustomPush } from "./push";

CustomPush.show({ 
  title: "Заголовок уведомления",
  text: "Тело уведомления",
  img: "Путь до иконки",
  sound: "Путь до звука"
})
