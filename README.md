# movies-explorer-api

Бэкенд дипломной работы "Фильмы" для Яндекс.Практикума - Вэб-разработчик

Бэкенд развернут в Яндекс.Облаке - https://api.nakinos.movies.nomoredomains.work/
## Роутинг

- POST /signup - создание пользователя (email, password, name)
- POST /signin - проверка пользователя и получение jwt (email, password)
- POST /signout - удаление jwt у клиента

- GET /users/me - получить информацию о текущем пользователе (email, name)
- PATCH /users/me - обновить информацию текущего пользователя (email, name)
- GET /movies - поучить все сохраненные фильмы текущего пользователя
- POST /movies - создать фильм (country, director, duration, year, description, image, trailerLink, nameRU, nameEN и thumbnail, movieId)
- DELETE /movies/_id - удаление сохранённого фильма по id
