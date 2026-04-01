import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates a professional PDF report of the Kanban board tasks.
 * @param {Array} tasks - All tasks currently on the board.
 * @param {Array} columns - Column titles ['To Do', 'In Progress', 'Done'].
 */
export const generatePDFReport = (tasks, columns) => {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleString();

  // 1. Header Section
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // Accent Indigo
  doc.text('Kanban Board Report', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${dateStr}`, 14, 30);
  doc.line(14, 34, 196, 34); // Horizontal line

  // 2. Summary Section
  doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text('Board Summary', 14, 45);

  const summaryData = columns.map(col => {
    const colTasks = tasks.filter(t => t.column === col);
    const high = colTasks.filter(t => t.priority === 'High').length;
    const med = colTasks.filter(t => t.priority === 'Medium').length;
    const low = colTasks.filter(t => t.priority === 'Low').length;
    return [col, colTasks.length, high, med, low];
  });

  autoTable(doc, {
    startY: 50,
    head: [['Column', 'Total Tasks', 'High Priority', 'Medium Priority', 'Low Priority']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229] },
    margin: { top: 50 },
  });

  // 3. Detailed Tasks Section
  let lastAutoTable = doc.lastAutoTable;
  let currentY = (lastAutoTable ? lastAutoTable.finalY : 50) + 15;

  columns.forEach(col => {
    const colTasks = tasks.filter(t => t.column === col);
    
    if (colTasks.length > 0) {
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.setFont('helvetica', 'bold');
      doc.text(`Stage: ${col}`, 14, currentY);
      currentY += 8;

      const taskDetails = colTasks.map(t => [
        t.content,
        t.priority,
        t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No date',
        t.description || '-'
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [['Title', 'Priority', 'Due Date', 'Description']],
        body: taskDetails,
        theme: 'striped',
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fontSize: 9 },
        columnStyles: {
          3: { cellWidth: 80 } // Wider column for description
        },
        margin: { top: currentY },
      });

      lastAutoTable = doc.lastAutoTable;
      currentY = (lastAutoTable ? lastAutoTable.finalY : currentY) + 12;
    }
  });

  // 4. Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
  }

  // 5. Save the PDF
  doc.save(`Kanban_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};
