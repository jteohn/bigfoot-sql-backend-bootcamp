const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, categoryModel) {
    super(model);
    this.model = categoryModel;
  }

  // Retrieve all categories
  async getCategories(req, res) {
    try {
      const categories = await this.model.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addOneCategory(req, res) {
    try {
      const newCategory = await this.model.create({
        name: req.body.name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
