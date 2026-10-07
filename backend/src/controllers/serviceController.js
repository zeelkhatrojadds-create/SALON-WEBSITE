import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const { category, active } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (active !== undefined) filter.active = active === 'true';

    const services = await Service.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching services',
      error: error.message
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching service',
      error: error.message
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, category, price, duration, description, features, image, active, popular, tag } = req.body;

    if (!name || !category || price === undefined || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, price, and duration'
      });
    }

    const service = await Service.create({
      name,
      category,
      categoryName: category,
      price: Number(price),
      duration,
      description: description || '',
      features: features || [],
      image: image || '',
      active: active !== undefined ? active : true,
      popular: popular || false,
      tag: tag || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error creating service',
      error: error.message
    });
  }
};

export const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating service',
      error: error.message
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    await service.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting service',
      error: error.message
    });
  }
};
