/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match exactly
  const headerRow = ['Hero (hero19)'];

  // 2. Background image(s): all <img> in the 3x grid layout
  let backgroundContainer = null;
  const gridLayout = element.querySelector('.ix-hero-scale-3x-to-1x > .grid-layout');
  if (gridLayout) {
    backgroundContainer = document.createElement('div');
    // Reference (do not clone) all <img> elements
    gridLayout.querySelectorAll('img').forEach(img => backgroundContainer.appendChild(img));
  }

  // 3. Title, subheading, CTAs: the centered overlay content
  // Reference the .container.small-container if present
  let contentCell = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) contentCell = contentContainer;

  // 4. Build the table
  const cells = [
    headerRow,
    [backgroundContainer],
    [contentCell],
  ];

  // 5. Replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
