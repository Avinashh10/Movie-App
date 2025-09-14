const WishList = require('../models/wishlist');



exports.showWishList = async (req,res)=>{
    try{
        const wishlist = await WishList.find({user:req.user._id});
     res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error: err.message });
  }
};


exports.addWishList = async (req,res)=>{
    const { movieId, title, poster_path } = req.body;
    
    if(!movieId || !title){
      return res.status(400).json({ message: 'Movie ID and title are required' });
    }

    try{
      const exist  = await WishList.findOne({ user: req.user._id, movieId });
      if (exist) {
      return res.status(400).json({ message: 'Movie already in wishlist' });
    }

    const newItem = new WishList({
      user: req.user._id,
      movieId,
      title,
      poster_path,
    });

    await newItem.save();
    res.status(201).json(newItem);

    }catch (err) {
    res.status(500).json({ message: 'Failed to add movie', error: err.message });
  }
    
};

exports.removeWishList = async (req, res) => {
  const movieId = Number(req.params.movieId); 

  try {
    const deleted = await WishList.findOneAndDelete({ user: req.user._id, movieId });

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found in wishlist" });
    }

    res.status(200).json({ message: "Movie removed from wishlist", deleted });
  } catch (err) {
    console.error("❌ Remove wishlist error:", err);
    res.status(500).json({ message: "Failed to remove movie", error: err.message });
  }
};

