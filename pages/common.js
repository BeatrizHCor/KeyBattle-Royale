export const addColor = (i, param, text) => {
  text.children[i].style = ` text-shadow: 1px 4px 9px  ${gerenateRGB(param)}; `;
};

export const resetColors = (text) => {
  for (child of text.children) {
    child.style = "";
  }
  selectedText = "";
};

export const gerenateRGB = (param) => {
  let min = param == "light" ? 170 : param == "dark" ? 0 : 100;
  let factor = param == "light" ? 86 : param == "dark" ? 40 : 156;
  let r = Math.floor(Math.random() * factor) + min;
  let g = Math.floor(Math.random() * factor) + min;
  let b = Math.floor(Math.random() * factor) + min;
  return `rgb(${r}, ${g}, ${b})`;
};
