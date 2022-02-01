import kaboom from "kaboom";

kaboom({
  background: [0, 0, 0],
});

class Rain {
  kata: string;
  pos: { x: number; y: number };
  speed: number;

  constructor(k: string, p: { x: number; y: number }, s: number) {
    this.kata = k;
    this.pos = p;
    this.speed = s;
  }
}

let bg = GREEN;
let fontSize: number = 20;

let listRain: Rain[] = [];
for (let i: number = 0; i < width() / fontSize; i++) {
  let r: Rain = new Rain(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    vec2(fontSize + i * fontSize, -500),
    Math.floor(rand(10, 50))
  );
  listRain.push(r);
}

onDraw(() => {
  for (let i: number = 0; i < listRain.length; i++) {
    listRain[i].pos.y += listRain[i].speed;

    for (let j: number = 0; j < listRain[i].kata.length; j++) {
      bg = listRain[i].speed < 30 ? rgb(0, 100, 0) : GREEN;

      if (j == listRain[i].kata.length - 1) bg = WHITE;
      else if (j >= listRain[i].kata.length - 4) bg = rgb(128, 128, 128);

      let charIdx = j % listRain[i].kata.length;

      drawText({
        text: listRain[i].kata[charIdx],
        pos: vec2(i * fontSize, j * fontSize + listRain[i].pos.y),
        size: fontSize,
        color: bg,
      });
    }

    if (listRain[i].pos.y > height()) {
      listRain[i].pos.y = -500;

      listRain[i].kata = "";

      for (let x = 0; x < 26; x++) {
        listRain[i].kata +=
          ASCII_CHARS[Math.floor(rand(ASCII_CHARS.length - 1))];
      }
    }
  }
});
