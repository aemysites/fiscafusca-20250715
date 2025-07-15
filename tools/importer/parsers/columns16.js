/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid
  const columns = Array.from(grid.children);

  let leftContent = null;
  let contactList = null;
  let rightImage = null;
  for (const col of columns) {
    if (
      col.tagName === 'DIV' &&
      (col.querySelector('h2') || col.querySelector('h3'))
    ) {
      leftContent = col;
    } else if (col.tagName === 'UL') {
      contactList = col;
    } else if (col.tagName === 'IMG') {
      rightImage = col;
    }
  }

  // Compose left column: combine text and contact list
  let leftColumn;
  if (leftContent && contactList) {
    leftColumn = document.createElement('div');
    leftColumn.append(leftContent, contactList);
  } else if (leftContent) {
    leftColumn = leftContent;
  } else if (contactList) {
    leftColumn = contactList;
  } else {
    leftColumn = document.createElement('div');
  }

  // Compose rows: header row must be a single cell, then the content row with as many columns as needed
  const headerRow = ['Columns (columns16)'];
  const contentRow = [leftColumn];
  if (rightImage) contentRow.push(rightImage);

  // Create a 2D array for the table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
