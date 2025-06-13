import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Factura.css';

function Factura() {
  const location = useLocation();
  const { ordenId, orden } = location.state || {};

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // --- Cabecera de la Factura ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('TechLife', 20, 25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Av. Corrientes 1234, C1043AAS', 20, 32);
    doc.text('Ciudad Autónoma de Bs. As., Argentina', 20, 37);

    doc.rect(130, 15, 60, 25); // Recuadro para datos de factura
    doc.setFontSize(14);
    doc.text('FACTURA', 143, 22);
    doc.setFontSize(10);
    doc.text(`Nº: 0001-${ordenId.slice(-8)}`, 135, 30);
    doc.text(`Fecha: ${new Date(orden.fecha).toLocaleDateString()}`, 135, 35);
    
    doc.setFont('helvetica', 'bold');
    doc.text('C', 138, 22); // Letra de la factura
    doc.setFont('helvetica', 'normal');


    // --- Datos del Cliente ---
    doc.setDrawColor(200);
    doc.line(20, 45, 190, 45); // Línea divisoria
    doc.setFontSize(12);
    doc.text('Cliente:', 20, 52);
    doc.setFontSize(10);
    doc.text(`Nombre: ${orden.comprador.nombre}`, 20, 58);
    doc.text(`Email: ${orden.comprador.email}`, 20, 63);
    doc.text(`Teléfono: ${orden.comprador.telefono}`, 20, 68);
    doc.line(20, 75, 190, 75);

    // --- Tabla de Productos ---
    const tableColumn = ["Código", "Producto", "Cant.", "P. Unit.", "Subtotal"];
    const tableRows = [];

    orden.items.forEach(item => {
      const itemData = [
        item.id,
        item.titulo,
        item.quantity,
        `$${Number(item.precio).toFixed(2)}`,
        `$${(item.precio * item.quantity).toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [28, 61, 90] }
    });
    
    const finalY = doc.lastAutoTable.finalY || 150;
    
    // --- Método de Pago ---
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Método de Pago:', 20, finalY + 15);
    doc.setFont('helvetica', 'bold');
    doc.text(`${orden.pago.metodo} terminada en ${orden.pago.numero.slice(-4)}`, 20, finalY + 20);

    // --- Total ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL:', 140, finalY + 25);
    doc.text(`$${orden.total}`, 170, finalY + 25);

    // --- Pie de página de AFIP (simulado) ---
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Factura tipo "C" - Consumidor Final', 20, 280);
    const cae = `CAE Nro: ${Math.floor(Math.random() * 10**14)}`;
    const vencimiento = `Vencimiento CAE: ${new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}`;
    doc.text(cae, 20, 285);
    doc.text(vencimiento, 140, 285);
    
    // Guardar el PDF
    doc.save(`Factura-TechLife-${ordenId}.pdf`);
  };

  if (!orden) {
    return <p>Cargando datos de la orden...</p>;
  }

  return (
    <div className="factura-container">
      <div className="factura-header">
        <div className="icon">✓</div>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido procesada con éxito.</p>
      </div>

      <div className="factura-details">
        <h3>Detalles de la Orden</h3>
        <p><strong>ID de Orden:</strong> {ordenId}</p>
        <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
        <p><strong>Cliente:</strong> {orden.comprador.nombre}</p>
        <p><strong>Email:</strong> {orden.comprador.email}</p>
      </div>
      
      <div className="factura-details">
        <h3>Detalles del Pago</h3>
        <p><strong>Método de Pago:</strong> {orden.pago.metodo}</p>
        <p><strong>Tarjeta:</strong> {orden.pago.numero}</p>
      </div>

      <div className="factura-items">
        <h3>Resumen de Productos</h3>
        <ul>
          {orden.items.map((item) => (
            <li key={item.id}>
              <span>{item.titulo} (x{item.quantity})</span>
              <strong>${(item.precio * item.quantity).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="factura-total">
        <h3>Total: ${orden.total}</h3>
      </div>

      <div className="factura-buttons">
        <button className="btn-descargar" onClick={generarPDF}>
          Descargar Factura PDF
        </button>
        <Link to="/catalogo" className="btn-volver">Volver al Catálogo</Link>
      </div>
    </div>
  );
}

export default Factura;