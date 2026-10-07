import Gallery from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'ALL' && category !== 'All') {
      filter.category = category;
    }

    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching gallery items',
      error: error.message
    });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { image, title, category } = req.body;

    if (!image || !title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide image, title, and category'
      });
    }

    const galleryItem = await Gallery.create({
      image,
      title,
      category
    });

    return res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: galleryItem
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error creating gallery item',
      error: error.message
    });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    let item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: item
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating gallery item',
      error: error.message
    });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting gallery item',
      error: error.message
    });
  }
};
