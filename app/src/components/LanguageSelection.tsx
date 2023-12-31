import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { SyntheticEvent, useContext } from 'react';
import { appContext, contextValues } from '../app'


// ユーザーが使用している言語のコードを取得する
export const estimateUsedLanguageCodes = (): string[] => {
  // ja-JP のような形で入ることも考えてsplitしておく
  const locale = window.navigator.language.split("-")[0]

  // ひとまずいくつかのメジャー言語だけ対応しておく
  const localeToLangCodes: Record<string, string> = {
    en: "eng",
    es: "spa",
    ja: "jpn",
    zh: "chi_tra",
  }

  const esimatedLanguageCode: string | undefined = localeToLangCodes[locale]
  if (esimatedLanguageCode === undefined) {
    return []
  } else {
    return [esimatedLanguageCode]
  }
}


export const LanguageSelection = () => {
  const context: contextValues = useContext(appContext)
  const defaultValue: Language = availableLanguages.find((language: Language) => language.code === context.languageCodes[0])

  const setValues = (_: SyntheticEvent, values: Language[]) => {
    const languageCodes: string[] = values.map((value: Language) => value.code)
    context.setLanguageCodes(languageCodes)
  }

  return (
    <Autocomplete
      multiple
      id="languageSelection"
      options={availableLanguages}
      getOptionLabel={(option: Language) => option.name}
      defaultValue={[defaultValue]}
      renderInput={(params) => <TextField {...params} label="Language(s)" />}
      onChange={setValues}
      size="small"
    />
  );
}


interface Language {
  code: string,
  name: string
}


const availableLanguages: Array<Language> = [
  { code: 'afr', name: 'Afrikaans' },
  { code: 'amh', name: 'Amharic' },
  { code: 'ara', name: 'Arabic' },
  { code: 'asm', name: 'Assamese' },
  { code: 'aze', name: 'Azerbaijani' },
  { code: 'aze_cyrl', name: 'Azerbaijani - Cyrillic' },
  { code: 'bel', name: 'Belarusian' },
  { code: 'ben', name: 'Bengali' },
  { code: 'bod', name: 'Tibetan' },
  { code: 'bos', name: 'Bosnian' },
  { code: 'bul', name: 'Bulgarian' },
  { code: 'cat', name: 'Catalan; Valencian' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'ces', name: 'Czech' },
  { code: 'chi_sim', name: 'Chinese - Simplified' },
  { code: 'chi_sim_vert', name: 'Chinese - Simplified (Vertical)' },
  { code: 'chi_tra', name: 'Chinese - Traditional' },
  { code: 'chi_tra_vert', name: 'Chinese - Traditional (Vertical)' },
  { code: 'chr', name: 'Cherokee' },
  { code: 'cym', name: 'Welsh' },
  { code: 'dan', name: 'Danish' },
  { code: 'deu', name: 'German' },
  { code: 'dzo', name: 'Dzongkha' },
  { code: 'ell', name: 'Greek, Modern (1453-)' },
  { code: 'eng', name: 'English' },
  { code: 'enm', name: 'English, Middle (1100-1500)' },
  { code: 'epo', name: 'Esperanto' },
  { code: 'est', name: 'Estonian' },
  { code: 'eus', name: 'Basque' },
  { code: 'fas', name: 'Persian' },
  { code: 'fin', name: 'Finnish' },
  { code: 'fra', name: 'French' },
  { code: 'frk', name: 'German Fraktur' },
  { code: 'frm', name: 'French, Middle (ca. 1400-1600)' },
  { code: 'gle', name: 'Irish' },
  { code: 'glg', name: 'Galician' },
  { code: 'grc', name: 'Greek, Ancient (-1453)' },
  { code: 'guj', name: 'Gujarati' },
  { code: 'hat', name: 'Haitian; Haitian Creole' },
  { code: 'heb', name: 'Hebrew' },
  { code: 'hin', name: 'Hindi' },
  { code: 'hrv', name: 'Croatian' },
  { code: 'hun', name: 'Hungarian' },
  { code: 'iku', name: 'Inuktitut' },
  { code: 'ind', name: 'Indonesian' },
  { code: 'isl', name: 'Icelandic' },
  { code: 'ita', name: 'Italian' },
  { code: 'ita_old', name: 'Italian - Old' },
  { code: 'jav', name: 'Javanese' },
  { code: 'jpn', name: 'Japanese' },
  { code: 'jpn_vert', name: 'Japanese (Vertical)' },
  { code: 'kan', name: 'Kannada' },
  { code: 'kat', name: 'Georgian' },
  { code: 'kat_old', name: 'Georgian - Old' },
  { code: 'kaz', name: 'Kazakh' },
  { code: 'khm', name: 'Central Khmer' },
  { code: 'kir', name: 'Kirghiz; Kyrgyz' },
  { code: 'kor', name: 'Korean' },
  { code: 'kor_vert', name: 'Korean (Vertical)' },
  { code: 'kur', name: 'Kurdish' },
  { code: 'lao', name: 'Lao' },
  { code: 'lat', name: 'Latin' },
  { code: 'lav', name: 'Latvian' },
  { code: 'lit', name: 'Lithuanian' },
  { code: 'mal', name: 'Malayalam' },
  { code: 'mar', name: 'Marathi' },
  { code: 'mkd', name: 'Macedonian' },
  { code: 'mlt', name: 'Maltese' },
  { code: 'msa', name: 'Malay' },
  { code: 'mya', name: 'Burmese' },
  { code: 'nep', name: 'Nepali' },
  { code: 'nld', name: 'Dutch; Flemish' },
  { code: 'nor', name: 'Norwegian' },
  { code: 'ori', name: 'Oriya' },
  { code: 'pan', name: 'Panjabi; Punjabi' },
  { code: 'pol', name: 'Polish' },
  { code: 'por', name: 'Portuguese' },
  { code: 'pus', name: 'Pushto; Pashto' },
  { code: 'ron', name: 'Romanian; Moldavian; Moldovan' },
  { code: 'rus', name: 'Russian' },
  { code: 'san', name: 'Sanskrit' },
  { code: 'sin', name: 'Sinhala; Sinhalese' },
  { code: 'slk', name: 'Slovak' },
  { code: 'slv', name: 'Slovenian' },
  { code: 'spa', name: 'Spanish; Castilian' },
  { code: 'spa_old', name: 'Spanish; Castilian - Old' },
  { code: 'sqi', name: 'Albanian' },
  { code: 'srp', name: 'Serbian' },
  { code: 'srp_latn', name: 'Serbian - Latin' },
  { code: 'swa', name: 'Swahili' },
  { code: 'swe', name: 'Swedish' },
  { code: 'syr', name: 'Syriac' },
  { code: 'tam', name: 'Tamil' },
  { code: 'tel', name: 'Telugu' },
  { code: 'tgk', name: 'Tajik' },
  { code: 'tgl', name: 'Tagalog' },
  { code: 'tha', name: 'Thai' },
  { code: 'tir', name: 'Tigrinya' },
  { code: 'tur', name: 'Turkish' },
  { code: 'uig', name: 'Uighur; Uyghur' },
  { code: 'ukr', name: 'Ukrainian' },
  { code: 'urd', name: 'Urdu' },
  { code: 'uzb', name: 'Uzbek' },
  { code: 'uzb_cyrl', name: 'Uzbek - Cyrillic' },
  { code: 'vie', name: 'Vietnamese' },
  { code: 'yid', name: 'Yiddish' }
]
