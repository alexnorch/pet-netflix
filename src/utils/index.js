export const displayAverage = (rating) => {
    if (rating <= 4) {
      return "low";
    } else if (rating > 4 && rating <= 7) {
      return "medium";
    } else if (rating > 7) {
      return "high";
    }
  };

export const displayType = (type) => {
    switch (type) {
      case "upcoming":
        return "Upcoming movies";
      case "now_playing":
        return "New movies";
      case "popular":
        return "Popular movies";
      default:
        return 'Other movies'
    }
  };