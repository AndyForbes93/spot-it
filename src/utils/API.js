import axios from "axios";

export default {
  // Gets all reviews
  getReviews: function() {
    return axios.get("/api/");
  },
  
  // Saves a review to the database
  saveReview: function(reviewData) {
    return axios.post("/api/", reviewData);
  }
};
