/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Define the table header as in the example
  const headerRow = ['Hero (hero13)'];

  // Step 2: Get the background image (first img in the header)
  let imageEl = element.querySelector('img');

  // If not found, leave blank
  const imageRow = [imageEl ? imageEl : ''];

  // Step 3: Get the main text content (headline, subheading, cta)
  // The content is in the grid layout's second major child (the right column)
  // It has the class 'container utility-z-index-2 ...'
  let textCell = '';
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Find all direct children of .w-layout-grid
    const children = Array.from(grid.children);
    // The text content is usually in the child with class 'container utility-z-index-2'
    const textContentDiv = children.find(div => div.classList.contains('container') && div.classList.contains('utility-z-index-2'));
    if (textContentDiv) {
      // The actual text is inside this div, usually in a h1 and possibly with more elements
      // We'll extract all children except empty button groups
      const content = [];
      for (const child of textContentDiv.children) {
        // Ignore empty div.button-group, otherwise include
        if (child.classList.contains('button-group') && !child.textContent.trim()) continue;
        content.push(child);
      }
      if (content.length) {
        textCell = content;
      }
    }
  }

  // Compose the table rows
  const contentRow = [textCell];
  const cells = [headerRow, imageRow, contentRow];

  // Step 4: Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
