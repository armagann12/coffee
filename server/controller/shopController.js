const Shop = require("./../model/shopModel")

exports.getAllShops = async (req, res) =>  {
    try{
        const shops =await Shop.find()
        res.status(200).json(shops);
    }catch(err){
        res.status(500).json({message: err.message})
      }
  };

exports.getShop = async (req, res) =>  {
    try{
        const shop= await Shop.findById(req.params.id)
        res.json(shop);
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.createShop = async (req, res) => {
    const shop =new Shop({
        name: req.body.name,
        describtion: req.body.describtion
    });
    try{
        const newShop= await shop.save()
        res.status(201).json(newShop)
    }
    catch(err) {
        res.status(400).json(err.message);
    };
}

exports.deleteShop = async (req,res) => {
    try{
        const shop = await Shop.findOneAndDelete(req.params.id)
        res.json(shop)
    }catch(err){
        res.status(400).json(err.message);
    }
}

exports.updateShop = async (req,res) => {
    try{
        const shop = await Shop.findOneAndUpdate({
            name: req.name,
            describtion: req.describtion
        })
        res.json(shop)
    }catch(err){
        res.status(400).json(err.message);
    }
}