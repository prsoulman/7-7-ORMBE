const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// The `/api/product` endpoint

// get all products
router.get("/", async(req, res) => {

  try {
    const ProductData = await Category.findAll({
      include: [Product],
    });

    if (!ProductData) {
      res.status(404).json({ message: "No Product found with this id!" });
      return;
    }

    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one Product by its `id` value
  try {
    const ProductData = await Category.findOne({
      where:{
        id:req.params.id
      },
      include:[Product]
    });
    if (!ProductData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }
    res.status(200).json(ProductData);
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
  const ProductData = await Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  if (!ProductData) {
    res.status(404).json({ message: 'No Product found with this id!' });
    return;
  }
  res.status(200).json(ProductData);
} catch (err) {
  res.status(400).json(err);
 }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const ProductData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
  }
});
//     if (!ProductData) {
//       res.status(404).json({ message: 'No Product found with this id!' });
//       return;
//     }

//     res.status(200).json(ProductData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
