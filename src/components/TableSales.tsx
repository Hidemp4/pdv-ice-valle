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
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, ArrowUpDown, ArrowLeft, ArrowRight, FilterX, Search, FileText, Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  flexRender,
  ColumnDef,
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

type mockSale = {
  id: number;
  products: string[];
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
    cell: ({ row }) => {
      const products = row.getValue("products") as string[];
      const firstProduct = products[0] || '';
      const remainingCount = products.length - 1;
      const fullText = products.join(', ');
      
      // Se só tem um produto ou cabe tudo em 50 caracteres
      if (products.length === 1 || fullText.length <= 40) {
        return (
          <div className="max-w-[250px] text-sm text-gray-700" title={fullText}>
            {fullText}
          </div>
        );
      }
      
      // Se tem múltiplos produtos, mostra o primeiro + badge
      return (
        <div className="flex items-center gap-2 max-w-[250px]" title={fullText}>
          <span className="text-sm text-gray-700 truncate">
            {firstProduct.length > 30 ? firstProduct.substring(0, 30) + '...' : firstProduct}
          </span>
          {remainingCount > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">
              +{remainingCount}
            </span>
          )}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = (rowA.getValue(columnId) as string[]).join(', ');
      const b = (rowB.getValue(columnId) as string[]).join(', ');
      return a.localeCompare(b);
    },
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
    products: ["Coca-Cola 2L", "Hamburguer Artesanal"],
    date: "02/09 21:56:04",
    total: "R$12,00",
    paymentMethod: "Pix",
  },
  {
    id: 2,
    products: ["Pizza Calabresa"],
    date: "02/09 20:30:10",
    total: "R$45,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: 3,
    products: ["Hambúrguer Artesanal"],
    date: "03/09 12:15:30",
    total: "R$28,50",
    paymentMethod: "Dinheiro",
  },
  {
    id: 4,
    products: ["Açaí 500ml"],
    date: "03/09 14:45:22",
    total: "R$18,00",
    paymentMethod: "Pix",
  },
  {
    id: 5,
    products: ["Coca-Cola 2L"],
    date: "02/09 21:56:04",
    total: "R$12,00",
    paymentMethod: "Pix",
  },
  {
    id: 6,
    products: ["Pizza Calabresa"],
    date: "02/09 20:30:10",
    total: "R$45,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: 7,
    products: ["Hambúrguer Artesanal"],
    date: "03/09 12:15:30",
    total: "R$28,50",
    paymentMethod: "Dinheiro",
  },
  {
    id: 8,
    products: ["Açaí 500ml"],
    date: "03/09 14:45:22",
    total: "R$18,00",
    paymentMethod: "Pix",
  },
  {
    id: 9,
    products: ["Coca-Cola 2L"],
    date: "02/09 21:56:04",
    total: "R$12,00",
    paymentMethod: "Pix",
  },
  {
    id: 10,
    products: ["Pizza Calabresa"],
    date: "02/09 20:30:10",
    total: "R$45,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: 11,
    products: ["Hambúrguer Artesanal"],
    date: "03/09 12:15:30",
    total: "R$28,50",
    paymentMethod: "Dinheiro",
  },
  {
    id: 12,
    products: ["Açaí 500ml"],
    date: "03/09 14:45:22",
    total: "R$18,00",
    paymentMethod: "Pix",
  },
  {
    id: 13,
    products: ["Pizza Calabresa"],
    date: "02/09 20:30:10",
    total: "R$45,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: 14,
    products: ["Hambúrguer Artesanal"],
    date: "03/09 12:15:30",
    total: "R$28,50",
    paymentMethod: "Dinheiro",
  },
  {
    id: 15,
    products: ["Açaí 500ml"],
    date: "03/09 14:45:22",
    total: "R$18,00",
    paymentMethod: "Pix",
  },
  {
    id: 16,
    products: ["Pizza Calabresa"],
    date: "02/09 20:30:10",
    total: "R$45,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: 17,
    products: ["Hambúrguer Artesanal"],
    date: "03/09 12:15:30",
    total: "R$28,50",
    paymentMethod: "Dinheiro",
  },
  {
    id: 18,
    products: ["Açaí 500ml"],
    date: "03/09 14:45:22",
    total: "R$18,00",
    paymentMethod: "Pix",
  },

];


const TableSales: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Initial page index
    pageSize: 10,  // Default page size
  });

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
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination
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
    <>
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
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ArrowLeft />
            Anterior
          </Button>
          <span>Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</span>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próxima
            <ArrowRight />
          </Button>
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
                        <label className="text-sm font-medium text-gray-500">Produtos</label>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="space-y-1">
                            {row.original.products.map((product, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                <span className="text-sm text-gray-700">{product}</span>
                              </div>
                            ))}
                          </div>
                        </div>
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

    </>
  );
};

export default TableSales;
