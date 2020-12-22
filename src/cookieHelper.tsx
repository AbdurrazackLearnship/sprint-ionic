import Cookies from 'universal-cookie';

const universalCookies = new Cookies();

const languages: any = {
  'en': 'English',
  'de-de': 'Deutsch anzeigen',  
  'es-mx': 'Español (Latinoamérica)',
  'pt-br': 'Português',
  'fr-fr': 'Français',
  'it-it': 'Italiano',
  'ja-jp': '日本語で見る',  
  'zh-cn': '观看网站',
  'zh-tw': '觀看網站',
  'cz-cz': 'češtině',
  'pl-pl': 'Polskim',
  'es-es': 'Español (España)',
  'ko-ko': '웹사이트 보기',
  'ru-ru': 'русском языке',
  'tr-tr': 'Türkçe görüntüleyin',
};

const otherLangs: any = {
  'en': 'Other Languages',
  'de-de': 'Weitere Sprachen',
  'es-es': 'Otros idiomas',
  'es-mx': 'Otros idiomas',
  'pt-br': 'Outros idiomas',
  'fr-fr': 'Autres langues',
  'it-it': 'Altre lingue',
  'ja-jp': '他の言語',
  'ko-ko': '기타 언어',
  'ru-ru': 'Другие языки',
  'tr-tr': 'Diğer Diller',
  'zh-cn': '其它语言',
  'zh-tw': '其他語言',
  'cz-cz': 'Další jazyky',
  'pl-pl': 'Inne języki',
};

export const setCookies = (cookieName: string, resultJWT: any) => {  
  // let cookieDomains = JSON.parse(process.env.REACT_APP_COOKIE_DOMAINS||"[]") || [];
  // for(let i=0; i < cookieDomains.length; i++){
    let now = new Date();
    now.setTime(now.getTime() + 4 * 3600 * 1000);     
    universalCookies.set(`${cookieName}`, resultJWT, {
      // expires: now,
      path: '/',
      sameSite: !!window.location.href.match(/local/g)?false:'lax',      
      secure: !!!window.location.href.match(/local/g),      
      domain: window.location.host.slice(window.location.host.indexOf("."))
    });
  // }
};

export const getCookieValue = (key: string) => {    
  const value = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
  return value ? value.pop() : '';
};

export const getLangFromCode = (langCode: string) => {
  return languages[langCode.toLowerCase()];
};

export const getOtherLangFromCode = (langCode: string) => {
  return otherLangs[langCode.toLowerCase()];
};

export const removeCookie = () => {
  let cookieDomains = JSON.parse(process.env.REACT_APP_COOKIE_DOMAINS||"[]") || [];
  const cookies = universalCookies.getAll({ doNotParse: true });
  for (let [key] of Object.entries(cookies)) {
    if (key !== 'ulang' && key !== 'language' && key !== process.env.REACT_APP_COOKIE_POLICY) {
      for(let i=0; i < cookieDomains.length; i++) {
        universalCookies.remove(key, {
          path: '/',
          domain: cookieDomains[i],
        });
      }
    }
  }
};
