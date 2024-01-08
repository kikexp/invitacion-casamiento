// Confirmar asistencia parallax
$(".parallax-canciones").parallax({
  imageSrc: "assets/img/canciones.jpg",
});

// Portada parallax
$(".parallax-portada").parallax({
  imageSrc: "assets/img/portada.jpg",
});

// Gracias parallax
$(".parallax-gracias").parallax({
  imageSrc: "assets/img/portada.jpg",
});

// ----------------------

// Portada

var divDressCode = document.querySelector(".scroll-down");
divDressCode.onclick = () => {
  var sectionCuenta = document.getElementById("frase");
  sectionCuenta.scrollIntoView({ behavior: "smooth" });
};

// ----------------------

// Cuenta regresiva
var fechaInicio = new Date().getTime();
var fechaFin = new Date(fechaCuentaRegresiva).getTime();
var diff = (fechaFin - fechaInicio) / 1000;

// Config countdown
$(".countdown").ClassyCountdown({
  theme: "black",

  labelsOptions: {
    style: "font-size: 17px;font-family: 'Montserrat', sans-serif;",
  },

  style: {
    // textResponsive: 0.6,
    secondsElement: {
      gauge: {
        fgColor: "#F00",
      },
    },

    days: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS:
        "color:" +
        colorTextoCuentaRegresiva +
        ";font-size: 30px;font-family: 'Montserrat', sans-serif;",
    },

    hours: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS:
        "color:" +
        colorTextoCuentaRegresiva +
        ";font-size: 30px !important;font-family: 'Montserrat', sans-serif;",
    },

    minutes: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS:
        "color:" +
        colorTextoCuentaRegresiva +
        ";font-size: 30px !important;font-family: 'Montserrat', sans-serif;",
    },

    seconds: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS:
        "color:" +
        colorTextoCuentaRegresiva +
        ";font-size: 30px !important;font-family: 'Montserrat', sans-serif;",
    },
  },

  // Fecha finalizacion
  end: $.now() + diff,

  // Al finalizar
  onEndCallback: function () {
    // $('.cuenta-regresiva').hide();
  },
});

// musica

var audios = document.getElementById("audioPrueba");
var playAudio = () => {
  audios.play().catch((error) => {
    console.log(
      "La reproducción automática no está permitida. Haz clic en la página para reproducir el audio."
    );
    return false;
  });
  $("#btnPlay").addClass("hidden");
  $("#btnPausa").removeClass("hidden");
  $("#btnPausa").addClass("pulse");
};
var pauseAudio = () => {
  audios.pause();
  $("#btnPausa").addClass("hidden");
  $("#btnPlay").removeClass("hidden");
  $("#btnPlay").addClass("vertical_shake");
};

// ----------------------

// Agendar en calendarios

var calendarios = () => {
  formatGoogleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatMicrosoftOfficeCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatOutlookCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatAppleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatYahooCalendarLink(fechaInicioEvento, fechaFinEvento);
};

function formatDateToISO8601(inputDate) {
  const date = new Date(inputDate);
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function formatDateToICS(inputDate, zona) {
  const date = new Date(inputDate);
  zona ? date.setHours(date.getHours() - 3) : null;
  const formattedDate = date
    .toISOString()
    .replace(/[:-]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  return formattedDate;
}

function formatGoogleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarGoogle").attr(
    "href",
    `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${formattedStartDate}%2F${formattedEndDate}&text=${formattedTituloEvento}&text=${formattedTituloEvento}`
  );
}

function formatOutlookCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarOutlook").attr(
    "href",
    `https://outlook.live.com/calendar/0/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatMicrosoftOfficeCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarMicrosoft365").attr(
    "href",
    `https://outlook.office.com/calendar/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatAppleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento).replace(
    /%20/g,
    " "
  );
  $("#LinkCalendarApple").attr(
    "href",
    `data:text/calendar;charset=utf-8,${encodeURIComponent(
      `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:Evento\nDTSTART:${formattedStartDate}\nDTEND:${formattedEndDate}\nSUMMARY:${formattedTituloEvento}\nEND:VEVENT\nEND:VCALENDAR`
    )}`
  );
}

function formatYahooCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate, true);
  const formattedEndDate = formatDateToICS(endDate, true);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarYahoo").attr(
    "href",
    `https://calendar.yahoo.com/?dur=&et=${formattedEndDate}&st=${formattedStartDate}&title=${formattedTituloEvento}&v=60`
  );
}
// ----------------------

// EJECUCIONES AUTOMATICAS

calendarios();

// ----------------------

// EFECTOS VISUALES POR CLASE.

document.addEventListener("DOMContentLoaded", function () {
  var fadeInClass = "fade-in";
  var fadeInDownClass = "fadeInDown";
  var fadeInUpClass = "fadeInUp";
  var fadeInLeft = "fadeInLeft";
  var fadeInRight = "fadeInRight";

  var corazon = document.querySelector(".corazon");
  var ceremonia = document.querySelector(".ceremonia");
  var fiesta = document.querySelector(".fiesta");
  var unaColumna = document.querySelector(".unaColumna");
  var dresscode = document.querySelector(".dresscode");
  var calendario = document.querySelector(".calendario");
  var rsvp = document.querySelector(".rsvp");
  var text_drescode = document.querySelector(".text_drescode");
  var camara = document.querySelector(".camara");
  var title_nosotros = document.querySelector(".title_nosotros");
  var sub_title_nosotros = document.querySelector(".sub_title_nosotros");
  var globo = document.querySelector(".globo");
  var text_gracias = document.querySelector(".text_gracias");



  var div_musica = document.querySelector(".div_musica");
  var div_cbu = document.querySelector(".div_cbu");
  var div_fotos_nosotros = document.querySelector(".div_fotos_nosotros");
  var div_instagram = document.querySelector(".div_instagram");
  var div_rsvp = document.querySelector(".div_rsvp");
  var div_calendario = document.querySelector(".div_calendario");
  var div_frase = document.querySelector(".div_frase");
  var div_nuestraBoda = document.querySelector(".div_nuestraBoda");


  
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }


  function aplicarAnimacionSiEnViewport(elemento, claseAnimacion, estilo) {
    if (isInViewport(elemento) && !elemento.classList.contains(claseAnimacion)) {
      elemento.classList.add(claseAnimacion);
      if (estilo) {
        elemento.style.opacity = "1";
      }
    }
  }

  document.addEventListener("scroll", function () {
    //--- FadeInDown ---

    unaColumna ? aplicarAnimacionSiEnViewport(unaColumna, fadeInDownClass, true) : null;
    fiesta ? aplicarAnimacionSiEnViewport(fiesta, fadeInDownClass, true) : null;
    ceremonia ? aplicarAnimacionSiEnViewport(ceremonia, fadeInDownClass, true) : null;
    div_frase ? aplicarAnimacionSiEnViewport(div_frase, fadeInDownClass, true) : null;
    text_drescode ? aplicarAnimacionSiEnViewport(text_drescode, fadeInDownClass, true) : null;
    div_rsvp ? aplicarAnimacionSiEnViewport(div_rsvp, fadeInDownClass, true) : null;
    div_calendario ? aplicarAnimacionSiEnViewport(div_calendario, fadeInDownClass, true) : null;
    div_instagram ? aplicarAnimacionSiEnViewport(div_instagram, fadeInDownClass, true) : null;
    sub_title_nosotros ? aplicarAnimacionSiEnViewport(sub_title_nosotros, fadeInDownClass, true) : null;
    div_cbu ? aplicarAnimacionSiEnViewport(div_cbu, fadeInDownClass, true) : null;
       
    //--- FadeInUp ---

    //--- FadeInLeft ---
     

    //--- FadeInRight ---

    //--- FadeIn ---
    text_gracias ? aplicarAnimacionSiEnViewport(text_gracias, fadeInClass, true) : null;
   
    div_musica ? aplicarAnimacionSiEnViewport(div_musica, fadeInClass, true) : null;
    globo ? aplicarAnimacionSiEnViewport(globo, fadeInClass, true) : null;
    title_nosotros ? aplicarAnimacionSiEnViewport(title_nosotros, fadeInClass, true) : null;
    div_fotos_nosotros ? aplicarAnimacionSiEnViewport(div_fotos_nosotros, fadeInClass, true) : null;
    camara ? aplicarAnimacionSiEnViewport(camara, fadeInClass, true) : null;
    corazon ? aplicarAnimacionSiEnViewport(corazon, fadeInClass, true) : null;
    div_nuestraBoda ? aplicarAnimacionSiEnViewport(div_nuestraBoda, fadeInClass, true) : null;
    rsvp ? aplicarAnimacionSiEnViewport(rsvp, fadeInClass, true) : null;  
    dresscode ? aplicarAnimacionSiEnViewport(dresscode, fadeInClass, true) : null; 
    calendario ? aplicarAnimacionSiEnViewport(calendario, fadeInClass, true) : null; 
  });
});
