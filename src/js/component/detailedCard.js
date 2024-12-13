import React from "react";

const DetailedCard = () => {

    return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-4 text-center">
            <img
              src="https://nsabers.es/cdn/shop/articles/opolar_httpss.mj.runWO-xsj2B4pM_A_super_realistic_portrait_of_d96eeb79-b220-46ac-9305-fe7a83dfaf4f_0.png?v=1722400402"
              alt="Character"
              className="img-fluid p-3"
            />
          </div>
          <div className="col-md-8 p-4">
            <h2 className="mb-3">Luke Skywalker</h2>
            <p className="text-muted">
            Luke Skywalker fue un legendario héroe de guerra y Jedi que fundó la Nueva Orden Jedi. Era el hijo del Caballero
            Jedi Anakin Skywalker y la senadora Padmé Amidala de Naboo, además hermano mellizo de Leia Organa.
            </p>
            <button className="btn btn-primary float-end">
              Favorites <span className="badge bg-secondary">0</span>
            </button>
          </div>
        </div>
        <hr />
        <div className="row text-center text-danger mt-3">
          <div className="col">
            <p><strong>Name</strong></p>
            <p>Luke Skywalker</p>
          </div>
          <div className="col">
            <p><strong>Birth Year</strong></p>
            <p>19BBY</p>
          </div>
          <div className="col">
            <p><strong>Gender</strong></p>
            <p>Male</p>
          </div>
          <div className="col">
            <p><strong>Height</strong></p>
            <p>172</p>
          </div>
          <div className="col">
            <p><strong>Skin Color</strong></p>
            <p>Fair</p>
          </div>
          <div className="col">
            <p><strong>Eye Color</strong></p>
            <p>Blue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
