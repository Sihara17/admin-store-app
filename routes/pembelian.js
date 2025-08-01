const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua pembelian
router.get('/', (req, res) => {
  db.query(
    'SELECT pembelian.*, produk.nama FROM pembelian JOIN produk ON pembelian.produk_id = produk.id',
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.<!-- admin-store-app/views/pembelian.ejs -->
<% layout('layout') -%>

<h2>Riwayat Pembelian</h2>
<table>
  <tr>
    <th>ID</th>
    <th>Produk</th>
    <th>Jumlah</th>
    <th>Tanggal</th>
    <th>Status</th>
    <th>Aksi</th>
  </tr>
  <% pembelian.forEach(p => { %>
    <tr>
      <td><%= p.id %></td>
      <td><%= p.nama_produk %></td>
      <td><%= p.jumlah %></td>
      <td><%= p.tanggal %></td>
      <td><%= p.status %></td>
      <td>
        <% if (p.status === 'selesai') { %>
          <form action="/pembelian/<%= p.id %>/cancel" method="POST" style="display:inline">
            <button type="submit">Cancel</button>
          </form>
        <% } else { %>
          -
        <% } %>
      </td>
    </tr>
  <% }) %>
</table>

<h3>Tambah Pembelian</h3>
<form action="/pembelian" method="POST">
  <label>Produk:</label>
  <select name="produk_id">
    <% produk.forEach(pr => { %>
      <option value="<%= pr.id %>"><%= pr.nama %></option>
    <% }) %>
  </select>
  <label>Jumlah:</label>
  <input type="number" name="jumlah" required>
  <button type="submit">Beli</button>
</form>
<form action="/pembelian/<%= pembelian.id %>/cancel" method="POST" style="display:inline;">
  <button type="submit" onclick="return confirm('Yakin ingin membatalkan pembelian ini?')">Batalkan</button>
</form>
