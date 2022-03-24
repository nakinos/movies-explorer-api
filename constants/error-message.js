const BadRequestErrorMessage = 'Переданы некорректные данные';
const NotFoundFilmMessage = 'Фильм не найдена';
const NotFoundUserMessage = 'Пользователь не найден';
const ForbiddenFilmMessage = 'Невозможно удалить чужой фильм';
const ConflictUserMessage = 'Пользователь с таким email адресом уже существует';
const UnauthorizedErrorMessage = 'Необходима авторизация';
const InvalideEmailPasswordMessage = 'Неправилная почта или пароль';
const DefaultErrorMessage = 'На сервере произошла ошибка';
const NotFoundEndpointMessage = 'Не найден endpoint';

module.exports = {
  BadRequestErrorMessage,
  NotFoundFilmMessage,
  NotFoundUserMessage,
  ForbiddenFilmMessage,
  ConflictUserMessage,
  UnauthorizedErrorMessage,
  InvalideEmailPasswordMessage,
  DefaultErrorMessage,
  NotFoundEndpointMessage,
};
