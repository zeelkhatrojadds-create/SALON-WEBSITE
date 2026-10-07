import Review from '../models/Review.js';

export const getReviews = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) {
      if (status !== 'all') {
        filter.status = status;
      }
    } else {
      filter.status = 'approved';
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error fetching reviews',
      error: error.message
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { customerName, rating, review } = req.body;

    if (!customerName || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerName, rating (1-5), and review'
      });
    }

    const newReview = await Review.create({
      customerName: customerName.trim(),
      rating: Number(rating),
      review: review.trim(),
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully! Pending moderation.',
      data: newReview
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error submitting review',
      error: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    let reviewItem = await Review.findById(req.params.id);
    if (!reviewItem) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    reviewItem = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: reviewItem
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error updating review',
      error: error.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewItem = await Review.findById(req.params.id);
    if (!reviewItem) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await reviewItem.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error deleting review',
      error: error.message
    });
  }
};
