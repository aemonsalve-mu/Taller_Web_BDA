// Encerramos el script en una función para mantener sus variables fuera del ámbito global.
(() => {
  // Diccionario en inglés. Cada clave coincide con un data-i18n o un data-i18n-aria del HTML.
  const ingles = {
    skip: "Skip to content", mainNav: "Main navigation", brand: "Challenge 10 · BDA",
    languages: "Language", toggleNav: "Show navigation",
    phases: "Phases", indicators: "Indicators", review: "Review", versions: "Versions",
    uxNav: "ProtoQSAR UX", uxLink: "Final phase · ProtoQSAR UX (Spanish)",
    qrShare: "Share by QR", qrTitle: "Share the website by QR", qrClose: "Close",
    qrLabel: "Public GitHub Pages URL",
    qrHelp: "From a local copy, paste the URL shown in Settings → Pages. A custom site domain also works.",
    qrGenerate: "Generate QR", qrImage: "QR code for the published website", qrDownload: "Download PNG",
    stage4: "4. Bilingual edition", lab: "Web lab (Spanish)",
    heroTitle: "Challenge 10 progress", heroBody: "Check the progress of the classroom application and prepare the team's next review.",
    heroReview: "Prepare review", heroStack: "Explore the technologies",
    bannerSlides: "Banner images", slideOne: "Image 1 of 2", slideTwo: "Image 2 of 2",
    slideWeb: "Web development", slideGraph: "Graph visualization",
    slidePrevious: "Previous image", slideNext: "Next image",
    progress: "Classroom progress", progressText: "Two of the three sample tasks have passed the first review.",
    phaseTitle: "Project phases", phaseBody: "Review the data, interpret the graph and prepare the handover.",
    filterGroup: "Filter phases", all: "All", donePlural: "Reviewed", pendingPlural: "Pending",
    done: "Reviewed", pending: "Pending",
    dataTitle: "Data preparation", dataBody: "Identify the sources and check what each link represents.",
    ids: "Unique identifiers", evidence: "Types of evidence", source: "Source", reviewDate: "Review date",
    graphTitle: "Graph exploration", graphBody: "Interpret nodes and edges in the project sample.",
    stepNode: "Select a node.", stepNeighbors: "Check its neighbors.", stepLimit: "Note one limitation.",
    graphLink: "Open the classroom graph (Spanish)",
    deliveryTitle: "Delivery and communication", deliveryBody: "Prepare the demo and explain where the data comes from.",
    deliverable: "Deliverable", prototype: "Responsive prototype.", proof: "Evidence", proofSizes: "Two screen sizes checked.",
    scope: "Scope note", scopeBody: "This page uses synthetic classroom data.", scopeCheck: "Check the source before interpreting the results.",
    indicatorsTitle: "Sample indicators", caption: "Indicators for the web lab demonstration.",
    metric: "Indicator", value: "Value", reading: "Interpretation",
    reviewedTasks: "Tasks reviewed", twoOfThree: "2 of 3", onePending: "One is waiting for review.",
    graphViews: "Graph views", checkedWidths: "Screen widths checked", pixels: "390, 768 and 1200 pixels",
    howDefined: "How these values were defined", howDefinedBody: "The values describe this demonstration. Record where each indicator came from and when it was checked.",
    interpretation: "What you can interpret",
    interpretationBody: "The indicators describe a classroom example. To assess a change to the website, observe whether users complete a specific task.",
    reviewTitle: "Prepare the review", topic: "Topic", chooseTopic: "Choose a topic",
    mobileCheck: "Include a mobile check", submit: "Prepare selection",
    reviewChecklist: "Show review criteria", reviewWidth: "Check 390 and 1200 px.",
    reviewKeyboard: "Use Tab to reach the controls.", reviewEvidence: "Save evidence and explain what changed.",
    stackTitle: "What each technology contributes",
    stackHtml: "Defines the structure: headings, sections, lists, the table and the form.",
    stackCss: "Styles the banner, crops the image and adapts the layout to the available width.",
    stackBs: "Provides columns, cards, controls and interactive menus.", bsDocs: "Dropdown documentation",
    stackJs: "Changes the language, filters cards and prepares a form summary.",
    footer: "Classroom demo · Business Data Analytics", guide: "Cycle guide (Spanish)"
  };
  // Guardamos los textos y etiquetas originales en español antes de traducirlos.
  const textos = [...document.querySelectorAll('[data-i18n]')];
  const etiquetas = [...document.querySelectorAll('[data-i18n-aria]')];
  const imagenes = [...document.querySelectorAll('[data-i18n-alt]')];
  const originales = new Map(textos.map(nodo => [nodo, nodo.textContent]));
  const ariaOriginales = new Map(etiquetas.map(nodo => [nodo, nodo.getAttribute('aria-label')]));
  const altOriginales = new Map(imagenes.map(nodo => [nodo, nodo.alt]));
  const tituloOriginal = document.title;
  // Referencias a los controles y a sus salidas. querySelectorAll reúne todos los elementos que coinciden con el selector.
  const botonesIdioma = [...document.querySelectorAll('[data-lang]')];
  const botonesFiltro = [...document.querySelectorAll('[data-filter]')];
  const fases = [...document.querySelectorAll('[data-phase]')];
  const resultadoFiltro = document.getElementById('resultado-filtro');
  const formulario = document.getElementById('formulario-revision');
  const apartado = document.getElementById('apartado');
  const movil = document.getElementById('movil');
  const resumen = document.getElementById('resumen-revision');
  const banner = document.getElementById('banner-carrusel');
  const botonReproduccion = document.getElementById('banner-reproduccion');
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Bootstrap ejecuta las transiciones. El script propio decide cuándo empieza la reproducción.
  const carrusel = bootstrap.Carousel.getOrCreateInstance(banner, { pause: false });
  // Estado de la página. El idioma, el filtro y la selección del formulario se guardan por separado.
  let idioma = 'es';
  let filtro = 'all';
  let seleccion = null;
  let reproduccion = !movimientoReducido.matches;

  function actualizarBotonReproduccion() {
    botonReproduccion.textContent = idioma === 'en'
      ? (reproduccion ? 'Pause' : 'Play')
      : (reproduccion ? 'Pausar' : 'Reproducir');
  }

  function cambiarReproduccion(activa) {
    reproduccion = activa;
    if (activa) carrusel.cycle();
    else carrusel.pause();
    actualizarBotonReproduccion();
  }

  // Orden de preferencia. Primero se usa el parámetro lang de la URL y después la preferencia guardada en el navegador.
  function leerIdioma() {
    const parametro = new URLSearchParams(location.search).get('lang');
    if (parametro === 'es' || parametro === 'en') return parametro;
    try {
      return localStorage.getItem('taller-idioma') === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  }

  // Compara el filtro elegido con data-phase. hidden oculta las fases que quedan fuera.
  function aplicarFiltro() {
    let visibles = 0;
    for (const fase of fases) {
      fase.hidden = filtro !== 'all' && fase.dataset.phase !== filtro;
      if (!fase.hidden) visibles += 1;
    }
    for (const boton of botonesFiltro) {
      boton.setAttribute('aria-pressed', String(boton.dataset.filter === filtro));
    }
    // El texto del recuento también se traduce y se publica en la región de estado.
    resultadoFiltro.textContent = idioma === 'en'
      ? visibles + (visibles === 1 ? ' phase shown.' : ' phases shown.')
      : visibles + (visibles === 1 ? ' fase visible.' : ' fases visibles.');
  }

  // Conserva el valor de la opción elegida y recupera su etiqueta en el idioma que se esté mostrando.
  function mostrarResumen() {
    if (seleccion === null) return;
    const opcion = [...apartado.options].find(item => item.value === seleccion.apartado);
    const tema = opcion.textContent;
    resumen.hidden = false;
    resumen.textContent = idioma === 'en'
      ? 'Topic: ' + tema + '. Mobile check: ' + (seleccion.movil ? 'yes' : 'no') + '.'
      : 'Apartado: ' + tema + '. Comprobación en móvil: ' + (seleccion.movil ? 'sí' : 'no') + '.';
  }

  // Actualiza el idioma del documento, el título, el texto visible y las etiquetas accesibles.
  function cambiarIdioma(nuevoIdioma) {
    idioma = nuevoIdioma;
    document.documentElement.lang = idioma;
    document.title = idioma === 'en' ? 'Challenge 10 progress · Bilingual edition' : tituloOriginal;
    for (const nodo of textos) {
      nodo.textContent = idioma === 'en' ? ingles[nodo.dataset.i18n] : originales.get(nodo);
    }
    for (const nodo of etiquetas) {
      const valor = idioma === 'en' ? ingles[nodo.dataset.i18nAria] : ariaOriginales.get(nodo);
      nodo.setAttribute('aria-label', valor);
    }
    for (const nodo of imagenes) {
      nodo.alt = idioma === 'en' ? ingles[nodo.dataset.i18nAlt] : altOriginales.get(nodo);
    }
    for (const boton of botonesIdioma) {
      boton.setAttribute('aria-pressed', String(boton.dataset.lang === idioma));
    }
    // Volver a pintar el recuento y el resumen en el nuevo idioma conserva la selección.
    aplicarFiltro();
    mostrarResumen();
    actualizarBotonReproduccion();
  }

  for (const boton of botonesIdioma) {
    // Al pulsar un idioma se actualiza primero la página; después se guarda la preferencia y se actualiza la URL.
    boton.addEventListener('click', () => {
      cambiarIdioma(boton.dataset.lang);
      try {
        localStorage.setItem('taller-idioma', idioma);
      } catch {
        // Algunos navegadores restringen el almacenamiento de archivos locales.
      }
      try {
        const url = new URL(location.href);
        url.searchParams.set('lang', idioma);
        history.replaceState(null, '', url);
      } catch {
        // La selección ya se aplicó aunque el navegador impida cambiar la URL.
      }
    });
  }
  for (const boton of botonesFiltro) {
    boton.addEventListener('click', () => {
      filtro = boton.dataset.filter;
      aplicarFiltro();
    });
  }
  // El navegador ya ha validado required. preventDefault evita la navegación porque la respuesta se muestra aquí.
  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    seleccion = { apartado: apartado.value, movil: movil.checked };
    mostrarResumen();
  });
  botonReproduccion.addEventListener('click', () => cambiarReproduccion(!reproduccion));
  // Entrar en las flechas con el teclado o accionarlas deja el control en manos del estudiante.
  banner.addEventListener('focusin', evento => {
    if (evento.target.matches('[data-bs-slide]')) cambiarReproduccion(false);
  });
  movimientoReducido.addEventListener('change', evento => {
    if (evento.matches) cambiarReproduccion(false);
  });
  // Inicializa la página al cargarla. El resto de los cambios se activa mediante eventos.
  cambiarIdioma(leerIdioma());
  cambiarReproduccion(reproduccion);
})();
