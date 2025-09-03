# Introducción a React

React es una biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables. Fue desarrollada por Facebook en 2013 y se ha convertido en uno de los pilares del desarrollo web moderno.

## Historia y Filosofía

React nació para resolver el problema de las interfaces de usuario complejas y cambiantes. Su enfoque principal es la creación de componentes reutilizables y la gestión eficiente de actualizaciones en la interfaz.

## Características principales

- **Componentes:** React organiza la UI en componentes independientes y reutilizables, lo que facilita el mantenimiento y la escalabilidad.
- **JSX:** Permite escribir HTML dentro de JavaScript, haciendo el código más legible y expresivo.
- **Estado y Props:** Los componentes pueden tener estado interno (`useState`) y recibir datos externos mediante props.
- **Virtual DOM:** React actualiza la UI de forma eficiente usando un DOM virtual, minimizando los cambios reales en el DOM.
- **Unidireccionalidad de datos:** El flujo de datos en React es unidireccional, lo que simplifica el seguimiento de cambios.

## Ciclo de vida de los componentes

Los componentes de React tienen un ciclo de vida que permite ejecutar código en momentos específicos:

- **Montaje:** Cuando el componente se inserta en el DOM.
- **Actualización:** Cuando cambian las props o el estado.
- **Desmontaje:** Cuando el componente se elimina del DOM.

Con los hooks modernos, el ciclo de vida se gestiona principalmente con `useEffect`.

## Ejemplo básico de componente funcional

```jsx
import React, { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>Sumar</button>
    </div>
  );
}

export default Contador;
```

## Hooks en React

Los hooks permiten usar estado y otras características de React en componentes funcionales:

- `useState`: Maneja el estado local.
- `useEffect`: Ejecuta efectos secundarios (fetch, suscripciones, etc.).
- `useContext`: Accede a contextos globales.

Ejemplo de uso de `useEffect`:

```jsx
import React, { useState, useEffect } from "react";

function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <p>{hora.toLocaleTimeString()}</p>;
}
```

## Buenas prácticas

- Divide la UI en componentes pequeños y reutilizables.
- Mantén el estado lo más local posible.
- Usa props para comunicar datos entre componentes.
- Utiliza contextos para datos globales.
- Aprovecha los hooks para lógica compartida.

## Recursos recomendados

- [Documentación oficial de React](https://react.dev/)
- [Tutorial interactivo](https://react.dev/learn)
- [React Patterns](https://reactpatterns.com/)

---

React es una herramienta poderosa y flexible para crear aplicaciones web modernas. ¡Explora, experimenta y construye interfaces increíbles!
