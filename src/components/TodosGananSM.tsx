const TodosGananSM = () => {
  return (
    <div id="todos-ganan">
      <div
        className="sm:hidden md:hidden md:container px-4 mx-auto mt-7 bg-todos-ganan"
        style={{ marginTop: 147, display: "none" }}//Se pidió ocultar esta sección, reconsiderar en un futuro
      >
        <h2 className="text-center">
          <span className="text-4xl text-green-800 font-bold">Todos </span>
          <span className="text-4xl text-yellow-500 underline">Ganan</span>
        </h2>
        <div className="row">
          <div className="col-auto mt-5">
            <img
              src="assets/nuevo/todos ganan corregidos-01.png"
              alt="todosganan.png"
              width="150px"
              style={{ margin: "0 auto" }}
            />
            <p
              className="mt-3 text-orange-800 text-center text-md font-family-text"
              style={{ width: "75%", margin: "0 auto", fontSize: 12 }}
            >
              <span className="text-orange-800 font-bold">Genera ingresos</span>{" "}
              adicionales por rentar fuera del tiempo que te pertenece.
            </p>
          </div>
          <div className="col-auto mt-5">
            <img
              src="assets/nuevo/todos ganan corregidos-02.png"
              alt="todosganan.png"
              width="150px"
              style={{ margin: "0 auto" }}
            />
            <p
              className="mt-3 text-orange-800 text-center text-md font-family-text"
              style={{ width: "75%", margin: "0 auto", fontSize: 12 }}
            >
              <span className="text-orange-800 font-bold">Genera ingresos</span>{" "}
              adicionales por rentar fuera del tiempo que te pertenece.
            </p>
          </div>
          <div className="col-auto mt-5">
            <img
              src="assets/nuevo/todos ganan corregidos-03.png"
              alt="todosganan.png"
              width="150px"
              style={{ margin: "0 auto" }}
            />
            <p
              className="mt-3 text-orange-800 text-center text-md font-family-text"
              style={{ width: "75%", margin: "0 auto", fontSize: 12 }}
            >
              <span className="text-orange-800 font-bold">Genera ingresos</span>{" "}
              adicionales por rentar fuera del tiempo que te pertenece.
            </p>
          </div>
          <div className="col-auto mt-5">
            <img
              src="assets/nuevo/todos ganan corregidos-04.png"
              alt="todosganan.png"
              width="150px"
              style={{ margin: "0 auto" }}
            />
            <p
              className="mt-3 text-orange-800 text-center text-md font-family-text"
              style={{ width: "75%", margin: "0 auto", fontSize: 12 }}
            >
              <span className="text-orange-800 font-bold">Genera ingresos</span>{" "}
              adicionales por rentar fuera del tiempo que te pertenece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosGananSM;
