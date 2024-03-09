import { gsap } from "gsap";

let soundPush = (url) => {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = url; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
    audio.volume = 0.7
    document.body.appendChild(audio)
    audio.addEventListener("ended", e => {
        audio.remove()
    })
    return url
}

let isMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    };
    return false;
}

let tl = gsap.timeline();

export class CustomPush {
    show(options) {

        this.title = typeof options.title !== "undefined" ? options.title : 'Maltsev CRM';
        this.text = typeof options.text !== 'undefined' ? options.text : '';
        this.img = typeof options.img !== 'undefined' ? options.img : '/img/logo-bw.png';

        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                Notification.requestPermission().then((result) => {
                    if (result === "granted") {
                        registration.showNotification(this.title, {
                            icon: this.img,
                            body: this.text,
                        });
                    }
                    else {
                        this.showCustom({
                            title: this.title,
                            text: this.text,
                            img: this.img,
                        })
                    }
                });
            })

    }
    showCustom(options) {

        let timeNow = new Date().toLocaleTimeString()
        this.title = options.title
        this.text = options.text
        this.img = options.img
        this.sound = typeof options.sound == false ? false : true;

        if (document.querySelector('.push__item')) document.querySelector('.push__item').remove()

        let push = document.createElement("div");
        push.classList.add("push__item");
        // push.draggable = true
        document.body.appendChild(push);

        push.innerHTML += `<div class="push__item__head">
    <img draggable="false" class="push__item__icon" src="${this.img}"/>
    <div class="push__item__logoname">MaltsevCRM</div>
    <div class="push__item__time">${timeNow}</div>
    <div class="push__item__exit"></div>
    </div>
    <div class="push__item__body">
    <b>${this.title}</b><br>
    <p>${this.text}</p>
    </div>
    </div>`;

        let tl = gsap.timeline();

        if (window.innerWidth > 400) {
            tl.fromTo(push, .2, { x: 500, opacity: 0 }, { x: 0, opacity: 1, ease: "power3.out" });
        }
        else {
            tl.fromTo(push, .2, { y: -100, opacity: 1 }, { y: 0, opacity: 1, ease: "power3.out" });
        }

        document.querySelectorAll(".push__item__exit").forEach(el => el.onclick = (e) => this.hide(push));


        let firstPixel = null
        push.addEventListener('touchmove', event => {
            if (!firstPixel) firstPixel = event.changedTouches[0].clientY
            if (event.changedTouches[0].clientY < firstPixel) {
                tl.to(push, {
                    duration: .3, y: "-300px",
                    onComplete() {
                        push.remove();
                    },
                }
                );
            }
        })

        setTimeout(() => this.hide(push), 3000);
        // if(!isMobile()) 
        if (this.sound) soundPush('/sound/nothing-1.mp3')

    }

    hide(elem) {
        tl.to(elem, {
            duration: .2, opacity: 0, ease: "power3.out",
            onComplete() {
                elem.remove();
            },
        }
        );

    }

}