export default {
  config: {
    sortSelectors: "button[data-sort]",
    sortContainer: "#items",
    sortElements: "div.item",
    sortField: "sort",
    sortValue: "value",
  },
  init: function (config = null) {
    if (config !== null) this.setConfig(config);

    let selectors = document.querySelectorAll(this.config.sortSelectors);
    if (selectors.length === 0) return;

    let container = document.querySelector(this.config.sortContainer);
    if (container === null) return;

    let allElements = document.querySelectorAll(this.config.sortElements);
    if (allElements.length === 0) return;

    selectors.forEach((element) => {
      element.addEventListener("click", (event) => {
        this.sortPageElements(
          container,
          allElements,
          `[data-${this.config.sortField}="${
            event.currentTarget.dataset[this.config.sortField]
          }"]`
        );
      });
    });
  },
  setConfig: function (config) {
    for (const [key, value] of Object.entries(config)) {
      if (this.config[key] !== undefined) this.config[key] = value;
    }
  },
  sortPageElements: function (container, allElements, dataField) {
    let compareFunction = (a, b) => {
      let valueA = a.querySelector(`*${dataField}`).dataset[
        this.config.sortValue
      ];
      let valueB = b.querySelector(`*${dataField}`).dataset[
        this.config.sortValue
      ];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);

        return valueA - valueB;
      }

      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    };

    let items = Array.from(allElements);
    let sorted = items.sort(compareFunction);

    sorted.forEach((element) => {
      container.appendChild(element);
    });
  },
};
