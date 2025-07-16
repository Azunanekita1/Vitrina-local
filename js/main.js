// Obtenemos los elementos del DOM
    const formulario = document.getElementById('formulario');
    const contenedor = document.getElementById('contenedorProductos');

    // Recuperamos los productos desde localStorage, o usamos una lista vacía si no hay nada guardado
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    /**
     * 🔁 Función que recorre la lista de productos y los muestra como tarjetas en el HTML
     */
    const renderizarProductos = () => {
      // Vaciamos el contenedor para evitar duplicados
      contenedor.innerHTML = '';

      // Recorremos cada producto y lo agregamos al HTML con una tarjeta
      productos.forEach(producto => {
        const { nombre, categoria, precio, imagen } = producto; // desestructuración (ES6)

        contenedor.innerHTML += `
          <div class="card">
            <img src="${imagen}" alt="Imagen de ${nombre}">
            <h3>${nombre}</h3>
            <p>Categoría: ${categoria}</p>
            <p>Precio: $${parseFloat(precio).toFixed(2)}</p>
          </div>
        `;
      });
    };

    /**
     * 🎯 Evento que se activa cuando el usuario envía el formulario
     * Captura los datos, los guarda y vuelve a renderizar la lista
     * Usar https://picsum.dev para imagenes.
     */
    formulario.addEventListener('submit', (e) => {
      e.preventDefault(); // Evitamos que la página se recargue

      // Capturamos los valores escritos en los inputs
      const nombre = document.getElementById('nombre').value;
      const categoria = document.getElementById('categoria').value;
      const precio = document.getElementById('precio').value;
      const imagen = document.getElementById('imagen').value;

      // Creamos un nuevo objeto con los datos del producto
      const nuevoProducto = {
        nombre,
        categoria,
        precio,
        imagen
      };

      // Agregamos el producto al array
      productos = [...productos, nuevoProducto]; // usamos spread operator (ES6)

      // Guardamos en localStorage como texto JSON
      localStorage.setItem('productos', JSON.stringify(productos));

      // Volvemos a mostrar todos los productos actualizados
      renderizarProductos();

      // Limpiamos el formulario
      formulario.reset();
    });

    // 📦 Al cargar la página, mostramos los productos que ya estaban guardados
    renderizarProductos();