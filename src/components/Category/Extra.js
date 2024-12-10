export const buildQueryString = (filters, page, search, sort) => {
  const query = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (typeof value === 'object') {
      if (value.from !== undefined && value.to !== undefined) {
        query.append(key, `${value.from}-${value.to}`);
      } else if (value.eq !== undefined) {
        query.append(key, value.eq);
      }
    } else {
      query.append(key, value);
    }
  });

  // Adding static or dynamic parameters
  query.append('page', String(page || '1'));
  if (search) query.append('search', search);
  if (sort) query.append('sort', sort);

  return query.toString();
};


export const styles = {
  filterButton: {
    margin: "5px",
    padding: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
};