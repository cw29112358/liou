/*
 *
 * LanguageProvider actions
 *
 */

import {
  CHANGE_LOCALE,
} from './constants';

export function changeLocaleAction(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
