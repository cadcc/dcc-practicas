# dcc-practicas

Análisis y reporte de los datos obtenidos de la encuesta de experiencias de prácticas DCC 2024.

## Archivos

- `data`: Convierte los datos crudos en datos anonimizados JSONs para Chart.js
- - `censor.py`: Convierte los datos crudos en datos no-identificables (censura columnas de texto, timestamps y baraja las filas)
- - `data.py`: Convierte los datos en JSONs para Chart.js, y printea algunas estadisticas.
- `docs`: Todos los documentos estáticos del reporte final (html, css, js, fonts)

## Hech con

- HTML+CSS+JS Sin frameworks (perdón gente del futuro si quieren editar la página)
- Python + Pandas, Numpy y Statsmodels para el análisis de datos
- Chart.js (Con los plugins de Deferred, Datalabels y Patternomaly)
- Feather Icons


## Contribuciones

Si tienes una idea de análisis, visualización o mejora en general, ¡adelante! Puedes hacer un pull request o abrir un issue. Igualmente si notas un error o estás en desacuerdo con alguna de las sugerencias.
