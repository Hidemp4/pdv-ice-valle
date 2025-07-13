import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Header: React.FC = () => {
  return (
    <header className="header bg-gray-800 text-white mt-4 p-4 h-26">
      <div className="flex items-center h-full gap-2">
        <label htmlFor="codeNumber">Código</label>
        <Input className="w-full h-12" type="number" placeholder="Número do código de barras" id="codeNumber"/>
        <label htmlFor="qtdProduct">Qtd</label>
        <Input className="w-26 h-12" type="number" placeholder="Qtd" id="qtdProduct"/>
        <Button className="w-40 h-12 tracking-wide" type="submit" variant="outline">
          Adicionar Manual
        </Button>
      </div>
    </header>
  );
};

export default Header;
