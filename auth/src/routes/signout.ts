import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('signed out');

});

export { router as signoutRouter };