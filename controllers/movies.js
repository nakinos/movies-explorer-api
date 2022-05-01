const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const { BadRequestErrorMessage, NotFoundFilmMessage, ForbiddenFilmMessage } = require('../constants/error-message');
const { DeleteFilmMessage } = require('../constants/success-message');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(BadRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NotFoundFilmMessage);
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(ForbiddenFilmMessage);
      }

      Movie.findByIdAndDelete(id)
        .then(() => res.send({ message: DeleteFilmMessage }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
