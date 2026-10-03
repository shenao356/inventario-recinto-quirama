/**
 * Hotel Recinto Quirama - Comfenalco Antioquia
 * Sistema de Control de Inventario de Habitaciones
 * app.js
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
  { id: 'cat-19', name: 'Directorio telefónico y menú de servicios', category: 'Información', standardQty: 1 },
  { id: 'cat-20', name: 'Dispensador de jabón y champú', category: 'Aseo y Baño', standardQty: 1 }
];

const DEFAULT_SETTINGS = {
  hotelName: 'Hotel Recinto Quirama',
  entityName: 'Comfenalco Antioquia',
  department: 'Departamento de Ama de Llaves y Habitaciones',
  location: 'El Carmen de Viboral - Rionegro, Antioquia',
  logo: null, // null usará logo-default.svg
  roomCount: 60,
  numbering: '101-160',
  catalog: DEFAULT_CATALOG
};

// ==============================================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ==============================================================
let appSettings = {};
let appRooms = {};
let currentRoomId = '101';
let currentSearchTerm = '';

// Claves de Almacenamiento Local
const STORAGE_SETTINGS_KEY = 'quirama_hotel_settings_v2';
const STORAGE_ROOMS_KEY = 'quirama_hotel_rooms_v2';

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
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Carga de Configuración
function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
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
  // Título e imagen de cabecera
  const headerTitle = document.getElementById('header-hotel-title');
  if (headerTitle) headerTitle.textContent = appSettings.hotelName;

  const headerSub = document.getElementById('header-hotel-subtitle');
  if (headerSub) {
    headerSub.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>${appSettings.entityName} · Control de Inventario`;
  }

  // Logo
  const logoSrc = appSettings.logo || 'logo-default.svg';
  const headerLogo = document.getElementById('hotel-header-logo');
  if (headerLogo) headerLogo.src = logoSrc;

  const previewLogo = document.getElementById('settings-logo-preview');
  if (previewLogo) previewLogo.src = logoSrc;

  const printLogo = document.getElementById('print-logo');
  if (printLogo) printLogo.src = logoSrc;

  // Ajustes de impresión
  const printHotel = document.getElementById('print-hotel-name');
  if (printHotel) printHotel.textContent = appSettings.hotelName.toUpperCase();

  const printEntity = document.getElementById('print-hotel-entity');
  if (printEntity) printEntity.textContent = appSettings.entityName.toUpperCase();

  const printDept = document.getElementById('print-hotel-dept');
  if (printDept) printDept.textContent = appSettings.department.toUpperCase();

  // Inputs en modal de ajustes
  const nameInput = document.getElementById('settings-hotel-name');
  if (nameInput) nameInput.value = appSettings.hotelName;

  const entityInput = document.getElementById('settings-hotel-entity');
  if (entityInput) entityInput.value = appSettings.entityName;

  const deptInput = document.getElementById('settings-hotel-dept');
  if (deptInput) deptInput.value = appSettings.department;

  const locInput = document.getElementById('settings-hotel-location');
  if (locInput) locInput.value = appSettings.location;

  const countInput = document.getElementById('settings-room-count');
  if (countInput) countInput.value = appSettings.roomCount || 60;

  const numInput = document.getElementById('settings-room-numbering');
  if (numInput) numInput.value = appSettings.numbering || '101-160';
}

// Carga de Habitaciones (Crea las 60 habitaciones por defecto si no existen)
function loadRooms() {
  try {
    const saved = localStorage.getItem(STORAGE_ROOMS_KEY);
    if (saved) {
      appRooms = JSON.parse(saved);
    } else {
      generateInitialRooms();
    }
  } catch (e) {
    console.error('Error cargando habitaciones:', e);
    generateInitialRooms();
  }

  // Asegurar que currentRoomId exista
  const roomKeys = Object.keys(appRooms);
  if (roomKeys.length > 0 && !appRooms[currentRoomId]) {
    currentRoomId = roomKeys[0];
  }
}

function generateInitialRooms() {
  appRooms = {};
  const total = appSettings.roomCount || 60;
  const startNum = (appSettings.numbering === '1-60') ? 1 : 101;

  for (let i = 0; i < total; i++) {
    const num = String(startNum + i);
    appRooms[num] = createEmptyRoom(num);
  }
  saveRoomsToStorage();
}

function createEmptyRoom(num) {
  // Clona el catálogo base con cantidades esperadas
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

  // Determinación de tipo de habitación por rango
  let type = 'Estándar Colonial';
  const n = parseInt(num, 10);
  if (n % 10 === 0) type = 'Suite Quirama';
  else if (n % 5 === 0) type = 'Cabaña de Lujo';
  else if (n % 2 === 0) type = 'Doble Familiar';

  return {
    id: num,
    type: type,
    housekeeper: '',
    auditor: '',
    date: new Date().toISOString().slice(0, 16),
    status: 'pending', // 'ok', 'warn', 'pending'
    notes: '',
    items: items
  };
}

function saveRoomsToStorage() {
  try {
    localStorage.setItem(STORAGE_ROOMS_KEY, JSON.stringify(appRooms));
  } catch (e) {
    console.error('Error guardando habitaciones:', e);
    showToast('Error de almacenamiento local', 'error');
  }
}

// ==============================================================
// 4. CONTROL DE HABITACIÓN ACTIVA Y SELECTOR
// ==============================================================
function populateRoomSelect() {
  const select = document.getElementById('room-select');
  if (!select) return;

  select.innerHTML = '';
  const roomIds = Object.keys(appRooms).sort((a, b) => {
    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.localeCompare(b);
  });

  roomIds.forEach(id => {
    const opt = document.createElement('option');
    opt.value = id;
    const r = appRooms[id];
    let icon = '⚪';
    if (r.status === 'ok') icon = '🟢';
    else if (r.status === 'warn') icon = '🟡';
    opt.textContent = `${icon} Habitación ${id} (${r.type})`;
    if (id === currentRoomId) opt.selected = true;
    select.appendChild(opt);
  });
}

function changeActiveRoom(newId) {
  if (!appRooms[newId]) return;
  currentRoomId = newId;
  const select = document.getElementById('room-select');
  if (select) select.value = newId;
  renderActiveRoom();
}

function navigateRoom(delta) {
  const roomIds = Object.keys(appRooms).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
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
    // Formato YYYY-MM-DDTHH:mm local
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    dateInput.value = localIso;
    updateRoomMetadata('date', localIso);
  }
}

function updateRoomMetadata(field, value) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  room[field] = value;
  
  // Si se ingresó responsable o fecha y estaba en 'pending', evalúa si marcarlo como 'ok' o 'warn'
  if (room.status === 'pending' && (room.housekeeper || room.auditor)) {
    recalculateRoomStatus(room);
  }

  saveRoomsToStorage();
}

// ==============================================================
// 5. RENDERIZADO DE LA HABITACIÓN ACTUAL Y TABLA
// ==============================================================
function renderActiveRoom() {
  const room = appRooms[currentRoomId];
  if (!room) return;

  // Actualizar Metadatos en UI
  const typeInput = document.getElementById('room-type-input');
  if (typeInput) typeInput.value = room.type || 'Estándar Colonial';

  const hkInput = document.getElementById('room-housekeeper-input');
  if (hkInput) hkInput.value = room.housekeeper || '';

  const audInput = document.getElementById('room-auditor-input');
  if (audInput) audInput.value = room.auditor || '';

  const dateInput = document.getElementById('room-date-input');
  if (dateInput) dateInput.value = room.date || '';

  const notesInput = document.getElementById('room-general-notes');
  if (notesInput) notesInput.value = room.notes || '';

  // Actualizar Insignia de Estado de la Habitación
  updateRoomStatusBadge(room);

  // Renderizar la tabla de ítems
  renderItemsTable(room);

  // Actualizar contadores
  updateRoomCounters(room);
  updateGlobalStats();
  initLucide();
}

function updateRoomStatusBadge(room) {
  const badge = document.getElementById('room-status-badge');
  const text = document.getElementById('room-status-text');
  if (!badge || !text) return;

  badge.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm';

  if (room.status === 'ok') {
    badge.classList.add('badge-ok');
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span id="room-status-text">Conforme / Completo</span>`;
  } else if (room.status === 'warn') {
    badge.classList.add('badge-warn');
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span><span id="room-status-text">Con Novedades / Faltantes</span>`;
  } else {
    badge.classList.add('badge-pending');
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-slate-400"></span><span id="room-status-text">Sin Inspección</span>`;
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
    tr.className = 'hover:bg-slate-50/80 transition-colors border-b border-slate-100';

    // Determinar estilo según coincidencia de cantidades y estado
    const isDiscrepant = item.actualQty !== item.standardQty || item.status !== 'Completo / Buen estado';
    const rowAlertBg = isDiscrepant ? 'bg-amber-50/40' : '';
    if (isDiscrepant) tr.classList.add('bg-amber-50/40');

    // Categoría badge
    const catBadgeClass = getCategoryBadgeClass(item.category);

    tr.innerHTML = `
      <td class="py-3 px-4 text-center font-semibold text-slate-400 text-xs">
        ${index + 1}
      </td>

      <td class="py-3 px-4">
        <div class="font-bold text-slate-800 text-sm flex items-center gap-2">
          <span>${escapeHTML(item.name)}</span>
        </div>
        <div class="mt-0.5">
          <span class="inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${catBadgeClass}">
            ${escapeHTML(item.category || 'General')}
          </span>
        </div>
      </td>

      <td class="py-3 px-3 text-center">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 font-bold text-slate-700 text-sm border border-slate-200">
          ${item.standardQty}
        </span>
      </td>

      <td class="py-3 px-4">
        <div class="flex items-center justify-center gap-1.5">
          <button type="button" onclick="modifyItemQty('${item.id}', -1)" class="qty-btn bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 border border-slate-200" title="Disminuir cantidad">
            -
          </button>
          
          <input type="number" min="0" value="${item.actualQty}" 
            onchange="setItemQtyDirect('${item.id}', this.value)" 
            class="w-14 text-center py-1.5 px-1 font-extrabold text-sm rounded-lg border-2 ${item.actualQty < item.standardQty ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white text-slate-800'} focus:outline-none focus:ring-2 focus:ring-brand-500">

          <button type="button" onclick="modifyItemQty('${item.id}', 1)" class="qty-btn bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200" title="Aumentar cantidad">
            +
          </button>
        </div>
      </td>

      <td class="py-3 px-3 text-center">
        <select onchange="updateItemStatus('${item.id}', this.value)" 
          class="text-xs font-semibold rounded-lg p-1.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 ${getStatusSelectClass(item.status)}">
          <option value="Completo / Buen estado" ${item.status === 'Completo / Buen estado' ? 'selected' : ''}>✅ Buen estado</option>
          <option value="Faltante" ${item.status === 'Faltante' ? 'selected' : ''}>❌ Faltante</option>
          <option value="Dañado" ${item.status === 'Dañado' ? 'selected' : ''}>⚠️ Dañado</option>
          <option value="Manchado / Sucio" ${item.status === 'Manchado / Sucio' ? 'selected' : ''}>🧺 Manchado/Sucio</option>
          <option value="Excedente" ${item.status === 'Excedente' ? 'selected' : ''}>➕ Excedente</option>
        </select>
      </td>

      <td class="py-3 px-4">
        <input type="text" value="${escapeHTML(item.observation || '')}" 
          placeholder="Novedad (ej. Roto, sin pila...)" 
          oninput="updateItemObservation('${item.id}', this.value)"
          class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700">
      </td>

      <td class="py-3 px-3 text-center">
        <button type="button" onclick="deleteItem('${item.id}')" 
          class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition" title="Eliminar artículo de esta habitación">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function getCategoryBadgeClass(category) {
  switch (category) {
    case 'Tecnología':
      return 'bg-blue-100 text-blue-800';
    case 'Lencería y Baño':
      return 'bg-teal-100 text-teal-800';
    case 'Ropa de Cama':
      return 'bg-indigo-100 text-indigo-800';
    case 'Accesorios de Habitación':
      return 'bg-amber-100 text-amber-800';
    case 'Electrodomésticos':
      return 'bg-purple-100 text-purple-800';
    case 'Menaje':
      return 'bg-emerald-100 text-emerald-800';
    case 'Mobiliario':
      return 'bg-stone-100 text-stone-800';
    default:
      return 'bg-slate-100 text-slate-700';
  }
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
// 6. OPERACIONES SOBRE ELEMENTOS DEL INVENTARIO
// ==============================================================
function modifyItemQty(itemId, delta) {
  const room = appRooms[currentRoomId];
  if (!room) return;

  const item = room.items.find(i => i.id === itemId);
  if (!item) return;

  const newQty = Math.max(0, parseInt(item.actualQty || 0, 10) + delta);
  item.actualQty = newQty;

  // Auto-ajuste de estado según cantidad
  if (item.actualQty === 0 && item.standardQty > 0) {
    item.status = 'Faltante';
  } else if (item.actualQty < item.standardQty) {
    if (item.status === 'Completo / Buen estado') item.status = 'Faltante';
  } else if (item.actualQty === item.standardQty && item.status === 'Faltante') {
    item.status = 'Completo / Buen estado';
  } else if (item.actualQty > item.standardQty) {
    item.status = 'Excedente';
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

  const newQty = Math.max(0, parseInt(value, 10) || 0);
  item.actualQty = newQty;

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

  if (!confirm(`¿Deseas eliminar "${itemName}" del inventario de la Habitación ${currentRoomId}?`)) {
    return;
  }

  room.items = room.items.filter(i => i.id !== itemId);
  recalculateRoomStatus(room);
  saveRoomsToStorage();
  renderActiveRoom();
  showToast(`Artículo eliminado de la Habitación ${currentRoomId}`, 'info');
}

function recalculateRoomStatus(room) {
  if (!room) return;

  // Si no tiene registros de camarera/auditor, se mantiene o pasa a 'ok'/'warn' según inspección
  let hasDiscrepancy = false;
  for (const item of room.items) {
    if (item.actualQty !== item.standardQty || item.status !== 'Completo / Buen estado') {
      hasDiscrepancy = true;
      break;
    }
  }

  if (hasDiscrepancy) {
    room.status = 'warn';
  } else {
    // Si no hay discrepancias y fue revisada
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
  let totalRooms = Object.keys(appRooms).length;
  let okRooms = 0;
  let warnRooms = 0;

  Object.values(appRooms).forEach(r => {
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

  if (!confirm(`¿Restablecer el inventario de la Habitación ${currentRoomId} a las cantidades y elementos estándar del catálogo?`)) {
    return;
  }

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
  showToast(`Inventario de Habitación ${currentRoomId} restablecido`, 'success');
}

function saveCurrentRoomManual() {
  saveRoomsToStorage();
  populateRoomSelect();
  updateGlobalStats();
  showToast(`Habitación ${currentRoomId} guardada correctamente`, 'success');
}

// ==============================================================
// 7. MODAL: AGREGAR ELEMENTO
// ==============================================================
function openAddItemModal() {
  const modal = document.getElementById('modal-add-item');
  if (!modal) return;
  document.getElementById('form-add-item').reset();
  modal.classList.remove('hidden');
  initLucide();
  document.getElementById('add-item-name').focus();
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

  // Si el usuario eligió agregar a las 60 habitaciones y al catálogo
  if (addToAll) {
    // Agregar al catálogo de ajustes
    if (!appSettings.catalog) appSettings.catalog = [...DEFAULT_CATALOG];
    appSettings.catalog.push({
      id: `cat-${Date.now()}`,
      name: name,
      category: category,
      standardQty: standardQty
    });
    saveSettingsToStorage();

    // Agregar a todas las demás habitaciones
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
    showToast(`Elemento agregado a las 60 habitaciones`, 'success');
  } else {
    showToast(`Elemento agregado a Habitación ${currentRoomId}`, 'success');
  }

  saveRoomsToStorage();
  closeAddItemModal();
  renderActiveRoom();
}

// ==============================================================
// 8. MODAL: MATRIZ DE 60 HABITACIONES
// ==============================================================
function openRoomMatrixModal() {
  const modal = document.getElementById('modal-matrix');
  const container = document.getElementById('room-matrix-container');
  if (!modal || !container) return;

  container.innerHTML = '';

  const roomIds = Object.keys(appRooms).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  roomIds.forEach(id => {
    const room = appRooms[id];
    const tile = document.createElement('div');
    tile.className = 'room-grid-tile rounded-xl p-3 border text-center flex flex-col items-center justify-between gap-1';

    let bgClass = 'bg-slate-50 border-slate-200 text-slate-700';
    let statusDot = 'bg-slate-400';
    let statusText = 'Sin revisar';

    if (room.status === 'ok') {
      bgClass = 'bg-emerald-50 border-emerald-300 text-emerald-900';
      statusDot = 'bg-emerald-500';
      statusText = 'Conforme';
    } else if (room.status === 'warn') {
      bgClass = 'bg-amber-50 border-amber-300 text-amber-900';
      statusDot = 'bg-amber-500';
      statusText = 'Novedades';
    }

    tile.className += ` ${bgClass}`;
    if (id === currentRoomId) {
      tile.classList.add('active-room');
    }

    tile.innerHTML = `
      <div class="text-[11px] font-semibold text-slate-400">HAB</div>
      <div class="text-lg font-black tracking-tight">${id}</div>
      <div class="flex items-center gap-1 text-[10px] font-bold">
        <span class="w-2 h-2 rounded-full ${statusDot}"></span>
        <span>${statusText}</span>
      </div>
    `;

    tile.onclick = () => {
      changeActiveRoom(id);
      closeRoomMatrixModal();
    };

    container.appendChild(tile);
  });

  modal.classList.remove('hidden');
  initLucide();
}

function closeRoomMatrixModal() {
  const modal = document.getElementById('modal-matrix');
  if (modal) modal.classList.add('hidden');
}

// ==============================================================
// 9. MODAL: AJUSTES, LOGO Y RESPALDO
// ==============================================================
function openSettingsModal() {
  const modal = document.getElementById('modal-settings');
  if (!modal) return;
  applySettingsToUI();
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
    alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG o WebP).');
    return;
  }

  // Límite de tamaño sugerido 2MB
  if (file.size > 2 * 1024 * 1024) {
    alert('La imagen no debe superar los 2MB para asegurar un rendimiento óptimo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Data = e.target.result;
    appSettings.logo = base64Data;
    saveSettingsToStorage();
    applySettingsToUI();
    showToast('Logo actualizado con éxito', 'success');
  };
  reader.readAsDataURL(file);
}

function resetDefaultLogo() {
  if (confirm('¿Deseas restaurar el logo inicial predeterminado del Hotel Recinto Quirama?')) {
    appSettings.logo = null;
    saveSettingsToStorage();
    applySettingsToUI();
    showToast('Logo restaurado al predeterminado', 'info');
  }
}

function saveSettingsModal() {
  const name = document.getElementById('settings-hotel-name').value.trim();
  const entity = document.getElementById('settings-hotel-entity').value.trim();
  const dept = document.getElementById('settings-hotel-dept').value.trim();
  const location = document.getElementById('settings-hotel-location').value.trim();
  const roomCount = parseInt(document.getElementById('settings-room-count').value, 10) || 60;
  const numbering = document.getElementById('settings-room-numbering').value;

  appSettings.hotelName = name || 'Hotel Recinto Quirama';
  appSettings.entityName = entity || 'Comfenalco Antioquia';
  appSettings.department = dept || 'Departamento de Ama de Llaves';
  appSettings.location = location || 'El Carmen de Viboral - Rionegro';
  
  // Si cambió la cantidad de habitaciones o estilo
  if (roomCount !== appSettings.roomCount || numbering !== appSettings.numbering) {
    if (confirm('Has cambiado la cantidad o numeración de habitaciones. ¿Deseas regenerar la lista de habitaciones respetando las configuraciones?')) {
      appSettings.roomCount = roomCount;
      appSettings.numbering = numbering;
      generateInitialRooms();
      populateRoomSelect();
      currentRoomId = Object.keys(appRooms)[0];
    }
  }

  saveSettingsToStorage();
  applySettingsToUI();
  populateRoomSelect();
  renderActiveRoom();
  closeSettingsModal();
  showToast('Ajustes guardados con éxito', 'success');
}

// Copia de Seguridad JSON
function exportBackupData() {
  const backupObject = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    hotel: appSettings.hotelName,
    settings: appSettings,
    rooms: appRooms
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObject, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `inventario-recinto-quirama-backup-${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
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
        if (confirm('Se importarán los datos del archivo. Esto sobreescribirá los inventarios actuales. ¿Deseas continuar?')) {
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
      } else {
        alert('El archivo no contiene un formato de respaldo válido de inventario.');
      }
    } catch (err) {
      alert('Error leyendo el archivo JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function resetAllFactoryData() {
  if (confirm('⚠️ ¡ATENCIÓN! Se restablecerán todas las habitaciones y ajustes a los valores iniciales de fábrica. Se borrarán todas las modificaciones no respaldadas. ¿Estás completamente seguro?')) {
    localStorage.removeItem(STORAGE_SETTINGS_KEY);
    localStorage.removeItem(STORAGE_ROOMS_KEY);
    appSettings = { ...DEFAULT_SETTINGS };
    generateInitialRooms();
    applySettingsToUI();
    populateRoomSelect();
    currentRoomId = Object.keys(appRooms)[0];
    renderActiveRoom();
    closeSettingsModal();
    showToast('Sistema reiniciado a valores de fábrica', 'info');
  }
}

// ==============================================================
// 10. GENERACIÓN DE FORMATO OFICIAL (PDF, IMAGEN, IMPRESIÓN)
// ==============================================================
function preparePrintReport() {
  const room = appRooms[currentRoomId];
  if (!room) return null;

  // Llenar datos de encabezado
  const numEl = document.getElementById('print-room-number');
  if (numEl) numEl.textContent = room.id;

  const typeEl = document.getElementById('print-room-type');
  if (typeEl) typeEl.textContent = room.type || 'Estándar';

  const dateEl = document.getElementById('print-room-date');
  if (dateEl) {
    const d = room.date ? new Date(room.date) : new Date();
    dateEl.textContent = isNaN(d.getTime()) ? room.date : d.toLocaleString('es-CO');
  }

  const statEl = document.getElementById('print-room-status');
  if (statEl) {
    if (room.status === 'ok') {
      statEl.textContent = 'CONFORME (SIN NOVEDADES)';
      statEl.style.color = '#065F46';
    } else if (room.status === 'warn') {
      statEl.textContent = 'CON NOVEDADES / FALTANTES';
      statEl.style.color = '#92400E';
    } else {
      statEl.textContent = 'PENDIENTE INSPECCIÓN';
      statEl.style.color = '#4B5563';
    }
  }

  const hkEl = document.getElementById('print-room-housekeeper');
  if (hkEl) hkEl.textContent = room.housekeeper ? room.housekeeper.toUpperCase() : 'NO ASIGNADA';

  const audEl = document.getElementById('print-room-auditor');
  if (audEl) audEl.textContent = room.auditor ? room.auditor.toUpperCase() : 'NO ASIGNADO';

  const notesEl = document.getElementById('print-room-notes');
  if (notesEl) {
    notesEl.textContent = room.notes && room.notes.trim() ? room.notes : 'Sin observaciones adicionales registradas.';
  }

  // Llenar tabla de elementos
  const printTbody = document.getElementById('print-table-tbody');
  if (printTbody) {
    printTbody.innerHTML = '';
    (room.items || []).forEach((item, index) => {
      const tr = document.createElement('tr');
      const isWarn = item.actualQty !== item.standardQty || item.status !== 'Completo / Buen estado';
      if (isWarn) tr.style.backgroundColor = '#FEF3C7';

      tr.innerHTML = `
        <td style="text-align: center; font-weight: bold; color: #6B7280; font-size: 8.5pt;">${index + 1}</td>
        <td style="font-weight: 700; color: #111827;">${escapeHTML(item.name)}</td>
        <td style="color: #4B5563; font-size: 8.5pt;">${escapeHTML(item.category || '-')}</td>
        <td style="text-align: center; font-weight: bold;">${item.standardQty}</td>
        <td style="text-align: center; font-weight: 800; color: ${isWarn ? '#B45309' : '#047857'};">${item.actualQty}</td>
        <td style="text-align: center; font-weight: 600; font-size: 8.5pt;">${escapeHTML(item.status)}</td>
        <td style="font-size: 8.5pt; color: #374151;">${escapeHTML(item.observation || '-')}</td>
      `;
      printTbody.appendChild(tr);
    });
  }

  const printableElement = document.getElementById('printable-report');
  return printableElement;
}

// Descargar en Formato PDF
function exportToPDF() {
  const element = preparePrintReport();
  if (!element) return;

  showToast('Generando documento PDF...', 'info');

  // Hacer visible temporalmente para renderizado
  element.style.display = 'block';

  const opt = {
    margin: [8, 8, 8, 8],
    filename: `Inventario_Habitacion_${currentRoomId}_Recinto_Quirama.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    element.style.display = 'none';
    showToast('¡PDF descargado con éxito!', 'success');
  }).catch(err => {
    element.style.display = 'none';
    console.error('Error al generar PDF:', err);
    alert('Ocurrió un inconveniente al generar el PDF. Puedes usar el botón "Imprimir" para Guardar como PDF de forma nativa.');
  });
}

// Descargar en Formato Imagen PNG
function exportToImage() {
  const element = preparePrintReport();
  if (!element) return;

  showToast('Generando imagen de alta resolución...', 'info');
  element.style.display = 'block';

  html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
    element.style.display = 'none';
    const link = document.createElement('a');
    link.download = `Inventario_Habitacion_${currentRoomId}_Quirama.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('¡Imagen descargada con éxito!', 'success');
  }).catch(err => {
    element.style.display = 'none';
    console.error('Error al generar imagen:', err);
    alert('Error al generar la imagen.');
  });
}

// Imprimir directo con Diálogo del Navegador
function printInventoryReport() {
  preparePrintReport();
  window.print();
}

// ==============================================================
// 11. UTILIDADES Y NOTIFICACIONES
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

  let borderColor = '#007A65';
  let iconName = 'check-circle';

  if (type === 'success') {
    borderColor = '#10B981';
    iconName = 'check-circle-2';
  } else if (type === 'error') {
    borderColor = '#EF4444';
    iconName = 'alert-triangle';
  } else if (type === 'info') {
    borderColor = '#3B82F6';
    iconName = 'info';
  }

  toast.style.borderLeftColor = borderColor;

  toast.innerHTML = `
    <div class="flex items-center gap-2.5">
      <i data-lucide="${iconName}" class="w-5 h-5" style="color: ${borderColor}"></i>
      <span class="text-xs font-semibold text-slate-800">${escapeHTML(message)}</span>
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600">
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
