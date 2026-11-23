(() => {
  const modal = document.getElementById('modal-qr');
  const formulario = document.getElementById('formulario-qr');
  const campo = document.getElementById('url-qr');
  const estado = document.getElementById('estado-qr');
  const resultado = document.getElementById('resultado-qr');
  const imagen = document.getElementById('imagen-qr');
  const destino = document.getElementById('destino-qr');
  const descarga = document.getElementById('descarga-qr');

  const mensajes = {
    es: {
      invalid: 'Introduce una URL HTTPS de GitHub Pages o del dominio público del sitio.',
      repository: 'Pega la URL publicada que aparece en Settings → Pages.',
      ready: 'Escanea el código con la cámara del móvil o descarga el PNG.',
      error: 'No se pudo generar el QR. Comprueba la URL e inténtalo de nuevo.'
    },
    en: {
      invalid: 'Enter an HTTPS URL for GitHub Pages or the public website domain.',
      repository: 'Paste the published URL shown in Settings → Pages.',
      ready: 'Scan the code with your phone camera or download the PNG.',
      error: 'The QR code could not be generated. Check the URL and try again.'
    }
  };

  function avisar(clave) {
    estado.textContent = mensajes[document.documentElement.lang === 'en' ? 'en' : 'es'][clave];
  }

  function generarQR() {
    resultado.hidden = true;
    campo.removeAttribute('aria-invalid');
    let url;
    try {
      url = new URL(campo.value.trim());
    } catch {
      campo.setAttribute('aria-invalid', 'true');
      avisar('invalid');
      return;
    }

    const host = url.hostname.replace(/\.$/, '');
    if (host === 'github.com' || host.endsWith('.github.com')) {
      campo.setAttribute('aria-invalid', 'true');
      avisar('repository');
      return;
    }
    if (url.protocol !== 'https:' || url.username || url.password ||
        !host.includes('.') || /(?:^|\.)(?:localhost|local|test|invalid)$/.test(host) ||
        /^\d+(?:\.\d+){3}$/.test(host)) {
      campo.setAttribute('aria-invalid', 'true');
      avisar('invalid');
      return;
    }

    try {
      // QRCodeJS dibuja la matriz en un lienzo temporal. El segundo lienzo añade el margen blanco para escanear.
      const base = document.createElement('div');
      new QRCode(base, { text: url.href, width: 336, height: 336, correctLevel: QRCode.CorrectLevel.M });
      const matriz = base.querySelector('canvas');
      const lienzo = document.createElement('canvas');
      const margen = 68;
      lienzo.width = matriz.width + 2 * margen;
      lienzo.height = matriz.height + 2 * margen;
      const dibujo = lienzo.getContext('2d');
      dibujo.fillStyle = '#fff';
      dibujo.fillRect(0, 0, lienzo.width, lienzo.height);
      dibujo.drawImage(matriz, margen, margen);
      const png = lienzo.toDataURL('image/png');

      imagen.src = png;
      descarga.href = png;
      destino.href = url.href;
      destino.textContent = url.href;
      resultado.hidden = false;
      avisar('ready');
    } catch {
      avisar('error');
    }
  }

  modal.addEventListener('show.bs.modal', () => {
    // La ruta al índice conserva el nombre del proyecto en GitHub Pages, incluso desde una subpágina.
    if (!campo.value && location.protocol === 'https:' && location.hostname.endsWith('.github.io')) {
      campo.value = new URL(formulario.dataset.qrIndex, location.href).href;
    }
    if (campo.value) generarQR();
  });
  campo.addEventListener('input', () => {
    resultado.hidden = true;
    campo.removeAttribute('aria-invalid');
    estado.textContent = '';
  });
  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    generarQR();
  });
})();
