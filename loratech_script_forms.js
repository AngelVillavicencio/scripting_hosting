

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
        globals: {
            state: 0,
            counter: 10,
            idTemp: 0,
            atmTerms: {
                modalStyle: ` 
          .atm-terms-container {
            display: block;
            position: fixed;
            z-index: 999999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
          }
          .atm-terms-container .atm-terms-modal {
            background-color: #fff;
            margin: 15% auto;
            padding: 20px;
            border-radius: 10px;
            width: 50%;
          }
          .atm-terms-container .atm-terms-header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
          }
          .atm-terms-container .atm-terms-close {
            font-size: 22px;
            font-weight: bold;
            cursor: pointer;
            color: #283342;
            background-color: transparent;
            border: none;
            padding: 0;
            transition: color 0.3s ease;
          }
    
          .atm-terms-container .atm-terms-close:hover {
            color: #004ADD;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
          }
          .atm-terms-container .atm-terms-button {
            background-color: #004ADD;
            padding: 15px;
            border-radius: 20px;
            color: #fff;
            display: flex;
            width: 250px;
            justify-content: center;
            transition: box-shadow 0.3s ease; 
          }
          .atm-terms-container .atm-terms-button:hover {       
            box-shadow: 0 0 15px #004ADD;
            cursor: pointer;
          }
          .atm-terms-container .atm-terms-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px 10px 20px;        
            align-items: center;
          }      
          @media (max-width: 768px) {
            .atm-terms-modal {
              width: 90% !important;
              margin: 50px auto !important;
              max-height: calc(100vh - 150px);
              overflow-y: auto;
            }
    
            .atm-terms-content {
                padding: 10px; 
            }
    
            .atm-terms-button {
                width: 80%; 
                max-width: 200px; 
                margin: 0 auto; 
                border-radius: 0;
            }
          }
          `,
                modalDataTreatment: `<div class="atm-terms-container" id="atm-terms-data-treat">
          <div class="atm-terms-modal">
            <div class="atm-terms-header">
              <h2>Tratamiento de mis datos personales</h2>
              <span id="atm-terms-data-treat-close" class="atm-terms-close"
                >&times;</span
              >
            </div>
            <div class="atm-terms-content">
              <div>
                <p>
                  Al proporcionar sus datos personales, usted otorga su consentimiento para que los mismos sean tratados conforme a los siguientes términos y condiciones. Sus datos serán utilizados exclusivamente para los fines específicos de la recopilación, garantizándose su confidencialidad y seguridad. No se cederán a terceros sin su consentimiento, salvo obligación legal. Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos. Mantendremos sus datos el tiempo necesario y notificaremos cualquier cambio en estos términos. Este servicio no está destinado a menores de edad. Al proporcionar sus datos, acepta estos términos de manera voluntaria.
                </p>
              </div>
              <div class="atm-terms-content__footer"">
                <a id="atm-terms-data-treat-ok" class="atm-terms-button" data-dismiss="modal" aria-label="Close">
                  Entendido
                </a>
              </div>
            </div>
          </div>
        </div>`,
            }
        },
        templates: {
            modalAlertIcon: "https://i.imgur.com/rtgPujh.png",
            modal: `<div id="welcome_popup_container" class="modal_layout_container_popup">
          <div class="modal_layout_container_popup_modal-content">
              <span id="btn_close_modal" class="close">&times;</span>
              <div class="container_popup" id="content_modal_register">
                  <div class="container_popup_img">
                      <img src="https://i.imgur.com/bXpaDeb.png"  />
                  </div>
                  <div class="container_popup_info">
                      <p class="container_popup_info__title"> Bievenido a Loratech <br />
                      Soluciones IoT para las industrias <br />
                      </p>
                      <p class="container_popup_info__subtitle">
                          Registra tus datos y nos contáctaremos
                      </p>
                      <div class="container_popup_info__form">
                          <div>
                            <input placeholder="Nombre" type="text" name="nombre" class="info__form-inputtext" />
                          </div>
                          <div>
                            <input placeholder="Empresa" type="text" name="empresa" class="info__form-inputtext" />
                          </div>
                          <div>
                            <input placeholder="Correo corporativo" type="email" class="info__form-inputtext" />
                          </div>
                          <div>
                            <input placeholder="Número de teléfono" type="tel" class="info__form-inputtext" />
                          </div>
                          <div class="info__form-inputcheck">
                              <input type="checkbox" class="checkbox_promo" id="checkbox_data" />
                              <span class="checkmark"></span>
                              <p class="info__form-inputcheck__text">
                                Acepto los <a class="info_link hover_pointer" id="btn_terms" >Términos y condiciones</a>. (Obligatorio)
                              </p>
                          </div>
                          <div class="info__form-inputbutton">
                              <button id="btn_register_modal">Registrarme</button>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="container_popup_thank" id="content_modal_thank">
                  <div class="container_popup_info">
                      <p class="container_popup_info__title">¡Gracias por registrarte!</p>
                      <p class="text_promos_thank">
                        Nuestros ejecutivos se contactarán contigo
                      </p>
                      <div class="info__form-inputbutton">
                          <button id="btn_close2_modal">Cerrar</button>
                      </div>
                  </div>
                  <p class="counter_render" id="renderCounter"></p>
              </div>
          </div>
      </div>`,
        },
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

            },
            sendToFireStore: async (informacion, name_collection) => {
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
                    const collectionRef = collection(firestore, name_collection);
                    await addDoc(collectionRef, data);
                    //console.log("Enviando valores", data)

                } catch (error) {
                    console.error('Error al guardar datos:', error);
                }
            },
            display: () => {
                var body = document.querySelector("body");
                body.style.overflow = "hidden";
                let modal = document.getElementById("welcome_popup_container");
                if (modal) {
                    modal.style.display = "flex";
                    modal.style.alignItems = "center";
                    modal.style.justifyContent = "center";
                }
            },
            hiddenModal: () => {
                document.querySelector("#welcome_popup_container").remove();
                document.querySelector("body").style.overflow = "auto";
                sessionStorage.setItem("welcome_popup_close", "true");

            },
            counterFun: () => {
                me.globals.counter = me.globals.counter - 1;
                var renderCounter = document.querySelector("#renderCounter");
                if (renderCounter) {
                    renderCounter.innerHTML = `Esta ventana se cerrará en ${me.globals.counter} segundos`;
                }
                if (me.globals.counter < 0) {
                    clearInterval(me.globals.idTemp);
                    me.fn.hiddenModal();
                }
            },
            insertAfter: (referenceNode, newNode) => {
                referenceNode.parentNode.insertBefore(
                    newNode,
                    referenceNode.nextSibling
                );
            },
            addErrorMessage: (element, message) => {
                element.classList.add("error-validation");

                var messageSpan = document.createElement("span");
                messageSpan.classList.add("error-validation-message");
                messageSpan.innerHTML = message;

                if (element.type === "checkbox") {
                    me.fn.insertAfter(
                        element.parentElement.querySelector(
                            ".info__form-inputcheck__text"
                        ),
                        messageSpan
                    );
                } else {
                    me.fn.insertAfter(element, messageSpan);

                    var messageIcon = document.createElement("img");
                    messageIcon.classList.add("error-validation-icon");
                    messageIcon.src = me.templates.modalAlertIcon;
                    me.fn.insertAfter(messageSpan, messageIcon);
                }
            },
            clearErrorValidation: (element) => {
                if (!element) {
                    document
                        .querySelectorAll("input.error-validation")
                        .forEach((item) => {
                            item.classList.remove("error-validation");
                        });
                }
                document
                    .querySelectorAll(".error-validation-message")
                    .forEach((item) => {
                        item.remove();
                    }); // Elimina el mensaje
                document
                    .querySelectorAll(".error-validation-icon")
                    .forEach((item) => {
                        item.remove();
                    }); // Elimina el ícono
            },
            isValidForm: () => {
                me.fn.clearErrorValidation();

                var nombreInput = document.querySelector(
                    '.info__form-inputtext[name="nombre"]'
                );
                var correoInput = document.querySelector(
                    '.info__form-inputtext[type="email"]'
                );
                var telefonoInput = document.querySelector(
                    '.info__form-inputtext[type="tel"]'
                );
                var promoAcceptData = document.querySelector("#checkbox_data");

                var empresaInput = document.querySelector(
                    '.info__form-inputtext[name="empresa"]'
                );

                if (/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(nombreInput.value) === false) {
                    me.fn.addErrorMessage(nombreInput, "Nombre inválido");
                    return false;
                }
                if (/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(empresaInput.value) === false) {
                    me.fn.addErrorMessage(empresaInput, "Nombre de empresa inválido");
                    return false;
                }
                /*if (
                    !(empresa.value?.length >= 8 && empresa.value?.length <= 20)
                ) {
                    me.fn.addErrorMessage(empresa, "Documento inválido");
                    return false;
                }
                */
                if (
                    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(
                        correoInput.value
                    ) === false
                ) {
                    me.fn.addErrorMessage(correoInput, "Dirección de correo inválido");
                    return false;
                }
                if (/^\d{9,9}$/g.test(telefonoInput.value) === false) {
                    me.fn.addErrorMessage(telefonoInput, "Número de teléfono inválido");
                    return false;
                }
                if (!promoAcceptData.checked) {
                    me.fn.addErrorMessage(
                        promoAcceptData,
                        "- Debes aceptar los Términos y condiciones"
                    );
                    return false;
                }

                return true;
            },
            statusOneSignal: () =>
                localStorage.getItem("isPushNotificationsEnabled") == "true"
                    ? true
                    : false,
            register: () => {
                if (!me.fn.isValidForm()) return;

                let modalContent = document.querySelector("#content_modal_register");
                let modalContentThank = document.querySelector(
                    "#content_modal_thank"
                );
                me.globals.state = 1;
                modalContent.style.display = "none";
                modalContentThank.style.display = "flex";
                me.globals.idTemp = setInterval(me.fn.counterFun, 1000);

                var nombre = document.querySelector(
                    '.info__form-inputtext[name="nombre"]'
                ).value;
                var correo = document.querySelector(
                    '.info__form-inputtext[type="email"]'
                ).value;
                var telefono = document.querySelector(
                    '.info__form-inputtext[type="tel"]'
                ).value;

                var promoAcceptData = document.querySelector("#checkbox_data");


                var empresa = document.querySelector(
                    '.info__form-inputtext[name="empresa"]'
                ).value;

                //var documentType = empresa.length == 8 ? "dni" : "ce";

                /*emBlue.setLocalContact({
                    email: correo,
                    first_name: nombre,
                    phone: telefono,
                    double_optin: promoAcceptSpam.checked,
                    document_number: empresa,
                    document_type: documentType,
                }); */

                /*emBlue.sendEvent();*/

                me.fn.sendToFireStore({
                    email: correo,
                    first_name: nombre,
                    phone: telefono,
                    double_optin: promoAcceptData.checked,
                    nombre_empresa: empresa,
                    registry_source: "welcome_popup_loratech",
                },
                    "formularios_popups")


            },
            initialVariablesAndListeners: () => {
                var closeX = document.querySelector("#btn_close_modal");
                var btn_register_modal = document.querySelector(
                    "#btn_register_modal"
                );
                var btn_close2_modal = document.querySelector("#btn_close2_modal");

                setTimeout(() => {
                    if (window.location.pathname == "/") {
                        me.fn.display();
                    }
                }, 2000);

                closeX.addEventListener("click", () => me.fn.hiddenModal());
                btn_register_modal.addEventListener("click", () => me.fn.register());
                btn_close2_modal.addEventListener("click", () => me.fn.hiddenModal());
            },
            insertCss: async (path) => {
                let css = [];
                css.push(me.globals.atmTerms.modalStyle);
                css.push(`
          .info_link {
              color: #0FBDDF;
              text-decoration: none;
            }
          .modal_layout_container_popup {
            display: none;
            position: fixed; 
            z-index: 99999;
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: hidden; 
            background-color: rgba(0,0,0,0.4); 
            }

            .hover_pointer{
              cursor: pointer;
            }            

            .container_popup container_popup_term .vtex-flex-layout-0-x-flexColChild{
              font-size: 11px;
            }

            .modal_layout_container_popup_modal-content {
            background-color: #fefefe;
            margin: 15% auto; 
            padding: 20px;
            border: 1px solid #888;
            width: auto; 
            height: auto;
            border-radius: 32px;
            position: relative;
            max-width: 328px;
            }

            .close {
              color: #283342;
              font-size: 28px;
              font-weight: bold;
              position: absolute;
              right: 5%;
              z-index: 2;
            }

            .close:hover,
            .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
            }

            .container_popup{
                position: relative;
                width: 100%;
                padding: 22px 0px;
                height: 85vh;
            }

            .container_popup_img{
                display: none;
                position: relative;
            }

            .container_popup_img_btn{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 50px;
                width: fit-content;
                height: fit-content;
                margin: auto;
                background: #004ADD;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
                border-radius: 32px;
                font-family: "Varela", Sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                color: #FFFFFF;
                padding: 8px 55px;
                margin: auto;
                border: none;
                cursor: pointer;
            }


            .container_popup_info__title{
                font-family: "Varela", Sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                letter-spacing: -0.02em;
                color: #000000;
                margin-bottom: 20px;
            }

            .container_popup_info__subtitle{
                font-family: "Varela", Sans-serif;
                font-style: normal;
                font-weight: 700;
                font-size: 12px;
                line-height: 20px;
                text-align: center;
                letter-spacing: -0.02em;
                color: #000000;
                margin-bottom: 20px;
            }


            .container_popup_info__form{
                display: flex;
                flex-direction: column;
                padding: 0px;
            }
            .container_popup_info__form > div {
              position: relative;
            }
            .container_popup_info__form > div img {
              position: absolute;
              right: 0;
              bottom: 25px;
              width: 20px;
            }

            .info__form-inputtext{
                border: none;
                border-bottom: 1px solid rgba(153, 119, 153, 0.5);
                padding-bottom: 8px;
                margin-bottom: 16px;
                padding-top: 20px;
                outline: none;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                letter-spacing: -0.01em;
                color: #283342;
                width: 100%;
            }

            .info__form-inputtext[type=number]::-webkit-inner-spin-button, 
            .info__form-inputtext[type=number]::-webkit-outer-spin-button { 
              -webkit-appearance: none; 
              margin: 0; 
            }

            .info__form-inputtext[type=number] { -moz-appearance:textfield; }

            .info__form-inputtext:focus{
                border-bottom: 1.5px solid #283342;
            }
            .info__form-inputcheck{
                margin-top: 6px;
                padding-top: 11px;
                    display: flex;
                align-items: flex-start;
            }

            .info__form-inputcheck .checkbox_promo{ /*falta mejorar esto o crear componente*/
                width: 17px;
                height: 17px;
                background: #FFFFFF;
                border: 1px solid #E5E7E8;
                border-radius: 2px;
            }

            .info__form-inputcheck__text{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #283342;
                margin: 0;
                margin-left: 8px;
                margin-bottom: 8px;
            }

            .info__form-inputbutton{
                padding-top: 21px;
                display: flex;
                justify-content: center;
            }

            .info__form-inputbutton button{
                background: #004ADD;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
                border-radius: 32px;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                color: #FFFFFF;
                padding: 8px 24px;
                margin: auto;
                border: none;
                cursor: pointer;
            }


            /*MODAL DE AGRADECIMIENTO*/
            .container_popup_thank{
                position: relative;
                width: 100%;
                padding: 22px 0px;
                display: none;
                max-width: 328px;
            }
            .text_promos_thank{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                color: #283342;
                margin-bottom: 6px;
            }

            .counter_render{
                position: absolute;
                left: 0;
                right: 0;
                width: fit-content;
                height: fit-content;
                margin: auto;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                color: #FFFFFF;
                bottom: -50px;
            }
            
            .error-validation {
              color: #004ADD;
            }
            .error-validation + span {
              color: #004ADD;
              font-weight: 700;
              font-size: 11px;
              position: absolute;
              bottom: -2px;
              left: 0;
            }
            .error-validation + .checkmark {
              border-color: #FF1531;
            }
            .info__form-inputcheck .error-validation-message {
              position: absolute;
              bottom: -5px;
              left: 28px;
              color: #004ADD;
              font-weight: 700;
              font-size: 11px;
            }
            .info__form-inputcheck .checkbox_promo {
              z-index: 1;
              opacity: 0;
            }
            .checkmark {
              background-color: white;
              border: 1px solid #E5E7E8;
              border-radius: 2px;
              width: 20px;
              height: 20px;
              left: 0;
              top: 15px;
              position: absolute;
            }
            .info__form-inputcheck .checkbox_promo:checked + span:before {
              content: "";
              background-color: #0FBDDF;
              display: block;
              position: absolute;
              left: 2px;
              top: 2px;
              width: 16px;
              height: 16px;
              border-radius: 1px;
            }
            .info__form-inputcheck .checkbox_promo:checked + span:after {
              content: "";
              display: block;
              position: absolute;
              left: 8px;
              top: 3px;
              width: 3px;
              height: 9px;
              border: solid white;
              border-width: 0 2px 2px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
            `);

                css.push("@media (min-width: 768px) {");
                css.push(`.modal_layout_container_popup_modal-content{            
                max-width: 856px;
                padding: 0;
            }

            
            .container_popup container_popup_term .vtex-flex-layout-0-x-flexColChild{
              font-size: 13px;
            }
            
            #myModalTerm2 .container_popup_term{
              height: 100%;
            }


            .container_popup{
                display: grid; 
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: 1fr;
                grid-column-gap: 0px;
                grid-row-gap: 0px; 
                padding: 0;
            }
            .container_popup_img{
                display: flex;
                height: 90vh;
                width: 100%;
            }
            .container_popup_img img{
                height: 100%;
                width: 100%;
                object-fit: fill;
                border-top-left-radius: 32px;
                border-bottom-left-radius: 32px;
            }
            .container_popup_info{
                padding: 28px 37px;
                height: 90vh;
                overflow-y: scroll;
            }
            .container_popup_info::-webkit-scrollbar {
            width: 8px; /* Ancho del scroll */
            }

            /* Estilo del track del scroll */
            .container_popup_info::-webkit-scrollbar-track {
            background: #f1f1f1; /* Color de fondo del track */
            }

            /* Estilo del thumb (la parte móvil) del scroll */
            .container_popup_info::-webkit-scrollbar-thumb {
            background: #888; /* Color del thumb */
            border-radius: 6px; /* Bordes redondeados del thumb */
            }

            /* Cambiar el color del thumb cuando está siendo hover */
            .container_popup_info::-webkit-scrollbar-thumb:hover {
            background: #555;
            }

            .close {
                right: 4%;
                top: 3%;
            }
           
            .container_popup_info__title{
                font-size: 24px;
                line-height: 32px;
                margin-bottom: 20px;
            }


            .container_popup_info__subtitle{
                font-size: 16px;
                line-height: 32px;
                margin-bottom: 20px;
            }

            .info__form-inputtext{
                font-size: 18px;
                line-height: 24px;
                letter-spacing: -0.01em;
            }
            .info__form-inputcheck__text{
                font-size: 16px;
                line-height: 24px;
            }
            .info__form-inputcheck .checkbox_promo{
                width: 24px;
                height: 24px;
            }
            .info__form-inputbutton button{
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
            }

            .container_popup_thank{
                max-width: 434px;
            }

            .text_promos_thank{
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
            }

            .container_popup_thank .container_popup_info{
                padding: 10px 39px;
            }

            .counter_render{
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
            }
            .info__form-inputcheck__text {
              margin-left: 20px;
            }
            .info__form-inputcheck .error-validation-message {
              left: 33px;
            }
            
            `);

                css.push("}");

                me.fn.appendCSS(css.join("\n"));
            },
            appendCSS: function (css) {
                document.head.insertAdjacentHTML(
                    "beforeend",
                    '<style type="text/css">\n' + css + "\n</style>"
                );
            },
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
                    const collectionRef = collection(firestore, "loratech_source");
                    await addDoc(collectionRef, data);
                    //console.log("Enviando valores", data)

                } catch (error) {
                    console.error('Error al guardar datos:', error);
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


            const botones = document.querySelectorAll('form button')
            botones.forEach(boton_submit => {
                boton_submit.addEventListener("click", (e) => {
                    let informacion = {
                        submit: "hizo_click_al_submit",
                    }
                    saveDataToFirestore(informacion);
                    //console.log(informacion)
                })

            })



            //var path = window.location.pathname;

            if (
                //path !== "/" ||
                !(sessionStorage.getItem("welcome_popup_close") === "true")
            ) {
                //if (!document.querySelector("#welcome_popup_container")) {
                var body = document.querySelector("body");

                body.insertAdjacentHTML("afterbegin", me.templates.modal);

                me.fn.insertCss();

                var btn_terms = document.querySelector("#btn_terms");

                btn_terms.addEventListener("click", () => {
                    body.insertAdjacentHTML(
                        "afterbegin",
                        me.globals.atmTerms.modalDataTreatment
                    );
                    var closeXTerm2 = document.querySelectorAll(
                        "#atm-terms-data-treat #atm-terms-data-treat-close, #atm-terms-data-treat #atm-terms-data-treat-ok"
                    );
                    for (var i = 0; i < closeXTerm2.length; i++) {
                        closeXTerm2[i].addEventListener("click", () => {
                            document.querySelector("#atm-terms-data-treat").remove();
                        });
                    }
                });

                me.fn.initialVariablesAndListeners();

            }









        }
    }

    return me;
})().run();

