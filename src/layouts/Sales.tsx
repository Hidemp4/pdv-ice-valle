import CardValueSales from "@/components/ui/cardValueSales";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  Column,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, FilterX, Search, FileText, Download } from "lucide-react";

type mockSale = {
  id: number;
  products: string;
  date: string;
  total: string;
  paymentMethod: string;
};

// Função helper para criar headers com ordenação
const createSortableHeader = (label: string) => {
  return ({ column }: { column: Column<mockSale, unknown> }) => {
    const sortDirection = column.getIsSorted();
    
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
      >
        {label}
        {sortDirection === "asc" && (
          <ArrowUp className="h-4 w-4 text-blue-600" />
        )}
        {sortDirection === "desc" && (
          <ArrowDown className="h-4 w-4 text-blue-600" />
        )}
        {!sortDirection && (
          <ArrowUpDown className="h-4 w-4 opacity-40 group-hover:opacity-60 transition-opacity" />
        )}
      </Button>
    );
  };
};

export const columns: ColumnDef<mockSale>[] = [
  {
    accessorKey: "products",
    header: createSortableHeader("Produtos"),
  },
  {
    accessorKey: "date",
    header: createSortableHeader("Data da venda"),
  },
  {
    accessorKey: "total",
    header: createSortableHeader("Total Pago"),
  },
  {
    accessorKey: "paymentMethod",
    header: createSortableHeader("Método de Pagamento"),
  },
];

export const mockSales: mockSale[] = [
  {
    id: 1,
    products: "Coca-Cola 2L",
    date: "02/09 21:56:04",
    total: "R$12,00",
    paymentMethod: "Pix",
  },
  {
    id: 2,
    products: "Pizza Calabresa",
    date: "02/09 20:30:10",
    total: "R$45,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: 3,
    products: "Hambúrguer Artesanal",
    date: "03/09 12:15:30",
    total: "R$28,50",
    paymentMethod: "Dinheiro",
  },
  {
    id: 4,
    products: "Açaí 500ml",
    date: "03/09 14:45:22",
    total: "R$18,00",
    paymentMethod: "Pix",
  },
];

const Sales: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  
  const table = useReactTable({
    data: mockSales,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });
  // Função para exportar PDF (placeholder)
  const handleExportToPDF = () => {
    console.log("Exportar para PDF");
  };

  // Função para exportar Excel (placeholder)
  const handleExportToExcel = () => {
    console.log("Exportar para Excel");
  };

  return (
    <div className="layout-container p-4">
      <div className="flex items-center">
        <div className="flex items-center justify-center rounded-lg h-16 w-16 border border-[#1d1c1b8a]">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
          >
            <path
              d="M3.5 5.75C3.5 5.33579 3.16421 5 2.75 5C2.33579 5 2 5.33579 2 5.75V17.75C2 18.9926 3.00736 20 4.25 20H21.25C21.6642 20 22 19.6642 22 19.25C22 18.8358 21.6642 18.5 21.25 18.5H4.25C3.83579 18.5 3.5 18.1642 3.5 17.75V5.75Z"
              fill="#343C54"
            />
            <path
              d="M7 10.7773C5.89543 10.7773 5 11.6728 5 12.7773V16.2501C5 16.6643 5.33579 17.0001 5.75 17.0001H8.25C8.66421 17.0001 9 16.6643 9 16.2501V12.7773C9 11.6728 8.10457 10.7773 7 10.7773Z"
              fill="#343C54"
            />
            <path
              d="M12.5 5C11.3954 5 10.5 5.89543 10.5 7V16.2501C10.5 16.6643 10.8358 17.0001 11.25 17.0001H13.75C14.1642 17.0001 14.5 16.6643 14.5 16.2501V7C14.5 5.89543 13.6046 5 12.5 5Z"
              fill="#343C54"
            />
            <path
              d="M18 8.55859C16.8954 8.55859 16 9.45402 16 10.5586V16.2501C16 16.6643 16.3358 17.0001 16.75 17.0001H19.25C19.6642 17.0001 20 16.2501V10.5586C20 9.45402 19.1046 8.55859 18 8.55859Z"
              fill="#343C54"
            />
          </svg>
        </div>

        <div className="flex flex-col p-4">
          <h1 className="font-bold text-3xl">Relatório de Vendas</h1>
          <p className="text-[#646362] text-sm font-medium">
            Atualizado à 5min. atrás
          </p>
        </div>
      </div>
      
      <CardValueSales />

      <h1 className="font-medium mt-4 mb-4">Lista de Vendas</h1>

      {/* Barra de Filtros */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg border">
        {/* Div Esquerda - Botões de Filtro */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            disabled={columnFilters.length === 0 && !globalFilter && sorting.length === 0}
          >
            <FilterX className="h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>

        {/* Div Direita - Pesquisa e Exportações */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar vendas..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={handleExportToPDF}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportToExcel}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Excel
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>
          {table.getFilteredRowModel().rows.length} de {mockSales.length} vendas exibidas
          {globalFilter && ` • Pesquisando por: "${globalFilter}"`}
        </TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="group">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Drawer key={row.id} direction="right">
                <DrawerTrigger asChild>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </DrawerTrigger>

                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Detalhes da Venda #{row.original.id}</DrawerTitle>
                    <DrawerDescription>
                      Informações detalhadas sobre esta venda.
                    </DrawerDescription>
                  </DrawerHeader>
                  
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Produto</label>
                        <p className="text-lg">{row.original.products}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Data</label>
                        <p className="text-lg">{row.original.date}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Total</label>
                        <p className="text-lg font-semibold text-green-600">{row.original.total}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Método de Pagamento</label>
                        <p className="text-lg">{row.original.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                  
                  <DrawerFooter>
                    <Button>Editar Venda</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Fechar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Indicadores de filtros ativos */}
      {(columnFilters.length > 0 || globalFilter || sorting.length > 0) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex flex-wrap gap-4 text-sm text-blue-800">
            {globalFilter && (
              <span>
                <strong>Pesquisa:</strong> "{globalFilter}"
              </span>
            )}
            {columnFilters.length > 0 && (
              <span>
                <strong>Filtros:</strong> {columnFilters.length} ativo(s)
              </span>
            )}
            {sorting.length > 0 && (
              <span>
                <strong>Ordenação:</strong>{" "}
                {sorting.map((sort, index) => (
                  <span key={sort.id}>
                    {index > 0 && ", "}
                    {sort.id} ({sort.desc ? "↓" : "↑"})
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;