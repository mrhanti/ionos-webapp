let containers;

function DnD(options) {
  const viewport = options.viewport;
  containers = options.containers;
  // const draggableClass = options.draggableClass;
  const draggableClasses = options.draggableClasses;
  const onDragEnter = options.onDragEnter;
  const onDragLeave = options.onDragLeave;

  viewport.addEventListener('pointerdown', userPressed, { passive: true });

  let element, bbox, startX, startY, deltaX, deltaY, raf;

  function userPressed(event) {
    element = event.target;
    if (draggableClasses.some(draggableClass => element.classList.contains(draggableClass))) {
      startX = event.clientX;
      startY = event.clientY;
      bbox = element.getBoundingClientRect();
      viewport.addEventListener('pointermove', userMoved, { passive: true });
      viewport.addEventListener('pointerup', userReleased, { passive: true });
      viewport.addEventListener('pointercancel', userReleased, { passive: true });
    };
  };

  function userMoved(event) {
    // if no previous request for animation frame - we allow js to proccess 'move' event:
    if (!raf) {
      deltaX = event.clientX - startX;
      deltaY = event.clientY - startY;
      raf = requestAnimationFrame(userMovedRaf);
    }
  };

  function userMovedRaf() {
    element.style.transform = "translate3d("+deltaX+"px,"+deltaY+"px, 0px)";
    // once the paint job is done we 'release' animation frame variable to allow next paint job:
    raf = null;
  };

  function userReleased(event) {
    viewport.removeEventListener('pointermove', userMoved);
    viewport.removeEventListener('pointerup', userReleased);
    viewport.removeEventListener('pointercancel', userReleased);
    // if animation frame was scheduled but the user already stopped interaction - we cancel the scheduled frame:
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    };
    element.style.left = bbox.left + deltaX + "px";
    element.style.top = bbox.top + deltaY + "px";
    element.style.transform = "translate3d(0px,0px,0px)";

    if (element.classList.contains('i-container')) return;

    // Easiest solution to resolve visual nodes intersection is using bounding boxes
    // The current solution requires that nodes are dragged out of a container first,
    // before dragging them into a second one.
    const dropzone = containers.find(container => isInViewport(element, container));

    if (dropzone) {
      onDragEnter(element, dropzone);
    } else {
      onDragLeave(element);
    }
  };
}

function addContainer(container) {
  containers.push(container);
}