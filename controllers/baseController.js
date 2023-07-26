class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    const { filter } = req.query;
    try {
      let output = await this.model.findAll();

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
