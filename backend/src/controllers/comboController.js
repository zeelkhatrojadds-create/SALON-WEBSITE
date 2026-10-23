import ComboPackage from '../models/ComboPackage.js';

export const getComboPackages = async (req, res) => {
  try {
    const { active, published } = req.query;
    const filter = {};
    if (active !== undefined) filter.active = active === 'true';
    if (published !== undefined) filter.isPublished = published === 'true';

    const packages = await ComboPackage.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching combo packages',
      error: error.message
    });
  }
};

export const getComboPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const combo = await ComboPackage.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }]
    });

    if (!combo) {
      return res.status(404).json({
        success: false,
        message: 'Combo package not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: combo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching combo package',
      error: error.message
    });
  }
};

export const createComboPackage = async (req, res) => {
  try {
    const { name, comboPrice, serviceIds } = req.body;

    if (!name || comboPrice === undefined || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide package name, combo price, and at least one service'
      });
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newCombo = await ComboPackage.create({
      ...req.body,
      slug
    });

    return res.status(201).json({
      success: true,
      message: 'Combo package created successfully',
      data: newCombo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error creating combo package',
      error: error.message
    });
  }
};

export const updateComboPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ComboPackage.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Combo package not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Combo package updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating combo package',
      error: error.message
    });
  }
};

export const deleteComboPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ComboPackage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Combo package not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Combo package removed successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting combo package',
      error: error.message
    });
  }
};
