import React from "react";

const AboutView = () => {
  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Tentang Aplikasi</h1>
          <p className="text-lg text-base-content/70">
            E-commerce Modern dengan Teknologi Terdepan
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Project Overview */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <span className="text-primary">📱</span>
                Project Overview
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                Aplikasi e-commerce ini dikembangkan menggunakan <strong>MERN Stack</strong> 
                (MongoDB, Express.js, React.js, Node.js) sebagai project latihan untuk 
                memahami full-stack web development.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                Project ini bertujuan untuk mengimplementasikan fitur-fitur umum 
                dalam e-commerce seperti manajemen produk, sistem autentikasi, 
                keranjang belanja, dan sistem pembayaran.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <span className="text-secondary">⚡</span>
                Tech Stack
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="badge badge-primary">Frontend</div>
                  <span>React.js, React Router, Redux Toolkit</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="badge badge-secondary">Backend</div>
                  <span>Node.js, Express.js</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="badge badge-accent">Database</div>
                  <span>MongoDB</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="badge badge-success">Styling</div>
                  <span>Tailwind CSS, DaisyUI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="card-body text-center">
                <div className="text-4xl mb-3">🛍️</div>
                <h3 className="font-bold text-lg">Katalog Produk</h3>
                <p className="text-sm text-base-content/70">
                  Browse dan filter produk dengan kategori yang beragam
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
              <div className="card-body text-center">
                <div className="text-4xl mb-3">🛒</div>
                <h3 className="font-bold text-lg">Keranjang Belanja</h3>
                <p className="text-sm text-base-content/70">
                  Kelola item belanja dengan mudah dan intuitif
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <div className="card-body text-center">
                <div className="text-4xl mb-3">👤</div>
                <h3 className="font-bold text-lg">User Management</h3>
                <p className="text-sm text-base-content/70">
                  Sistem registrasi, login, dan manajemen profil user
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <div className="card-body text-center">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="font-bold text-lg">Payment Gateway</h3>
                <p className="text-sm text-base-content/70">
                  Integrasi Midtrans untuk pembayaran yang aman
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
              <div className="card-body text-center">
                <div className="text-4xl mb-3">🖼️</div>
                <h3 className="font-bold text-lg">Image Storage</h3>
                <p className="text-sm text-base-content/70">
                  Cloudinary untuk penyimpanan dan optimasi gambar
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-error/10 to-error/5 border border-error/20">
              <div className="card-body text-center">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="font-bold text-lg">Admin Panel</h3>
                <p className="text-sm text-base-content/70">
                  Dashboard admin untuk mengelola produk dan pesanan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="card-body">
              <h3 className="card-title text-xl">
                <span className="text-2xl">💰</span>
                Midtrans Integration
              </h3>
              <p className="text-base-content/80 mb-4">
                Menggunakan Midtrans sebagai payment gateway untuk memproses pembayaran online:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Support multiple payment methods</li>
                <li>Secure payment processing</li>
                <li>Real-time payment notification</li>
                <li>Transaction history tracking</li>
              </ul>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="card-body">
              <h3 className="card-title text-xl">
                <span className="text-2xl">☁️</span>
                Cloudinary Integration
              </h3>
              <p className="text-base-content/80 mb-4">
                Menggunakan Cloudinary untuk manajemen file gambar:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Automatic image optimization</li>
                <li>Multiple format support</li>
                <li>CDN delivery untuk performa</li>
                <li>Image transformation capabilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-12">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              <span className="text-2xl">🎯</span>
              Tujuan Pembelajaran
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Backend Development:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80">
                  <li>RESTful API development</li>
                  <li>Database design dan modeling</li>
                  <li>Authentication & authorization</li>
                  <li>File upload handling</li>
                  <li>Third-party API integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Frontend Development:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80">
                  <li>React component architecture</li>
                  <li>State management dengan Redux</li>
                  <li>React Router implementation</li>
                  <li>Responsive UI design</li>
                  <li>Form handling & validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="divider">💻</div>
          <p className="text-base-content/60 italic">
            "This project is created for educational purposes and skill development in full-stack web development."
          </p>
          <div className="mt-4">
            <div className="badge badge-outline">Learning Project</div>
            <div className="badge badge-outline ml-2">MERN Stack</div>
            <div className="badge badge-outline ml-2">2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;