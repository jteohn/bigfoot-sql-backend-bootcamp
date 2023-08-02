class BaseController {
  constructor(model, categoryModel) {
    this.model = model;
    this.categoryModel = categoryModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    const { filter } = req.query;
    try {
      let output = await this.model.findAll({
        include: [
          {
            model: this.categoryModel,
            // to prevent the join table columns from being included
            through: { attributes: [] },
          },
        ],
        // add 'distinct' to eliminate duplicated rows in result set
        distinct: true,
        // order by 'id' column in ascending order, or by created_at to get the most recent sighting at the top
        order: [["id", "ASC"]],
      });

      if (filter) {
        output = output.filter((sighting) => {
          return Object.values(sighting.dataValues).some((value) =>
            String(value).toLowerCase().includes(filter.toLowerCase())
          );
        });
      }
      console.log("Output after filtering:", output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
