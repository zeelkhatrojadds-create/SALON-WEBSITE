import Offer from '../models/Offer.js';

export const getOffers = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active !== undefined) filter.active = active === 'true';

    const offers = await Offer.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: offers.length,
      data: offers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching offers',
      error: error.message
    });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: offer
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching offer',
      error: error.message
    });
  }
};

export const createOffer = async (req, res) => {
  try {
    const { title, description, discount, startDate, endDate, active } = req.body;

    if (!title || !discount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and discount'
      });
    }

    const offer = await Offer.create({
      title,
      description: description || '',
      discount,
      startDate: startDate || Date.now(),
      endDate,
      active: active !== undefined ? active : true
    });

    return res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: offer
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error creating offer',
      error: error.message
    });
  }
};

export const updateOffer = async (req, res) => {
  try {
    let offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Offer updated successfully',
      data: offer
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating offer',
      error: error.message
    });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    await offer.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Offer deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting offer',
      error: error.message
    });
  }
};
