# 🏨 Sistema de Control de Inventario de Habitaciones
### Hotel Recinto Quirama · Comfenalco Antioquia

Aplicación web moderna, ágil y receptiva diseñada para la auditoría, control de dotación y registro de inventario de las **60 habitaciones** del **Hotel Recinto Quirama de Comfenalco Antioquia** (El Carmen de Viboral - Rionegro).

---

## 📋 Características Principales

1. **Gestión de 60 Habitaciones**:
   - Selector rápido y matriz visual interactiva para navegar por las 60 habitaciones.
   - Semaforización en tiempo real:
     - 🟢 **Conforme**: Habitación inspeccionada y dotación completa.
     - 🟡 **Con Novedades**: Habitación con faltantes, daños o discrepancias.
     - ⚪ **Sin Inspección**: Habitación pendiente de revisión.
   - Registro de camarera responsable, supervisora/auditora, tipo de habitación y fecha/hora exacta.

2. **Inventario Completo y Personalizable**:
   - Elementos preconfigurados según dotación hotelera:
     - 🌂 Sombrilla de cortesía
     - 🧺 Cesta plástica de ropa / aseo
     - 📺 Control remoto TV y Control de decodificador
     - 🛁 Toallas de mano, toalla de pie (salida de baño), toalla de rodapié y toallas de cuerpo/baño
     - 🛏️ Cobijas/plumón térmico, almohadas, sábanas
     - 🔌 Secador de cabello, vasos de vidrio, papeleras, perchas/ganchos de clóset y directorio.
   - Contador de cantidades estándar y cantidades reales con botones rápidos (+ / -) y teclado.
   - Estado por ítem: *Completo / Buen estado*, *Faltante*, *Dañado*, *Manchado/Sucio*, *Excedente*.
   - Espacio para notas y novedades individuales por artículo y observaciones generales de la habitación.
   - Posibilidad de **agregar nuevos elementos** a una habitación específica o al catálogo de las 60 habitaciones.

3. **Apartado de Ajustes y Personalización**:
   - **Logotipo de la Empresa**: Permite cargar el logo oficial de la empresa (PNG, JPG, SVG) desde el computador, guardándolo automáticamente para que aparezca en pantalla y en todos los reportes impresos.
   - Opción de restaurar el logo institucional predeterminado de Quirama / Comfenalco.
   - Edición de datos del hotel, departamento responsable y rango de habitaciones.
   - **Copia de Respaldo**: Descarga y restauración de todos los inventarios en archivo JSON para no perder información.

4. **Exportación e Impresión Profesional**:
   - 📄 **Descargar PDF**: Genera al instante un documento formal tamaño carta con membrete, logo, número de habitación, tabla de inventario, novedades y 3 casillas de firmas (*Camarera*, *Supervisora Ama de Llaves*, *Auditoría*).
   - 🖼️ **Descargar Imagen (PNG)**: Descarga una imagen de alta resolución ideal para enviar por WhatsApp o guardar en galería.
   - 🖨️ **Impresión Directa**: Formato de impresión física optimizado con estilos limpios para hojas de papel.

---

## 🚀 Uso Inmediato en Local

No requiere instalación de servidores ni dependencias.

1. Abre la carpeta `inventario-recinto-quirama`.
2. Haz doble clic sobre el archivo **`index.html`** para abrirlo en cualquier navegador (Google Chrome, Microsoft Edge, Firefox, Safari).
3. ¡Listo! Puedes comenzar a auditar habitaciones, ajustar el inventario y descargar reportes.

---

## 🌐 Publicación en GitHub y GitHub Pages (Usuario: `shenao356`)

Para publicar este proyecto en tu cuenta de GitHub y tener la aplicación disponible en línea las 24 horas (desde celulares, tablets y computadores del hotel):

### Opción Rápida (Script Automático):
Ejecuta el archivo **`push-to-github.bat`** incluido en esta carpeta.

---

### Opción Manual (Paso a Paso en PowerShell / CMD):

1. **Inicia sesión en GitHub** en tu navegador o mediante la consola:
   ```powershell
   gh auth login
   ```

2. **Crea el repositorio en tu cuenta de GitHub**:
   - Puedes ir a [https://github.com/new](https://github.com/new) y crear el repositorio llamado `inventario-recinto-quirama`.
   - O crearlo desde la terminal:
     ```powershell
     gh repo create inventario-recinto-quirama --public --source=. --remote=origin --push
     ```

3. **Subir los archivos mediante Git**:
   ```powershell
   git init
   git add .
   git commit -m "Sistema de inventario Hotel Recinto Quirama - Comfenalco"
   git branch -M main
   git remote add origin https://github.com/shenao356/inventario-recinto-quirama.git
   git push -u origin main
   ```

4. **Activar GitHub Pages (Web en Vivo Gratuita)**:
   - Entra a tu repositorio: `https://github.com/shenao356/inventario-recinto-quirama`
   - Ve a **Settings** (Configuración) -> pestaña **Pages** (a la izquierda).
   - En **Source**, selecciona **Deploy from a branch**.
   - En **Branch**, selecciona **`main`** y carpeta **`/ (root)`**, luego haz clic en **Save**.
   - En 1 minuto tu aplicación estará disponible públicamente en:
     👉 **`https://shenao356.github.io/inventario-recinto-quirama/`**

---

## 📱 Compatibilidad Móvil y Offline

- **Diseño Responsive**: Funciona tanto en computadores de escritorio de recepción como en teléfonos móviles y tablets del personal de camarería y ama de llaves mientras recorren los pasillos del hotel.
- **Persistencia Local (`LocalStorage`)**: Todos los conteos, novedades y el logo quedan guardados en el navegador del dispositivo, asegurando que no se pierdan los datos si se cae la conexión Wi-Fi temporalmente.
