const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel, sightingCategoriesModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
    this.sightingCategoriesModel = sightingCategoriesModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
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

      // [OPTION 1]
      // "categoryIds" should match with FE request
      await newSighting.setCategories(req.body.categoryIds);
      // console.log("category req.body", req.body.categoryIds);

      // [OPTION 2] - if we need to perform additional checks or modifications on the category data before associating it with the new sighting
      // const selectedCategories = await this.categoryModel.findAll({
      //   where: {
      //     id: req.body.categoryIds,
      //   },
      // });
      // await newSighting.setCategories(selectedCategories);

      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
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

  // Retrieve all comments
  async getComments(req, res) {
    const { sightingId } = req.params;
    console.log(`sightingId!!!`, sightingId);
    try {
      const comments = await this.commentModel.findAll({
        where: {
          // use camelCase since underscored = true;
          sightingId: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addComment(req, res) {
    console.log("content", req.body.content);
    console.log("sightingId", req.params.sightingId);

    try {
      const newComment = await this.commentModel.create({
        content: req.body.content,
        sightingId: req.params.sightingId,
      });

      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
