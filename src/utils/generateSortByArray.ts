export default function generateSortByArray() {
  return [
    { label: "Most Popular", value: "popularity.desc" },
    { label: "Least Popular", value: "popularity.asc" },
    { label: "Most Rated", value: "vote_average.desc" },
    { label: "Least Rated", value: "vote_average.asc" },
    { label: "Most Voted", value: "vote_count.desc" },
    { label: "Least Voted", value: "vote_count.asc" },
    { label: "Most Profitable", value: "revenue.desc" },
    { label: "Least Profitable", value: "revenue.asc" },
    { label: "A-Z", value: "original_title.desc" },
    { label: "Z-A", value: "original_title.asc" },
    { label: "Oldest", value: "primary_release_date.asc" },
    { label: "Newest", value: "primary_release_date.desc" },
  ];
}
