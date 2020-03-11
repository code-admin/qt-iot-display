const scrollData = function(tableClass, tableData) {
  const child = 'tr.el-table__row:first-of-type';
  const selector = tableClass + ' .el-table__body-wrapper';
  const scrollElement = document.querySelectorAll(selector);
  if (scrollElement.length && tableData.length > 4) {
    const removeItem = tableData.splice(-1, 1);
    scrollElement[0].style.transition = 'all 0s';
    scrollElement[0].style.marginTop = '-44px';
    tableData.unshift(removeItem[0]);

    const firstRow = scrollElement[0].querySelectorAll(child);
    firstRow[0].style.transition = 'all 0s';
    firstRow[0].style.opacity = '0';

    setTimeout(() => {
      scrollElement[0].style.transition = 'all .8s';
      scrollElement[0].style.marginTop = '0px';

      firstRow[0].style.transition = 'all 2.8s';
      firstRow[0].style.opacity = '1';
    }, 200);
  }
};

export {
  scrollData
};
