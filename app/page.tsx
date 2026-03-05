import React from 'react';

// Você pode adicionar estilos inline ou CSS modules aqui
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Ocupa a altura total da tela
  backgroundColor: '#f0f2f5', // Cor de fundo leve
  fontFamily: 'Arial, sans-serif',
};

const PageBranco: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h1>Página em Branco</h1>
    </div>
  );
};

export default PageBranco;
