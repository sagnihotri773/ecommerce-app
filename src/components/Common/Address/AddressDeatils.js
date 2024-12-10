export const AddressDetail = ({ data, title }) => {
  const {
    firstname,
    lastname,
    city,
    street,
    region,
    region_id,
    postcode,
    country_code,
    telephone,
  } = data;
  return (
    <>
      <strong>{title}</strong>
      <address>
        <div>
          {firstname} {lastname}
        </div>
        <div>{city}</div>
        <div>
          {street[0] || street[1]}, {region || region_id}, {postcode}
        </div>
        <div>{country_code}</div>
        <div>T: {telephone}</div>
      </address>
    </>
  );
};
