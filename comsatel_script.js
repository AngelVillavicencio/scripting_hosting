// Asegúrate de cargar Firebase antes de ejecutar el código
(function () {
    //console.log("starting script..  !!")
})();

// Importa Firebase y Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, addDoc, doc, collection, setDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

// Luego, ejecuta el código cuando Firebase se haya cargado
const app = initializeApp({
    apiKey: "AIzaSyDN5A-tfKeaMYapHVqVTDvo4M6zAm9wd9c",
    authDomain: "marketing-automation-8be75.firebaseapp.com",
    projectId: "marketing-automation-8be75",
    storageBucket: "marketing-automation-8be75.appspot.com",
    messagingSenderId: "1050427527954",
    appId: "1:1050427527954:web:419d7cae745ad7284219cb"
});

(function () {

    var me = {
        name: 'script automation',
        data: {},
        fn: {
            setCookie: function (cName, cValue, expDays) {
                var date = new Date();
                date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + date.toUTCString();
                document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
            },
            getCookie: function (cName) {
                var name = cName + "=";
                var cDecoded = decodeURIComponent(document.cookie);
                var cArr = cDecoded.split('; ');
                var res = null;
                cArr.forEach(function (val) {
                    if (val.indexOf(name) === 0) res = val.substring(name.length);
                });
                return res;
            },
            generarUserCookie: function () {
                var numeroAleatorio = Math.random();
                var identificadorUnico = Math.floor(numeroAleatorio * 1000000) + Date.now(); // Ajusta el rango según tus necesidades
                //return identificadorUnico.toString();

                const userId = {
                    id: identificadorUnico.toString(),
                    campaign_source: ""
                }

                return userId

            }
        },
        run: function () {
            // Función para guardar datos en Firestore
            async function saveDataToFirestore(informacion) {
                const firestore = getFirestore(app);

                try {
                    var cookie = me.fn.getCookie("cookie_newusers")
                    cookie = JSON.parse(cookie)
                    const data = {
                        id_user: cookie.id.toString(),
                        source_url: window.location.pathname,
                        ...informacion,
                        date: new Date()
                    };
                    // Accede a la subcolección "historial" y agrega un nuevo documento
                    const collectionRef = collection(firestore, "comsatel_source");
                    await addDoc(collectionRef, data);
                    //console.log("Enviando valores", data)

                } catch (error) {
                    console.error('Error :', error);
                }
            }

            //console.log("running script");
            // Obtiene una instancia de Firestore

            var cookie = me.fn.getCookie("cookie_newusers")
            cookie = JSON.parse(cookie)
            if (typeof (cookie) == 'number') cookie = null
            if (!cookie) {
                cookie = me.fn.generarUserCookie()
                me.fn.setCookie('cookie_newusers', JSON.stringify(cookie), 30);
            }



            //const botones = document.querySelectorAll('button[type="submit"]')
            const inputs = document.querySelectorAll('input')

            inputs.forEach(input => {
                input.addEventListener("change", (e) => {
                    let informacion = {}

                    const inputs_toSend = document.querySelectorAll('input')


                    inputs_toSend.forEach(input_ => {
                        if (input_.value != "" && input_.placeholder != "")
                            informacion[input_.placeholder] = input_.value
                    })




                    // Llama a la función para guardar datos en Firestore
                    //console.log(informacion);
                    saveDataToFirestore(informacion);
                })

            })






        }
    }

    return me;
})().run();
