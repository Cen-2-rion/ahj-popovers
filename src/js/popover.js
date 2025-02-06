export default class Popover {
  constructor() {
    this.popovers = [];
  }

  showPopover(popover, element) {
    // создаем поповер
    const popoverEl = document.createElement("div");
    popoverEl.classList.add("popover-element");

    // рамку
    const popoverFrame = document.createElement("div");
    popoverFrame.classList.add("popover-frame");
    popoverEl.append(popoverFrame);

    // title
    const popoverTitle = document.createElement("div");
    popoverTitle.classList.add("popover-title");
    popoverTitle.textContent = popover.title;
    popoverFrame.append(popoverTitle);

    // content
    const popoverText = document.createElement("div");
    popoverText.classList.add("popover-text");
    popoverText.textContent = popover.text;
    popoverFrame.append(popoverText);

    // стрелку
    const arrow = document.createElement("div");
    arrow.classList.add("popover-arrow");
    popoverEl.append(arrow);

    // добавляем поповер в массив и в DOM-дерево
    this.popovers.push({
      id: popover.id,
      element: popoverEl,
    });

    document.body.append(popoverEl);

    // позиционируем поповер
    const { left, top } = element.getBoundingClientRect();

    popoverEl.style.top = top - popoverEl.offsetHeight + "px";
    popoverEl.style.left =
      left + element.offsetWidth / 2 - popoverEl.offsetWidth / 2 + "px";
  }

  removePopover(id) {
    const popover = this.popovers.find((p) => p.id === id); // находим поповер по id

    if (!popover) return; // если поповер не найден, выходим из функции

    popover.element.remove(); // удаляем поповер из DOM-дерева

    this.popovers = this.popovers.filter((p) => p.id !== id); // удаляем поповер из массива поповеров
  }
}
