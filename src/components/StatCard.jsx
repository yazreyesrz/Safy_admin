const StatCard = ({ title, value }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title fw-semibold">{title}</h5>
          <h3 className="card-text mt-2">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
