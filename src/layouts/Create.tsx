import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useProducts } from "@/hooks/useProducts";
import { ProductRequest, ProductResponse } from "@/types/product";
import { FormEvent, useEffect, useState } from "react";
import { ProductApi } from "@/services/productApi";

// O QUE ESSE COMPONENTE FAZ?

// 1. CRIA NOVOS PRODUTOS
// 2. VALIDA CAMPOS AO ENVIAR
// 3. MOSTRA FEEDBACK DE SUCESSO/ERRO
// 4. LIMPA FORMULARIO APÓS CRIAR
const Create = () => {
    // Importa funções da API
    const { createProduct, deleteProduct, loading, error } = useProducts();

    const [productList, setProductList] = useState<ProductResponse[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await ProductApi.getAll();
                setProductList(products);
            } catch (error) {
                console.error('Não foi possível listar os produtos: ', error);
                error instanceof Error ? error.message : 'Erro ao retornar produtos'
            }
        }
        fetchProducts();
    }, []);

    // Estado para controle dos campos do formulario
    const [formData, setFormData] = useState<ProductRequest>({
        name: '',
        description: '',
        sku: '',
        price: 0,
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede reload da página
        setSuccessMessage(null);

        // Validações básicas
        if (!formData.name.trim()) {
            alert('Nome é obrigatório!');
            return;
        }

        if (!formData.sku.trim()) {
            alert('SKU é obrigatório!');
            return;
        }

        if (formData.price <= 0) {
            alert('Preço deve ser maior que zero!');
            return;
        }

        // Remove category_id do payload se for null
        const payload = { ...formData };
        if (payload.category_id === null) {
            delete payload.category_id;
        }

        // Tenta criar o produto
        const result = await createProduct(payload);

        if (result) {
            // Sucesso! Mostra mensagem e limpa formulário
            setSuccessMessage(`✅ Produto "${result.name}" criado com sucesso! ID: ${result.id}`);

            // Limpa o formulário
            setFormData({
                name: '',
                description: '',
                sku: '',
                price: 0,
            });

            // Remove mensagem de sucesso após 5 segundos
            setTimeout(() => setSuccessMessage(null), 5000);
        }
    };

    const handleDelete = async (product: ProductResponse) => {
        // 1. Confirmação
        const confirm = window.confirm(
            `Tem certeza que deseja remover "${product.name}"?\n\nEsta ação não pode ser desfeita.`
        )

        if (!confirm) return;

        // 2. Deleta (loading será TRUE automaticamente)
        const success = await deleteProduct(product.id);

        // 3. Feedback ao usuário
        if (success) {
            console.log("Produto removido com sucesso!");
        } else {
            alert(`${error || 'Erro ao remover produto'}`);
        }
    }

    const updateField = (field: keyof ProductRequest, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    // Estado para que retorne mensagem quando o produto é criado
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    return (
        <div className="layout-container p-4">
            <h1 className="font-medium mt-4 mb-4">Lista de Criação</h1>

            <div className="product-form-container">
                <h2>Cadastrar Produto</h2>

                {/* Mensagem de sucesso */}
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}

                {/* Mensagem de erro */}
                {error && (
                    <div className="alert alert-error">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo nome */}
                    <div className="form-group">
                        <label htmlFor="name">Nome do Produto<span className="required">*</span></label>
                        <Input id="name" type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="Coca Cola 2L" required disabled={loading} />
                    </div>

                    {/* Campo: SKU */}
                    <div className="form-group">
                        <label htmlFor="sku">
                            SKU / Código de Barras <span className="required">*</span>
                        </label>
                        <Input
                            id="sku"
                            type="text"
                            value={formData.sku}
                            onChange={e => updateField('sku', e.target.value)}
                            placeholder="Ex: 7894900011517"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Campo: Preço */}
                    <div className="form-group">
                        <label htmlFor="price">
                            Preço (R$) <span className="required">*</span>
                        </label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={e => updateField('price', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Campo descrição */}
                    <div className="form-group">
                        <label htmlFor="description">Descrição do Produto</label>
                        <Input id="description" type="text" value={formData.description} onChange={e => updateField('description', e.target.value)} placeholder="Informações adicionais sobre o produto..." disabled={loading} />
                    </div>
                    {/* Botão de Submit */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-500 p-4 rounded-md"
                        >
                            {loading ? 'Salvando...' : 'Salvar Produto'}
                        </button>
                    </div>
                </form>
            </div>

            {/* RESULTADO DAS CRIAÇÕES DE PRODUTOS */}
            <div className="mt-10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">SKU</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productList.map(product => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="text-right">{product.price}</TableCell>
                                <TableCell className="text-right">{product.sku}</TableCell>
                                <TableCell className="flex justify-end">
                                    <div className="bg-red-400 p-2 rounded-md border border-red-500 cursor-pointer"
                                        onClick={() => handleDelete(product)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-[#eee]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Create;