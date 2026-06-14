# 🎮 Boulado Studio's — Portfolio Site

> Site profissional de portfólio para estúdio de desenvolvimento Roblox.
> Design AAA inspirado em Riot Games, Rockstar e Epic Games.

---

## 📁 Estrutura de Arquivos

```
boulado-studios/
├── index.html        ← Estrutura completa do site (HTML)
├── style.css         ← Todo o design e animações (CSS)
├── script.js         ← Interatividade e efeitos (JavaScript)
├── gabriel-foto.jpg  ← ⚠️ COLOCAR A FOTO DO GABRIEL AQUI
└── README.md         ← Este arquivo
```

---

## 🚀 Como Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `boulado-studios-portfolio`)
2. Faça upload dos 3 arquivos: `index.html`, `style.css`, `script.js`
3. Vá em **Settings → Pages**
4. Em **Source**, selecione `Deploy from a branch → main → / (root)`
5. Aguarde ~2 minutos e acesse: `https://seu-usuario.github.io/boulado-studios-portfolio`

---

## 📸 Foto do Gabriel de Lima

**IMPORTANTE:** A foto do Gabriel está configurada para carregar do arquivo `gabriel-foto.jpg`.

**Para adicionar a foto:**
1. Renomeie a imagem do Gabriel para `gabriel-foto.jpg`
2. Coloque ela na mesma pasta dos outros arquivos
3. Faça upload no repositório GitHub

> Se não encontrar o arquivo, o site usa uma foto placeholder automaticamente (via `onerror`).

**Para mudar o caminho da foto**, edite esta linha no `index.html`:
```html
<img src="gabriel-foto.jpg" alt="Gabriel de Lima" class="team-img" ... />
```

---

## 🎨 Personalização

### Cores principais (em `style.css`, início do arquivo):
```css
--gold:      #C9A84C;   /* Dourado — accent principal */
--black:     #0A0A0A;   /* Fundo escuro */
--red:       #8B1A1A;   /* Vermelho escuro (detalhes) */
```

### Alterar textos do Hero:
No `index.html`, procure pela seção `<!-- HERO -->` e edite:
```html
<span class="title-line">Nós Construímos</span>
<span class="title-line title-line--accent">Mundos Dentro</span>
<span class="title-line">do Roblox</span>
```

### Adicionar membros da equipe:
Copie um bloco `<div class="team-card">` dentro de `#team-grid` no `index.html` e edite nome, cargo, bio e foto.

### Adicionar projetos:
Copie um bloco `<article class="project-card">` dentro de `#projects-grid` e edite as informações.

### Filtros de projeto:
Para adicionar uma nova categoria, adicione um botão no `.projects-filter`:
```html
<button class="filter-btn" data-filter="adventure">Aventura</button>
```
E adicione `data-category="adventure"` no card do projeto.

---

## 🔗 Links Sociais

No `index.html`, substitua os `href="#"` pelos links reais do estúdio:
- Discord Server
- Twitter/X
- GitHub

---

## 📧 Formulário de Contato

O formulário atual mostra uma animação de sucesso mas **não envia emails**.
Para conectar a um backend real, você pode usar:
- [Formspree](https://formspree.io) — grátis, fácil de configurar
- [EmailJS](https://emailjs.com) — envia emails direto do frontend

**Com Formspree (mais fácil):**
1. Crie conta em formspree.io
2. Copie seu endpoint (ex: `https://formspree.io/f/xyzabc`)
3. Substitua no `index.html`:
```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/SEU_ID" method="POST">
```
4. No `script.js`, substitua o `e.preventDefault()` pelo comportamento padrão ou use fetch/AJAX.

---

## 🌐 Domínio Personalizado

Para usar `bouladostudios.com` com GitHub Pages:
1. Compre o domínio (Namecheap, GoDaddy, etc.)
2. No repositório, crie um arquivo `CNAME` com o conteúdo:
   ```
   bouladostudios.com
   ```
3. Configure os DNS do domínio apontando para o GitHub Pages

---

## ✅ Funcionalidades Incluídas

- [x] Loader animado com barra de progresso
- [x] Cursor customizado (desktop)
- [x] Navbar fixa com blur ao scroll
- [x] Menu hamburguer para mobile
- [x] Hero com partículas e glows animados
- [x] Animações de entrada (reveal on scroll)
- [x] Contadores animados (stats)
- [x] Filtro de projetos por categoria
- [x] Efeito 3D tilt nos cards da equipe
- [x] Parallax sutil no título do hero
- [x] Efeito glitch no logo
- [x] Formulário com feedback visual
- [x] Botão "voltar ao topo"
- [x] Nav link ativo baseado na seção visível
- [x] Totalmente responsivo (mobile, tablet, desktop, ultrawide)
- [x] Respeita `prefers-reduced-motion`
- [x] Scrollbar customizada

---

**Boulado Studio's** — *Nós Construímos Mundos Dentro do Roblox* 🎮
