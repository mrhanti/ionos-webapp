const root = document.querySelector('#app-root');
const canvas = document.createElement('div');
const actions = document.createElement('div');

canvas.classList.add('i-canvas');
actions.classList.add('i-actions');

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('i-container');
  return container;
};

const createNode = () => {
  const container = document.createElement('div');
  container.classList.add('i-node');
  return container;
};

const addActions = () => {
  const containerBtn = document.createElement('button');
  const nodeBtn = document.createElement('button');
  containerBtn.classList.add('i-button', 'i-container-button');
  containerBtn.innerText = 'Add Container';
  nodeBtn.classList.add('i-button', 'i-node-button');
  nodeBtn.innerText = 'Add Node';
  actions.append(containerBtn);
  actions.append(nodeBtn);

  containerBtn.addEventListener('click', () => {
    const container = createContainer();
    container.setAttribute('id', 'i-container' + ID());
    canvas.append(container);
    addContainer(container);
  });

  nodeBtn.addEventListener('click', () => {
    Array.from({ length: 10 }).forEach((_, idx) => {
      const node = createNode();
      node.setAttribute('id', 'i-node' + ID());
      node.style.top = (idx * 50) + 'px';
      node.style.left = (idx * 50) + 'px';
      canvas.append(node);
    });
  });
};

function setup() {
  addActions();

  root.appendChild(actions);
  root.appendChild(canvas);

  const options = {
    viewport: canvas,
    containers: [],
    draggableClasses: ["i-node", "i-container"],
    onDragEnter: (element, dropzone) => {
      dropzone.append(element);
      element.classList.add("i-draggable-in");
      element.style.left = null;
      element.style.top = null;
      element.style.transform = null;
    },
    onDragLeave: (element) => {
      canvas.appendChild(element);
      document.querySelectorAll('.i-container').forEach((container) => container.classList.remove('i-container-dragenter'))
      element.classList.remove("i-draggable-in");
    },
  };

  DnD(options);
}

document.addEventListener('DOMContentLoaded', setup);
