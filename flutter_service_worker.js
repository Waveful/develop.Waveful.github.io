'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "main.dart.js": "87422a1a160e3ca93dcdd245ef75ba9e",
"index.html": "0597d1f455954f35530d5d52b54904fc",
"/": "40c9fa3cd64e7da948d7f2cf2566e68f",
"apple-app-site-association": "a01099a588110240d493fb03af7ed305",
"CNAME": "124e4042fbf152059b5805ece63fc59c",
"privacy/index.html": "e57d5b0e801a6dbc6c735ff25b18cdc6",
"404.html": "54aa628d0128519c491d97fa93e4c133",
"assets/AssetManifest.json": "8f65afb1a5fffb677a50609439ddbb75",
"assets/packages/simple_icons/fonts/SimpleIcons.ttf": "73153e302197f4408a31c3bdc45467d0",
"assets/FontManifest.json": "7b002391057558a0186359f4832cda7d",
"assets/assets/fonts/coolvetica.ttf": "5d474fd2ebc6ef77c9bf3219391bed9c",
"assets/assets/fonts/CustomIcons.ttf": "4ebf440dfc5a45f4a54a6c0ac2ded980",
"assets/assets/small_icon.png": "516aaa6a4154c236dc3244e753513255",
"assets/assets/badges/apple/badge_apple_it.png": "69cc26dee52116d12f7f410bb7f358bb",
"assets/assets/badges/apple/badge_apple_en.png": "dbb1c519ceb631ea06079dc005c67b44",
"assets/assets/badges/google/badge_google_en.png": "db9b21a1c41f3dcd9731e1e7acfdbb57",
"assets/assets/badges/google/badge_google_it.png": "c701b48ca94ef5c3bbdb11c272c27afc",
"assets/assets/material_design_icons/instagram.png": "221367f2a883869575626982c9fa1844",
"assets/assets/material_design_icons/email.png": "eb7010d1610bf2cb739c4ddbdb731a02",
"assets/assets/material_design_icons/brightness-2.png": "e70a8e7761c8cbf7ed6dd562d7b3e8b8",
"assets/assets/material_design_icons/search.png": "358ed829525b85b4f43e25a5fb542950",
"assets/assets/material_design_icons/person.png": "6afc8fe6dc7ab2aa505bb37ffb8331b2",
"assets/assets/material_design_icons/white-balance-sunny.png": "0698bb8b16f5dd0c481f348118f91f5a",
"assets/assets/material_design_icons/reddit.png": "da6346d358d9d8db3ff3bf3a78c39685",
"assets/assets/material_design_icons/comment-text.png": "fe3e3044ab3328f87be359cc55366c2e",
"assets/assets/material_design_icons/facebook.png": "873fb91c0ed15e87ff2aeeae5a28c324",
"assets/assets/material_design_icons/image.png": "2748964469a146a4f96583f0b6267d1b",
"assets/assets/material_design_icons/email-plus.png": "f80efc07e76a80f676da38ac5bf5fccb",
"assets/assets/material_design_icons/category.png": "d9944c76a4a7caba3a739e60a72450ef",
"assets/assets/material_design_icons/reply.png": "385da5988eb724a22722a54c653cddfe",
"assets/assets/material_design_icons/twitter.png": "4b2e68bee4412a34d42ccca9bfee207c",
"assets/assets/logo.png": "ae6f16e6af41b636a4ff09db2037c440",
"assets/assets/mockups/phone_dark.png": "2bdaebb90234f2f8f42d6a4ebc09057a",
"assets/assets/mockups/phone_light.png": "0adb5866bb8dd8b2ba66f042f3a80e12",
"assets/NOTICES": "b5a17e3a047acb6fba013d1de395ec43",
".well-known/apple-app-site-association": "a01099a588110240d493fb03af7ed305",
".well-known/assetlinks.json": "fbae8807c83c934468fe5a2cf304a53e",
".well-known/security.txt": "219aaa7b79fb8bf98c5d5ad5345e3210",
"icons/Icon-192.png": "f9943b33208092666af48c9a4b9dc6c9",
"icons/Icon-512.png": "b60bc846c8353d869dd35d48e276f0f0",
"icons/app_logo_header_1024.png": "018b84060db43be6a3f98e2172b312a7",
"manifest.json": "e2f2cd7bda2daaff91b5eb2c0e93b2ef",
"termsofuse/index.html": "40c9fa3cd64e7da948d7f2cf2566e68f",
"version.json": "1fb178616608bf2fa0b1735a950e31a8",
"app-ads.txt": "4071b9b5911c98d5b084c01a8864ab9b",
"favicon.ico": "57267dcd85a3ce2f29b9c3c9a03ed4d0",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
