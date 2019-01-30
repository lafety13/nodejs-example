const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json('hello');
});

module.exports = router;
