

//CODIGO PARA RESEÑAS//

// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todas las estrellas de calificación
    const stars = document.querySelectorAll(".star");
    // Seleccionar el botón de enviar comentario
    const submitButton = document.querySelector(".submit");
    // Seleccionar el campo de entrada de comentario
    const commentInput = document.querySelector(".comment");
    // Seleccionar la lista de comentarios
    const commentList = document.querySelector(".comment-list");
  
    // Función para guardar los comentarios en el almacenamiento local
    const saveComment = (rating, comment) => {
      // Obtener los comentarios existentes del almacenamiento local o inicializar un array vacío si no hay ninguno
      const existingComments = JSON.parse(localStorage.getItem("comments")) || [];
      // Crear un nuevo objeto de comentario con un ID único, la calificación y el comentario
      const newComment = { id: Date.now(), rating, comment };
      // Agregar el nuevo comentario al array de comentarios existentes
      existingComments.push(newComment);
      // Guardar el array de comentarios actualizado en el almacenamiento local
      localStorage.setItem("comments", JSON.stringify(existingComments));
    };
  
    // Función para mostrar los comentarios guardados en el almacenamiento local
    const showComments = () => {
      // Obtener los comentarios guardados del almacenamiento local o inicializar un array vacío si no hay ninguno
      const existingComments = JSON.parse(localStorage.getItem("comments")) || [];
      // Iterar sobre cada comentario existente
      existingComments.forEach(comment => {
        // Crear un nuevo elemento de comentario en el DOM
        const commentItem = document.createElement("div");
        // Establecer el texto del comentario en el elemento creado
        commentItem.textContent = `Comentario: ${comment.comment}`;
        // Crear un botón para eliminar el comentario
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        // Agregar un evento de clic al botón de eliminar para eliminar el comentario del DOM y del almacenamiento local
        deleteButton.addEventListener("click", () => {
          // Filtrar los comentarios para eliminar el comentario actual
          const updatedComments = existingComments.filter(c => c.id !== comment.id);
          // Guardar los comentarios actualizados en el almacenamiento local
          localStorage.setItem("comments", JSON.stringify(updatedComments));
          // Eliminar el comentario del DOM
          commentItem.remove();
        });
        // Agregar el botón de eliminar al elemento del comentario
        commentItem.appendChild(deleteButton);
        // Agregar el elemento del comentario a la lista de comentarios en el DOM
        commentList.appendChild(commentItem);
      });
    };
  
    // Mostrar los comentarios guardados al cargar la página
    showComments();
  
    // Agregar un event listener a cada estrella de calificación para actualizar la visualización de la calificación seleccionada
    stars.forEach(star => {
      star.addEventListener("click", function() {
        // Obtener la calificación de la estrella seleccionada
        const rating = parseInt(star.getAttribute("data-rating"));
        // Iterar sobre todas las estrellas y agregar o quitar la clase 'selected' según la calificación
        stars.forEach(s => {
          if (parseInt(s.getAttribute("data-rating")) <= rating) {
            s.classList.add("selected");
          } else {
            s.classList.remove("selected");
          }
        });
      });
    });
  
    // Agregar un event listener al botón de enviar para guardar el comentario y mostrarlo en la lista de comentarios
    submitButton.addEventListener("click", function() {
      // Obtener el texto del comentario
      const comment = commentInput.value;
      // Obtener la calificación seleccionada
      const rating = document.querySelector(".star.selected").getAttribute("data-rating");
      // Crear un nuevo elemento de comentario en el DOM
      const newComment = document.createElement("div");
      // Establecer el texto del nuevo comentario con el comentario y la calificación
      newComment.textContent = `Comentario: ${comment}`;
      // Crear un botón de eliminar para el nuevo comentario
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      // Agregar un event listener al botón de eliminar para eliminar el comentario del DOM
      deleteButton.addEventListener("click", () => {
        newComment.remove();
      });
      // Agregar el botón de eliminar al nuevo comentario
      newComment.appendChild(deleteButton);
      // Agregar el nuevo comentario a la lista de comentarios en el DOM
      commentList.appendChild(newComment);
      // Guardar el comentario en el almacenamiento local
      saveComment(rating, comment);
      // Limpiar el campo de comentario después de enviar
      commentInput.value = "";
    });
});

//
  