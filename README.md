# PDV

Sistema PDV (Ponto de Venda) desenvolvido com [Tauri](https://tauri.app), utilizando React + TypeScript no frontend e Rust no backend.

## 🛠️ Tecnologias

- [Tauri](https://tauri.app)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🔌 Dependências principais

- @radix-ui/react-dialog
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-tooltip
- @tailwindcss/vite
- @tanstack/react-table
- @tauri-apps/api
- @tauri-apps/cli
- @tauri-apps/plugin-opener
- @tauri-apps/plugin-sql
- @types/node
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- class-variance-authority
- clsx
- jsdom
- lucide-react
- react
- react-dom
- react-router-dom
- tailwind-merge
- tailwindcss
- tw-animate-css
- typescript
- vaul
- vite
- vitest

## Funcionalidades:
- Registro de vendas
- Controle de estoque
- Interface intuitiva e responsiva
- Performance otimizada para sistemas locais

```
npm install
```

### 3. Instale o Rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### 4. Instale as bibliotecas do sistema (Ubuntu 24.04+)
```
sudo apt update
sudo apt install -y \
  pkg-config \
  libgtk-3-dev \
  libsoup-3.0-dev \
  libwebkit2gtk-4.1-dev
```

### 5. Execute o projeto em modo de desenvolvimento
```
npm run tauri dev
```

### 6. Para gerar um executável
```
npm run tauri build
```

### 🐧 Observações para Linux
Esse projeto foi testado no Ubuntu 24.04 LTS.

É necessário ter as versões corretas das bibliotecas (webkit2gtk-4.1, libsoup-3.0, etc.).

Certifique-se de que o pkg-config esteja acessível no seu PATH.

### 📁 Estrutura básica do projeto
```
pdv/
├── src/                # Frontend React
├── src-tauri/          # Backend Rust + Tauri config
│   ├── tauri.conf.json
│   └── Cargo.toml
├── package.json
└── README.md
```

### 📋 Informações do projeto Tauri (gerado)
Nome do projeto: pdv

Identificador: com.pdv.app

Frontend: React + TypeScript

Gerenciador de pacotes: npm
