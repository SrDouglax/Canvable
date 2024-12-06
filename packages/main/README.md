# Canvable

Canvable é uma biblioteca para criação de cenas em canvas com um sistema de nós, permitindo a construção de elementos e interações de forma intuitiva, similar a uma engine de jogos 2D. A biblioteca oferece suporte para objetos gráficos, entrada de usuário, câmera, e muito mais, permitindo criar experiências interativas de maneira modular e flexível.

## Instalação

### Usando NPM

Se você está utilizando o NPM, pode instalar a biblioteca com:

```bash
npm install @jiant/canvable
```

### Usando Yarn

Se você está utilizando o Yarn, pode instalar com:

```bash
yarn add @jiant/canvable
```

## Exemplos de Uso

### Criando uma Cena

A seguir está um exemplo básico de como criar uma cena e adicionar um objeto nela:

```typescript
import { Circle, getCanvas, Scene } from "@jiant/canvable";
import "./style.css";

// Obtendo o canvas
const canvas = getCanvas("app")!;
const ctx = canvas.getContext("2d")!;

// Criando a cena
const scene = new Scene(ctx);

// Criando um círculo
const circle = new Circle();

// Adicionando o círculo à cena
scene.addObject(circle);
```

### Loop de Jogo

Você pode adicionar um loop de jogo para atualizar e mover os objetos da cena:

```typescript
scene.gameLoop((deltaTime, total) => {
  circle.pos.x = Math.sin(total) * 100 + 200;
});
```

---

## Funcionalidades

### Cenas e Objetos

- **Cena**: Contém e gerencia objetos, como círculos, retângulos, entre outros. Permite manipulação de câmera e desenhos.
- **Objetos**: Elementos gráficos que podem ser adicionados à cena, como `Circle`, `Rectangle`, etc.

### Funções de Entrada

- **isPressed**: Verifica se uma tecla ou botão está pressionado continuamente.
- **justPressed**: Detecta o momento exato em que uma tecla ou botão é pressionado pela primeira vez.

### Câmera

- Suporte para uma câmera 2D que pode ser movida e ampliada (zoom).

---

## Contribuições

Contribuições são bem-vindas! Se você deseja melhorar ou adicionar novos recursos à biblioteca, sinta-se à vontade para abrir um **Pull Request**.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
