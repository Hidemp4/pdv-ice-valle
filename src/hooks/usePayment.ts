import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CartItem, Payment, PaymentMethod, Sale, STORAGE_KEYS } from "@/types/product";

interface UsePaymentProps {
  cart: CartItem[];
  cartTotal: number;
  onClearCart: () => void;
}

export const usePayment = ({ cart, cartTotal, onClearCart }: UsePaymentProps) => {
  const { toast } = useToast();
  
  const [paymentsList, setPaymentsList] = useState<Payment[]>([]);
  const [amountInput, setAmountInput] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | "">("");
  const [error, setError] = useState<string>("");

  // Estados dos Modais de Confirmação
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  // Cálculos
  const totalPaid = paymentsList.reduce((acc, p) => {
    // Garante que o valor salvo seja tratado como número
    return acc + parseFloat(p.value.toString().replace(',', '.'));
  }, 0);
  
  const remainingAmount = Math.max(0, cartTotal - totalPaid);
  const changeAmount = Math.max(0, totalPaid - cartTotal);

  // Handlers de Input
  const handleAmountChange = (value: string) => {
    setAmountInput(value);
    if (error) setError("");
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (error) setError("");
  };

  // Adicionar Pagamento
  const addPayment = () => {
    if (!amountInput || !selectedMethod) {
      setError("Insira um valor e selecione um método.");
      return;
    }

    // --- CORREÇÃO: Aceitar vírgula e ponto ---
    const normalizedValue = amountInput.replace(',', '.');
    const valueFloat = parseFloat(normalizedValue);

    if (isNaN(valueFloat) || valueFloat <= 0) {
      setError("Valor inválido.");
      return;
    }

    const newPayment: Payment = {
      id: Date.now(),
      value: normalizedValue, // Salvamos o valor normalizado
      method: selectedMethod,
    };

    setPaymentsList((prev) => [...prev, newPayment]);
    setAmountInput("");
    setSelectedMethod("");
    setError("");

    toast({
      title: "Pagamento adicionado",
      description: `${newPayment.method}: R$ ${valueFloat.toFixed(2)}`,
    });
  };

  const removePayment = (id: number) => {
    setPaymentsList((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Pagamento removido",
      variant: "destructive",
    });
  };

  // --- Lógica de Limpeza ---
  const requestClear = () => {
    if (cart.length === 0 && paymentsList.length === 0) return; // Nada para limpar
    setShowClearModal(true);
  };

  const confirmClearAction = () => {
    setPaymentsList([]);
    setAmountInput("");
    setSelectedMethod("");
    setError("");
    onClearCart(); // Limpa o carrinho do pai
    setShowClearModal(false);
    toast({ title: "Venda reiniciada", description: "Carrinho e pagamentos limpos." });
  };

  // Salvar no LocalStorage
  const saveSaleToStorage = (saleData: Sale): boolean => {
    try {
      const existingSales = localStorage.getItem(STORAGE_KEYS.SALES);
      const sales: Sale[] = existingSales ? JSON.parse(existingSales) : [];
      sales.push(saleData);
      localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
      window.dispatchEvent(new Event("salesUpdated"));
      return true;
    } catch (err) {
      console.error("Erro ao salvar venda:", err);
      return false;
    }
  };

  // --- Lógica de Finalização ---
  const requestFinalize = () => {
    // Validações antes de abrir o modal
    if (cart.length === 0) {
      toast({ title: "Carrinho vazio", variant: "destructive" });
      return;
    }
    if (paymentsList.length === 0) {
      toast({ title: "Adicione um pagamento", variant: "destructive" });
      return;
    }
    if (remainingAmount > 0.01) { 
      toast({ 
        title: "Pagamento incompleto", 
        description: `Falta R$ ${remainingAmount.toFixed(2)}`,
        variant: "destructive" 
      });
      return;
    }

    setShowFinalizeModal(true); // Abre o modal de confirmação
  };

  const confirmFinalizeAction = () => {
    // Processar troco (Apenas notificação visual)
    if (changeAmount > 0) {
      // Opcional: Poderia salvar o troco no objeto da venda se necessário
    }

    const now = new Date();
    const saleData: Sale = {
      id: now.getTime().toString(),
      date: now.toLocaleDateString("pt-BR"),
      time: now.toLocaleTimeString("pt-BR"),
      products: [...cart],
      payments: [...paymentsList],
      total: cartTotal,
    };

    const saved = saveSaleToStorage(saleData);

    if (saved) {
      toast({
        title: "✅ Venda finalizada!",
        description: `ID: #${saleData.id} | R$ ${cartTotal.toFixed(2)}`
      });
      
      // Limpeza silenciosa (sem toast extra)
      setPaymentsList([]);
      setAmountInput("");
      setSelectedMethod("");
      setError("");
      onClearCart();
    } else {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    }
    setShowFinalizeModal(false);
  };

  return {
    paymentsList,
    amountInput,
    selectedMethod,
    error,
    totalPaid,
    remainingAmount,
    changeAmount, // Exportando para mostrar no modal se quiser
    
    // Modais
    showFinalizeModal,
    setShowFinalizeModal,
    showClearModal,
    setShowClearModal,
    
    // Actions
    handleAmountChange,
    handleMethodSelect,
    addPayment,
    removePayment,
    requestClear,      // Botão Limpar chama este
    confirmClearAction, // Modal "Sim" chama este
    requestFinalize,    // Botão Finalizar chama este
    confirmFinalizeAction // Modal "Sim" chama este
  };
};