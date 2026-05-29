# Fluxo completo da API

## 1. Criar usuário comum

### POST /usuarios

```json
{
    "nome": "Gabriel",
    "email": "gabriel@gmail.com"
}
```

Resposta:

```json
{
    "id": 1,
    "nome": "Gabriel",
    "email": "gabriel@gmail.com",
    "admin": false
}
```

---

## 2. Listar usuários

### GET /usuarios

Retorna:

```json
[
    {
        "id": 1,
        "nome": "Gabriel",
        "email": "gabriel@gmail.com",
        "admin": false
    }
]
```

---

## 3. Transformar usuário em administrador

### PATCH /usuarios/1/admin

Retorna:

```json
{
    "id": 1,
    "nome": "Gabriel",
    "email": "gabriel@gmail.com",
    "admin": true
}
```

---

## 4. Criar livro

### POST /livros

```json
{
    "usuarioId": 1,
    "nome": "Pequeno Príncipe",
    "autor": "Antoine de Saint-Exupéry",
    "editora": "Glins",
    "genero": "Infantil"
}
```

Resposta:

```json
{
    "id": 1,
    "nome": "Pequeno Príncipe",
    "autor": "Antoine de Saint-Exupéry",
    "editora": "Glins",
    "genero": "Infantil"
}
```

---

## 5. Criar segundo livro

### POST /livros

```json
{
    "usuarioId": 1,
    "nome": "Clean Code",
    "autor": "Robert Martin",
    "editora": "Prentice Hall",
    "genero": "Tecnologia"
}
```

---

## 6. Listar livros

### GET /livros

Retorna:

```json
[
    {
        "id": 1,
        "nome": "Pequeno Príncipe",
        "autor": "Antoine de Saint-Exupéry",
        "editora": "Glins",
        "genero": "Infantil"
    },
    {
        "id": 2,
        "nome": "Clean Code",
        "autor": "Robert Martin",
        "editora": "Prentice Hall",
        "genero": "Tecnologia"
    }
]
```

---

## 7. Criar usuário leitor

### POST /usuarios

```json
{
    "nome": "Maria",
    "email": "maria@gmail.com"
}
```

Resposta:

```json
{
    "id": 2,
    "nome": "Maria",
    "email": "maria@gmail.com",
    "admin": false
}
```

---

## 8. Avaliar um livro

### POST /avaliacoes

```json
{
    "usuarioId": 2,
    "livroId": 1,
    "nota": 5,
    "descricao": "Livro excelente"
}
```

Resposta:

```json
{
    "id": 1,
    "usuarioId": 2,
    "livroId": 1,
    "nota": 5,
    "descricao": "Livro excelente"
}
```

---

## 9. Avaliar outro livro

### POST /avaliacoes

```json
{
    "usuarioId": 2,
    "livroId": 2,
    "nota": 4,
    "descricao": "Muito bom"
}
```

---

## 10. Listar todas as avaliações

### GET /avaliacoes

Resposta:

```json
[
    {
        "id": 1,
        "usuarioId": 2,
        "livroId": 1,
        "nota": 5,
        "descricao": "Livro excelente"
    },
    {
        "id": 2,
        "usuarioId": 2,
        "livroId": 2,
        "nota": 4,
        "descricao": "Muito bom"
    }
]
```

---

## 11. Buscar usuário específico

### GET /usuarios/2

Retorno esperado:

```json
{
    "id": 2,
    "nome": "Maria",
    "email": "maria@gmail.com",
    "livrosLidos": [
        {
            "livro": "Pequeno Príncipe",
            "nota": 5
        },
        {
            "livro": "Clean Code",
            "nota": 4
        }
    ]
}
```

---

## 12. Buscar livro específico

### GET /livros/1

Retorno esperado:

```json
{
    "id": 1,
    "nome": "Pequeno Príncipe",
    "autor": "Antoine de Saint-Exupéry",
    "editora": "Glins",
    "genero": "Infantil",
    "avaliacoes": [
        {
            "usuarioId": 2,
            "nota": 5,
            "descricao": "Livro excelente"
        }
    ]
}
```

---

# Testes de regra de negócio

## Usuário comum tentando criar livro

### POST /livros

```json
{
    "usuarioId": 2,
    "nome": "Dom Casmurro",
    "autor": "Machado de Assis",
    "editora": "ABC",
    "genero": "Romance"
}
```

Resposta:

```json
{
    "erro": "Usuário não é administrador"
}
```

---

## Avaliar o mesmo livro duas vezes

### POST /avaliacoes

```json
{
    "usuarioId": 2,
    "livroId": 1,
    "nota": 3,
    "descricao": "Tentando avaliar novamente"
}
```

Resposta:

```json
{
    "erro": "Usuário já avaliou esse livro"
}
```

---

