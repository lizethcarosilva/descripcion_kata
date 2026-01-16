# Pruebas Automatizadas - Formulario de Registro DemoQA

[![Playwright Tests](https://github.com/tu-usuario/tu-repo/actions/workflows/playwright.yml/badge.svg)](https://github.com/tu-usuario/tu-repo/actions/workflows/playwright.yml)

Este proyecto contiene pruebas automatizadas para el formulario de registro de usuarios en DemoQA, aplicando técnicas de caja negra con Playwright y TypeScript, suministradas en la documentación de Descripción de la Kata.

##  Resumen Rápido

-  **13 casos de prueba** automatizados
-  **100% de éxito** en ejecución
-  **3 técnicas** de caja negra aplicadas
-  **3 navegadores** soportados (Chromium, Firefox, WebKit)
-  **Ejecución en paralelo** (8 workers)
-  **Datos dinámicos** con Faker.js
-  **CI/CD** con Github Actions

## Descripción del Proyecto

El objetivo de este proyecto es validar el correcto funcionamiento del formulario de registro de usuarios disponible en https://demoqa.com/automation-practice-form mediante pruebas automatizadas que aplican técnicas de diseño de pruebas de caja negra.

## Tecnologías Utilizadas

- **Playwright**: Framework de automatización de pruebas end-to-end
- **TypeScript**: Lenguaje de programación
- **Faker.js**: Generación de datos de prueba aleatorios
- **Node.js**: Entorno de ejecución

## Estructura del Proyecto

```
descripcion_kata/
├── pages/                
│   └── PracticeFormPage.ts  
├── helpers/                 
│   ├── DataGenerator.ts   
│   └── TestData.ts        
├── tests/                 
│   ├── 01-happy-path.spec.ts
│   ├── 02-boundary-values-name.spec.ts
│   ├── 03-boundary-values-mobile.spec.ts
│   ├── 04-combinatorial-testing.spec.ts
│   └── 05-email-validation.spec.ts
├── test-data/             
├── playwright.config.ts     
├── package.json            
└── README.md                
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Instalar los navegadores de Playwright:
```bash
npx playwright install
```

## Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo UI (interactivo)
```bash
npm run test:ui
```

### Ejecutar pruebas en modo headed (con navegador visible)
```bash
npm run test:headed
```

### Ejecutar pruebas en paralelo
```bash
npm run test:parallel
```

### Ver reporte HTML
```bash
npm run test:report
```

## Casos de Prueba Implementados

### Caso 1: Registro Exitoso Completo
**Objetivo**: Validar que el formulario acepta y procesa correctamente todos los campos con datos válidos.

**Pasos**:
1. Navegar al formulario
2. Completar todos los campos con datos válidos generados aleatoriamente
3. Enviar el formulario
4. Verificar que aparece el modal de confirmación
5. Validar que los datos en el modal coinciden con los ingresados

**Resultado Esperado**: El formulario se envía exitosamente y se muestra el modal con todos los datos correctos.

### Caso 2: Análisis de Valores Límite - Nombres
**Técnica Aplicada**: Análisis de Valores Límite.

**Escenarios**:
- Nombre con longitud mínima válida (1 carácter).
- Nombre con longitud máxima válida (50 caracteres).
- Nombre vacío (debe ser rechazado).

**Resultado Esperado**: 
- Los nombres con longitud válida son aceptados.
- El nombre vacío es rechazado con validación HTML5.

### Caso 3: Análisis de Valores Límite - Teléfono Móvil
**Técnica Aplicada**: Análisis de Valores Límite.

**Escenarios**:
- Número con exactamente 10 dígitos (válido).
- Número con menos de 10 dígitos (inválido)
- Número con más de 10 dígitos (inválido).

**Resultado Esperado**:
- Solo se aceptan números con exactamente 10 dígitos
- Los números con longitud incorrecta son rechazados.

### Caso 4: Pruebas Combinatorias - Género, Hobbies y Estados
**Técnica Aplicada**: Pruebas Combinatorias.

**Escenarios**:
- Combinación: Male + Sports + NCR/Delhi.
- Combinación: Female + Reading + Uttar Pradesh/Agra.
- Combinación: Other + múltiples hobbies + Haryana/Karnal
- Validación de todas las combinaciones de hobbies.

**Resultado Esperado**: Todas las combinaciones válidas son procesadas correctamente y reflejadas en el modal de confirmación.

### Caso 5: Validación de Email
**Técnica Aplicada**: Validación de Entrada

**Escenarios**:
- Email con formato válido
- Email sin formato válido (sin @)
- Email vacío

**Resultado Esperado**:
- Solo se aceptan emails con formato válido.
- Los emails inválidos o vacíos son rechazados.

## Estrategia de Pruebas

### Técnicas de Diseño de Pruebas Aplicadas

1. **Análisis de Valores Límite**
   - Se probaron los límites mínimos y máximos de campos de texto (nombres).
   - Se validó la longitud exacta requerida en campos numéricos (teléfono: 10 dígitos).
   - Se verificaron casos en los límites y fuera de los límites.

2. **Pruebas Combinatorias**
   - Se probaron diferentes combinaciones de género (Male, Female, Other)
   - Se validaron combinaciones de hobbies (Sports, Reading, Music).
   - Se probaron diferentes estados y ciudades.
   - Se cubrieron casos con un hobby, múltiples hobbies y todos los hobbies.

3. **Validación de Entrada**
   - Se probaron formatos válidos e inválidos de email
   - Se validaron campos requeridos
   - Se verificó el comportamiento con campos vacíos

### Justificación de la Estrategia

La estrategia se diseñó para cubrir:
- **Casos positivos**: Validar que el sistema funciona correctamente con datos válidos.
- **Casos negativos**: Verificar que el sistema rechaza datos inválidos apropiadamente.
- **Casos límite**: Probar los extremos de los rangos válidos.
- **Combinaciones**: Asegurar que diferentes combinaciones de opciones funcionan correctamente

## Evidencias y Reportes

Las pruebas generan automáticamente:
- **Screenshots**: Capturados en caso de fallos (configurado en `playwright.config.ts`).
- **Videos**: Grabados cuando una prueba falla.
- **Reporte HTML**: Generado después de cada ejecución, accesible con `npm run test:report`.
- **Logs**: Información detallada de cada ejecución en la consola

## Ejecución Automática con GitHub Actions

El proyecto incluye configuración para ejecutar las pruebas automáticamente en GitHub Actions cada vez que se hace push al repositorio. Ver `.github/workflows/playwright.yml` para más detalles.

## Mejores Prácticas Implementadas

1. **Page Object Model**: Separación de la lógica de la página de los casos de prueba.
2. **Generación de Datos**: Uso de Faker.js para datos aleatorios y realistas.
3. **Esperas Explícitas**: Uso de `waitFor` y timeouts apropiados..
4. **Código Limpio**: Estructura modular y fácil de mantener.
5. **Documentación**: Casos de prueba claramente documentados.
6. **Manejo de Elementos Dinámicos**: Selectores robustos para dropdowns y elementos dinámicos

## Resultados Esperados vs Reales

Todos los casos de prueba han sido diseñados y ejecutados. Los resultados se pueden verificar ejecutando las pruebas y revisando el reporte HTML generado.

## Autor

Desarrollado como parte de una evaluación técnica para el puesto de Automatizador QA Junior - Lizeth Andrea Caro Silva.

## Licencia

Este proyecto es de uso educativo y de evaluación.
