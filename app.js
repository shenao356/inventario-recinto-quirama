/**
 * Hotel Recinto Quirama - Comfenalco Antioquia
 * Sistema de Control de Inventario de Habitaciones
 * app.js - Versión 5.0 (Soporte Completo para Bloques A-D y Casitas E-I)
 */

// ==============================================================
// 1. CONFIGURACIÓN Y CATÁLOGO ESTÁNDAR PREDETERMINADO
// ==============================================================
const DEFAULT_CATALOG = [
  { id: 'cat-1', name: 'Sombrilla de cortesía', category: 'Accesorios de Habitación', standardQty: 1 },
  { id: 'cat-2', name: 'Cesta plástica de ropa / aseo', category: 'Accesorios de Habitación', standardQty: 1 },
  { id: 'cat-3', name: 'Control remoto de TV', category: 'Tecnología', standardQty: 1 },
  { id: 'cat-4', name: 'Control remoto de decodificador', category: 'Tecnología', standardQty: 1 },
  { id: 'cat-5', name: 'Televisor pantalla plana', category: 'Tecnología', standardQty: 1 },
  { id: 'cat-6', name: 'Decodificador TV cable', category: 'Tecnología', standardQty: 1 },
  { id: 'cat-7', name: 'Toallas de mano', category: 'Lencería y Baño', standardQty: 2 },
  { id: 'cat-8', name: 'Toalla de pie (salida de baño)', category: 'Lencería y Baño', standardQty: 1 },
  { id: 'cat-9', name: 'Toalla de rodapié', category: 'Lencería y Baño', standardQty: 1 },
  { id: 'cat-10', name: 'Toallas de cuerpo / baño', category: 'Lencería y Baño', standardQty: 2 },
  { id: 'cat-11', name: 'Almohadas con funda', category: 'Ropa de Cama', standardQty: 4 },
  { id: 'cat-12', name: 'Cobija / Plumón térmico', category: 'Ropa de Cama', standardQty: 2 },
  { id: 'cat-13', name: 'Juego de sábanas y sobre-sábana', category: 'Ropa de Cama', standardQty: 1 },
  { id: 'cat-14', name: 'Secador de cabello', category: 'Electrodomésticos', standardQty: 1 },
  { id: 'cat-15', name: 'Vasos de vidrio para agua', category: 'Menaje', standardQty: 2 },
  { id: 'cat-16', name: 'Ganchos de ropa en clóset', category: 'Mobiliario', standardQty: 6 },
  { id: 'cat-17', name: 'Papelera de baño con pedal', category: 'Aseo y Baño', standardQty: 1 },
  { id: 'cat-18', name: 'Papelera de habitación', category: 'Accesorios de Habitación', standardQty: 1 },
  { id: 'cat-19', name: 'Directorio telefónico y menú', category: 'Información', standardQty: 1 },
  { id: 'cat-20', name: 'Dispensador de jabón y champú', category: 'Aseo y Baño', standardQty: 1 }
];

// LISTA OFICIAL DE HABITACIONES DEL HOTEL RECINTO QUIRAMA (COMFENALCO)
const QUIRAMA_OFFICIAL_ROOMS = [
  // Bloque A (7 habitaciones)
  { id: 'A1', name: 'A1', block: 'Bloque A', type: 'Estándar Colonial' },
  { id: 'A2', name: 'A2', block: 'Bloque A', type: 'Estándar Colonial' },
  { id: 'A3', name: 'A3', block: 'Bloque A', type: 'Estándar Colonial' },
  { id: 'A4', name: 'A4', block: 'Bloque A', type: 'Estándar Colonial' },
  { id: 'A5', name: 'A5', block: 'Bloque A', type: 'Estándar Colonial' },
  { id: 'A6', name: 'A6', block: 'Bloque A', type: 'Estándar Colonial' },
  { id: 'A7', name: 'A7', block: 'Bloque A', type: 'Estándar Colonial' },

  // Bloque B (8 habitaciones)
  { id: 'B1', name: 'B1', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B2', name: 'B2', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B3', name: 'B3', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B4', name: 'B4', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B5', name: 'B5', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B6', name: 'B6', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B7', name: 'B7', block: 'Bloque B', type: 'Estándar Colonial' },
  { id: 'B8', name: 'B8', block: 'Bloque B', type: 'Estándar Colonial' },

  // Bloque C (8 habitaciones)
  { id: 'C1', name: 'C1', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C2', name: 'C2', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C3', name: 'C3', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C4', name: 'C4', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C5', name: 'C5', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C6', name: 'C6', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C7', name: 'C7', block: 'Bloque C', type: 'Estándar Colonial' },
  { id: 'C8', name: 'C8', block: 'Bloque C', type: 'Estándar Colonial' },

  // Bloque D (8 habitaciones)
  { id: 'D1', name: 'D1', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D2', name: 'D2', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D3', name: 'D3', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D4', name: 'D4', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D5', name: 'D5', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D6', name: 'D6', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D7', name: 'D7', block: 'Bloque D', type: 'Estándar Colonial' },
  { id: 'D8', name: 'D8', block: 'Bloque D', type: 'Estándar Colonial' },

  // Casita E (5 habitaciones)
  { id: 'E1', name: 'E1', block: 'Casita E', type: 'Casita Campestre' },
  { id: 'E2', name: 'E2', block: 'Casita E', type: 'Casita Campestre' },
  { id: 'E3', name: 'E3', block: 'Casita E', type: 'Casita Campestre' },
  { id: 'E4', name: 'E4', block: 'Casita E', type: 'Casita Campestre' },
  { id: 'E5', name: 'E5', block: 'Casita E', type: 'Casita Campestre' },

  // Casita F (5 habitaciones)
  { id: 'F1', name: 'F1', block: 'Casita F', type: 'Casita Campestre' },
  { id: 'F2', name: 'F2', block: 'Casita F', type: 'Casita Campestre' },
  { id: 'F3', name: 'F3', block: 'Casita F', type: 'Casita Campestre' },
  { id: 'F4', name: 'F4', block: 'Casita F', type: 'Casita Campestre' },
  { id: 'F5', name: 'F5', block: 'Casita F', type: 'Casita Campestre' },

  // Casita G (7 habitaciones: G1, G2, G3, G5, G6, G7, G8)
  { id: 'G1', name: 'G1', block: 'Casita G', type: 'Casita Campestre' },
  { id: 'G2', name: 'G2', block: 'Casita G', type: 'Casita Campestre' },
  { id: 'G3', name: 'G3', block: 'Casita G', type: 'Casita Campestre' },
  { id: 'G5', name: 'G5', block: 'Casita G', type: 'Casita Campestre' },
  { id: 'G6', name: 'G6', block: 'Casita G', type: 'Casita Campestre' },
  { id: 'G7', name: 'G7', block: 'Casita G', type: 'Casita Campestre' },
  { id: 'G8', name: 'G8', block: 'Casita G', type: 'Casita Campestre' },

  // Casita H (5 habitaciones)
  { id: 'H1', name: 'H1', block: 'Casita H', type: 'Casita Campestre' },
  { id: 'H2', name: 'H2', block: 'Casita H', type: 'Casita Campestre' },
  { id: 'H3', name: 'H3', block: 'Casita H', type: 'Casita Campestre' },
  { id: 'H4', name: 'H4', block: 'Casita H', type: 'Casita Campestre' },
  { id: 'H5', name: 'H5', block: 'Casita H', type: 'Casita Campestre' },

  // Casita I (3 habitaciones)
  { id: 'I1', name: 'I1', block: 'Casita I', type: 'Casita Campestre' },
  { id: 'I2', name: 'I2', block: 'Casita I', type: 'Casita Campestre' },
  { id: 'I3', name: 'I3', block: 'Casita I', type: 'Casita Campestre' }
];

const DEFAULT_SETTINGS = {
  hotelName: 'Hotel Recinto Quirama',
  entityName: 'Comfenalco Antioquia',
  department: 'Departamento de Ama de Llaves y Habitaciones',
  location: 'El Carmen de Viboral - Rionegro, Antioquia',
  logo: null,
  catalog: DEFAULT_CATALOG
};

// ==============================================================
// 2. ESTADO GLOBAL
// ==============================================================
let appSettings = {};
let appRooms = {};
let currentRoomId = 'A1';
let currentSearchTerm = '';

const STORAGE_SETTINGS_KEY = 'quirama_hotel_settings_v5';
const STORAGE_ROOMS_KEY = 'quirama_hotel_rooms_v5';

// ==============================================================
// 3. INICIALIZACIÓN
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadRooms();
  populateRoomSelect();
  renderActiveRoom();
  updateGlobalStats();
  initLucide();
  setCurrentDateTime();
});

function initLucide() {
  try {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  } catch (err) {
    console.warn('Icon render notice:', err);
  }
}

function safeUpper(str, fallback = '') {
  if (typeof str !== 'string' || !str) return fallback;
  return str.toUpperCase();
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_SETTINGS_KEY) || localStorage.getItem('quirama_hotel_settings_v4');
    if (saved) {
      appSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } else {
      appSettings = { ...DEFAULT_SETTINGS };
      saveSettingsToStorage();
    }
  } catch (e) {
    console.error('Error cargando ajustes:', e);
    appSettings = { ...DEFAULT_SETTINGS };
  }
  applySettingsToUI();
}

function saveSettingsToStorage() {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(appSettings));
  } catch (e) {
    console.error('Error guardando ajustes:', e);
  }
}

function applySettingsToUI() {
  const headerTitle = document.getElementById('header-hotel-title');
  if (headerTitle) headerTitle.textContent = appSettings.hotelName || 'Hotel Recinto Quirama';

  const headerSub = document.getElementById('header-hotel-subtitle');
  if (headerSub) {
    headerSub.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></span>${appSettings.entityName || 'Comfenalco Antioquia'} · Control de Inventario`;
  }

  const logoSrc = appSettings.logo || 'logo-default.svg';
  const headerLogo = document.getElementById('hotel-header-logo');
  if (headerLogo) headerLogo.src = logoSrc;

  const previewLogo = document.getElementById('settings-logo-preview');
  if (previewLogo) previewLogo.src = logoSrc;

  const printLogo = document.getElementById('print-logo');
  if (printLogo) printLogo.src = logoSrc;

  const printHotel = document.getElementById('print-hotel-name');
  if (printHotel) printHotel.textContent = safeUpper(appSettings.hotelName, 'HOTEL RECINTO QUIRAMA');

  const printEntity = document.getElementById('print-hotel-entity');
  if (printEntity) printEntity.textContent = safeUpper(appSettings.entityName, 'COMFENALCO ANTIOQUIA');

  const printDept = document.getElementById('print-hotel-dept');
  if (printDept) printDept.textContent = safeUpper(appSettings.department, 'DEPARTAMENTO DE AMA DE LLAVES');
}

// Carga las habitaciones oficiales de Recinto Quirama
function loadRooms() {
  try {
    const saved = localStorage.getItem(STORAGE_ROOMS_KEY);
    if (saved) {
      appRooms = JSON.parse(saved);
    } else {
      generateOfficialQuiramaRooms();
    }
  } catch (e) {
    console.error('Error cargando habitaciones:', e);
    generateOfficialQuiramaRooms();
  }

  const roomKeys = Object.keys(appRooms);
  if (roomKeys.length > 0 && !appRooms[currentRoomId]) {
    currentRoomId = roomKeys[0];
  }
}

function generateOfficialQuiramaRooms() {
  appRooms = {};
  QUIRAMA_OFFICIAL_ROOMS.forEach(def => {
    appRooms[def.id] = createRoomInstance(def.id, def.name, def.block, def.type);
  });
  saveRoomsToStorage();
}

function createRoomInstance(id, name, block, type) {
  const catalog = appSettings.catalog || DEFAULT_CATALOG;
  const items = catalog.map((item, idx) => ({
    id: `item-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
    name: item.name,
    category: item.category,
    standardQty: item.standardQty,
    actualQty: item.standardQty,
    status: 'Completo / Buen estado',
    observation: ''
  }));

  return {
    id: id,
    name: name || id,
    block: block || 'General',
    type: type || 'Estándar Colonial',
    housekeeper: '',
    auditor: '',
    date: new Date().toISOString().slice(0, 16),
    status: 'pending',
    notes: '',
    items: items
  };
}

function saveRoomsToStorage() {
  try {
    localStorage.setItem(STORAGE_ROOMS_KEY, JSON.stringify(appRooms));
  } catch (e) {
    console.error('Error guardando habitaciones:', e);
  }
}

// ==============================================================
// 4. SINCRONIZACIÓN Y GUARDADO DE DATOS (DOM -> ESTADO)
// ==============================================================
function syncCurrentRoomFromDOM() {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const nameInput = document.getElementById('room-name-input');
  if (nameInput) room.name = nameInput.value.trim() || room.id;

  const blockInput = document.getElementById('room-block-input');
  if (blockInput) room.block = blockInput.value.trim() || 'General';

  const hkInput = document.getElementById('room-housekeeper-input');
  if (hkInput) room.housekeeper = hkInput.value.trim();

  const audInput = document.getElementById('room-auditor-input');
  if (audInput) room.auditor = audInput.value.trim();

  const dateInput = document.getElementById('room-date-input');
  if (dateInput && dateInput.value) room.date = dateInput.value;

  const notesInput = document.getElementById('room-general-notes');
  if (notesInput) room.notes = notesInput.value.trim();

  recalculateRoomStatus(room);
}

function saveCurrentRoomManual() {
  try {
    syncCurrentRoomFromDOM();
    saveRoomsToStorage();
    populateRoomSelect();
    updateGlobalStats();
    renderActiveRoom();

    const saveBtn = document.getElementById('btn-save-room');
    if (saveBtn) {
      const originalHTML = saveBtn.innerHTML;
      saveBtn.innerHTML = `
        <i data-lucide="check-circle" class="w-4 h-4 text-white"></i>
        <span>¡Guardado Exitoso!</span>
      `;
      saveBtn.classList.remove('bg-brand-600', 'hover:bg-brand-700');
      saveBtn.classList.add('bg-emerald-800');
      initLucide();

      setTimeout(() => {
        saveBtn.innerHTML = originalHTML;
        saveBtn.classList.remove('bg-emerald-800');
        saveBtn.classList.add('bg-brand-600', 'hover:bg-brand-700');
        initLucide();
      }, 2000);
    }

    const room = appRooms[currentRoomId];
    showToast(`✅ ${room.name || currentRoomId} (${room.block}) guardada`, 'success');
  } catch (err) {
    console.error('Error guardando:', err);
    alert('Error al guardar: ' + err.message);
  }
}

// Edición en vivo del nombre y bloque desde la tarjeta principal
function updateCurrentRoomName(newName) {
  const room = appRooms[currentRoomId];
  if (!room) return;
  room.name = newName.trim() || room.id;
  saveRoomsToStorage();
  populateRoomSelect();
}

function updateCurrentRoomBlock(newBlock) {
  const room = appRooms[currentRoomId];
  if (!room) return;
  room.block = newBlock.trim() || 'General';
  saveRoomsToStorage();
  populateRoomSelect();
}

// ==============================================================
// 5. NAVEGACIÓN Y SELECTOR AGRUPADO POR BLOQUES Y CASITAS
// ==============================================================
function populateRoomSelect() {
  const select = document.getElementById('room-select');
  if (!select) return;

  select.innerHTML = '';

  // Agrupar habitaciones por bloque
  const groups = {};
  Object.keys(appRooms).forEach(id => {
    const r = appRooms[id];
    const b = r.block || 'General';
    if (!groups[b]) groups[b] = [];
    groups[b].push(r);
  });

  // Ordenar bloques manteniendo orden de Bloque A-D y Casitas E-I
  const blockKeys = Object.keys(groups);

  blockKeys.forEach(blockName => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = `📍 ${blockName} (${groups[blockName].length})`;

    groups[blockName].forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      let icon = '⚪';
      if (r.status === 'ok') icon = '🟢';
      else if (r.status === 'warn') icon = '🟡';
      opt.textContent = `${icon} ${r.name || r.id}`;
      if (r.id === currentRoomId) opt.selected = true;
      optgroup.appendChild(opt);
    });

    select.appendChild(optgroup);
  });
}

function changeActiveRoom(newId) {
  if (!appRooms[newId]) return;
  syncCurrentRoomFromDOM();
  saveRoomsToStorage();

  currentRoomId = newId;
  const select = document.getElementById('room-select');
  if (select) select.value = newId;
  renderActiveRoom();
}

function navigateRoom(delta) {
  syncCurrentRoomFromDOM();
  saveRoomsToStorage();

  const roomIds = Object.keys(appRooms);
  const currentIndex = roomIds.indexOf(currentRoomId);
  if (currentIndex === -1) return;

  let newIndex = currentIndex + delta;
  if (newIndex < 0) newIndex = roomIds.length - 1;
  if (newIndex >= roomIds.length) newIndex = 0;

  changeActiveRoom(roomIds[newIndex]);
}

function setCurrentDateTime() {
  const dateInput = document.getElementById('room-date-input');
  if (dateInput) {
    const now = new Date();
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    dateInput.value = localIso;
    syncCurrentRoomFromDOM();
    saveRoomsToStorage();
  }
}

// ==============================================================
// 6. RENDERIZADO DE HABITACIÓN ACTIVA Y TABLA
// ==============================================================
function renderActiveRoom() {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const nameInput = document.getElementById('room-name-input');
  if (nameInput) nameInput.value = room.name || room.id;

  const blockInput = document.getElementById('room-block-input');
  if (blockInput) blockInput.value = room.block || 'General';

  const hkInput = document.getElementById('room-housekeeper-input');
  if (hkInput) hkInput.value = room.housekeeper || '';

  const audInput = document.getElementById('room-auditor-input');
  if (audInput) audInput.value = room.auditor || '';

  const dateInput = document.getElementById('room-date-input');
  if (dateInput) dateInput.value = room.date || '';

  const notesInput = document.getElementById('room-general-notes');
  if (notesInput) notesInput.value = room.notes || '';

  updateRoomStatusBadge(room);
  renderItemsTable(room);
  updateRoomCounters(room);
  updateGlobalStats();
  initLucide();
}

function updateRoomStatusBadge(room) {
  const badge = document.getElementById('room-status-badge');
  if (!badge) return;

  badge.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm';

  if (room.status === 'ok') {
    badge.classList.add('badge-ok');
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-600"></span><span>Conforme (Todo OK)</span>`;
  } else if (room.status === 'warn') {
    badge.classList.add('badge-warn');
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span><span>Con Novedades / Faltantes</span>`;
  } else {
    badge.classList.add('badge-pending');
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-slate-400"></span><span>Sin Inspección</span>`;
  }
}

function renderItemsTable(room) {
  const tbody = document.getElementById('inventory-tbody');
  const emptyState = document.getElementById('empty-state');
  if (!tbody) return;

  tbody.innerHTML = '';

  const items = room.items || [];
  const filteredItems = items.filter(item => {
    if (!currentSearchTerm) return true;
    const term = currentSearchTerm.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.category && item.category.toLowerCase().includes(term)) ||
      (item.observation && item.observation.toLowerCase().includes(term))
    );
  });

  if (filteredItems.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  filteredItems.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-brand-50/50 transition-colors border-b border-slate-100';

    const isDiscrepant = item.actualQty !== item.standardQty || item.status !== 'Completo / Buen estado';
    if (isDiscrepant) tr.classList.add('bg-amber-50/40');

    tr.innerHTML = `
      <td class="py-3.5 px-4 text-center font-bold text-slate-400 text-xs">
        ${index + 1}
      </td>

      <td class="py-3.5 px-4">
        <div class="font-bold text-slate-900 text-sm">
          ${escapeHTML(item.name)}
        </div>
        <div class="text-[11px] font-semibold text-brand-700">
          ${escapeHTML(item.category || 'General')}
        </div>
      </td>

      <td class="py-3.5 px-3 text-center">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 font-extrabold text-slate-700 text-sm border border-slate-200">
          ${item.standardQty}
        </span>
      </td>

      <td class="py-3.5 px-4">
        <div class="flex items-center justify-center gap-1.5">
          <button type="button" onclick="modifyItemQty('${item.id}', -1)" class="qty-btn bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 border border-slate-200" title="Disminuir">
            -
          </button>
          
          <input type="number" min="0" value="${item.actualQty}" 
            onchange="setItemQtyDirect('${item.id}', this.value)" 
            class="w-14 text-center py-1.5 px-1 font-black text-sm rounded-lg border-2 ${item.actualQty < item.standardQty ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-emerald-300 bg-white text-slate-800'} focus:outline-none focus:ring-2 focus:ring-brand-500">

          <button type="button" onclick="modifyItemQty('${item.id}', 1)" class="qty-btn bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200" title="Aumentar">
            +
          </button>
        </div>
      </td>

      <td class="py-3.5 px-3 text-center">
        <select onchange="updateItemStatus('${item.id}', this.value)" 
          class="text-xs font-bold rounded-lg p-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 ${getStatusSelectClass(item.status)}">
          <option value="Completo / Buen estado" ${item.status === 'Completo / Buen estado' ? 'selected' : ''}>✅ Buen estado (OK)</option>
          <option value="Faltante" ${item.status === 'Faltante' ? 'selected' : ''}>❌ Faltante</option>
          <option value="Dañado" ${item.status === 'Dañado' ? 'selected' : ''}>⚠️ Dañado</option>
          <option value="Manchado / Sucio" ${item.status === 'Manchado / Sucio' ? 'selected' : ''}>🧺 Manchado/Sucio</option>
          <option value="Excedente" ${item.status === 'Excedente' ? 'selected' : ''}>➕ Excedente</option>
        </select>
      </td>

      <td class="py-3.5 px-4">
        <input type="text" value="${escapeHTML(item.observation || '')}" 
          placeholder="Escriba novedad o deje vacío..." 
          oninput="updateItemObservation('${item.id}', this.value)"
          class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800">
      </td>

      <td class="py-3.5 px-3 text-center">
        <button type="button" onclick="deleteItem('${item.id}')" 
          class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition" title="Eliminar artículo">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function getStatusSelectClass(status) {
  switch (status) {
    case 'Completo / Buen estado':
      return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    case 'Faltante':
      return 'bg-red-50 text-red-800 border-red-300';
    case 'Dañado':
    case 'Manchado / Sucio':
      return 'bg-amber-50 text-amber-800 border-amber-300';
    case 'Excedente':
      return 'bg-sky-50 text-sky-800 border-sky-300';
    default:
      return 'bg-white text-slate-700';
  }
}

// ==============================================================
// 7. OPERACIONES SOBRE ELEMENTOS
// ==============================================================
function modifyItemQty(itemId, delta) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const item = room.items.find(i => i.id === itemId);
  if (!item) return;

  item.actualQty = Math.max(0, parseInt(item.actualQty || 0, 10) + delta);

  if (item.actualQty === 0 && item.standardQty > 0) {
    item.status = 'Faltante';
  } else if (item.actualQty < item.standardQty) {
    if (item.status === 'Completo / Buen estado') item.status = 'Faltante';
  } else if (item.actualQty === item.standardQty && item.status === 'Faltante') {
    item.status = 'Completo / Buen estado';
  }

  recalculateRoomStatus(room);
  saveRoomsToStorage();
  renderActiveRoom();
}

function setItemQtyDirect(itemId, value) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const item = room.items.find(i => i.id === itemId);
  if (!item) return;

  item.actualQty = Math.max(0, parseInt(value, 10) || 0);

  if (item.actualQty === 0 && item.standardQty > 0) {
    item.status = 'Faltante';
  } else if (item.actualQty === item.standardQty && item.status === 'Faltante') {
    item.status = 'Completo / Buen estado';
  }

  recalculateRoomStatus(room);
  saveRoomsToStorage();
  renderActiveRoom();
}

function updateItemStatus(itemId, newStatus) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const item = room.items.find(i => i.id === itemId);
  if (!item) return;

  item.status = newStatus;
  recalculateRoomStatus(room);
  saveRoomsToStorage();
  renderActiveRoom();
}

function updateItemObservation(itemId, value) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const item = room.items.find(i => i.id === itemId);
  if (!item) return;

  item.observation = value;
  saveRoomsToStorage();
}

function deleteItem(itemId) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const item = room.items.find(i => i.id === itemId);
  const itemName = item ? item.name : 'este artículo';

  if (!confirm(`¿Eliminar "${itemName}" de ${room.name || room.id}?`)) return;

  room.items = room.items.filter(i => i.id !== itemId);
  recalculateRoomStatus(room);
  saveRoomsToStorage();
  renderActiveRoom();
  showToast(`Artículo eliminado de ${room.name || room.id}`, 'info');
}

function recalculateRoomStatus(room) {
  if (!room) return;

  let hasDiscrepancy = false;
  for (const item of (room.items || [])) {
    if (item.actualQty !== item.standardQty || item.status !== 'Completo / Buen estado') {
      hasDiscrepancy = true;
      break;
    }
  }

  if (hasDiscrepancy) {
    room.status = 'warn';
  } else {
    room.status = (room.housekeeper || room.auditor || room.date) ? 'ok' : 'pending';
  }
}

function updateRoomCounters(room) {
  const items = room.items || [];
  let expTotal = 0;
  let actTotal = 0;
  let discrepancies = 0;

  items.forEach(i => {
    expTotal += parseInt(i.standardQty || 0, 10);
    actTotal += parseInt(i.actualQty || 0, 10);
    if (i.actualQty !== i.standardQty || i.status !== 'Completo / Buen estado') {
      discrepancies++;
    }
  });

  const countEl = document.getElementById('room-items-count');
  if (countEl) countEl.textContent = items.length;

  const expEl = document.getElementById('room-expected-total');
  if (expEl) expEl.textContent = expTotal;

  const actEl = document.getElementById('room-actual-total');
  if (actEl) actEl.textContent = actTotal;

  const badgeDisc = document.getElementById('badge-discrepancy');
  const diffEl = document.getElementById('room-diff-count');
  if (badgeDisc && diffEl) {
    if (discrepancies > 0) {
      badgeDisc.classList.remove('hidden');
      diffEl.textContent = `${discrepancies} novedades`;
    } else {
      badgeDisc.classList.add('hidden');
    }
  }
}

function updateGlobalStats() {
  const roomKeys = Object.keys(appRooms);
  let totalRooms = roomKeys.length;
  let okRooms = 0;
  let warnRooms = 0;

  roomKeys.forEach(id => {
    const r = appRooms[id];
    if (r.status === 'ok') okRooms++;
    else if (r.status === 'warn') warnRooms++;
  });

  const statTotal = document.getElementById('stat-total-rooms');
  if (statTotal) statTotal.textContent = totalRooms;

  const statOk = document.getElementById('stat-ok-rooms');
  if (statOk) statOk.textContent = okRooms;

  const statWarn = document.getElementById('stat-warn-rooms');
  if (statWarn) statWarn.textContent = warnRooms;
}

function filterItems(term) {
  currentSearchTerm = term.trim();
  const room = appRooms[currentRoomId];
  if (room) {
    renderItemsTable(room);
    initLucide();
  }
}

function resetCurrentRoomToStandard() {
  const room = appRooms[currentRoomId];
  if (!room) return;

  if (!confirm(`¿Restablecer inventario de ${room.name || room.id} a los valores estándar?`)) return;

  const catalog = appSettings.catalog || DEFAULT_CATALOG;
  room.items = catalog.map((item, idx) => ({
    id: `item-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
    name: item.name,
    category: item.category,
    standardQty: item.standardQty,
    actualQty: item.standardQty,
    status: 'Completo / Buen estado',
    observation: ''
  }));

  recalculateRoomStatus(room);
  saveRoomsToStorage();
  renderActiveRoom();
  showToast(`${room.name || room.id} restablecida`, 'success');
}

// ==============================================================
// 8. ACCIONES DIRECTAS DE IMPRESIÓN Y PDF
// ==============================================================
function directPrintRoom() {
  try {
    syncCurrentRoomFromDOM();
    saveRoomsToStorage();
    updatePrintPreview();
    window.print();
  } catch (err) {
    console.error('Error en directPrintRoom:', err);
    window.print();
  }
}

function directExportPDF() {
  try {
    syncCurrentRoomFromDOM();
    saveRoomsToStorage();
    executePDFExport();
  } catch (err) {
    console.error('Error en directExportPDF:', err);
    executePDFExport();
  }
}

// ==============================================================
// 9. MODAL: ADMINISTRADOR DE HABITACIONES (RENOMBRAR / EDITAR)
// ==============================================================
function openManageRoomsModal() {
  const modal = document.getElementById('modal-manage-rooms');
  if (!modal) return;

  renderManageRoomsTable();
  modal.classList.remove('hidden');
  initLucide();
}

function closeManageRoomsModal() {
  const modal = document.getElementById('modal-manage-rooms');
  if (modal) modal.classList.add('hidden');
  populateRoomSelect();
  renderActiveRoom();
  updateGlobalStats();
}

function renderManageRoomsTable() {
  const tbody = document.getElementById('manage-rooms-tbody');
  const countEl = document.getElementById('manage-rooms-count');
  if (!tbody) return;

  tbody.innerHTML = '';
  const roomKeys = Object.keys(appRooms);
  if (countEl) countEl.textContent = roomKeys.length;

  roomKeys.forEach(id => {
    const r = appRooms[id];
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50';

    tr.innerHTML = `
      <td class="py-2 px-3">
        <input type="text" value="${escapeHTML(r.block || 'General')}" 
          onchange="changeRoomBlockFromTable('${id}', this.value)"
          class="w-full bg-white border border-slate-200 rounded p-1 font-bold text-xs text-brand-900">
      </td>
      <td class="py-2 px-3">
        <input type="text" value="${escapeHTML(r.name || r.id)}" 
          onchange="changeRoomNameFromTable('${id}', this.value)"
          class="w-full bg-white border border-slate-200 rounded p-1 font-black text-xs text-slate-900">
      </td>
      <td class="py-2 px-3">
        <select onchange="changeRoomTypeFromTable('${id}', this.value)" class="w-full bg-white border border-slate-200 rounded p-1 text-xs">
          <option value="Estándar Colonial" ${r.type === 'Estándar Colonial' ? 'selected' : ''}>Estándar Colonial</option>
          <option value="Casita Campestre" ${r.type === 'Casita Campestre' ? 'selected' : ''}>Casita Campestre</option>
          <option value="Doble Familiar" ${r.type === 'Doble Familiar' ? 'selected' : ''}>Doble Familiar</option>
          <option value="Suite Quirama" ${r.type === 'Suite Quirama' ? 'selected' : ''}>Suite Quirama</option>
        </select>
      </td>
      <td class="py-2 px-3 text-center">
        <button type="button" onclick="handleDeleteRoom('${id}')" class="text-red-500 hover:text-red-700 p-1" title="Eliminar habitación">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  initLucide();
}

function changeRoomNameFromTable(id, newName) {
  if (appRooms[id]) {
    appRooms[id].name = newName.trim() || id;
    saveRoomsToStorage();
  }
}

function changeRoomBlockFromTable(id, newBlock) {
  if (appRooms[id]) {
    appRooms[id].block = newBlock.trim() || 'General';
    saveRoomsToStorage();
  }
}

function changeRoomTypeFromTable(id, newType) {
  if (appRooms[id]) {
    appRooms[id].type = newType;
    saveRoomsToStorage();
  }
}

function handleAddNewRoom() {
  const blockIn = document.getElementById('new-room-block');
  const idIn = document.getElementById('new-room-id');
  const typeIn = document.getElementById('new-room-type');

  const block = blockIn ? blockIn.value : 'Bloque A';
  const id = idIn ? idIn.value.trim().toUpperCase() : '';
  const type = typeIn ? typeIn.value : 'Estándar Colonial';

  if (!id) {
    alert('Por favor digita un código o nombre para la habitación (ej. G4, I4, Suite 1).');
    return;
  }

  if (appRooms[id]) {
    alert(`La habitación con identificador "${id}" ya existe.`);
    return;
  }

  appRooms[id] = createRoomInstance(id, id, block, type);
  saveRoomsToStorage();
  if (idIn) idIn.value = '';
  renderManageRoomsTable();
  populateRoomSelect();
  showToast(`Habitación ${id} agregada al ${block}`, 'success');
}

function handleDeleteRoom(id) {
  const r = appRooms[id];
  const name = r ? (r.name || id) : id;
  if (Object.keys(appRooms).length <= 1) {
    alert('Debe existir al menos una habitación en el sistema.');
    return;
  }

  if (!confirm(`¿Eliminar la habitación "${name}"? Se perderán sus inventarios registrados.`)) return;

  delete appRooms[id];
  if (currentRoomId === id) {
    currentRoomId = Object.keys(appRooms)[0];
  }
  saveRoomsToStorage();
  renderManageRoomsTable();
  populateRoomSelect();
  renderActiveRoom();
  showToast(`Habitación ${name} eliminada`, 'info');
}

function restoreQuiramaOfficialRooms() {
  if (!confirm('¿Restablecer las habitaciones a la distribución oficial del Hotel Recinto Quirama (Bloques A, B, C, D y Casitas E, F, G, H, I)?')) {
    return;
  }
  generateOfficialQuiramaRooms();
  currentRoomId = 'A1';
  renderManageRoomsTable();
  populateRoomSelect();
  renderActiveRoom();
  updateGlobalStats();
  showToast('Distribución oficial de Quirama restablecida con éxito', 'success');
}

// ==============================================================
// 10. MODAL: MATRIZ DE HABITACIONES POR BLOQUES Y CASITAS
// ==============================================================
function openRoomMatrixModal() {
  const modal = document.getElementById('modal-matrix');
  const container = document.getElementById('room-matrix-container');
  if (!modal || !container) return;

  container.innerHTML = '';

  // Agrupar habitaciones por bloque
  const groups = {};
  Object.keys(appRooms).forEach(id => {
    const r = appRooms[id];
    const b = r.block || 'General';
    if (!groups[b]) groups[b] = [];
    groups[b].push(r);
  });

  Object.keys(groups).forEach(blockName => {
    const roomsInBlock = groups[blockName];
    let okCount = 0;
    let warnCount = 0;

    roomsInBlock.forEach(r => {
      if (r.status === 'ok') okCount++;
      else if (r.status === 'warn') warnCount++;
    });

    const blockCard = document.createElement('div');
    blockCard.className = 'bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3';

    blockCard.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-brand-600"></span>
          <h3 class="text-sm font-black text-brand-900 uppercase tracking-wider">${escapeHTML(blockName)}</h3>
          <span class="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
            Subtotal: ${roomsInBlock.length} habitaciones
          </span>
        </div>
        <div class="flex items-center gap-2 text-xs font-bold">
          <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">OK: ${okCount}</span>
          <span class="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Novedad: ${warnCount}</span>
        </div>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2.5" id="grid-${escapeHTML(blockName).replace(/\s+/g, '-')}">
      </div>
    `;

    const grid = blockCard.querySelector(`[id^="grid-"]`);
    roomsInBlock.forEach(r => {
      const tile = document.createElement('div');
      tile.className = 'room-grid-tile rounded-xl p-2.5 border text-center flex flex-col items-center justify-between gap-1 shadow-sm';

      let bgClass = 'bg-white border-slate-200 text-slate-700';
      let statusDot = 'bg-slate-400';
      let statusText = 'Sin revisar';

      if (r.status === 'ok') {
        bgClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
        statusDot = 'bg-brand-600';
        statusText = 'Conforme';
      } else if (r.status === 'warn') {
        bgClass = 'bg-amber-50 border-amber-300 text-amber-900 font-bold';
        statusDot = 'bg-amber-500';
        statusText = 'Novedades';
      }

      tile.className += ` ${bgClass}`;
      if (r.id === currentRoomId) {
        tile.classList.add('active-room');
      }

      tile.innerHTML = `
        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">${escapeHTML(r.block)}</div>
        <div class="text-base font-black tracking-tight text-brand-950">${escapeHTML(r.name || r.id)}</div>
        <div class="flex items-center gap-1 text-[9.5px] font-bold">
          <span class="w-2 h-2 rounded-full ${statusDot}"></span>
          <span>${statusText}</span>
        </div>
      `;

      tile.onclick = () => {
        changeActiveRoom(r.id);
        closeRoomMatrixModal();
      };

      grid.appendChild(tile);
    });

    container.appendChild(blockCard);
  });

  modal.classList.remove('hidden');
  initLucide();
}

function closeRoomMatrixModal() {
  const modal = document.getElementById('modal-matrix');
  if (modal) modal.classList.add('hidden');
}

// ==============================================================
// 11. CONFIGURACIÓN DE IMPRESIÓN, PDF Y FIRMAS
// ==============================================================
function openPrintModal() {
  try {
    syncCurrentRoomFromDOM();
    const modal = document.getElementById('modal-print-config');
    if (!modal) return;

    const room = appRooms[currentRoomId];

    const hotelIn = document.getElementById('doc-hotel-input');
    if (hotelIn) hotelIn.value = safeUpper(appSettings.hotelName, 'HOTEL RECINTO QUIRAMA');

    const entityIn = document.getElementById('doc-entity-input');
    if (entityIn) entityIn.value = safeUpper(appSettings.entityName, 'COMFENALCO ANTIOQUIA');

    const deptIn = document.getElementById('doc-dept-input');
    if (deptIn) deptIn.value = safeUpper(appSettings.department, 'DEPARTAMENTO DE AMA DE LLAVES');

    const notesIn = document.getElementById('doc-notes-input');
    if (notesIn) notesIn.value = (room && room.notes) ? room.notes : '';

    const sign1Name = document.getElementById('sign1-name');
    if (sign1Name && room) sign1Name.value = room.housekeeper || '';

    const sign2Name = document.getElementById('sign2-name');
    if (sign2Name && room) sign2Name.value = room.auditor || '';

    updatePrintPreview();
    modal.classList.remove('hidden');
    initLucide();
  } catch (err) {
    console.error('Error en openPrintModal:', err);
    directPrintRoom();
  }
}

function closePrintModal() {
  const modal = document.getElementById('modal-print-config');
  if (modal) modal.classList.add('hidden');
}

function updatePrintPreview() {
  try {
    const room = appRooms[currentRoomId];
    if (!room) return;

    const printable = document.getElementById('printable-report');
    if (!printable) return;

    // 1. Tamaño de letra
    const fontSizeSelect = document.getElementById('doc-font-size');
    const selectedSize = fontSizeSelect ? fontSizeSelect.value : 'report-font-large';
    printable.classList.remove('report-font-large', 'report-font-xlarge', 'report-font-normal');
    printable.classList.add(selectedSize);

    // 2. Encabezados
    const titleIn = document.getElementById('doc-title-input');
    const printTitle = document.getElementById('print-main-title');
    if (printTitle) printTitle.textContent = safeUpper(titleIn ? titleIn.value : '', 'CONTROL DE INVENTARIO Y DOTACIÓN');

    const codeIn = document.getElementById('doc-code-input');
    const printCode = document.getElementById('print-doc-code');
    if (printCode) printCode.textContent = (codeIn && codeIn.value) ? `Código: ${codeIn.value}` : 'Código: F-REC-INV-01';

    const hotelIn = document.getElementById('doc-hotel-input');
    const printHotel = document.getElementById('print-hotel-name');
    if (printHotel) printHotel.textContent = safeUpper(hotelIn ? hotelIn.value : appSettings.hotelName, 'HOTEL RECINTO QUIRAMA');

    const entityIn = document.getElementById('doc-entity-input');
    const printEntity = document.getElementById('print-hotel-entity');
    if (printEntity) printEntity.textContent = safeUpper(entityIn ? entityIn.value : appSettings.entityName, 'COMFENALCO ANTIOQUIA');

    const deptIn = document.getElementById('doc-dept-input');
    const printDept = document.getElementById('print-hotel-dept');
    if (printDept) printDept.textContent = safeUpper(deptIn ? deptIn.value : appSettings.department, 'DEPARTAMENTO DE AMA DE LLAVES');

    // 3. Datos de la Habitación
    const roomNum = document.getElementById('print-room-number');
    if (roomNum) roomNum.textContent = room.name || room.id;

    const roomType = document.getElementById('print-room-type');
    if (roomType) roomType.textContent = `${room.block || 'General'} · ${room.type || 'Estándar'}`;

    const roomDate = document.getElementById('print-room-date');
    if (roomDate) {
      const d = room.date ? new Date(room.date) : new Date();
      roomDate.textContent = isNaN(d.getTime()) ? room.date : d.toLocaleString('es-CO');
    }

    const roomStatus = document.getElementById('print-room-status');
    if (roomStatus) {
      if (room.status === 'ok') {
        roomStatus.textContent = 'CONFORME (TODO OK)';
        roomStatus.style.color = '#008848';
      } else if (room.status === 'warn') {
        roomStatus.textContent = 'CON NOVEDADES / FALTANTES';
        roomStatus.style.color = '#D97706';
      } else {
        roomStatus.textContent = 'SIN INSPECCIÓN';
        roomStatus.style.color = '#475569';
      }
    }

    // 4. Tabla de Ítems
    const modeSelect = document.getElementById('doc-content-mode');
    const onlyIssues = modeSelect && modeSelect.value === 'only-issues';

    const tbody = document.getElementById('print-table-tbody');
    if (tbody) {
      tbody.innerHTML = '';
      let itemsToPrint = room.items || [];

      if (onlyIssues) {
        itemsToPrint = itemsToPrint.filter(i => i.actualQty !== i.standardQty || i.status !== 'Completo / Buen estado');
      }

      if (itemsToPrint.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td colspan="5" style="text-align: center; padding: 25px; font-size: 13pt; font-weight: bold; color: #008848;">
            ✅ Toda la dotación de ${room.name || room.id} (${room.block}) se encuentra completa y en perfecto estado.
          </td>
        `;
        tbody.appendChild(tr);
      } else {
        itemsToPrint.forEach((item, idx) => {
          const tr = document.createElement('tr');
          const isOk = item.actualQty === item.standardQty && item.status === 'Completo / Buen estado';

          let badgeHtml = '';
          if (isOk) {
            badgeHtml = '<span class="report-badge-ok">✅ OK</span>';
          } else if (item.status === 'Faltante' || item.actualQty < item.standardQty) {
            badgeHtml = '<span class="report-badge-warn">❌ FALTANTE</span>';
          } else if (item.status === 'Dañado') {
            badgeHtml = '<span class="report-badge-warn">⚠️ DAÑADO</span>';
          } else if (item.status === 'Manchado / Sucio') {
            badgeHtml = '<span class="report-badge-warn">🧺 MANCHADO</span>';
          } else {
            badgeHtml = `<span class="report-badge-warn">${escapeHTML(item.status)}</span>`;
          }

          let obsText = item.observation && item.observation.trim() ? item.observation : (isOk ? 'Sin novedad' : 'Verificar reposición');

          tr.innerHTML = `
            <td style="text-align: center; font-weight: bold; color: #475569; width: 35px;">${idx + 1}</td>
            <td style="font-weight: 800; color: #0F172A; font-size: 11.5pt;">${escapeHTML(item.name)}</td>
            <td style="text-align: center; font-weight: 900; font-size: 12pt; color: ${isOk ? '#008848' : '#D97706'};">${item.actualQty}</td>
            <td style="text-align: center;">${badgeHtml}</td>
            <td style="font-size: 10.5pt; color: #1E293B; font-weight: ${isOk ? 'normal' : 'bold'};">${escapeHTML(obsText)}</td>
          `;
          tbody.appendChild(tr);
        });
      }
    }

    // 5. Observaciones
    const notesIn = document.getElementById('doc-notes-input');
    const printNotes = document.getElementById('print-room-notes');
    if (printNotes) {
      const generalNotes = (notesIn && notesIn.value) ? notesIn.value : (room.notes || '');
      printNotes.textContent = generalNotes.trim() ? generalNotes : 'Sin novedades adicionales reportadas.';
    }

    // 6. Firmas Personalizables
    applySignatureBlock('1');
    applySignatureBlock('2');
    applySignatureBlock('3');

    const signContainer = document.getElementById('print-signatures-container');
    if (signContainer) {
      const s1 = document.getElementById('sign1-enable') ? document.getElementById('sign1-enable').checked : true;
      const s2 = document.getElementById('sign2-enable') ? document.getElementById('sign2-enable').checked : true;
      const s3 = document.getElementById('sign3-enable') ? document.getElementById('sign3-enable').checked : true;
      const activeCount = (s1 ? 1 : 0) + (s2 ? 1 : 0) + (s3 ? 1 : 0);
      signContainer.style.gridTemplateColumns = `repeat(${Math.max(1, activeCount)}, 1fr)`;
    }
  } catch (err) {
    console.error('Error en updatePrintPreview:', err);
  }
}

function applySignatureBlock(num) {
  const enableEl = document.getElementById(`sign${num}-enable`);
  const enable = enableEl ? enableEl.checked : true;
  const box = document.getElementById(`print-sign-${num}-box`);
  if (!box) return;

  if (!enable) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'block';

  const roleIn = document.getElementById(`sign${num}-role`);
  const nameIn = document.getElementById(`sign${num}-name`);
  const idIn = document.getElementById(`sign${num}-id`);

  const roleEl = document.getElementById(`print-sign-${num}-role`);
  if (roleEl) roleEl.textContent = (roleIn && roleIn.value) ? roleIn.value : 'Firma';

  const nameEl = document.getElementById(`print-sign-${num}-name`);
  if (nameEl) nameEl.textContent = (nameIn && nameIn.value && nameIn.value.trim()) ? nameIn.value.trim().toUpperCase() : '___________________';

  const idEl = document.getElementById(`print-sign-${num}-id`);
  if (idEl) idEl.textContent = (idIn && idIn.value && idIn.value.trim()) ? `C.C. ${idIn.value.trim()}` : 'C.C. ___________________';
}

function executePDFExport() {
  try {
    updatePrintPreview();
    const element = document.getElementById('printable-report');
    if (!element) return;

    showToast('Generando documento PDF...', 'info');
    element.style.display = 'block';

    const room = appRooms[currentRoomId];
    const safeRoomName = (room ? (room.name || room.id) : currentRoomId).replace(/[^a-zA-Z0-9_-]/g, '_');

    const opt = {
      margin: [8, 8, 8, 8],
      filename: `Inventario_${safeRoomName}_Recinto_Quirama.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
    };

    if (typeof html2pdf !== 'undefined') {
      html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none';
        showToast('¡PDF descargado con éxito!', 'success');
      }).catch(err => {
        element.style.display = 'none';
        console.error('Error con html2pdf:', err);
        fallbackPrintAsPDF();
      });
    } else {
      element.style.display = 'none';
      fallbackPrintAsPDF();
    }
  } catch (err) {
    console.error('Error en executePDFExport:', err);
    fallbackPrintAsPDF();
  }
}

function fallbackPrintAsPDF() {
  alert('Se abrirá la ventana de impresión del navegador. Puedes seleccionar "Guardar como PDF".');
  window.print();
}

function executeImageExport() {
  try {
    updatePrintPreview();
    const element = document.getElementById('printable-report');
    if (!element) return;

    showToast('Generando imagen de alta resolución...', 'info');
    element.style.display = 'block';

    const room = appRooms[currentRoomId];
    const safeRoomName = (room ? (room.name || room.id) : currentRoomId).replace(/[^a-zA-Z0-9_-]/g, '_');

    if (typeof html2canvas !== 'undefined') {
      html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
        element.style.display = 'none';
        const link = document.createElement('a');
        link.download = `Inventario_${safeRoomName}_Quirama.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('¡Imagen descargada con éxito!', 'success');
      }).catch(err => {
        element.style.display = 'none';
        console.error('Error al generar imagen:', err);
        alert('Error al generar la imagen.');
      });
    } else {
      element.style.display = 'none';
      alert('Biblioteca de imagen no cargada. Utiliza el botón Imprimir.');
    }
  } catch (err) {
    console.error('Error en executeImageExport:', err);
  }
}

// ==============================================================
// 12. MODAL: AGREGAR ELEMENTO AL INVENTARIO
// ==============================================================
function openAddItemModal() {
  const modal = document.getElementById('modal-add-item');
  if (!modal) return;
  document.getElementById('form-add-item').reset();
  modal.classList.remove('hidden');
  initLucide();
  const nameInput = document.getElementById('add-item-name');
  if (nameInput) nameInput.focus();
}

function closeAddItemModal() {
  const modal = document.getElementById('modal-add-item');
  if (modal) modal.classList.add('hidden');
}

function handleAddItemSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('add-item-name').value.trim();
  const category = document.getElementById('add-item-category').value;
  const standardQty = parseInt(document.getElementById('add-item-standard').value, 10) || 1;
  const actualQty = parseInt(document.getElementById('add-item-actual').value, 10) || 1;
  const status = document.getElementById('add-item-status').value;
  const addToAll = document.getElementById('add-item-to-all').checked;

  if (!name) return;

  const newItem = {
    id: `item-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name: name,
    category: category,
    standardQty: standardQty,
    actualQty: actualQty,
    status: status,
    observation: ''
  };

  const room = appRooms[currentRoomId];
  if (room) {
    room.items.push(newItem);
    recalculateRoomStatus(room);
  }

  if (addToAll) {
    if (!appSettings.catalog) appSettings.catalog = [...DEFAULT_CATALOG];
    appSettings.catalog.push({
      id: `cat-${Date.now()}`,
      name: name,
      category: category,
      standardQty: standardQty
    });
    saveSettingsToStorage();

    Object.keys(appRooms).forEach(rId => {
      if (rId !== currentRoomId) {
        appRooms[rId].items.push({
          id: `item-${Date.now()}-${rId}-${Math.floor(Math.random() * 1000)}`,
          name: name,
          category: category,
          standardQty: standardQty,
          actualQty: standardQty,
          status: 'Completo / Buen estado',
          observation: ''
        });
      }
    });
    showToast(`Elemento agregado a todas las habitaciones`, 'success');
  } else {
    showToast(`Elemento agregado a ${room.name || currentRoomId}`, 'success');
  }

  saveRoomsToStorage();
  closeAddItemModal();
  renderActiveRoom();
}

// ==============================================================
// 13. MODAL DE AJUSTES GENERALES & LOGOTIPO
// ==============================================================
function openSettingsModal() {
  const modal = document.getElementById('modal-settings');
  if (!modal) return;
  modal.classList.remove('hidden');
  initLucide();
}

function closeSettingsModal() {
  const modal = document.getElementById('modal-settings');
  if (modal) modal.classList.add('hidden');
}

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    appSettings.logo = e.target.result;
    saveSettingsToStorage();
    applySettingsToUI();
    showToast('Logo actualizado correctamente', 'success');
  };
  reader.readAsDataURL(file);
}

function resetDefaultLogo() {
  if (confirm('¿Deseas restaurar el logo inicial predeterminado?')) {
    appSettings.logo = null;
    saveSettingsToStorage();
    applySettingsToUI();
    showToast('Logo predeterminado restaurado', 'info');
  }
}

function exportBackupData() {
  const backupObject = {
    version: '5.0',
    exportDate: new Date().toISOString(),
    hotel: appSettings.hotelName,
    settings: appSettings,
    rooms: appRooms
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObject, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `inventario-quirama-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('Copia de respaldo descargada', 'success');
}

function importBackupData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data && data.rooms) {
        if (confirm('Se sobreescribirán los inventarios con el archivo importado. ¿Continuar?')) {
          appRooms = data.rooms;
          if (data.settings) appSettings = { ...DEFAULT_SETTINGS, ...data.settings };
          saveRoomsToStorage();
          saveSettingsToStorage();
          applySettingsToUI();
          populateRoomSelect();
          currentRoomId = Object.keys(appRooms)[0];
          renderActiveRoom();
          closeSettingsModal();
          showToast('Datos restaurados correctamente', 'success');
        }
      }
    } catch (err) {
      alert('Error en archivo: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ==============================================================
// 14. UTILIDADES Y NOTIFICACIONES
// ==============================================================
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let borderColor = '#008848';
  let iconName = 'check-circle';

  if (type === 'success') {
    borderColor = '#008848';
    iconName = 'check-circle-2';
  } else if (type === 'error') {
    borderColor = '#DC2626';
    iconName = 'alert-triangle';
  } else if (type === 'info') {
    borderColor = '#2563EB';
    iconName = 'info';
  }

  toast.style.borderLeftColor = borderColor;

  toast.innerHTML = `
    <div class="flex items-center gap-2.5">
      <i data-lucide="${iconName}" class="w-5 h-5" style="color: ${borderColor}"></i>
      <span class="text-xs font-bold text-slate-800">${escapeHTML(message)}</span>
    </div>
    <button type="button" onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600">
      <i data-lucide="x" class="w-3.5 h-3.5"></i>
    </button>
  `;

  container.appendChild(toast);
  initLucide();

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 3500);
}
