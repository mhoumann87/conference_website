const express = require('express');

const router = express.Router();

module.exports = params => {
   const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const promises = [];

      promises.push(speakerService.getList());
      promises.push(speakerService.getAllArtwork());

      const result = await Promise.all(promises);
      return res.render('speakers', {
        page: 'All Speakers',
        speakerslist: result[0],
        artwork: result[1]
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:name', async (req, res, next) => {
    try {
      const promises = [];
      promises.push(speakerService.getSpeaker(req.params.name));
      promises.push(speakerService.getArtworkForSpeaker(req.params.name));
      const result = await Promise.all(promises);

      if (!result[0]) {
        return next();
      }
      return res.render('speakers/detail', {
        page: req.params.name,
        speaker: result[0],
        artwork: result[1]
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
