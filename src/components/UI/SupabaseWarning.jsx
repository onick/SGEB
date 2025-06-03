import React from 'react'
import { AlertTriangle, ExternalLink, Database, Key } from 'lucide-react'

const SupabaseWarning = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      right: '20px',
      zIndex: 2000,
      background: 'rgba(249, 115, 22, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(249, 115, 22, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <AlertTriangle size={24} style={{ color: '#f97316', flexShrink: 0, marginTop: '2px' }} />
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 12px 0', 
            color: '#f97316', 
            fontSize: '18px', 
            fontWeight: '600' 
          }}>
            ⚠️ Supabase No Configurado
          </h3>
          
          <p style={{ 
            margin: '0 0 16px 0', 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            La aplicación está funcionando con <strong>datos de demostración</strong>. 
            Para usar todas las funcionalidades, configure Supabase:
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.2)', 
              borderRadius: '8px', 
              padding: '12px',
              fontSize: '13px',
              fontFamily: 'monospace',
              color: '#d1d5db'
            }}>
              <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={16} style={{ color: '#10b981' }} />
                <span>VITE_SUPABASE_URL=https://tu-proyecto.supabase.co</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} style={{ color: '#3b82f6' }} />
                <span>VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#059669'}
              onMouseOut={(e) => e.target.style.background = '#10b981'}
            >
              <ExternalLink size={16} />
              Crear Proyecto Supabase
            </a>
            
            <button
              onClick={() => {
                const instructions = `
📋 INSTRUCCIONES PARA CONFIGURAR SUPABASE:

1. 🌐 Ve a https://supabase.com/dashboard
2. ➕ Crea un nuevo proyecto
3. ⚙️ Ve a Settings → API
4. 📋 Copia la URL del proyecto y la clave "anon public"
5. 📝 Crea un archivo .env.local en la raíz del proyecto:

VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui

6. 🗃️ En Supabase SQL Editor, ejecuta el script database/init.sql
7. 🔄 Reinicia el servidor: npm run dev

¡Tu aplicación estará lista! 🚀
                `.trim()
                
                navigator.clipboard.writeText(instructions).then(() => {
                  alert('Instrucciones copiadas al portapapeles! 📋')
                }).catch(() => {
                  console.log('Instrucciones:', instructions)
                  alert('Revisa la consola para ver las instrucciones completas')
                })
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              📋 Copiar Instrucciones
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupabaseWarning 