import { Link, useRouteError } from "react-router-dom";
const ErrorView = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="text-lg mt-6">Halaman tidak ditemukan</p>
          <div className="mt-6">
            <Link to="/" className="btn btn-primary">
              Kembali ke halaman utama
            </Link>
          </div>
        </div>
      </main>
    );
  } else if (error.status === 500) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">500</h1>
          <p className="text-lg mt-6">Terjadi kesalahan pada server</p>
        </div>
      </main>
    );
  } else if (error.status === 401 || error.status === 403) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">401</h1>
          <p className="text-lg mt-6">Anda tidak mmemiliki akses</p>
          <div className="mt-6">
            <Link to="/" className="btn btn-primary">
              Kembali ke halaman utama
            </Link>
          </div>
        </div>
      </main>
    );
  }
};

export default ErrorView;
