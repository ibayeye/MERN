import React, { useEffect, useState, useCallback } from "react";
import { priceFormat } from "../utils";
import customAPI from "../api";
import NewPagination from "./NewPagination";
import AddProductModal from "./Modals/AddProductModal";
import EditProductModal from "./Modals/EditProductModal";

const TableAdmin = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      const { data } = await customAPI.get(`/product?limit=5&page=${page}`);
      setProducts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const handleEditProduct = (id) => {
    setSelectedProduct(id);
    setIsEditModalOpen(true);
  };
  const handleDeleteProduct = async (id) => {
    try {
      await customAPI.delete(`/product/${id}`);
      fetchProducts(currentPage);
    } catch (err) {
      console.error("Gagal hapus produk", err);
    }
  };

  return (
    <div>
      <div className="flex justify-end py-1">
        <button
          className="btn btn-success btn-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Produk
        </button>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchProducts(currentPage)}
      />

      <div className="flex flex-col justify-center items-center gap-4">
        <div className="overflow-x-auto border border-base-content/5 bg-base-100">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <td>No</td>
                <td>Nama Produk</td>
                <td>Harga</td>
                <td>Deskripsi</td>
                <td>Kategori</td>
                <td>Stok</td>
                <td>Gambar</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{priceFormat(item.price)}</td>
                  <td>{item.description}</td>
                  <td className="capitalize">{item.category}</td>
                  <td>{item.stock}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-full object-cover"
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditProduct(item._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-error"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => fetchProducts(currentPage)}
        productId={selectedProduct}
      />
      <div className="flex justify-center items-center mt-2">
        <NewPagination
          currentPage={pagination.page}
          totalPage={pagination.totalPage}
          handlePageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default TableAdmin;
