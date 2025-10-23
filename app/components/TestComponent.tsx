'use client';

export default function TestComponent() {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: 'red',
      color: 'white',
      zIndex: 1000,
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      TESTE VISÍVEL
    </div>
  );
}
