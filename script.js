/* ===== DATA MENU ===== */
const NOMOR_WA = "6281263589001";

const tea = [
  { nama: "TEH RACIK",    harga: 5000,  foto: "poto1/TEH RACIK.jpg" },
  { nama: "LEMON TEA",    harga: 8000,  foto: "poto1/LEMON TEA.jpg" },
  { nama: "JERUK SEGAR",  harga: 8000,  foto: "poto1/JERUK SEGAR.jpg" },
  { nama: "TEH KAMPUL",   harga: 10000, foto: "poto1/TEH KAMPUL.jpg" },
  { nama: "MELON TEA",    harga: 10000, foto: "poto1/MELON TEA.jpg" },
  { nama: "LYCHEE TEA",   harga: 10000, foto: "poto1/LYCHEE TEA.jpg" },
  { nama: "MANGO FRUIT",  harga: 10000, foto: "poto1/MANGO FRUIT.jpg" },
  { nama: "THAI TEA",     harga: 12000, foto: "poto1/THAI TEA.jpg" },
  { nama: "GREEN TEA",    harga: 12000, foto: "poto1/GREEN TEA.jpg" },
  { nama: "MATCHA LATTE", harga: 13000, foto: "poto1/MATCHA LATTE.jpg" },
  { nama: "MILO TEA",     harga: 13000, foto: "poto1/MILO TEA.jpg" }
];

const non = [
  { nama: "KOPI AREN",       harga: 13000, foto: "poto1/KOPI AREN.jpg" },
  { nama: "KOPI SUSU",       harga: 13000, foto: "poto1/KOPI SUSU.jpg" },
  { nama: "DARK CHOCOLATE",  harga: 13000, foto: "poto1/DARK CHOCOLATE.jpg" },
  { nama: "TARO MACCHIATTO", harga: 13000, foto: "poto1/TARO MACCHIATTO.jpg" }
];

const HARGA_MIE = 12000;
const menu = { tea, non };
let cart = [];

/* ===== HELPER ===== */
const rupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");
const labelHarga = (angka) => angka / 1000 + "k";
const hitungTotal = () => cart.reduce((jumlah, item) => jumlah + item.harga, 0);

/* ===== RENDER MENU ===== */
function buatCard(item, index, tipe) {
  return `
    <div class="card" onclick="tambah('${tipe}', ${index})">
      <span class="badge-harga">${labelHarga(item.harga)}</span>
      <div class="img-wrap"><img src="${item.foto}" alt="${item.nama}"></div>
      <div class="info"><p>${item.nama}</p><b>+ Pesan</b></div>
    </div>`;
}

function renderMenu() {
  document.getElementById("teaGrid").innerHTML =
    tea.map((item, i) => buatCard(item, i, "tea")).join("");
  document.getElementById("nonGrid").innerHTML =
    non.map((item, i) => buatCard(item, i, "non")).join("");
}

/* ===== KERANJANG ===== */
function tambah(tipe, index) {
  const item = menu[tipe][index];
  cart.push({ nama: item.nama, harga: item.harga });
  updateCart();
}

function addMie(level) {
  cart.push({ nama: "MIE XP LVL " + level, harga: HARGA_MIE });
  updateCart();
}

function hapus(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const box = document.getElementById("cartBox");

  if (cart.length === 0) {
    box.textContent = "Belum ada pesanan ji";
  } else {
    box.innerHTML = cart.map((item, i) => `
      <div class="cart-row">
        <span>${item.nama}</span>
        <span>${rupiah(item.harga)}
          <b class="hapus" onclick="hapus(${i})">x</b>
        </span>
      </div>`).join("");
  }

  document.getElementById("total").textContent = rupiah(rupiah ? hitungTotal() : 0);
}

/* ===== PESAN VIA WHATSAPP ===== */
function pesanWA() {
  if (cart.length === 0) {
    alert("Pilih dulu ji");
    return;
  }

  const daftar = cart.map((item) => `- ${item.nama}`).join("\n");
  const pesan = `Halo MISTEA\n${daftar}\nTotal ${rupiah(hitungTotal())}`;

  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`, "_blank");
}

renderMenu();