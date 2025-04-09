export function loadScriptCss(js, css = null, base = null, id = null) {
  return new Promise((resolve, reject) => {
    // baseが渡されなかった場合のデフォルト設定
    base = base || (import.meta.env.DEV ? '/' : import.meta.env.VITE_DOCUMENT_ROOT);

    // jQuery UI のスクリプト要素を作成
    const script = document.createElement('script');
    script.src = `${base}${js}`;

    // スクリプトの読み込み完了イベント
    script.onload = () => {

      if (css !== null) {
        // スタイルシート要素の追加
        const link = document.createElement('link');
        if (id !== null) link.id = id;
        link.rel = 'stylesheet';
        link.href = `${base}${css}`;

        // スタイルシートの読み込み完了イベント
        link.onload = () => {
          resolve(); // スクリプトとスタイルシートの両方が読み込まれたらPromiseを解決
        };

        // スタイルシートの読み込みエラーイベント
        link.onerror = () => {
          reject(new Error(`Failed to load ${css} stylesheet`));
        };

        // スタイルシートをheadに追加
        document.head.appendChild(link);
      } else {
        resolve();
      }
    };

    // スクリプトの読み込みエラーイベント
    script.onerror = () => {
      // console.error('Failed to load jQuery UI script');
      reject(new Error(`Failed to load ${js} script`));
    };

    // スクリプトをheadに追加
    document.head.appendChild(script);
  });
}

// jQuery UI を動的にインポート（CDN から読み込む場合）
export function loadScriptJQueryUI(base) {
  if (typeof jQuery === 'undefined') {
    // Load jQuery if it's not already loaded
    // node_modules/jquery/dist/jquery.min.js
    loadScriptCss('jquery/dist/jquery.min.js')
      .then(() => {
        console.log('jQuery version', jQuery.fn.jquery);
      })
      .catch((error) => {
        console.error('Failed to load jQuery:', error);
      });
  }

  return loadScriptCss(
    'jquery-ui/jquery-ui.min.js',
    'jquery-ui/themes/dark-hive/jquery-ui.min.css',
    base,
    'jqui-stylesheet'
  );
}

export async function loadScriptJQueryUIAll(base) {

  // jQuery を読み込む
  try {
    await loadScriptCss('jquery/dist/jquery.min.js');
    // jQuery UI を読み込む
    return loadScriptCss(
      'jquery-ui/jquery-ui.min.js',
      'jquery-ui/themes/dark-hive/jquery-ui.min.css',
      base,
      'jqui-stylesheet'
    );
  } catch (error) {
    console.error('Failed to load jQuery:', error);
  }
}

export function loadScriptJQueryUIDatepickerJa(base) {
  return loadScriptCss(
    'jquery-ui/ui/i18n/datepicker-ja-ex.js',
    null,
    base);
}

export async function loadScriptDataTables(base) {
  if ($.fn.dataTables === undefined) {
    await loadScriptCss(
      'mark.js/dist/jquery.mark.min.js',
      null,
      base);

    await loadScriptCss(
      'datatables/datatables.min.js',
      'datatables/datatables.min.css',
      base);

    await loadScriptCss(
      'datatables/vendor/datatables.mark.js/dist/datatables.mark.min.js',
      'datatables/vendor/datatables.mark.js/dist/datatables.mark.min.css',
      base);
  }
}

// Sparkline ライブラリを動的にインポート（CDN から読み込む場合）
export function loadScriptSparkline(base) {
  // $.fn.sparkline
  return loadScriptCss(
    'jquery-sparkline/dist/jquery.sparkline.min.js',
    null,
    base);
}

// jquery-jvectormap ライブラリを動的にインポート（CDN から読み込む場合）
export function loadScriptVectormap(base) {
  return loadScriptCss(
    'jquery-jvectormap/jquery-jvectormap-2.0.5.js',
    'jquery-jvectormap/jquery-jvectormap-2.0.5.css',
    base);
}

export function loadScriptVirtualKeyboard(base) {
  return loadScriptCss(
    'virtual-keyboard/dist/js/jquery.keyboard.min.js',
    'virtual-keyboard/dist/css/keyboard.min.css',
    base);
}

export async function loadScriptFiler(base) {
  if ($.fn.filer === undefined) {
    await loadScriptCss(
      'jQuery.filer/js/jquery.filer.js',
      'jQuery.filer/css/jquery.filer.css',
      base);
  }

  if ($.fn.lazyload === undefined) {
    await loadScriptCss(
      'lazyload/lazyload.min.js',
      'jQuery.filer/css/themes/jquery.filer-dragdropbox-theme.css',

      base);
  }

  if ($.fn.dialogExtend === undefined) {
    await loadScriptCss(
      'jquery-dialogextend/build/jquery.dialogextend.min.js',
      null,
      base);
  }

  const isFsFilerDlg = window.FsFilerDlg && typeof window.FsFilerDlg === 'function';
  if (!isFsFilerDlg) {
    await loadScriptCss(
      'fsFilerDlg.js',
      null,
      base);
  }

  if ($.fn.fs_filer === undefined) {
    await loadScriptCss(
      'ch_common.js',
      'ch_common.css',
      base);
  }
}

/**
 * Updates the HTML element's class based on the user's preferred color scheme.
 *
 * This function adds the 'dark' class to the HTML element if the user's
 * system is set to a dark color scheme, and removes it otherwise.
 * It also listens for changes in the color scheme preference and updates
 * the class in real-time when the preference changes.
 */
export function updateDarkModeClass() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const htmlElement = document.documentElement;

  if (prefersDarkScheme.matches) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  // カラーモードが変更されたときにリアルタイムでクラスを更新
  prefersDarkScheme.addEventListener('change', (e) => {
    if (e.matches) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  });
}
