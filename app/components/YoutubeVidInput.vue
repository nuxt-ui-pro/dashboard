<template>
  <input title="YouTubeの動画URL。URLをペーストすれば再生する動画を切り替えることができます"
         type="text" v-model="videoId" @focus="onFocus" @blur="onBlur" style="width: 3em;">
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";

const videoId = defineModel<string>();

/**
 * YouTube URLから動画IDを抽出する
 * @param url string
 * @returns string | null
 */
const extractVideoId = (url: string): string | null => {
  try {
    // URL形式の場合、URLオブジェクトを作成し、動画IDを取得
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  } catch (e) {
    // URLオブジェクトが作成できない場合（ビデオIDが直接渡された場合）、そのまま返す
    return url;
  }
}

/**
 * フォーカス時の処理
 * @param event FocusEvent
 */
const onFocus = (event: FocusEvent): void => {
  const target = event.target as HTMLInputElement;
  target.value = `https://www.youtube.com/watch?v=${target.value}`;
  target.select();
  target.style.width = '32em';
}
/**
 * ブラー時の処理
 * @param event FocusEvent
 */
const onBlur = (event: FocusEvent): void => {
  const target = event.target as HTMLInputElement;
  target.style.width = '4em';
}

// videoIdの変更を監視し、URLの場合はIDを抽出して更新
watch(videoId, (newValue: string) => {
  const extractedId = extractVideoId(newValue);
  if (extractedId) {
    videoId.value = extractedId;
  }
});

</script>
