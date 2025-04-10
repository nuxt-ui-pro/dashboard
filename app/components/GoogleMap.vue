<template>
  <div ref="mapContainer" style="width: 100%; height: 100%;"></div>
</template>

<script>
const {VITE_GMAP_API_KEY} = import.meta.env;
(g => {
  var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams,
    u = () => h || (h = new Promise(async (f, n) => {
      await (a = m.createElement("script"));
      e.set("libraries", [...r] + "");
      for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
      e.set("callback", c + ".maps." + q);
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      d[q] = f;
      a.onerror = () => h = n(Error(p + " could not load."));
      a.nonce = m.querySelector("script[nonce]")?.nonce || "";
      m.head.append(a)
    }));
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
})({
  key: VITE_GMAP_API_KEY,
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});
</script>

<script setup>
import _ from 'lodash';

const PREF_CODE = {
  "北海道": "01",
  "青森県": "02",
  "岩手県": "03",
  "宮城県": "04",
  "秋田県": "05",
  "山形県": "06",
  "福島県": "07",
  "茨城県": "08",
  "栃木県": "09",
  "群馬県": "10",
  "埼玉県": "11",
  "千葉県": "12",
  "東京都": "13",
  "神奈川県": "14",
  "新潟県": "15",
  "富山県": "16",
  "石川県": "17",
  "福井県": "18",
  "山梨県": "19",
  "長野県": "20",
  "岐阜県": "21",
  "静岡県": "22",
  "愛知県": "23",
  "三重県": "24",
  "滋賀県": "25",
  "京都府": "26",
  "大阪府": "27",
  "兵庫県": "28",
  "奈良県": "29",
  "和歌山県": "30",
  "鳥取県": "31",
  "島根県": "32",
  "岡山県": "33",
  "広島県": "34",
  "山口県": "35",
  "徳島県": "36",
  "香川県": "37",
  "愛媛県": "38",
  "高知県": "39",
  "福岡県": "40",
  "佐賀県": "41",
  "長崎県": "42",
  "熊本県": "43",
  "大分県": "44",
  "宮崎県": "45",
  "鹿児島県": "46",
  "沖縄県": "47"
};
const CITY_CODE = {
  "東京都": {
    "千代田区": "13101",
    "中央区": "13102",
    "港区": "13103",
    "新宿区": "13104",
    "文京区": "13105",
    "台東区": "13106",
    "墨田区": "13107",
    "江東区": "13108",
    "品川区": "13109",
    "目黒区": "13110",
    "大田区": "13111",
    "世田谷区": "13112",
    "渋谷区": "13113",
    "中野区": "13114",
    "杉並区": "13115",
    "豊島区": "13116",
    "北区": "13117",
    "荒川区": "13118",
    "板橋区": "13119",
    "練馬区": "13120",
    "足立区": "13121",
    "葛飾区": "13122",
    "江戸川区": "13123",
    "八王子市": "13201",
    "立川市": "13202",
    "武蔵野市": "13203",
    "三鷹市": "13204",
    "青梅市": "13205",
    "府中市": "13206",
    "昭島市": "13207",
    "調布市": "13208",
    "町田市": "13209",
    "小金井市": "13210",
    "小平市": "13211",
    "日野市": "13212",
    "東村山市": "13213",
    "国分寺市": "13214",
    "国立市": "13215",
    "福生市": "13218",
    "狛江市": "13219",
    "東大和市": "13220",
    "清瀬市": "13221",
    "東久留米市": "13222",
    "武蔵村山市": "13223",
    "多摩市": "13224",
    "稲城市": "13225",
    "羽村市": "13227",
    "あきる野市": "13228",
    "西東京市": "13229",
    "瑞穂町": "13303", // 西多摩郡
    "日の出町": "13305", // 西多摩郡
    "檜原村": "13307", // 西多摩郡
    "奥多摩町": "13308", // 西多摩郡
    "利島村": "13362", // 大島支庁
    "神津島村": "13364", // 大島支庁
    "三宅村": "13381", // 三宅支庁
    "御蔵島村": "13382", // 三宅支庁
    "八丈町": "13401", // 八丈支庁
    "青ヶ島村": "13402", // 八丈支庁
    "大島町": "13361", // 大島支庁
    "新島村": "13363", // 大島支庁
    "小笠原村": "13421" // 小笠原支庁
  },
  "石川県": {
    "金沢市": "17201",
    "七尾市": "17202",
    "小松市": "17203",
    "輪島市": "17204",
    "珠洲市": "17205",
    "加賀市": "17206",
    "羽咋市": "17207",
    "かほく市": "17209",
    "白山市": "17210",
    "能美市": "17211",
    "野々市市": "17212",
    "川北町": "17324",
    "津幡町": "17361",
    "内灘町": "17365",
    "志賀町": "17384",
    "宝達志水町": "17386",
    "中能登町": "17407",
    "穴水町": "17461",
    "能登町": "17463",
  }
  // TODO:他県データ追加
  // "千葉県": {
  //     "千葉市中央区": "1201",
  //     "千葉市千葉区": "1202",
  // },
  // "福岡県": {
  //     "福岡市博多区": "4001",
  //     "福岡市博中央区": "4002",
  // }
}
const LatLng = {
  // '東京都': {lat: 35.681236, lng: 139.767125},
  // '東京都': {lat: 35.681236, lng: 139.467125},
  '東京都': {lat: 35.681332132492614, lng: 139.76729977545736}, // 東京駅
  // '石川県': {lat: 35.681236, lng: 139.767125},
  '石川県': {lat: 37.39135688595961, lng: 136.90110071181238}, // 石川県輪島市
}

const props = defineProps({
  zoom: {
    type: Number,
    default: 9
  },
  /**
   * 中央のロケーション
   * Stringの時はロケーションは検索して取得
   */
  center: {
    type: [Object, String],
    default: () => ({lat: 35.681332132492614, lng: 139.76729977545736}) // LatLng['東京都']
  },
  layerPrefectures: {
    type: Object,
    default: () => ({})
  },
  focusPrefectures: {
    type: Object,
    default: () => ({})
  },
  // Layerの背景色の閾値(alpha1.0)
  colorThreshold: {
    type: Number,
    default: 100,
  },
  /**
   * centerにマーカーを表示するか?
   * 0: なし
   * 1: マーカーあり(type:1
   * N: マーカーあり(type:N)
   */
  panToMarkerType: {
    type: Number,
    default: 0,
  },
  markerInfo: {
    type: String,
    default: '',
  },
  streetViewContainerId: {
    type: String,
    default: '',
  },
  // geoJsonUrl: {
  //   type: String,
  //   default: ''
  // }
});

/**
 * GoogleMap Component
 *
 * @see [GoogleMapAPI - Data](https://developers.google.com/maps/documentation/javascript/reference/data?hl=ja#Data.Feature)
 * TODO: Fork and customize [vue3-google-map](https://github.com/inocan-group/vue3-google-map)
 *
 */

import {ref, reactive, computed, watch, onMounted, defineComponent} from 'vue';

const mapContainer = ref(null);
// const streetViewContainer = ref(null);
const map = ref(null);
const panorama = ref(null);
const isLoadGeoJson = ref(0);
const isInitMap = ref(false);
let streetViewService = null;

const initMap = async () => {
  try {
    const {Map} = await google.maps.importLibrary("maps");
    const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker");
    // const {PlacesService} = await google.maps.importLibrary("places"); //  place_search


    map.value = new Map(mapContainer.value, {
      zoom: props.zoom,
      center: LatLng['東京都'],
      mapId: "DEMO_MAP_ID"
    });

    streetViewService = new google.maps.StreetViewService();

    recreateStreetViewPanorama(LatLng['東京都']);

    // if (props.geoJsonUrl) {
    //   const { Data } = await google.maps.importLibrary("maps");
    //   const geoJsonLayer = new Data();
    //   await geoJsonLayer.loadGeoJson(props.geoJsonUrl);
    //   geoJsonLayer.setMap(map.value);
    // }

    loadPrefectureBoundaries();
    panToAddress(props.center);
  } catch (error) {
    console.error("Error initializing Google Map:", error);
  }
  isInitMap.value = true;
};

/**
 * パノラマの再構築
 * @param location
 */
const recreateStreetViewPanorama = (location) => {
  const container = document.getElementById(props.streetViewContainerId);
  if (!container) return;
  // 古いパノラマを破棄
  if (panorama.value) {
    panorama.value.setVisible(false);
    map.value.setStreetView(null);
  }
  // 新しいパノラマを作成
  setTimeout(() => {
    panorama.value = new google.maps.StreetViewPanorama(container, {
      position: location,
      pov: {
        heading: 165,
        pitch: 0
      },
      zoom: 1
    });
  }, 20);
  // 新しいパノラマをマップに接続
  map.value.setStreetView(panorama.value);
};
const loadPrefectureBoundaries = () => {
  if (map.value === null) return;
  let vals = {};
  for (const p in props.layerPrefectures) {
    const prefCode = PREF_CODE[p];
    if (!prefCode) continue;

    for (let city in props.layerPrefectures[p]) {
      let cityCode = CITY_CODE[p][city];
      const val = props.layerPrefectures[p][city];
      if (!cityCode) {
        city = extractCityOrTown(city);
        cityCode = CITY_CODE[p][city];
        if (!cityCode) continue;
      }
      if (vals[cityCode] === undefined) {
        vals[cityCode] = val;
        if (!isLoadGeoJson.value) {
          let url = 'https://raw.githubusercontent.com/niiyz/JapanCityGeoJson/master/geojson/'
            + prefCode + '/'
            + cityCode + '.json';
          map.value.data.loadGeoJson(url);
        }
      } else {
        vals[cityCode] += val;
      }
    }
  }

  let focuses = {};
  for (const p in props.focusPrefectures) {
    const prefCode = PREF_CODE[p];
    if (!prefCode) continue;

    for (let city in props.focusPrefectures[p]) {
      let cityCode = CITY_CODE[p][city];
      const val = props.focusPrefectures[p][city];
      if (!cityCode) {
        city = extractCityOrTown(city);
        cityCode = CITY_CODE[p][city];
        if (!cityCode) continue;
      }
      focuses[cityCode] = val;
    }
  }

  if (!_.isEmpty(props.layerPrefectures)) {
    isLoadGeoJson.value = 1;
  }

  map.value.data.setStyle((feature) => {
    const cityCode = feature.getProperty('N03_007');
    const val = vals[cityCode];
    let alfa = val / props.colorThreshold;
    if (alfa > 1.0) alfa = 1.0;
    const focus = focuses[cityCode] ?? 0;

    return {
      fillColor: `rgba(255, 0, 0, ${alfa})`,
      strokeColor: focus ? 'rgba(0, 0, 255, 1.0)' : '#ff0000',
      strokeWeight: focus ? 2 : 1
    };
  });
};

const markers = [];

/**
 * locationのradius周囲を検索して最も近い位置にストリートビューを設定
 * @param location
 */
const panoramaSetPosition = (location) => {
  if (panorama === null) return;

  streetViewService.getPanorama({location: location, radius: 1000}, (data, status) => {
    if (status === google.maps.StreetViewStatus.OK) {
      recreateStreetViewPanorama(data.location.latLng);
    } else {
      streetViewService.getPanorama({location: location, radius: 5000}, (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          recreateStreetViewPanorama(data.location.latLng);
        } else {
          console.log('Street View data is not available for this radius: 5000 location:', location);
        }
      });
    }
  });
};

const panToAddress = (address) => {
  const addressType = typeof address;
  switch (addressType) {
    case 'string': {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address, 'region': 'jp'}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          map.value.panTo(results[0].geometry.location);
          panoramaSetPosition(results[0].geometry.location);
          if (props.panToMarkerType !== 0) {
            // 作成済みのマーカーであれば追加しない
            if (markers.includes(address)) return;

            // 緯度経度を取得し、マーカーを設定
            // TODO: to AdvancedMarkerElement use
            // @see [AdvancedMarkerElement](https://developers.google.com/maps/documentation/javascript/advanced-markers/migration?hl=ja)
            // const marker = new google.maps.marker.AdvancedMarkerElement({
            const marker = new google.maps.Marker({
              map: map.value,
              position: results[0].geometry.location,
              // content: new google.maps.marker.PinElement({
              //   background: '#FF0000', // 背景色を指定
              //   glyphColor: '#FFFFFF', // テキストの色を指定
              //   scale: 1.2, // スケールを指定
              //   glyph: 'A', // アイコンの文字やグリフ
              // }),
              label: address,
              title: address,
            });
            if (marker) {
              markers.push(address);
            }

            // マーカーをクリックしたときにのポップアップウインドウの表示
            if (props.markerInfo !== '') {
              const infoWindow = new google.maps.InfoWindow({
                content: `<div>${props.markerInfo}</div>`,
              });
              marker.addListener('click', () => {
                infoWindow.open(map.value, marker);
              });
            }
          }
        } else {
          // TODO: place_search
          // const service = new google.maps.places.PlacesService(map.value);
          // service.textSearch({ query: address }, (results, status) => {
          //   if (status === google.maps.places.PlacesServiceStatus.OK) {
          //     map.value.panTo(results[0].geometry.location);
          //     console.log(address);
          //     console.log(results);
          //   }
          // });
        }
      });
      break;
    }
    case 'object':
      map.value.panTo(address);
      panoramaSetPosition(address);
      break;
  }
};

const extractCityOrTown = (address) => {
  const cityMatch = address.match(/(.+市)/);
  if (cityMatch) return cityMatch[1];

  const townMatch = address.match(/(.+町)/);
  if (townMatch) return townMatch[1];

  return address;
};

watch(() => props.layerPrefectures, loadPrefectureBoundaries);
watch(() => props.focusPrefectures, loadPrefectureBoundaries);
watch(() => props.center, (newVal) => {
  if (!isInitMap.value) return;
  panToAddress(newVal);
});
watch(() => props.colorThreshold, loadPrefectureBoundaries);

onMounted(() => {
  initMap();
});

</script>

