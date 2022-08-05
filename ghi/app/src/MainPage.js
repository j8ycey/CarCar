function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">J&J's Car Emporium</h1>
      <div className="col-lg-6 mx-auto">
        <div className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </div>
      </div>
      <img src="/cars.png" height="450" />
      <div><small>Image courtesy of Dalle</small></div>
    </div>
  );
}

export default MainPage;
