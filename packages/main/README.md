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

### Criando uma Cena

A seguir está um exemplo básico de como criar uma cena e adicionar um objeto nela:

```typescript
import { Scene, Square, Vector2D, getCanvas, KinematicBody } from "@jiant/canvable";

// Obtendo o canvas
const canvas = getCanvas("app");
const ctx = canvas.getContext("2d")!;

// Criando a cena
const scene = new Scene(ctx);

// Criando um objeto (Quadrado)
const player = new Square(scene, {
  size: new Vector2D(50, 50),
  startsWithBoundingBox: true, // Adicionar colisão automaticamente
});
player.pos = new Vector2D(100, 100);
player.style.fillStyle = "#00FF00"; // Cor customizada

// Adicionando física (Corpo Kinemático)
const body = new KinematicBody(scene, player, {
  speed: 1000,
  friction: 0.9,
});
scene.addObject(body);

// Iniciando o loop
scene.run((deltaTime) => {
  // Movimento simples
  if (scene.inputManager.isPressed("ArrowRight")) {
    body.applyForce(1000 * deltaTime, 0, deltaTime);
  }
});
```

### Playground Interativo

O pacote inclui um exemplo completo de "Playground de Física" com:

- Controle de personagem (WASD + Setas)
- Sprint (Shift)
- Colisões e Física
- Câmera que segue o jogador
- Geração procedural de nível

Você pode conferir o código fonte em `example/index.ts` ou rodar localmente com `npm run dev`.

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
