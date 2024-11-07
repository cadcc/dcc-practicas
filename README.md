# dcc-practicas

Datos, análisis y reporte de los datos obtenidos de la encuesta de experiencias de prácticas DCC 2024.

## Archivos

- `data`: Datos y su exportación
- - `censor.py`: Convierte los datos crudos en datos no-identificables (censura columnas de texto, timestamps y baraja las filas)
- - `data.py`: Convierte los datos en JSONs para Chart.js, y printea algunas estadisticas.
- `docs`: Todos los documentos estáticos del reporte final (html, css, js, fonts)

## Hecho con

- HTML+CSS+JS Sin frameworks (perdón gente del futuro si quieren editar la página)
- Python + Pandas, Numpy y Statsmodels para el análisis de datos
- Chart.js (Con los plugins de Deferred, Datalabels y Patternomaly)
- Feather Icons


## Contribuir

Si tienes una idea de análisis, visualización o mejora en general, ¡adelante! Puedes hacer un pull request o [abrir un issue](https://github.com/cadcc/dcc-practicas/issues). Igualmente si notas un error o estás en desacuerdo con alguna de las sugerencias.

### Contribuciones

- [Eric K.](https://github.com/nyveon) - Análisis y visualización de datos
- [Blaz Korecic](https://github.com/bkorecic) - Deployment
