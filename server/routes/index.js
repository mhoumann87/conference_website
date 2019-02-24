const express = require('express');

const router = express.Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = params => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const promises = [];

      promises.push(speakerService.getListShort());
      promises.push(speakerService.getAllArtwork());

      const result = await Promise.all(promises);

      return res.render('index', {
        page: 'Home',
        speakerslist: result[0],
        artwork: result[1]
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
