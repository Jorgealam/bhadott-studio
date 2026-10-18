// O portal institucional não usa mais service worker. Ele existia apenas para
// o aplicativo da antiga Área Católica, que agora é um site independente.
// Este arquivo substitui o worker antigo nos navegadores que já o instalaram:
// limpa os caches criados por ele e remove o próprio registro.
self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter((key) => key.startsWith("bhadott-studio-")).map((key) => caches.delete(key)))
    await self.registration.unregister()
  })())
})
