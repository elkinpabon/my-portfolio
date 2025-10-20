# 🚀 Portafolio de Desarrollador - Landing Page Profesional

Una landing page moderna y profesional para desarrolladores Full Stack, construida con Node.js, con animaciones fluidas, tema claro/oscuro y diseño responsive.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con tonalidades verdes
- 🌓 **Tema Claro/Oscuro**: Cambio dinámico entre temas con persistencia local
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos
- 🎬 **Animaciones Fluidas**: Integración con Animate UI para transiciones suaves
- ⚡ **Alto Rendimiento**: Optimizado para velocidad y SEO
- 🔧 **Fácil Personalización**: Estructura modular y variables CSS personalizables

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js

### Frontend
- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript ES6+
- Font Awesome (iconos)
- Google Fonts (Inter)
- Animate UI (animaciones)

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/my-portfolio.git
   cd my-portfolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Ejecutar en producción**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
my-portfolio/
├── public/
│   ├── css/
│   │   └── styles.css          # Estilos principales
│   ├── js/
│   │   └── script.js           # Funcionalidad JavaScript
│   ├── assets/                 # Imágenes y recursos
│   └── index.html              # Página principal
├── server.js                   # Servidor Express
├── package.json               # Dependencias del proyecto
└── README.md                  # Documentación
```

## 🎨 Personalización

### Colores
Los colores se pueden personalizar fácilmente modificando las variables CSS en `public/css/styles.css`:

```css
:root {
  --primary-green: #10b981;      /* Verde principal */
  --primary-green-light: #34d399; /* Verde claro */
  --primary-green-dark: #059669;  /* Verde oscuro */
  /* ... más variables */
}
```

### Contenido
1. **Información personal**: Edita el contenido en `public/index.html`
2. **Proyectos**: Actualiza la sección de proyectos con tus trabajos
3. **Habilidades**: Modifica las habilidades técnicas según tu experiencia
4. **Contacto**: Actualiza la información de contacto

### Animaciones
Las animaciones se configuran usando atributos `data-animate`:
```html
<div data-animate="fade-in-up" data-delay="200">
  Contenido animado
</div>
```

## 🌟 Secciones Incluidas

- **Hero**: Presentación principal con animación de código
- **Sobre Mí**: Información personal y estadísticas
- **Habilidades**: Tecnologías y competencias técnicas
- **Proyectos**: Portafolio de trabajos realizados
- **Contacto**: Formulario de contacto y redes sociales

## 📱 Responsive Design

El diseño es completamente responsive con breakpoints optimizados:
- Desktop: > 768px
- Tablet: 768px - 480px
- Mobile: < 480px

## 🎯 Optimizaciones

- **Performance**: Lazy loading, optimización de imágenes
- **SEO**: Estructura semántica HTML5
- **Accesibilidad**: Contrastes adecuados, navegación por teclado
- **Cross-browser**: Compatibilidad con navegadores modernos

## 🔧 Scripts Disponibles

```bash
npm start      # Ejecutar servidor de producción
npm run dev    # Ejecutar servidor de desarrollo con nodemon
```

## 📝 Personalización Rápida

1. **Cambiar información personal**:
   - Edita las secciones hero, about y contact en `index.html`

2. **Agregar proyectos**:
   - Duplica la estructura `.project-card` en la sección projects

3. **Modificar habilidades**:
   - Actualiza los `.skill-item` en cada categoría

4. **Cambiar colores del tema**:
   - Modifica las variables CSS en `:root`

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu.email@example.com

## 🙏 Agradecimientos

- [Animate UI](https://animate-ui.com/) por las animaciones fluidas
- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por la tipografía

---

⭐ ¡No olvides darle una estrella al proyecto si te fue útil!