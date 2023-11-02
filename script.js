// Asegúrate de cargar Firebase antes de ejecutar el código
(function () {
    console.log("starting script..  !!")
})();

// Importa Firebase y Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, addDoc, doc, collection, setDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

// Luego, ejecuta el código cuando Firebase se haya cargado
const app = initializeApp({
    apiKey: "AIzaSyABTJUPhyN-f4arqjgK9tLUtRTmv-BLjyo",
    authDomain: "chat-clone-gpt.firebaseapp.com",
    projectId: "chat-clone-gpt",
    storageBucket: "chat-clone-gpt.appspot.com",
    messagingSenderId: "777240212975",
    appId: "1:777240212975:web:128dfee625e88b19e2b21a"
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
            setTimeout(function () {
                console.log("running script firebase");
                // Obtiene una instancia de Firestore

                var cookie = me.fn.getCookie("cookie_newusers")
                cookie = JSON.parse(cookie)
                if (typeof (cookie) == 'number') cookie = null
                if (!cookie) {
                    cookie = me.fn.generarUserCookie()
                    me.fn.setCookie('cookie_newusers', JSON.stringify(cookie), 30);
                }

                // Datos que deseas guardar en Firestore

                const parametros_extra = new URLSearchParams(window.location.search);
                const objeto_parametros = {};
                parametros_extra.forEach((valor, clave) => {
                    objeto_parametros[clave] = valor;
                });

                //verificar la campaign

                let campaign_source = objeto_parametros["utm_campaign"]

                if (!campaign_source) {
                    cookie = JSON.parse(me.fn.getCookie("cookie_newusers"))
                    campaign_source = cookie.campaign_source
                    campaign_source = ""
                } else {
                    cookie.campaign_source = campaign_source
                    me.fn.setCookie('cookie_newusers', JSON.stringify(cookie), 30);
                }

                let medium_source = objeto_parametros["utm_medium"]

                if (!medium_source) {
                    cookie = JSON.parse(me.fn.getCookie("cookie_newusers"))
                    medium_source = cookie.medium_source
                    medium_source = ""
                } else {
                    cookie.medium_source = medium_source
                    me.fn.setCookie('cookie_newusers', JSON.stringify(cookie), 30);
                }

                let source_source = objeto_parametros["utm_source"]

                if (!source_source) {
                    cookie = JSON.parse(me.fn.getCookie("cookie_newusers"))
                    source_source = cookie.source_source
                    source_source = ""
                } else {
                    cookie.source_source = source_source
                    me.fn.setCookie('cookie_newusers', JSON.stringify(cookie), 30);
                }

                const data = {
                    url: window.location.pathname,
                    campaign_source: campaign_source,
                    medium_source: medium_source,
                    source_source: source_source,
                    date: new Date()
                };

                // Función para guardar datos en Firestore
                async function saveDataToFirestore() {
                    try {
                        var cookie = me.fn.getCookie("cookie_newusers")
                        cookie = JSON.parse(cookie)

                        const firestore = getFirestore(app);
                        const usuarioRef = doc(firestore, "client_x", cookie.id.toString());

                        // Accede a la subcolección "historial" y agrega un nuevo documento
                        const collectionRef = collection(usuarioRef, "historial");
                        const docRef = await addDoc(collectionRef, data);

                        console.log("Documento de pedido agregado con ID:", docRef.id, cookie);
                    } catch (error) {
                        console.error('Error al guardar datos:', error);
                    }
                }


                // Llama a la función para guardar datos en Firestore
                saveDataToFirestore();
            }, 500);
        }
    }

    return me;
})().run();
