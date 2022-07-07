const router = require('express').Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint


// find all categories
router.get('/', async(req, res) => {
  
  try {
    const CategoryData = await Category.findAll({
      // JOIN with locations, using the Trip through table
      include:[Product]
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const CategoryData = await Category.findOne({
      where:{
        id:req.params.id
      },
      include:[Product]
    });
    if (!CategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  // be sure to include its associated Products
}
});

router.post('/', async (req, res) => {
  // create a new category
    try {
      const CreateData = await Category.create(req.body);
      res.status(200).json(CreateData);
    } catch (err) {
      res.status(400).json(err);
    }
});
 // update a category by its `id` value
router.put('/:id', async(req, res) => {
 try {
  const categoryData = await Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(400).json(err);
 }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 module.exports = router;
