# 🧊 PDV Ice Valle

Sistema completo de Ponto de Venda (PDV) desenvolvido com tecnologias modernas, oferecendo uma solução robusta e eficiente para gerenciamento de vendas e estoque.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O PDV Ice Valle é um sistema de ponto de venda construído com [Tauri](https://tauri.app), combinando a leveza e segurança do Rust no backend com a modernidade do React + TypeScript no frontend. O resultado é uma aplicação desktop multiplataforma, rápida e eficiente.

### Por que Tauri?

- **Performance**: Aplicação nativa com baixo consumo de recursos
- **Segurança**: Backend em Rust com proteções nativas
- **Multiplataforma**: Funciona em Windows, macOS e Linux
- **Tamanho reduzido**: Binários significativamente menores que Electron

## ✨ Funcionalidades

- ✅ Registro de vendas em tempo real
- ✅ Controle completo de estoque
- ✅ Interface intuitiva e responsiva
- ✅ Gerenciamento de produtos
- ✅ Histórico de transações
- ✅ Performance otimizada para sistemas locais
- ✅ Banco de dados local (SQLite)

## 🛠️ Tecnologias

### Frontend
- [React](https://reactjs.org/) - Biblioteca para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Build tool e dev server ultrarrápido
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI reutilizáveis
- [React Router](https://reactrouter.com/) - Roteamento para React

### Backend
- [Tauri](https://tauri.app) - Framework para apps desktop
- [Rust](https://www.rust-lang.org/) - Linguagem de programação de sistemas
- [SQLite](https://www.sqlite.org/) - Banco de dados local

### UI Components
- Shadcn UI (Dialog, Select, Separator, Slot, Tooltip)
- Heroi Icons (Ícones)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **Rust** (última versão estável)
- **Dependências do sistema** (veja abaixo)

### Dependências do Sistema (Linux)

Para Ubuntu 24.04 LTS ou superior:

```bash
sudo apt update
sudo apt install -y \
  pkg-config \
  libgtk-3-dev \
  libsoup-3.0-dev \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file
```

### Dependências do Sistema (Windows)

No Windows, você precisará:
- [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (geralmente já instalado no Windows 10/11)

### Dependências do Sistema (macOS)

No macOS, instale o Xcode Command Line Tools:

```bash
xcode-select --install
```

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Hidemp4/pdv-ice-valle.git
cd pdv-ice-valle
```

### 2. Mude para a branch dev

```bash
git checkout dev
```

### 3. Instale as dependências do projeto

```bash
npm install
```

### 4. Instale o Rust (se ainda não tiver)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Verifique a instalação:

```bash
rustc --version
cargo --version
```

## 💻 Como Usar

### Modo Desenvolvimento

Execute o projeto em modo de desenvolvimento com hot-reload:

```bash
npm run tauri dev
```

### Build de Produção

Gere um executável otimizado para o seu sistema operacional:

```bash
npm run tauri build
```

O executável estará disponível em:
- **Linux**: `src-tauri/target/release/bundle/`
- **Windows**: `src-tauri/target/release/bundle/`
- **macOS**: `src-tauri/target/release/bundle/`

### Executar Testes

```bash
npm run test
```

## 📁 Estrutura do Projeto

```
pdv-ice-valle/
├── src/                      # Código fonte do frontend
│   ├── components/           # Componentes React
│   ├── pages/                # Páginas da aplicação
│   ├── lib/                  # Utilitários e helpers
│   └── App.tsx               # Componente principal
├── src-tauri/                # Código fonte do backend
│   ├── src/                  # Código Rust
│   │   └── main.rs           # Ponto de entrada Rust
│   ├── tauri.conf.json       # Configuração do Tauri
│   └── Cargo.toml            # Dependências Rust
├── public/                   # Arquivos estáticos
├── common/                   # Código compartilhado
├── contract/                 # Contratos de API/tipos
├── index.html                # Template HTML
├── package.json              # Dependências Node.js
├── vite.config.ts            # Configuração do Vite
├── tailwind.config.js        # Configuração do Tailwind
├── tsconfig.json             # Configuração TypeScript
└── README.md                 # Este arquivo
```

## 🐧 Notas para Linux

Este projeto foi desenvolvido e testado no **Ubuntu 24.04 LTS**.

### Requisitos importantes:
- Versões corretas das bibliotecas (webkit2gtk-4.1+, libsoup-3.0+)
- `pkg-config` acessível no PATH
- GTK 3 instalado e configurado

### Solução de problemas comuns:

**Erro: "webkit2gtk-4.1 not found"**
```bash
sudo apt install libwebkit2gtk-4.1-dev
```

**Erro: "error while loading shared libraries"**
```bash
sudo ldconfig
```

## 📄 Licença

Este projeto está sob licença.

## 👥 Autores

- **Hidemp4** - [GitHub](https://github.com/Hidemp4)
- **cainhooow** - [GitHub](https://github.com/cainhooow)
