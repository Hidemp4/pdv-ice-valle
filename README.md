<div align="center">

# 🧊 PDV Ice Valle

**Sistema de Ponto de Venda Moderno, Rápido e Seguro.**

[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=black)](https://tauri.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Funcionalidades](#-funcionalidades) • [Instalação](#-instalação-e-uso) • [Tecnologias](#-tecnologias) • [Contribuindo](#-contribuindo)

</div>

---

## 🖼️ Preview

_(Em breve imagens ou GIFs do sistema)_

---

## 🎯 Sobre o Projeto

O **PDV Ice Valle** é uma solução robusta de Ponto de Venda desenvolvida para oferecer a performance de aplicações nativas com a flexibilidade da web moderna.

Construído sobre o **Tauri v2**, ele combina a segurança e velocidade do **Rust** no backend com uma interface rica em **React + TypeScript**.

Diferente de soluções baseadas em Electron, o Ice Valle gera **binários extremamente leves**, consome **pouquíssima memória RAM** e é ideal para hardwares de PDV com recursos limitados, funcionando totalmente **offline**.

---

## ✨ Funcionalidades

### 🛒 Frente de Caixa (PDV)
- **Venda rápida** por código de barras (SKU) ou busca manual
- **Carrinho dinâmico** com subtotal e total em tempo real
- **Múltiplos métodos de pagamento** na mesma venda:
  - Dinheiro
  - Pix
  - Débito
  - Crédito
- **Cálculo automático de troco** com assistente visual

### 📊 Gestão e Relatórios
- **Dashboard analítico**
  - Gráficos de vendas por horário
  - Cards de resumo (Ticket Médio, Total de Transações)
- **Histórico de vendas**
  - Filtros
  - Ordenação
  - Paginação
- **Exportação inteligente**
  - 📄 **PDF** (formato extrato bancário)
  - 📊 **CSV** (Excel / Google Sheets)

### ⚙️ Sistema
- **Banco de dados local** com SQLite (sem servidor externo)
- **Alta performance** e funcionamento offline
- **Segurança nativa** via Rust + Tauri

---

## 🛠️ Tecnologias

| Área | Tecnologia | Descrição |
|---|---|---|
| Core | [Tauri v2](https://tauri.app) | Binários nativos leves |
| Backend | [Rust](https://www.rust-lang.org/) | Lógica de sistema e segurança |
| Frontend | [React](https://reactjs.org/) | Interface de usuário |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| Estilização | [Tailwind CSS](https://tailwindcss.com/) | CSS utilitário |
| UI Kit | [shadcn/ui](https://ui.shadcn.com/) | Componentes acessíveis |
| Gráficos | [Recharts](https://recharts.org/) | Visualização de dados |
| Database | [SQLite](https://www.sqlite.org/) | Banco de dados embarcado |

---

## 📦 Pré-requisitos

- **Node.js** (v18+ recomendado)
- **Rust** (Stable)
- **npm**, **yarn** ou **pnpm**

### Dependências do Sistema Operacional

#### 🐧 Linux (Ubuntu/Debian)

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
  file \
  libssl-dev
```

### 🪟 Windows

- Instale Microsoft Visual Studio C++ Build Tools

- WebView2 já vem instalado no Windows 10/11

### 🍎 macOS
```
xcode-select --install
```

### 🚀 Instalação e Uso

Clone o repositório
```
git clone https://github.com/Hidemp4/pdv-ice-valle.git
cd pdv-ice-valle
```

Instale as dependências
```
npm install
```

Caso necessário, instale plugins do Tauri v2:
```
npm run tauri add fs dialog
```

DEV
```
npm run tauri dev
```

Build de Produção
```
npm run tauri build
```

O executável será gerado em:
```
src-tauri/target/release/bundle/
```

### 📁 Estrutura do Projeto
```text
pdv-ice-valle/
├── src/
│   ├── components/       # Frontend (React)
│   ├── hooks/            # Custom Hooks
│   ├── layouts/          # Páginas principais
│   ├── lib/              # Utils (cn, formatters)
│   ├── types/            # Tipagens globais
│   └── utils/            # Exportação PDF / CSV
├── src-tauri/
│   ├── src/              # Backend (Rust)
│   ├── capabilities/     # Permissões (Tauri v2)
│   └── tauri.conf.json   # Configuração do App
└── ...
```


### 📄 Licença
Projeto de uso proprietário/privado.

## 👥 Autores

| Autor | GitHub |
|------|--------|
| Hidemp4 | https://github.com/Hidemp4 |
| cainhooow | https://github.com/cainhooow |
