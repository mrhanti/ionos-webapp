/**
 * Function help to verify whether two nodes intersect
 * This is being used to resolve whether a node can be attached to a container
 * @param {*} node
 * @param {*} container
 */
function isInViewport(node, container) {
  const bbox = node.getBoundingClientRect();
  const cbbox = container.getBoundingClientRect();

  return (
    bbox.top >= cbbox.top &&
    bbox.left >= cbbox.left &&
    bbox.bottom <= cbbox.bottom &&
    bbox.right <= cbbox.right
  );
};