document.addEventListener('DOMContentLoaded', (event) => {
    const dropzones = document.querySelectorAll('.dropzone');
    const originalParents = document.querySelectorAll('.original-parent');
    const images = document.querySelectorAll('.draggable');

    // Add event listeners to draggable images
    images.forEach(image => {
        image.addEventListener('dragstart', dragStart);
    });

    // Add event listeners for each dropzone and original parent
    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragOver);
        dropzone.addEventListener('drop', drop);
    });

    originalParents.forEach(originalParent => {
        originalParent.addEventListener('dragover', dragOver);
        originalParent.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);  // Store the image ID for later reference
    }

    function dragOver(e) {
        e.preventDefault();  // This is required to allow a drop
    }

    function drop(e) {
        e.preventDefault();  // Prevent the default action (like opening as a link)

        const id = e.dataTransfer.getData('text/plain'); // Get the dragged image ID
        const draggableElement = document.getElementById(id); // Get the dragged element
        const target = e.target;

        // Check if the drop target is a dropzone
        if (target.classList.contains('dropzone')) {
            target.appendChild(draggableElement);
        }
        // Check if the drop target is an original parent container
        else if (target.classList.contains('original-parent')) {
            target.appendChild(draggableElement); // Append image back to the original container

        // Ensure the image retains its original size when returned
        draggableElement.style.width = "auto";
        draggableElement.style.height = "auto";
        }

        // Remove inline styles to ensure CSS takes over
        draggableElement.style.removeProperty('width');
        draggableElement.style.removeProperty('height');
    }
});
