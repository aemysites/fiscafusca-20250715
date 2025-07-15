/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const cells = [
    ['Accordion (accordion17)'],
  ];

  // The block consists of multiple accordion items, each inside a .divider element
  // Each .divider contains a .w-layout-grid with two children: heading and content
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (grid && grid.children.length >= 2) {
      // Reference the heading and content nodes directly
      const title = grid.children[0];
      const content = grid.children[1];
      cells.push([title, content]);
    }
  });

  // Replace the element with the new accordion block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
