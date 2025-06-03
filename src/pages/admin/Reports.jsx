import { createSignal } from 'solid-js';

function Reports() {
  const [selectedReportType, setSelectedReportType] = createSignal('general');
  const [selectedPeriod, setSelectedPeriod] = createSignal('month');

  const containerStyle = {
    padding: '25px',
    backgroundColor: '#f7fafc'
  };

  const headerStyle = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2d3748'
  };

  const controlsStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const selectStyle = {
    padding: '10px 15px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer'
  };

  const exportButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const reportsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const reportCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  };

  const reportHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const reportIconStyle = {
    fontSize: '32px',
    marginRight: '15px'
  };

  const reportTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '5px'
  };

  const reportDescStyle = {
    fontSize: '14px',
    color: '#4a5568'
  };

  const reportStatsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '20px'
  };

  const statItemStyle = {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px'
  };

  const statValueStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '5px'
  };

  const statLabelStyle = {
    fontSize: '12px',
    color: '#4a5568'
  };

  const detailedReportStyle = {
    marginTop: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '20px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  };

  const tableHeaderStyle = {
    backgroundColor: '#f7fafc',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2d3748'
  };

  const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#4a5568'
  };

  const chartPlaceholderStyle = {
    height: '200px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a5568',
    fontSize: '16px',
    marginBottom: '20px'
  };

  const reportTypes = [
    { id: 'general', label: 'Reporte General' },
    { id: 'eventos', label: 'Análisis de Eventos' },
    { id: 'visitantes', label: 'Demografía de Visitantes' },
    { id: 'ingresos', label: 'Análisis Financiero' },
    { id: 'satisfaccion', label: 'Satisfacción del Cliente' }
  ];

  const periods = [
    { id: 'week', label: 'Esta Semana' },
    { id: 'month', label: 'Este Mes' },
    { id: 'quarter', label: 'Este Trimestre' },
    { id: 'year', label: 'Este Año' }
  ];

  // Datos mock para reportes
  const reportCards = [
    {
      id: 'attendance',
      icon: '👥',
      title: 'Reporte de Asistencia',
      description: 'Análisis detallado de asistencia a eventos',
      stats: {
        total: '2,847',
        growth: '+12%'
      },
      details: 'Promedio de 95 asistentes por evento'
    },
    {
      id: 'revenue',
      icon: '💰',
      title: 'Análisis de Ingresos',
      description: 'Ingresos generados por eventos y actividades',
      stats: {
        total: 'RD$ 847K',
        growth: '+8%'
      },
      details: 'Ingreso promedio por evento: RD$ 28,000'
    },
    {
      id: 'satisfaction',
      icon: '⭐',
      title: 'Satisfacción del Cliente',
      description: 'Calificaciones y feedback de visitantes',
      stats: {
        total: '4.8/5',
        growth: '+0.2'
      },
      details: '96% de visitantes recomendarían el centro'
    },
    {
      id: 'demographics',
      icon: '📊',
      title: 'Análisis Demográfico',
      description: 'Perfil de visitantes y segmentación',
      stats: {
        total: '1,247',
        growth: '+15%'
      },
      details: 'Edad promedio: 32 años, 62% mujeres'
    },
    {
      id: 'events',
      icon: '🎭',
      title: 'Performance de Eventos',
      description: 'Análisis de éxito por tipo de evento',
      stats: {
        total: '89%',
        growth: '+5%'
      },
      details: 'Tasa de ocupación promedio del 89%'
    },
    {
      id: 'trends',
      icon: '📈',
      title: 'Tendencias y Predicciones',
      description: 'Análisis predictivo y tendencias futuras',
      stats: {
        total: '+23%',
        growth: 'Proyección'
      },
      details: 'Crecimiento esperado para el próximo trimestre'
    }
  ];

  const topEvents = [
    { name: 'Exposición Arte Contemporáneo', attendance: 356, satisfaction: 4.9 },
    { name: 'Concierto Jazz Dominicano', attendance: 145, satisfaction: 4.8 },
    { name: 'Obra: Sueños de Libertad', attendance: 198, satisfaction: 4.7 },
    { name: 'Festival Danza Folclórica', attendance: 215, satisfaction: 4.6 },
    { name: 'Conferencia Historia del Merengue', attendance: 89, satisfaction: 4.5 }
  ];

  const visitorDemographics = [
    { age: '18-25', percentage: 22, count: 274 },
    { age: '26-35', percentage: 31, count: 387 },
    { age: '36-45', percentage: 28, count: 349 },
    { age: '46-55', percentage: 14, count: 175 },
    { age: '56+', percentage: 5, count: 62 }
  ];

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>📈 Reportes y Estadísticas</h1>
        
        <div style={controlsStyle}>
          <select
            style={selectStyle}
            value={selectedReportType()}
            onChange={(e) => setSelectedReportType(e.target.value)}
          >
            {reportTypes.map(type => (
              <option value={type.id}>{type.label}</option>
            ))}
          </select>
          
          <select
            style={selectStyle}
            value={selectedPeriod()}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {periods.map(period => (
              <option value={period.id}>{period.label}</option>
            ))}
          </select>
          
          <button style={exportButtonStyle}>
            📄 Exportar PDF
          </button>
        </div>
      </header>

      {/* Tarjetas de reportes */}
      <div style={reportsGridStyle}>
        {reportCards.map(report => (
          <div 
            style={reportCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={reportHeaderStyle}>
              <div style={reportIconStyle}>{report.icon}</div>
              <div>
                <h3 style={reportTitleStyle}>{report.title}</h3>
                <p style={reportDescStyle}>{report.description}</p>
              </div>
            </div>

            <div style={reportStatsStyle}>
              <div style={statItemStyle}>
                <div style={statValueStyle}>{report.stats.total}</div>
                <div style={statLabelStyle}>Total</div>
              </div>
              <div style={statItemStyle}>
                <div style={{
                  ...statValueStyle,
                  color: report.stats.growth.includes('+') ? '#38a169' : '#e53e3e'
                }}>
                  {report.stats.growth}
                </div>
                <div style={statLabelStyle}>Crecimiento</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#4a5568', textAlign: 'center' }}>
              {report.details}
            </div>
          </div>
        ))}
      </div>

      {/* Reporte detallado */}
      <div style={detailedReportStyle}>
        <h2 style={sectionTitleStyle}>📊 Análisis Detallado - {selectedReportType()}</h2>

        {/* Gráfico placeholder */}
        <div style={chartPlaceholderStyle}>
          📈 Gráfico de Tendencias - {periods.find(p => p.id === selectedPeriod())?.label}
          <br />
          <small>(Integración con librerías de gráficos en desarrollo)</small>
        </div>

        {/* Eventos más exitosos */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ ...sectionTitleStyle, fontSize: '18px' }}>🏆 Eventos Más Exitosos</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Evento</th>
                <th style={tableHeaderStyle}>Asistencia</th>
                <th style={tableHeaderStyle}>Satisfacción</th>
                <th style={tableHeaderStyle}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {topEvents.map(event => (
                <tr>
                  <td style={tableCellStyle}>{event.name}</td>
                  <td style={tableCellStyle}>{event.attendance} personas</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      color: event.satisfaction >= 4.7 ? '#38a169' : '#ecc94b'
                    }}>
                      ⭐ {event.satisfaction}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      backgroundColor: '#c6f6d5',
                      color: '#22543d'
                    }}>
                      Exitoso
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Demografía de visitantes */}
        <div>
          <h3 style={{ ...sectionTitleStyle, fontSize: '18px' }}>👥 Demografía de Visitantes</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Rango de Edad</th>
                <th style={tableHeaderStyle}>Porcentaje</th>
                <th style={tableHeaderStyle}>Cantidad</th>
                <th style={tableHeaderStyle}>Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {visitorDemographics.map(demo => (
                <tr>
                  <td style={tableCellStyle}>{demo.age} años</td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: `${demo.percentage * 2}px`,
                        height: '8px',
                        backgroundColor: '#4299e1',
                        borderRadius: '4px',
                        marginRight: '8px'
                      }}></div>
                      {demo.percentage}%
                    </div>
                  </td>
                  <td style={tableCellStyle}>{demo.count} visitantes</td>
                  <td style={tableCellStyle}>
                    <span style={{ color: '#38a169' }}>📈 +{Math.floor(Math.random() * 10)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen ejecutivo */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f7fafc',
          borderRadius: '8px',
          borderLeft: '4px solid #4299e1'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
            📋 Resumen Ejecutivo
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            lineHeight: '1.8',
            color: '#4a5568' 
          }}>
            <li>• El centro cultural ha registrado un crecimiento del 12% en asistencia</li>
            <li>• Los eventos de arte contemporáneo son los más populares</li>
            <li>• La satisfacción del cliente se mantiene en 4.8/5 estrellas</li>
            <li>• El grupo demográfico de 26-35 años representa el 31% de visitantes</li>
            <li>• Se proyecta un crecimiento del 23% para el próximo trimestre</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports; 