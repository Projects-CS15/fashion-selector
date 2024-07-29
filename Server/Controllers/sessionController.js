const sessionController = {};

sessionController.getSessionStatus = (req, res) => {
  if (req.session && req.session.countdownModal) {
    return res.json({ countdownModal: req.session.countdownModal });
  } else {
    return res.json({ countdownModal: { show: false } });
  }
};

module.exports = sessionController;