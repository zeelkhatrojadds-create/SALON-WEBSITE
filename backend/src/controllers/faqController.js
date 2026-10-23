import Faq from '../models/Faq.js';

export const getFaqs = async (req, res) => {
  try {
    const { category, published } = req.query;
    const filter = {};

    if (category && category !== 'all') filter.category = category;
    if (published !== undefined) filter.isPublished = published === 'true';

    const faqs = await Faq.find(filter).sort({ displayOrder: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching FAQs',
      error: error.message
    });
  }
};

export const getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching FAQ',
      error: error.message
    });
  }
};

export const createFaq = async (req, res) => {
  try {
    const { question, answer, category, categoryLabel, isPublished, serviceId, serviceLink, displayOrder } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both question and answer'
      });
    }

    const faq = await Faq.create({
      question,
      answer,
      category: category || 'booking',
      categoryLabel: categoryLabel || 'General',
      isPublished: isPublished !== false,
      serviceId: serviceId || '',
      serviceLink: serviceLink || '',
      displayOrder: Number(displayOrder) || 1
    });

    return res.status(201).json({
      success: true,
      data: faq
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error creating FAQ',
      error: error.message
    });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating FAQ',
      error: error.message
    });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting FAQ',
      error: error.message
    });
  }
};
