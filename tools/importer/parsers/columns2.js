/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive check: find the .grid-layout with at least three direct children
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children).filter((child) => child && child.nodeType === 1);
  if (children.length < 3) return;

  // LEFT COLUMN: Main feature block (the large left card)
  const leftCell = children[0];

  // RIGHT COLUMN: Compose of stacked cards and then list of links
  const rightCell = document.createElement('div');

  // Top stacked cards: find all anchors directly under children[1]
  const rightTop = children[1];
  if (rightTop) {
    const rightTopLinks = Array.from(rightTop.querySelectorAll(':scope > a'));
    rightTopLinks.forEach((card) => {
      rightCell.appendChild(card);
    });
  }

  // Bottom stacked text links separated by dividers
  const rightBottom = children[2];
  if (rightBottom) {
    // grab all <a> direct children, preserve the dividers between them
    const nodes = Array.from(rightBottom.childNodes);
    nodes.forEach((node) => {
      if (node.nodeType === 1 && (node.matches('a') || node.classList.contains('divider'))) {
        rightCell.appendChild(node);
      }
    });
  }

  // Compose the block table
  const cells = [
    ['Columns (columns2)'], // Table header, matches example 'Columns (columns2)'
    [leftCell, rightCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
