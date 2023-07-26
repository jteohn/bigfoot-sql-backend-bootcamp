const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addOne(req, res) {
    // const sightingDetails = req.body;
    // const newSighting = await this.model.create({...sightingDetails});

    try {
      const newSighting = await this.model.create({
        date: new Date(req.body.date),
        location: req.body.location,
        notes: req.body.notes,
      });
      return res.json(newSighting);
    } catch (err) {
      return res.state(400).json({ error: true, msg: err });
    }
  }

  async editOne(req, res) {
    const { date, location, notes } = req.body;
    const { sightingId } = req.params;

    try {
      await this.model.update(
        {
          date: date,
          location: location,
          notes: notes,
        },
        {
          where: {
            id: sightingId,
          },
        }
      );
      const updatedSighting = await this.model.findByPk(sightingId);
      return res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteOne(req, res) {
    const { sightingId } = req.params;
    try {
      await this.model.destroy({
        where: {
          id: sightingId,
        },
      });
      let updatedSighting = await this.model.findAll();
      res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
