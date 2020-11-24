/* global translate */

export function getTranslateText(label, isTranslate) {
  return isTranslate ? translate(label) : label;
}

export function getSelectedData(options, isTranslate, findValue, findKey = 'label') {
  // label  isTranslate ? 翻译item.label : item.label
  // value 直接比较item.value
  let selectedIndex = options.findIndex((item) => {
    const mapValue = findKey === 'label' ? getTranslateText(item.label, isTranslate) : item.value;

    return mapValue === findValue;
  });

  // 默认选中第0个
  selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
  return {
    selectedIndex,
    selectedOption: options[selectedIndex],
  };
}
