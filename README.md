# TechLife E-commerce 🛒

![Estado del Deploy en Netlify](https://api.netlify.com/api/v1/badges/e850b073-9877-49d9-95a6-79174092b77e/deploy-status)

Bienvenido a TechLife, una tienda online de componentes de hardware y periféricos, desarrollada como proyecto final con React. El sitio permite a los usuarios navegar por un extenso catálogo, filtrar y ordenar productos, gestionar un carrito de compras y completar un proceso de pago simulado. Además, cuenta con un panel de administración para la gestión completa del inventario.

### **[Ver Demo Online](https://techlife-ar.netlify.app/)** 🚀

---

## 📸 Vistas Previas

*Aquí puedes agregar capturas de pantalla de tu aplicación. Te recomiendo subirlas a una carpeta en tu proyecto (o a un servicio como Imgur) y enlazar a ellas.*

**Página de Inicio**
![Página de Inicio](URL_A_TU_IMAGEN_DE_INICIO)

**Catálogo con Filtros**
![Catálogo de Productos](URL_A_TU_IMAGEN_DEL_CATALOGO)

**Panel de Administrador**
![Panel de Administrador](URL_A_TU_IMAGEN_DEL_ADMIN_PANEL)

---

## ✅ Características Principales

* **Catálogo Dinámico:** Productos cargados desde una API con filtros, búsqueda y sistema de ordenamiento.
* **Paginación:** Navegación por páginas en el catálogo para una mejor experiencia de usuario.
* **Vista de Detalle:** Página dedicada para cada producto.
* **Carrito de Compras:** Funcionalidad completa para agregar, modificar y eliminar productos del carrito.
* **Panel de Administrador:** Ruta protegida para la gestión de productos con operaciones **CRUD** (Crear, Leer, Actualizar y Borrar).
* **Proceso de Checkout:** Formulario de pago con simulación de compra y generación de orden.
* **Notificaciones Profesionales:** Alertas interactivas con **SweetAlert2** para acciones importantes.
* **SEO y Títulos Dinámicos:** Uso de **React Helmet Async** para mejorar el posicionamiento y la experiencia en el navegador.
* **Diseño Responsivo:** Interfaz adaptada a dispositivos móviles, tablets y escritorio con un enfoque **Mobile First**.
* **Componentes Interactivos:** Sliders de marcas y productos para una página de inicio atractiva.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19 (con Vite), React Router DOM.
* **UI Framework:** React Bootstrap.
* **Manejo de Estado:** React Context API.
* **Librerías Adicionales:**
    * `sweetalert2` para notificaciones.
    * `react-helmet-async` para el manejo del `<head>`.
    * `react-icons` para la iconografía.
* **Backend (Simulado):** MockAPI.

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para correr el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Fixiuz/Proyecto-Final-Fidanza.git](https://github.com/Fixiuz/Proyecto-Final-Fidanza.git)
    cd Proyecto-Final-Fidanza
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
    > **Nota Importante:** Este proyecto usa React 19. Algunas dependencias como `react-helmet-async` pueden generar un error `ERESOLVE` durante la instalación. Si esto ocurre, la solución recomendada es configurar `npm` para que sea menos estricto con el siguiente comando y luego volver a instalar:
    > ```bash
    > npm config set legacy-peer-deps true
    > npm install
    > ```
    > Como alternativa rápida, puedes forzar la instalación de un paquete específico con:
    > ```bash
    > npm install --force
    > ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) en tu navegador para ver la aplicación.

---

## 👨‍💻 Autor

**Julio Fidanza**

* **LinkedIn:** [https://www.linkedin.com/in/julio-fidanza/](https://www.linkedin.com/in/julio-fidanza/)
* **GitHub:** [@Fixiuz](https://github.com/Fixiuz)
