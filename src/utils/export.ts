import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Sale } from "@/types/product";

// Imports do Tauri V2
// Nota: Certifique-se de ter instalado: npm run tauri add dialog fs
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile, writeFile } from "@tauri-apps/plugin-fs";

// Função auxiliar para detectar se está rodando no Tauri
const isTauri = () => {
  return typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__;
};

// ==========================================
// EXPORTAR CSV
// ==========================================
export const exportToCSV = async (sales: Sale[], filename = "relatorio-vendas") => {
  // Cabeçalho do CSV
  const headers = ["ID", "Data", "Hora", "Produtos", "Métodos de Pagamento", "Total"];

  // Linhas do CSV
  const rows = sales.map((sale) => {
    // Formata resumo dos produtos
    const productsSummary = sale.products
      .map((p) => `${p.quantity}x ${p.name}`)
      .join(" | ")
      .replace(/"/g, '""'); // Escapa aspas duplas internas
    
    // Formata resumo dos pagamentos
    const paymentsSummary = sale.payments
      .map((p) => `${p.method} (${p.value})`)
      .join(" | ")
      .replace(/"/g, '""');

    // Monta a linha CSV respeitando aspas para campos com vírgula
    return [
      sale.id,
      sale.date,
      sale.time,
      `"${productsSummary}"`,
      `"${paymentsSummary}"`,
      sale.total.toFixed(2).replace('.', ','), // Formato brasileiro de número
    ].join(",");
  });

  // Unir tudo com BOM para o Excel reconhecer acentos
  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");

  if (isTauri()) {
    try {
      // 1. Abre janela nativa "Salvar Como"
      const filePath = await save({
        filters: [{ name: 'CSV', extensions: ['csv'] }],
        defaultPath: `${filename}.csv`
      });

      // 2. Se o usuário escolheu um local, salva o arquivo texto
      if (filePath) {
        await writeTextFile(filePath, csvContent);
      }
    } catch (error) {
      console.error("Erro ao salvar CSV nativo:", error);
    }
  } else {
    // Modo Navegador (WSL/Dev)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// ==========================================
// EXPORTAR PDF (ESTILO EXTRATO BANCÁRIO)
// ==========================================
export const exportToPDF = async (sales: Sale[], periodStart?: string, periodEnd?: string) => {
  const doc = new jsPDF();

  // --- CONFIGURAÇÕES VISUAIS ---
  const companyName = "Ice Valle";
  const primaryColor = [40, 40, 40] as [number, number, number]; 
  const lineColor = [200, 200, 200] as [number, number, number];
  
  // --- CABEÇALHO ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(companyName, 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Extrato de Vendas", 14, 26);

  // Data de Emissão e Período
  const today = new Date().toLocaleDateString("pt-BR");
  doc.setFontSize(9);
  doc.text(`Emissão: ${today}`, 195, 20, { align: "right" });

  const periodText = periodStart && periodEnd 
    ? `${periodStart} até ${periodEnd}` 
    : "Completo";
  doc.text(`Período: ${periodText}`, 195, 25, { align: "right" });

  // Linha divisória do cabeçalho
  doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
  doc.line(14, 30, 196, 30);

  // --- RESUMO FINANCEIRO (BOX) ---
  const totalSales = sales.reduce((acc, curr) => acc + curr.total, 0);
  const totalTrans = sales.length;

  doc.setFillColor(248, 248, 248); // Fundo cinza muito claro
  doc.rect(14, 35, 182, 25, "F");
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("SALDO DO PERÍODO", 20, 42);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text(`R$ ${totalSales.toFixed(2)}`, 20, 52);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`${totalTrans} Transações`, 100, 52);

  // --- TABELA DE LANÇAMENTOS ---
  const tableBody = sales.map((sale) => [
    `${sale.date}\n${sale.time}`,
    `VENDA #${sale.id.slice(-6)}\n${sale.products.length} itens`,
    sale.payments.map(p => p.method).join(", "),
    `R$ ${sale.total.toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 65,
    head: [["DATA", "DESCRIÇÃO", "MÉTODO", "VALOR"]],
    body: tableBody,
    theme: 'plain',
    styles: {
      fontSize: 9,
      font: "helvetica",
      cellPadding: 4,
      textColor: [40, 40, 40],
      lineColor: [230, 230, 230],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [100, 100, 100],
      fontStyle: 'bold',
      lineWidth: 0, 
    },
    columnStyles: {
      0: { cellWidth: 35 }, 
      1: { cellWidth: 'auto' }, 
      2: { cellWidth: 40 }, 
      3: { cellWidth: 35, halign: 'right', fontStyle: 'bold' },
    },
    // Desenha a linha preta manualmente apenas sob o cabeçalho
    didDrawCell: (data) => {
      if (data.section === 'head' && data.row.index === 0) {
        const { doc, cell } = data;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
      }
    },
    didDrawPage: (data) => {
      const str = "Página " +  doc.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(150);
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      
      const marginLeft = data.settings.margin && typeof data.settings.margin === 'object' 
        ? data.settings.margin.left 
        : 14;

      doc.text(str, marginLeft, pageHeight - 10);
    }
  });

  // --- FINALIZAÇÃO ---
  if (isTauri()) {
    try {
      // 1. Gera PDF como ArrayBuffer
      const pdfOutput = doc.output('arraybuffer');

      // 2. Abre janela nativa "Salvar Como"
      const filePath = await save({
        filters: [{ name: 'PDF', extensions: ['pdf'] }],
        defaultPath: 'extrato-vendas.pdf'
      });

      // 3. Salva o arquivo binário
      if (filePath) {
        // writeFile (fs v2) usa Uint8Array
        await writeFile(filePath, new Uint8Array(pdfOutput));
      }
    } catch (error) {
      console.error("Erro ao salvar PDF nativo:", error);
    }
  } else {
    // Modo Navegador (Download automático)
    doc.save("extrato-vendas.pdf");
  }
};