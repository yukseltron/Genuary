function start() {
  const container = document.querySelector('.container');
  if (!container) return;
  container.innerHTML = '';

  function createNested(depth, startDepth = 0) {
    const outer = document.createElement('div');
    outer.className = 'box';
    outer.setAttribute('data-depth', startDepth);
    
    // Random padding inversely correlated to depth
    const randomPadding = Math.random() * 8 + 2; // 2-10px
    const depthFactor = Math.max(0.1, 1 - (startDepth / depth));
    outer.style.padding = (randomPadding * depthFactor) + 'px';
    
    let current = outer;
    
    for (let i = 1; i < depth; i++) {
      const child = document.createElement('div');
      child.className = 'box';
      const currentDepth = startDepth + i;
      child.setAttribute('data-depth', currentDepth);
      
      // More padding for shallower depths, less for deeper
      const childRandomPadding = Math.random() * depth + 2;
      const childDepthFactor = Math.max(0.1, 1 - (currentDepth / depth));
      child.style.padding = (childRandomPadding * childDepthFactor) + 'px';
      child.style.setProperty('--animation-delay', (i * 0.1) + 's');
      
      current.appendChild(child);
      current = child;
    }

    return outer;
  }
  
  const numBoxes = 36;
  
  for (let i = 0; i < numBoxes; i++) {
    const depth = Math.floor(Math.random() * 25) + 10;
    const box = createNested(depth);
    container.appendChild(box);
  }
}

document.addEventListener('DOMContentLoaded', start);