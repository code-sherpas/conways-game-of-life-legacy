# Conway's Game of Life

Una implementación de Conway's Game of Life usando Next.js, TypeScript y React.

## Descripción

Este proyecto implementa el autómata celular "Game of Life" de John Conway, separando claramente la lógica del motor del juego de la visualización y los controles de la interfaz.

## Reglas del Juego

El universo del Game of Life es una cuadrícula ortogonal bidimensional infinita de celdas cuadradas, cada una de las cuales se encuentra en uno de dos estados posibles: viva o muerta. Cada celda interactúa con sus ocho vecinos (horizontal, vertical y diagonalmente adyacentes). En cada paso temporal, ocurren las siguientes transiciones:

1. **Subpoblación**: Cualquier celda viva con menos de dos vecinos vivos muere
2. **Supervivencia**: Cualquier celda viva con dos o tres vecinos vivos sobrevive
3. **Sobrepoblación**: Cualquier celda viva con más de tres vecinos vivos muere
4. **Reproducción**: Cualquier celda muerta con exactamente tres vecinos vivos se convierte en una celda viva

## Arquitectura

El proyecto está organizado de la siguiente manera:

- **`engine/GameOfLife.ts`**: Motor del juego con la lógica de Conway completamente separada de la UI
  - Implementa las reglas del juego
  - Gestiona el estado de la cuadrícula
  - Proporciona métodos para manipular el estado

- **`components/GameGrid.tsx`**: Componente de visualización de la cuadrícula
  - Renderiza el estado actual del juego
  - Maneja la interacción del usuario con las celdas

- **`components/GameControls.tsx`**: Panel de controles
  - Play/Pause para iniciar/detener la simulación
  - Step para avanzar una generación
  - Clear para limpiar la cuadrícula
  - Randomize para generar un patrón aleatorio
  - Control de velocidad

- **`app/page.tsx`**: Página principal que integra todos los componentes

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en modo producción
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Uso

1. Haz clic en las celdas individuales para activarlas/desactivarlas manualmente
2. Usa el botón "Randomize" para generar un patrón aleatorio inicial
3. Presiona "Play" para iniciar la simulación
4. Ajusta la velocidad con el control deslizante
5. Usa "Step" para avanzar una generación a la vez
6. Presiona "Clear" para limpiar la cuadrícula

## Tecnologías

- Next.js 15
- React 18
- TypeScript 5
- SVG para renderizado de la cuadrícula