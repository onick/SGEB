# 🎭 **Eventos Disponibles para Pruebas**

## 🔥 **EVENTOS DE HOY** (Redirección automática al check-in)

### 1. **Exposición: Arte Contemporáneo Dominicano** 🖼️
- **Capacidad**: 150 personas (45 registrados)
- **Ubicación**: Sala Principal
- **Flujo**: Registro → Redirección automática → Check-in

### 2. **Taller: Fotografía Cultural** 🎨
- **Capacidad**: 30 personas (12 registrados)
- **Ubicación**: Aula 101
- **Flujo**: Registro → Redirección automática → Check-in

### 3. **Concierto: Jazz en Vivo** 🎵
- **Capacidad**: 80 personas (75 registrados) ⚠️ **CASI LLENO**
- **Ubicación**: Sala de Música
- **Flujo**: Registro → Redirección automática → Check-in

---

## 📧 **EVENTOS PRÓXIMOS** (Envío por email)

### 4. **Concierto: Música Clásica Dominicana** 🎵
- **Fecha**: Mañana
- **Capacidad**: 200 personas (180 registrados) ⚠️ **CASI LLENO**
- **Ubicación**: Auditorio Principal
- **Flujo**: Registro → Email con código

### 5. **Obra de Teatro: "Sueños de Libertad"** 🎪
- **Fecha**: En 3 días
- **Capacidad**: 120 personas (35 registrados)
- **Ubicación**: Teatro Principal
- **Flujo**: Registro → Email con código

### 6. **Exposición: Fotografía Histórica RD** 🖼️
- **Fecha**: En 5 días
- **Capacidad**: 100 personas (20 registrados)
- **Ubicación**: Galería de Arte
- **Flujo**: Registro → Email con código

### 7. **Conferencia: Historia del Arte Caribeño** 🎓
- **Fecha**: Próxima semana
- **Capacidad**: 100 personas (65 registrados)
- **Ubicación**: Sala de Conferencias
- **Flujo**: Registro → Email con código

### 8. **Taller: Cerámica Tradicional Taína** 🎨
- **Fecha**: En 2 semanas
- **Capacidad**: 25 personas (8 registrados)
- **Ubicación**: Taller de Artes
- **Flujo**: Registro → Email con código

### 9. **Festival: Danza Folklórica Dominicana** 🎭
- **Fecha**: Próximo mes
- **Capacidad**: 300 personas (85 registrados)
- **Ubicación**: Plaza Central
- **Flujo**: Registro → Email con código

### 10. **Exposición: Esculturas en Madera** 🖼️
- **Fecha**: En 5 días
- **Capacidad**: 80 personas (15 registrados)
- **Ubicación**: Sala de Esculturas
- **Flujo**: Registro → Email con código

### 11. **Concierto: Merengue Clásico** 🎵
- **Fecha**: Próxima semana
- **Capacidad**: 250 personas (120 registrados)
- **Ubicación**: Gran Auditorio
- **Flujo**: Registro → Email con código

---

## 🚫 **EVENTO LLENO** (Para probar validaciones)

### 12. **Conferencia: Literatura Dominicana Contemporánea** 🎓
- **Fecha**: En 3 días
- **Capacidad**: 50 personas (50 registrados) ❌ **COMPLETO**
- **Ubicación**: Biblioteca Central
- **Flujo**: Error → "Evento lleno"

---

## 🧪 **Casos de Prueba Recomendados**

### ✅ **Flujo de Eventos de Hoy:**
1. Ir a `/events`
2. Seleccionar evento con borde rojo y badge "Hoy"
3. Registrarse con datos válidos
4. Observar redirección automática a check-in
5. Completar check-in con código generado

### ✅ **Flujo de Eventos Próximos:**
1. Ir a `/events`
2. Seleccionar evento con borde verde
3. Registrarse con datos válidos
4. Observar mensaje de "código enviado por email"
5. NO hay redirección automática

### ✅ **Validación de Capacidad:**
1. Intentar registrarse en "Literatura Dominicana Contemporánea"
2. Observar mensaje de error "evento lleno"

### ✅ **Check-in Manual:**
1. Ir a `/checkin`
2. Probar con códigos como: `EXPO-ABC123`, `TALLER-XYZ789`
3. Probar búsqueda por nombre: "Juan Pérez", "María González"

---

## 🎯 **URLs para Pruebas**

- **Página Principal**: http://localhost:3007/
- **Galería de Eventos**: http://localhost:3007/events
- **Check-in**: http://localhost:3007/checkin
- **Admin**: http://localhost:3007/admin

---

## 📊 **Estadísticas de Eventos**

- **Total de eventos**: 12
- **Eventos de hoy**: 3
- **Eventos próximos**: 8
- **Eventos llenos**: 1
- **Capacidad total**: 1,555 personas
- **Registrados totales**: 738 personas
- **Disponibilidad**: 817 espacios libres

¡Disfruta probando todos los flujos! 🚀 