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

    const [productList, setProductList] = useState<ProductResponse[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await ProductApi.getAll();
                setProductList(products);
                console.log("Produtos listados: ", products);
            } catch (error) {
                console.error('Não foi possível listar os produtos: ', error);
                error instanceof Error ? error.message : 'Erro ao retornar produtos'
            }
        }

        fetchProducts();
    }, []);

    console.log("Teste de listar produtos: ", productList);

    // Importa funções da API
    const { createProduct, loading, error } = useProducts();

    // Estado para controle dos campos do formulario
    const [formData, setFormData] = useState<ProductRequest>({
        name: '',
        description: '',
        sku: '',
        price: 0,
        category_id: null,
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
                category_id: null,
            });

            // Remove mensagem de sucesso após 5 segundos
            setTimeout(() => setSuccessMessage(null), 5000);
        }
    };


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

                    {/* Campo: Categoria */}
                    <div className="form-group">
                        <label htmlFor="category">Categoria</label>
                        <select
                            id="category"
                            value={formData.category_id !== null ? formData.category_id : '' as string | number}
                            onChange={e => updateField('category_id', e.target.value ? parseInt(e.target.value) : null)}
                            disabled={loading}
                        >
                            <option value="">Sem categoria</option>
                            <option value="1">Bebidas</option>
                            <option value="2">Alimentos</option>
                            <option value="3">Limpeza</option>
                        </select>
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
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Create;