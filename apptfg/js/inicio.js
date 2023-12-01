function base64UrlEncode(str) {
  const base64 = btoa(str);
  const base64Url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  // Asegura que el resultado tenga 43 caracteres
  return base64Url.slice(0, 43);
}

function generateRandomString() {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

function iniciarSesion() {
  const clientId = "e4f2026a-edb8-4a78-b093-bfd98a214f30";
  const redirectUri = "http://localhost/apptfg/html/enviar.html";
  const scopes = "openid profile Files.ReadWrite.All Files.Read.All";

  // Actualiza el flujo de autorización para obtener directamente un token de acceso
  const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
  window.location.href = url;
}

function irAPagina2() {
  window.location.href = "comprobar.html";
}