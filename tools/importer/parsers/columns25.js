/* global WebImporter */
export default function parse(element, { document }) {
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get heading (h2) and quote (p)
  const heading = mainGrid.querySelector('p.h2-heading');
  const quote = mainGrid.querySelector('p.paragraph-lg');
  // Get the inner grid at the bottom (avatar/name and logo svg)
  const bottomGrid = mainGrid.querySelector('.w-layout-grid.grid-layout:not(:first-child)');
  let avatarBlock = null, logoBlock = null;
  if (bottomGrid) {
    avatarBlock = bottomGrid.querySelector('.flex-horizontal');
    logoBlock = bottomGrid.querySelector('.utility-display-inline-block');
  }

  // Row 1: left cell = heading, quote, avatarBlock; right cell = logoBlock
  const leftCell1 = [];
  if (heading) leftCell1.push(heading);
  if (quote) leftCell1.push(quote);
  if (avatarBlock) leftCell1.push(avatarBlock);
  const rightCell1 = logoBlock ? [logoBlock] : '';

  // Row 2: both columns empty because source HTML has no 2nd content row
  const leftCell2 = '';
  const rightCell2 = '';

  const cells = [
    ['Columns (columns25)'],
    [leftCell1, rightCell1],
    [leftCell2, rightCell2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
