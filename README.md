# 🏠 Casa Certa Imóveis — Plataforma Profissional

> Next.js 14 · TypeScript · Tailwind CSS · Supabase · Vercel

---

## 📋 O que está incluído

- ✅ Site público com homepage, listagem e detalhe de imóveis
- ✅ Filtros avançados (tipo, preço, quartos, destaque, busca)
- ✅ Carrossel de imagens profissional
- ✅ Botões WhatsApp por imóvel
- ✅ SEO completo (metadata dinâmica, Open Graph, Schema.org)
- ✅ **Painel Administrativo completo** (`/admin`)
- ✅ Upload de imagens com drag-and-drop
- ✅ Exclusão lógica (imóveis nunca são apagados do banco)
- ✅ Autenticação segura com Supabase Auth
- ✅ Banco de dados PostgreSQL gerenciado

---

## 🚀 PASSO A PASSO: Configuração Inicial

### ETAPA 1 — Criar conta e projeto no Supabase

1. Acesse **[supabase.com](https://supabase.com)** e crie uma conta gratuita
2. Clique em **"New Project"**
3. Dê o nome **"casacerta"**, escolha uma senha forte e selecione região **South America (São Paulo)**
4. Aguarde o projeto inicializar (~2 minutos)

---

### ETAPA 2 — Criar o banco de dados

1. No painel do Supabase, clique em **"SQL Editor"** no menu lateral
2. Clique em **"New Query"**
3. Abra o arquivo **`supabase-schema.sql`** (na raiz deste projeto)
4. Copie TODO o conteúdo e cole no editor
5. Clique em **"Run"** (▶)
6. Deve aparecer: `Success. No rows returned`

---

### ETAPA 3 — Criar usuário administrador

> Este usuário será usado por você e pelo Salomão para acessar o painel `/admin`.

1. No Supabase, vá em **Authentication → Users**
2. Clique em **"Invite user"**
3. Digite o e-mail do corretor (ex: `diogo@casacerta.com.br`)
4. O Supabase envia um e-mail de convite com link para definir a senha
5. **Repita** para o segundo corretor (Salomão)

> **Alternativa rápida para testes:** Vá em Authentication → Users → "Add user" → preencha e-mail e senha manualmente.

---

### ETAPA 4 — Obter as chaves do Supabase

1. No Supabase, vá em **Settings → API**
2. Copie os valores:
   - **Project URL** → começa com `https://xxx.supabase.co`
   - **anon / public key** → chave longa começando com `eyJ...`
   - **service_role key** → outra chave longa (⚠️ secreta!)

---

### ETAPA 5 — Configurar variáveis de ambiente

1. Na raiz do projeto, **copie** o arquivo `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Abra `.env.local` no VSCode e preencha com seus valores:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...SUA_CHAVE
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...SUA_SERVICE_KEY
   NEXT_PUBLIC_SITE_URL=https://casacerta.com.br
   NEXT_PUBLIC_WHATSAPP_DIOGO=5588981545786
   NEXT_PUBLIC_WHATSAPP_SALOMAO=5588997137356
   ```

---

### ETAPA 6 — Instalar e rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Abra **[http://localhost:3000](http://localhost:3000)** no navegador.

Painel admin: **[http://localhost:3000/admin](http://localhost:3000/admin)**

---

## 🌐 COLOCAR O SITE NO AR (Deploy na Vercel)

### ETAPA 1 — Subir código para o GitHub

```bash
# Na pasta do projeto, execute:
git init
git add .
git commit -m "feat: plataforma Casa Certa Imóveis"

# Crie um repositório em github.com e siga as instruções de push
git remote add origin https://github.com/SEU_USUARIO/casacerta.git
git push -u origin main
```

> Se não tiver Git instalado: baixe em **[git-scm.com](https://git-scm.com)**

---

### ETAPA 2 — Criar conta na Vercel

1. Acesse **[vercel.com](https://vercel.com)** e clique em **"Sign Up"**
2. Escolha **"Continue with GitHub"** — autorize o acesso

---

### ETAPA 3 — Importar o projeto

1. No dashboard da Vercel, clique em **"Add New → Project"**
2. Encontre o repositório `casacerta` e clique em **"Import"**
3. A Vercel detecta automaticamente que é Next.js ✅
4. **NÃO clique em Deploy ainda** — primeiro configure as variáveis

---

### ETAPA 4 — Configurar variáveis na Vercel

1. Na tela de importação, clique em **"Environment Variables"**
2. Adicione **uma por uma** as mesmas variáveis do `.env.local`:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (chave anon) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service role) |
| `NEXT_PUBLIC_SITE_URL` | `https://casacerta.com.br` |
| `NEXT_PUBLIC_WHATSAPP_DIOGO` | `5588981545786` |
| `NEXT_PUBLIC_WHATSAPP_SALOMAO` | `5588997137356` |

3. Agora clique em **"Deploy"** 🚀

---

### ETAPA 5 — Configurar o domínio

1. Após o deploy, vá em **Settings → Domains**
2. Clique em **"Add Domain"** e digite `casacerta.com.br`
3. A Vercel mostra os registros DNS para configurar
4. No painel do seu registrador de domínio (ex: Registro.br), adicione:
   - **Tipo A** → apontando para o IP da Vercel
   - **ou CNAME** → `cname.vercel-dns.com`
5. Aguarde propagação do DNS (até 24h, geralmente menos de 1h)

> A partir daí, qualquer `git push` para o GitHub faz deploy automático! ✨

---

## 🔐 COMO OS ADMINISTRADORES TÊM ACESSO

### Como funciona a segurança

```
Usuário acessa /admin
        ↓
Middleware Next.js verifica sessão (Edge — instantâneo)
        ↓
Sem sessão → redireciona para /admin/login
Com sessão → acessa o painel normalmente
        ↓
Supabase RLS garante que apenas autenticados
podem criar/editar/deletar no banco de dados
```

### Acesso ao painel

1. O corretor acessa: **`https://casacerta.com.br/admin`**
2. É redirecionado automaticamente para **`/admin/login`**
3. Digita o **e-mail** e **senha** cadastrados no Supabase
4. Entra no painel — sessão dura **1 hora** (renovada automaticamente)
5. Ao fechar o navegador e abrir depois, continua logado (cookie de sessão)

### Adicionar novo corretor (admin)

1. Acesse **supabase.com → seu projeto → Authentication → Users**
2. Clique **"Invite user"** ou **"Add user"**
3. Informe o e-mail do novo corretor
4. Ele recebe um e-mail para definir a senha
5. Pronto — já tem acesso ao painel `/admin`

### Remover acesso de um corretor

1. Supabase → Authentication → Users
2. Clique no corretor → **"Delete user"**
3. Sessões ativas são invalidadas em até 1 hora

### Redefinir senha

- O próprio usuário pode usar **"Esqueci minha senha"** na tela de login
- Ou você vai em Supabase → Authentication → Users → seleciona o usuário → **"Send password reset"**

---

## 📱 COMO USAR O PAINEL ADMIN

### Cadastrar um novo imóvel

1. Acesse `/admin/imoveis/novo`
2. Preencha: título, preço, tipo, status, cidade, bairro
3. O **slug** (URL) é gerado automaticamente pelo título
4. Adicione imagens (arraste ou clique)
5. Marque **"Destaque"** se quiser aparecer na homepage
6. Clique em **"Criar Imóvel"**

### Editar um imóvel

1. Vá em `/admin/imoveis`
2. Clique em **"Editar"** no imóvel desejado
3. Altere qualquer campo e clique em **"Salvar Alterações"**

### Alterar disponibilidade rapidamente

- Na lista `/admin/imoveis`, use o **toggle** (botão on/off) para ativar/desativar
- O **status** (Disponível, Vendido, Alugado, Reservado) é alterado na edição

### Marcar como destaque

- Clique na ⭐ na lista de imóveis
- Ou marque o checkbox "Destaque" na edição

### Ocultar sem excluir

- Toggle "Ativo" na lista → imóvel some do site mas fica no banco
- Para reativar, basta ligar o toggle novamente

---

## 📁 Estrutura das Pastas

```
casacerta/
├── app/
│   ├── (public)/          ← Páginas do site público
│   │   ├── page.tsx       ← Homepage
│   │   └── imoveis/       ← Listagem e detalhe
│   ├── admin/             ← Painel administrativo (protegido)
│   │   ├── login/         ← Tela de login
│   │   ├── imoveis/       ← Gerenciar imóveis
│   │   └── page.tsx       ← Dashboard
│   └── api/               ← API routes
├── components/
│   ├── admin/             ← Componentes do painel
│   ├── imoveis/           ← Cards, carrossel, filtros
│   └── layout/            ← Navbar, Footer, Corretores
├── services/              ← Comunicação com Supabase
├── types/                 ← TypeScript (tipos de dados)
├── lib/                   ← Clientes Supabase e utilitários
├── middleware.ts           ← Proteção de rotas admin
└── supabase-schema.sql    ← Script do banco de dados
```

---

## 🛠️ Comandos Úteis

```bash
npm run dev      # Rodar localmente (http://localhost:3000)
npm run build    # Gerar build de produção
npm run start    # Rodar build de produção localmente
npm run lint     # Verificar erros de código
```

---

## ❓ Problemas Comuns

**"supabaseUrl is required"**
→ O arquivo `.env.local` não foi criado ou as variáveis estão erradas.

**Login não funciona**
→ Verifique se o usuário foi criado em Supabase → Authentication → Users.

**Imagens não carregam**
→ Verifique se o bucket `imoveis-imagens` foi criado (Supabase → Storage).

**Site não atualiza após deploy**
→ A Vercel usa cache de 1h. Force revalidação em Deployments → "Redeploy".

**Erro de permissão no banco**
→ Verifique se o SQL do `supabase-schema.sql` foi executado completamente.

---

## 📞 Suporte Técnico

Em caso de dúvidas técnicas, verifique a documentação oficial:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
