'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "d2c46dc779fadc422c0f98ad40781e87",
"assets/assets/material_design_icons/email-plus.png": "f80efc07e76a80f676da38ac5bf5fccb",
"assets/assets/material_design_icons/search.png": "358ed829525b85b4f43e25a5fb542950",
"assets/assets/material_design_icons/comment-text.png": "fe3e3044ab3328f87be359cc55366c2e",
"assets/assets/material_design_icons/file-find.png": "72e087ff7ff2fd362feb94cc985360a6",
"assets/assets/material_design_icons/reply.png": "385da5988eb724a22722a54c653cddfe",
"assets/assets/material_design_icons/dots-horizontal.png": "c57107e10b00a982249efb04e16795d0",
"assets/assets/material_design_icons/person.png": "6afc8fe6dc7ab2aa505bb37ffb8331b2",
"assets/assets/material_design_icons/image.png": "2748964469a146a4f96583f0b6267d1b",
"assets/assets/material_design_icons/brightness-2.png": "e70a8e7761c8cbf7ed6dd562d7b3e8b8",
"assets/assets/material_design_icons/arrow-top-right-thin.png": "5f3b4cb1e5c4327cf3a79bbf82ff40d9",
"assets/assets/material_design_icons/white-balance-sunny.png": "0698bb8b16f5dd0c481f348118f91f5a",
"assets/assets/badges/apple/badge_apple_it.png": "69cc26dee52116d12f7f410bb7f358bb",
"assets/assets/badges/apple/badge_apple_en.png": "dbb1c519ceb631ea06079dc005c67b44",
"assets/assets/badges/google/badge_google_en.png": "db9b21a1c41f3dcd9731e1e7acfdbb57",
"assets/assets/badges/google/badge_google_it.png": "c701b48ca94ef5c3bbdb11c272c27afc",
"assets/assets/fonts/CustomIcons.ttf": "eb9246d7026e14bb9c85b4fefe8d239f",
"assets/assets/fonts/coolvetica.ttf": "5d474fd2ebc6ef77c9bf3219391bed9c",
"assets/assets/mockups/phone_dark.png": "b61a6232bb97ff1134394b9f94b6547b",
"assets/assets/mockups/phone_light.png": "9c7f1dc45dd29111c8a592b72f4c24e6",
"assets/assets/logo.png": "3b3bec64190c53ce8232bd94b4380a2b",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/FontManifest.json": "98339ff99f762c4af2db65e0421c6baa",
"assets/AssetManifest.json": "33f054a8dff1eb883d81a5e4ef07577b",
"assets/AssetManifest.bin.json": "0bc97512087a18a9f98a8e28ffa2dce3",
"assets/NOTICES": "530ff61d577e6c44d9f2fc428d74e86a",
"apple-app-site-association": "fb93c707e5bcdf11df22dd26e1adae16",
"version.json": "3046d6f2563c25f74992d6373aa94784",
".well-known/assetlinks.json": "fbae8807c83c934468fe5a2cf304a53e",
".well-known/apple-app-site-association": "fb93c707e5bcdf11df22dd26e1adae16",
".well-known/security.txt": "5620532c3c448f3b9bca92602ab2446c",
"manifest.json": "b7aa3de76242ba224ca49c4cbd25b1fd",
"CNAME": "124e4042fbf152059b5805ece63fc59c",
"flutter_bootstrap.js": "f4219ad4f46375f373d06f605c12a616",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"404.html": "fc4b55e012b52eaa050087e765ad8cf9",
"index.html": "86befa3556f5fa9bd562804e1f7ffa4d",
"/": "86befa3556f5fa9bd562804e1f7ffa4d",
"favicon.ico": "ca3f0adf2bf95dd32dabb861f42099af",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"app-ads.txt": "4071b9b5911c98d5b084c01a8864ab9b",
"ads.txt": "a0e4c7594b7ed3fba7ed4bed20d5137c",
"icons/app_logo_header_2048x512.png": "f356b2ca939eec18c014190e6e3c3849",
"icons/Icon-512.png": "2d329d4f925dc264fe987b02baac63eb",
"icons/Icon-192.png": "12996d35c479446612d9c4660d0819ce",
"icons/white_logo_tiny_ps.svg": "aa8fa8a7bcacd3d9b01bbb90f79f3fe1",
"main.dart.js": "175df54ab26676384e4f2902ac949e0f"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
