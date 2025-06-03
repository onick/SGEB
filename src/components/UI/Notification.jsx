import React from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const Notification = () => {
  const { notification, showNotification } = useApp()

  if (!notification) return null

  const { message, type } = notification

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  }

  const colors = {
    success: {
      bg: 'rgba(34, 197, 94, 0.1)',
      border: '#22c55e',
      text: '#16a34a',
      icon: '#22c55e'
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: '#ef4444',
      text: '#dc2626',
      icon: '#ef4444'
    },
    info: {
      bg: 'rgba(59, 130, 246, 0.1)',
      border: '#3b82f6',
      text: '#2563eb',
      icon: '#3b82f6'
    }
  }

  const IconComponent = icons[type] || Info
  const colorScheme = colors[type] || colors.info

  const handleClose = () => {
    showNotification(null)
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: colorScheme.bg,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${colorScheme.border}`,
      borderRadius: '12px',
      padding: '16px 20px',
      minWidth: '300px',
      maxWidth: '500px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
      
      <IconComponent 
        size={20} 
        style={{ color: colorScheme.icon, flexShrink: 0 }} 
      />
      
      <span style={{
        color: colorScheme.text,
        fontSize: '14px',
        fontWeight: '500',
        flex: 1
      }}>
        {message}
      </span>
      
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: colorScheme.text,
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.7,
          transition: 'opacity 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.opacity = 1}
        onMouseOut={(e) => e.target.style.opacity = 0.7}
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default Notification 